package project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import project.backend.entities.RoomType;
import project.backend.services.CatalogService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/room-types")
@CrossOrigin(origins = "*") // [QUAN TRỌNG]: Cho phép React Frontend (cổng 5174) gọi API không bị chặn CORS
public class RoomTypeController {

    @Autowired
    private CatalogService catalogService;

    // API 1: Lấy tất cả các loại phòng + Kèm danh sách ảnh (Đổ ra TRANG CHỦ & TRANG QUẢN TRỊ ADMIN)
    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        return ResponseEntity.ok(catalogService.getAllCatalog());
    }

    // API 2: Lấy chi tiết 1 loại phòng + Đầy đủ bộ ảnh (Đổ ra TRANG CHI TIẾT & Khi Admin bấm "Sửa")
    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable Integer id) {
        return catalogService.getCatalogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ==================== CÁC API PHỤC VỤ QUẢN TRỊ ADMIN (CATALOG MANAGEMENT) ====================

    // API 3: Thêm mới một hạng phòng / loại phòng (Bấm nút Thêm mới ngoài Giao diện)
    @PostMapping("/admin/create")
    public ResponseEntity<RoomType> createRoomType(@RequestBody RoomType roomType) {
        RoomType created = catalogService.saveOrUpdateCatalog(roomType);
        return ResponseEntity.ok(created);
    }

    // API 4: Chỉnh sửa / Cập nhật hạng phòng theo ID (Bấm nút Lưu thay đổi khi Sửa)
    @PutMapping("/admin/update/{id}")
    public ResponseEntity<RoomType> updateRoomType(@PathVariable Integer id, @RequestBody RoomType details) {
        return catalogService.getCatalogById(id)
                .map(existing -> {
                    // Cập nhật các thông tin cơ bản
                    existing.setName(details.getName());
                    existing.setDescription(details.getDescription());
                    existing.setMaxOccupancy(details.getMaxOccupancy());
                    existing.setBedType(details.getBedType());
                    existing.setBasePricePerNight(details.getBasePricePerNight());

                    // Cập nhật chuỗi JSON chứa các icon tiện ích (Màn hình Tab Tiện ích/Loại phòng)
                    existing.setAmenities(details.getAmenities());

                    // Cập nhật lại mảng ảnh nếu có thay đổi từ frontend gửi lên
                    if (details.getImages() != null) {
                        existing.getImages().clear();
                        existing.getImages().addAll(details.getImages());
                    }

                    RoomType updated = catalogService.saveOrUpdateCatalog(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // API 5: Xóa hạng phòng khỏi hệ thống danh mục
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<String> deleteRoomType(@PathVariable Integer id) {
        try {
            catalogService.deleteCatalog(id);
            return ResponseEntity.ok("Xóa hạng phòng khỏi danh mục thành công!");
        } catch (Exception e) {
            // Tránh crash app nếu hạng phòng này đang có phòng vật lý hoạt động hoặc đơn đặt phòng dính líu
            return ResponseEntity.badRequest().body("Lỗi: Không thể xóa hạng phòng này do đang có dữ liệu phòng vật lý hoặc đơn đặt phòng liên kết!");
        }
    }

    @Autowired
    private project.backend.repositories.RoomTypeRepository roomTypeRepository;

    // DỨT ĐIỂM: Sử dụng Java Record thay cho Class DTO.
    // Tự động map JSON chuẩn 100%, không bao giờ lo lỗi ép kiểu!
    public record RateRequest(Integer id, Double basePricePerNight) {
    }

    // API 6: Cập nhật lẻ
    @PutMapping("/admin/rates/update/{id}")
    @Transactional // Ép Transaction ngay tại Controller để không bị lỗi từ chối cập nhật
    public ResponseEntity<?> updateRoomRates(@PathVariable Integer id, @RequestBody RateRequest payload) {
        try {
            System.out.println("--- LOG UPDATE: ID=" + id + " | Price=" + payload.basePricePerNight());

            int updatedRows = roomTypeRepository.updateRoomPriceOnly(id, payload.basePricePerNight());

            if (updatedRows > 0) {
                return ResponseEntity.ok().body(Map.of("message", "Cập nhật giá thành công!"));
            }
            return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy hạng phòng ID: " + id));
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra terminal IntelliJ
            // Trả ngược chi tiết lỗi gốc về trình duyệt để kiểm tra
            String details = e.getCause() != null ? e.getCause().getMessage() : e.getMessage();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage(), "details", details));
        }
    }

    // API 7: Cập nhật hàng loạt
    @PutMapping("/admin/rates/batch-update")
    @Transactional
    public ResponseEntity<?> batchUpdateRoomRates(@RequestBody List<RateRequest> payloadList) {
        try {
            System.out.println("--- LOG BATCH UPDATE: Đang xử lý " + payloadList.size() + " dòng ---");

            for (RateRequest payload : payloadList) {
                roomTypeRepository.updateRoomPriceOnly(payload.id(), payload.basePricePerNight());
            }

            return ResponseEntity.ok().body(Map.of("message", "Đồng bộ dữ liệu giá thành công!"));
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra terminal IntelliJ
            String details = e.getCause() != null ? e.getCause().getMessage() : e.getMessage();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage(), "details", details));
        }
    }
}