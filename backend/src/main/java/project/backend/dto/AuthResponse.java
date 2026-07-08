package project.backend.dto;




import lombok.AllArgsConstructor;
import lombok.Data;
import project.backend.eNum.UserRole;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Integer id;
    private String name;
    private String email;
    private UserRole role;
}