//package project.backend.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import project.backend.dto.RevenueMonthlyDTO;
//import project.backend.repositories.BookingRepository;
//import project.backend.eNum.BookingStatus;
//
//import java.util.Arrays;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/admin/dashboard")
//@CrossOrigin(origins = "*")
//public class DashboardController {
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @GetMapping("/revenue")
//    public ResponseEntity<List<RevenueMonthlyDTO>> getMonthlyRevenue(@RequestParam int year) {
//        List<Object[]> results = bookingRepository.getMonthlyRevenueNative(year);
//
//        // Convert mảng Object từ Native Query sang DTO List
//        List<RevenueMonthlyDTO> revenueList = results.stream().map(row -> {
//            Object month = row[0];
//            Object revenue = row[1];
//            return new RevenueMonthlyDTO(month, revenue);
//        }).toList();
//
//        return ResponseEntity.ok(revenueList);
//    }
//}