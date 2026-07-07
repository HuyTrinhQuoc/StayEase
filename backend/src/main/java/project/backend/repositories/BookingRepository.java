package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.backend.entities.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Tìm lịch sử đặt phòng theo userId, xếp từ đơn mới nhất đến cũ nhất
    List<Booking> findByUserIdOrderByCreatedAtDesc(Integer userId);
}
