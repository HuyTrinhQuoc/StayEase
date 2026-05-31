package project.backend.entities;



import jakarta.persistence.*;
import lombok.Data;
import project.backend.eNum.BookingStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    private String customerName;
    private String phone;
    private String email;
    private String nationality;

    private LocalDateTime checkIn;
    private LocalDateTime checkOut;

    private String checkInTimeWindow;
    private String note;
    private String paymentMethod;

    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private LocalDateTime createdAt;
}