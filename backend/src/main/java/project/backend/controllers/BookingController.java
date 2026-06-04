package project.backend.controllers;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.BookingRequest;
import project.backend.services.BookingService;

@RestController
@RequestMapping("/api/bookings") // Hãy đảm bảo đường dẫn này khớp 100% với biến API_URL trong React (như lúc nãy ta đã fix lỗi 404)
@CrossOrigin(origins = "*") // Bắt buộc phải có để Frontend React (chạy port 3000/5173) có thể gọi được API (port 8080) mà không bị lỗi CORS
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

    // (Sau này bạn có thể viết thêm các API khác ở đây như lấy danh sách lịch sử đặt phòng của user, hủy phòng...)
}