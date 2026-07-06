package project.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequestDTO {
    @NotNull(message = "Room ID không được để trống")
    private Long roomId;

    @NotBlank(message = "Tên khách hàng không được để trống")
    private String customerName;

    @NotBlank(message = "Số điện thoại không được để trống")
    private String phone;

    @Email(message = "Email không đúng định dạng")
    private String email;

    private String nationality;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String checkInTimeWindow;
    private String note;
    private String paymentMethod;
    private String promoCode;
}
