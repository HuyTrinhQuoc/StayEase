package project.backend.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.entities.RoomType;
import project.backend.repositories.RoomTypeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/room-types")
public class RoomTypeController {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    // API 1: Lấy tất cả các loại phòng đổ ra TRANG CHỦ
    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        return ResponseEntity.ok(roomTypes);
    }

    // API 2: Lấy chi tiết 1 loại phòng dựa vào ID đổ ra TRANG CHI TIẾT
    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable Integer id) {
        return roomTypeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}