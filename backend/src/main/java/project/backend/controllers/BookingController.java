package project.backend.controllers;




import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.BookingHistoryResponse;
import project.backend.dto.BookingRequest;
import project.backend.entities.Booking;
import project.backend.services.BookingService;
import java.math.BigDecimal;
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
    // =========================================================================
    // SECTION: ADMIN OPERATION APIS (Bổ sung để sửa lỗi 404 cho Front-end)
    // =========================================================================

    /**
     * API Lấy toàn bộ danh sách đặt phòng phục vụ màn hình Admin
     * Method: GET
     * Endpoint: http://localhost:8080/api/bookings/admin/all
     */
    @GetMapping("/admin/all")
    public ResponseEntity<?> adminGetAllBookings() {
        try {
            // Gọi xuống service lấy toàn bộ danh sách Booking từ Database
            List<Booking> allBookings = bookingService.getAllBookingsForAdmin();
            return ResponseEntity.ok(allBookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi tải danh sách: " + e.getMessage());
        }
    }

    /**
     * API Admin tự tạo đơn đặt phòng trực tiếp tại quầy
     * Method: POST
     * Endpoint: http://localhost:8080/api/bookings/admin/create
     */
    @PostMapping("/admin/create")
    public ResponseEntity<?> adminCreateBooking(@RequestBody java.util.Map<String, Object> payload) {
        try {
            // Để xử lý nhanh cấu trúc động từ form Admin, ta có thể nhận Map hoặc tạo một AdminBookingRequest DTO riêng
            // Tạm thời chuyển dữ liệu sang service xử lý tạo đơn trực tiếp
            var createdBooking = bookingService.handleAdminCreateBooking(payload);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Không thể tạo đơn: " + e.getMessage());
        }
    }

    /**
     * API Admin cập nhật nhanh trạng thái đơn hàng (Ví dụ: PAID, CHECKED_IN)
     * Method: PUT
     * Endpoint: http://localhost:8080/api/bookings/admin/{bookingId}/status
     */
    @PutMapping("/admin/{bookingId}/status")
    public ResponseEntity<?> adminUpdateStatus(
            @PathVariable Integer bookingId,
            @RequestBody java.util.Map<String, String> statusPayload) {
        try {
            String nextStatus = statusPayload.get("status");
            var updatedBooking = bookingService.updateBookingStatus(bookingId, nextStatus);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi cập nhật trạng thái: " + e.getMessage());
        }
    }
    /**
     * API Lấy dữ liệu ma trận kho phòng theo dải ngày lựa chọn
     * Endpoint: GET http://localhost:8080/api/admin/room-matrix?start=2026-07-07&end=2026-07-13
     */
    @GetMapping("/api/admin/room-matrix")
    public ResponseEntity<?> getRoomMatrix(
            @RequestParam("start") String startStr,
            @RequestParam("end") String endStr) {
        try {
            java.time.LocalDate startDate = java.time.LocalDate.parse(startStr);
            java.time.LocalDate endDate = java.time.LocalDate.parse(endStr);

            // Gọi service xử lý gom nhóm dữ liệu
            List<project.backend.dto.RoomMatrixResponse> matrixData = bookingService.getRoomMatrixData(startDate, endDate);
            return ResponseEntity.ok(matrixData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}


