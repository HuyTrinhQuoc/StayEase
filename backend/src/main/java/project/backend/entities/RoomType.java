package project.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(columnDefinition = "jsonb")
    private String amenities;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // [CẬP NHẬT MỚI]: Kết nối với bảng ảnh, tự động sắp xếp theo thứ tự sort_order
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("sortOrder ASC") // Luôn trả về ảnh xếp đúng thứ tự admin mong muốn
    @Builder.Default
    private List<RoomImage> images = new ArrayList<>();
}



/*


@Entity
@Table(name = "room_types")
@Data
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer maxOccupancy;

    @Column(length = 50)
    private String bedType;

    @Column(nullable = false)
    private BigDecimal basePricePerNight;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> amenities;

    // Mapping 1-N với RoomImages
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<RoomImage> images;

    private LocalDateTime createdAt = LocalDateTime.now();
}*/
