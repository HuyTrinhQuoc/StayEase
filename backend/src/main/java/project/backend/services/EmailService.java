package project.backend.services;



import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token) {
        // Đường dẫn này sẽ trỏ về Frontend hoặc Backend tùy bạn cấu hình.
        // Ở đây giả lập trỏ thẳng về API của Backend để test.
        String verificationUrl = "http://localhost:8080/api/auth/verify?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Xác nhận tài khoản đặt phòng khách sạn");
        message.setText("Chào bạn,\n\nVui lòng click vào đường link dưới đây để xác nhận tài khoản của bạn (Link có hiệu lực trong 15 phút):\n"
                + verificationUrl + "\n\nTrân trọng!");

        mailSender.send(message);
    }
}