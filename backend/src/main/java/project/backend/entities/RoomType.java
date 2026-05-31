package project.backend.entities;



import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "room_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "max_occupancy", nullable = false)
    private Integer maxOccupancy;

    @Column(name = "bed_type", length = 50)
    private String bedType;

    @Column(name = "base_price_per_night", nullable = false, precision = 12, scale = 2)
    private BigDecimal basePricePerNight;

    // Lưu chuỗi định dạng JSON từ DB (ví dụ: ["Wifi", "Tv"])
    @Column(columnDefinition = "jsonb")
    private String amenities;

    // Lưu chuỗi định dạng JSON link ảnh (ví dụ: ["url1.jpg", "url2.jpg"])
    @Column(columnDefinition = "jsonb")
    private String images;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}