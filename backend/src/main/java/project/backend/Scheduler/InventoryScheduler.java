package project.backend.Scheduler;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class InventoryScheduler {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Cron expression: "0 0 0 * * ?" nghĩa là chạy vào đúng 00:00:00 mỗi đêm.
     * Hàm này sẽ tự động kiểm tra và tạo kho phòng cho 90 ngày tiếp theo.
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void autoGenerateInventory() {
        System.out.println("--- Bắt đầu chạy ngầm sinh dữ liệu Room Inventory tự động ---");

        // Câu lệnh SQL thuần tận dụng cơ chế ON CONFLICT DO NOTHING của PostgreSQL bạn đã viết
        String sql = """
            DO $$
            DECLARE
                rt RECORD;
                d DATE;
                room_count INT;
            BEGIN
                FOR rt IN SELECT id FROM room_types LOOP
                    -- Đếm tổng số phòng hiện có của loại này
                    SELECT COUNT(*) INTO room_count FROM rooms WHERE room_type_id = rt.id;
            
                    -- Vòng lặp tạo cuốn chiếu cho 90 ngày tính từ hôm nay
                    FOR i IN 0..90 LOOP
                        d := CURRENT_DATE + i;
                        INSERT INTO room_inventory (room_type_id, date, available_count)
                        VALUES (rt.id, d, room_count)
                        ON CONFLICT (room_type_id, date) DO NOTHING;
                    END LOOP;
                END LOOP;
            END $$;
        """;

        try {
            jdbcTemplate.execute(sql);
            System.out.println("--- Sinh dữ liệu Room Inventory hoàn tất thành công! ---");
        } catch (Exception e) {
            System.err.println("Lỗi khi sinh tự động Inventory: " + e.getMessage());
        }
    }
}