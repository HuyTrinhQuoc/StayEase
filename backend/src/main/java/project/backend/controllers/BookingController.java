package project.backend.controllers;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.BookingHistoryResponse;
import project.backend.dto.BookingRequest;
import project.backend.entities.Booking;
import project.backend.services.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    /**
     * API Xử lý Thanh toán và Đặt phòng
     * Method: POST
     * Endpoint: http://localhost:8080/api/bookings/payment
     */
    @PostMapping("/payment")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            // 1. Chuyển toàn bộ dữ liệu (thông tin khách + danh sách phòng) sang Service xử lý
            var newBooking = bookingService.handleCreateBooking(request);

            // 2. Nếu code chạy mượt mà, lưu thành công -> Trả về HTTP 200 (OK) cùng dữ liệu Booking
            return ResponseEntity.ok(newBooking);

        } catch (Exception e) {
            // 3. Bắt lỗi (Ví dụ: ID phòng không tồn tại, tính toán sai, lỗi database...)
            // Trả về HTTP 400 (Bad Request) kèm theo câu thông báo lỗi
            // Câu thông báo này sẽ được thằng catch (error) bên React Axios bắt lấy và hiển thị alert
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    /**
     * API Lấy lịch sử đặt phòng của một User cụ thể
     * Method: GET
     * Endpoint: http://localhost:8080/api/bookings/history/{userId}
     */
    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getBookingHistory(@PathVariable Integer userId) {
        try {
            List<BookingHistoryResponse> historyList = bookingService.getBookingHistory(userId);
            return ResponseEntity.ok(historyList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}


