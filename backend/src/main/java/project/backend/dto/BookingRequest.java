

package project.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
//public class BookingRequest {
//    private String customerName;
//    private String phone;
//
//    private String email;
//    private String nationality;
//    private String specialRequests;
//    private String paymentMethod;
//    private String promoCode;
//    private Integer userId;
//
//    // The list of rooms being booked
//    private List<RoomItemRegister> rooms;
//
//    @Getter @Setter
//    public static class RoomItemRegister {
//        private Integer roomTypeId;
//        private LocalDate checkIn;
//        private LocalDate checkOut;
//        private Integer quantity;
//    }
//}

public class BookingRequest {
    @NotBlank(message = "Tên khách hàng không được để trống")
    private String customerName;

    @NotBlank(message = "Số điện thoại không được để trống")
    private String phone;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    private String nationality;
    private String specialRequests;

    @NotBlank(message = "Phương thức thanh toán không được để trống")
    private String paymentMethod;

    private String promoCode;
    private Integer userId;

    @Valid // BẮT BUỘC phải có chữ này thì Spring mới validate tiếp cái List bên dưới
    @NotEmpty(message = "Danh sách phòng đặt không được trống")
    private List<RoomItemRegister> rooms;

    @Getter @Setter
    public static class RoomItemRegister {
        @NotNull(message = "Mã loại phòng không được để trống")
        private Integer roomTypeId;

        @NotNull(message = "Ngày check-in không được để trống")
        @FutureOrPresent(message = "Ngày check-in phải từ ngày hiện tại trở đi")
        private LocalDate checkIn;

        @NotNull(message = "Ngày check-out không được để trống")
        @Future(message = "Ngày check-out phải là một ngày trong tương lai")
        private LocalDate checkOut;

        @NotNull(message = "Số lượng phòng không được để trống")
        @Min(value = 1, message = "Số lượng phòng đặt tối thiểu là 1")
        private Integer quantity;
    }
}