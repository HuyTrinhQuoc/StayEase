package project.backend.controllers;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class FileUploadController {

    // 1. Khởi tạo đối tượng Cloudinary bằng các thông số trong application.properties
    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    private Cloudinary getCloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        return new Cloudinary(config);
    }

    // 2. API Upload mới
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Đẩy file thẳng lên Cloudinary
            // Thêm tuỳ chọn resource_type = auto để Cloudinary tự nhận diện file là ảnh hay tệp tin tài liệu
            Map uploadResult = getCloudinary().uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "auto"));

            // Lấy đường link HTTPS công khai mà Cloudinary trả về
            String fileUrl = uploadResult.get("secure_url").toString();

            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Lỗi upload lên Cloud: " + e.getMessage());
        }
    }
}