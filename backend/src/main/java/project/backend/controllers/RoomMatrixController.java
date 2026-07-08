package project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.RoomMatrixResponse;
import project.backend.services.BookingService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5174") // Khớp chính xác Port React của bạn
public class RoomMatrixController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/room-matrix")
    public ResponseEntity<?> getRoomMatrix(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        try {
            // Thực hiện truy vấn động trong khoảng ngày Admin đang xem trên giao diện
            List<RoomMatrixResponse> data = bookingService.getRoomMatrixData(start, end);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}