package project.backend.controllers;




import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.BookingRequestDTO;
import project.backend.entities.Booking;
import project.backend.services.BookingService;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Cho phép React gọi API
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequestDTO request) {
        try {
            Booking booking = bookingService.processBooking(request);
            // Nếu dùng cổng thanh toán online như VNPay/MoMo, bạn sẽ trả về URL thanh toán ở đây
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}