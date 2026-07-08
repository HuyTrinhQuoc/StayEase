package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backend.entities.RoomImage;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, Integer> {
    // JpaRepository cung cấp sẵn các phương thức CRUD cơ bản cho bảng ảnh
}