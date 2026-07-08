package project.backend.services;



import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.backend.config.JwtUtils;
import project.backend.dto.AuthResponse;
import project.backend.dto.GoogleLoginRequest;
import project.backend.dto.LoginRequest;
import project.backend.dto.RegisterRequest;
import project.backend.eNum.UserRole;
import project.backend.entities.User;
import project.backend.repositories.UserRepository;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    // Thay bằng Client ID Google của bạn (tạo trên Google Cloud Console)
    @Value("${google.client.id}")
    private String googleClientId;

    // Đăng ký tài khoản (Local)
    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email đã được sử dụng!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setAuthProvider("local");
        user.setRole(UserRole.guest);
        user.setIsVerified(false); // Chưa kích hoạt

        userRepository.save(user);

        // Tạo token xác nhận và gửi mail
        String verificationToken = jwtUtils.generateEmailVerificationToken(user.getEmail());
        emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        return "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.";
    }

    public String verifyEmail(String token) {
        try {
            String email = jwtUtils.getEmailFromToken(token);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng."));

            if (user.getIsVerified()) {
                return "Tài khoản này đã được xác thực từ trước.";
            }

            user.setIsVerified(true);
            userRepository.save(user);
            return "Xác thực email thành công! Bạn đã có thể đăng nhập.";
        } catch (Exception e) {
            throw new IllegalArgumentException("Link xác nhận không hợp lệ hoặc đã hết hạn.");
        }
    }

    // Đăng nhập truyền thống (Local)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email hoặc mật khẩu không đúng"));

        // Kiểm tra xem đã kích hoạt mail chưa
        if ("local".equals(user.getAuthProvider()) && !user.getIsVerified()) {
            throw new IllegalArgumentException("Vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập.");
        }

        // Nếu tài khoản này tạo bằng Google, không có mật khẩu
        if ("google".equals(user.getAuthProvider()) && user.getPasswordHash() == null) {
            throw new IllegalArgumentException("Tài khoản này được đăng ký bằng Google. Vui lòng chọn Đăng nhập bằng Google.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Email hoặc mật khẩu không đúng");
        }

        String token = jwtUtils.generateToken(user);
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    // Đăng nhập bằng Google
    public AuthResponse googleLogin(GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())

                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String googleId = payload.getSubject();

                // Xử lý logic tìm hoặc tạo user giống như cũ...
                User user = userRepository.findByEmail(email)
                        .orElseGet(() -> {
                            User newUser = new User();
                            newUser.setEmail(email);
                            newUser.setName(name);
                            newUser.setAuthProvider("google");
                            newUser.setProviderId(googleId);
                            return userRepository.save(newUser);
                        });

                String token = jwtUtils.generateToken(user);
                return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());

            } else {
                throw new IllegalArgumentException("Token Google không hợp lệ");
            }
        } catch (Exception e) {
            throw new RuntimeException("Lỗi xác thực Google: " + e.getMessage());
        }
    }
}