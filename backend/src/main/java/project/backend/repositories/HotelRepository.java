package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backend.entities.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    // Không cần viết gì thêm, JpaRepository đã lo hết các hàm save, findAll, delete...
}