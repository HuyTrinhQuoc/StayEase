package project.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hotels")
@Data // Tự động tạo getter, setter của Lombok
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
}