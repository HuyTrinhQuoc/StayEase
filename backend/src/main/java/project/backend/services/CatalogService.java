package project.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.backend.entities.RoomType;
import project.backend.entities.RoomImage;
import project.backend.repositories.RoomTypeRepository;
import project.backend.repositories.RoomImageRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final RoomTypeRepository roomTypeRepository;
    private final RoomImageRepository roomImageRepository;

    // 1. Lấy toàn bộ danh mục để hiển thị lên các Tab Admin
    @Transactional(readOnly = true)
    public List<RoomType> getAllCatalog() {
        List<RoomType> list = roomTypeRepository.findAll();
        // Kích hoạt Lazy Load danh sách ảnh đi kèm của từng hạng phòng để tránh lỗi khi render JSON
        list.forEach(rt -> rt.getImages().size());
        return list;
    }

    // 2. Tìm kiếm chi tiết 1 hạng phòng phục vụ cho nút "Chỉnh sửa"
    @Transactional(readOnly = true)
    public Optional<RoomType> getCatalogById(Integer id) {
        Optional<RoomType> roomType = roomTypeRepository.findById(id);
        roomType.ifPresent(rt -> rt.getImages().size());
        return roomType;
    }

    // 3. Logic Thêm mới hoặc Cập nhật hạng phòng kèm đồng bộ danh sách ảnh
    @Transactional
    public RoomType saveOrUpdateCatalog(RoomType roomTypeData) {
        // Tạm giữ mảng ảnh gửi từ Frontend về
        List<RoomImage> incomingImages = roomTypeData.getImages();

        // Ngắt mảng ảnh ra để lưu thông tin chữ/số của RoomType trước, tránh lỗi Cascade
        roomTypeData.setImages(null);
        RoomType savedRoomType = roomTypeRepository.save(roomTypeData);

        // Nếu có danh sách ảnh đi kèm, tiến hành map quan hệ và lưu vào bảng ảnh
        if (incomingImages != null && !incomingImages.isEmpty()) {
            for (RoomImage img : incomingImages) {
                img.setRoomType(savedRoomType); // Đảm bảo khóa ngoại room_type_id trỏ đúng về cha
                roomImageRepository.save(img);
            }
        }

        // Tải lại mảng ảnh đầy đủ sau khi đồng bộ để trả dữ liệu chuẩn về Frontend
        savedRoomType.getImages().size();
        return savedRoomType;
    }

    // 4. Xóa một hạng phòng khỏi danh mục
    @Transactional
    public void deleteCatalog(Integer id) {
        roomTypeRepository.deleteById(id);
    }
}