package project.backend.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "booking_details")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BookingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    @JsonIgnore
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_type_id", nullable = false)
    private RoomType roomType;

    // Lễ tân gán khi khách check-in, có thể null trước đó
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    // Tổng giá phòng này cho toàn bộ kỳ nghỉ (đã nhân số đêm)
    @Column(name = "total_room_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalRoomPrice;

    // Tuỳ chọn: tên khách ở phòng này (khi đoàn đông muốn tách tên)
    @Column(name = "room_guest_name", length = 100)
    private String roomGuestName;
}