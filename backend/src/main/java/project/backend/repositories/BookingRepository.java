package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.backend.entities.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    // Dùng UPPER(b.status::text) để đưa trạng thái về chữ HOA, triệt tiêu hoàn toàn lỗi lệch chữ hoa/thường
    @Query(value = "SELECT EXTRACT(MONTH FROM b.check_in) as month, SUM(b.total_price) as revenue " +
            "FROM bookings b " +
            "WHERE EXTRACT(YEAR FROM b.check_in) = :year " +
            "AND UPPER(b.status::text) IN ('PAID', 'COMPLETED') " +
            "GROUP BY EXTRACT(MONTH FROM b.check_in) " +
            "ORDER BY month ASC", nativeQuery = true)
    List<Object[]> getMonthlyRevenueNative(@Param("year") int year);
}