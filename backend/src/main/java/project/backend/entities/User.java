package project.backend.entities;



import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import project.backend.eNum.UserRole;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 20)
    private String phone;

    private String passwordHash;

    @Column(name = "is_verified")
    private Boolean isVerified = false; // Mặc định là chưa xác thực

    @Column(length = 50)
    private String authProvider = "local";

    private String providerId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM) // Dành cho Postgres Enum
    private UserRole role = UserRole.guest;

    private LocalDateTime createdAt = LocalDateTime.now();
}