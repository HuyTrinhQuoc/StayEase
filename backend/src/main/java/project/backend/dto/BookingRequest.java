

package project.backend.dto;

import lombok.*;
        import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class BookingRequest {
    private String customerName;
    private String phone;

    private String email;
    private String nationality;
    private String specialRequests;
    private String paymentMethod;
    private String promoCode;
    private Integer userId;

    // The list of rooms being booked
    private List<RoomItemRegister> rooms;

    @Getter @Setter
    public static class RoomItemRegister {
        private Integer roomTypeId;
        private LocalDate checkIn;
        private LocalDate checkOut;
        private Integer quantity;
    }
}