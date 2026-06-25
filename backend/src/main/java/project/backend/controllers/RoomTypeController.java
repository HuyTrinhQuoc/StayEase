package project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import project.backend.entities.RoomType;
import project.backend.services.CatalogService;

import java.util.List;

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
}