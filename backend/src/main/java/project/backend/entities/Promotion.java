package project.backend.entities;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "promotions")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 50)
    private String code;

    // "percent" hoặc "fixed"
    @Column(nullable = false, length = 10)
    private String type;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal value;

    // NULL = không giới hạn giá trị đơn tối thiểu
    @Column(name = "min_booking_value", precision = 12, scale = 2)
    private BigDecimal minBookingValue;

    @Column(name = "valid_from", nullable = false)
    private LocalDate validFrom;

    @Column(name = "valid_to", nullable = false)
    private LocalDate validTo;

    @Column(name = "max_uses")
    private Integer maxUses;

    @Column(name = "used_count")
    @Builder.Default
    private Integer usedCount = 0;
}