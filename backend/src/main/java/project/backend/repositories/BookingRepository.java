package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import project.backend.entities.Booking;

import java.util.List;


public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Tìm lịch sử đặt phòng theo userId, xếp từ đơn mới nhất đến cũ nhất
    List<Booking> findByUserIdOrderByCreatedAtDesc(Integer userId);

}

