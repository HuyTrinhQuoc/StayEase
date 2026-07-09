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

    @NotNull(message = "Ngày check-in không được để trống")
    @FutureOrPresent(message = "Ngày check-in phải từ ngày hiện tại")
    private LocalDate checkIn;

    @NotNull(message = "Ngày check-out không được để trống")
    private LocalDate checkOut;
    private String checkInTimeWindow;
    private String note;
    private String paymentMethod;
    private String promoCode;
}
