package project.backend.dto;



import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class BookingHistoryResponse {
    private Integer id;
    private String bookingCode;
    private String guestName;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdAt;
    private List<String> roomNames;
}