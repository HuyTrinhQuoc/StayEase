package project.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import project.backend.entities.Room;
import project.backend.entities.RoomType;
import project.backend.repositories.RoomTypeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/room-types")
public class RoomTypeController {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    // API 1: Lấy tất cả các loại phòng + Kèm danh sách ảnh đã sort (Đổ ra TRANG CHỦ)
    @GetMapping
    @Transactional(readOnly = true) // Cần có để mở session load dữ liệu Lazy từ bảng ảnh
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        // Trigger load dữ liệu ảnh trước khi trả về JSON
        roomTypes.forEach(rt -> rt.getImages().size());
        return ResponseEntity.ok(roomTypes);
    }

    // API 2: Lấy chi tiết 1 loại phòng + Đầy đủ bộ ảnh (Đổ ra TRANG CHI TIẾT)
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable Integer id) {
        return roomTypeRepository.findById(Math.toIntExact(Long.valueOf(id)))
                .map(rt -> {
                    rt.getImages().size(); // Khởi tạo dữ liệu ảnh liên kết
                    return ResponseEntity.ok(rt);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}