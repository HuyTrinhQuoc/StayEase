package project.backend.services;




import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.backend.dto.BookingRequestDTO;
import project.backend.entities.Booking;
import project.backend.eNum.BookingStatus;
import project.backend.entities.Room;
import project.backend.repositories.BookingRepository;
import project.backend.repositories.RoomRepository;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public Booking processBooking(BookingRequestDTO dto) {
        // 1. Kiểm tra phòng có tồn tại không
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Phòng không tồn tại!"));

        // 2. Kiểm tra logic ngày giờ một lần nữa ở Backend (Bảo mật tầng sâu)
        if (dto.getCheckIn().isAfter(dto.getCheckOut()) || dto.getCheckIn().isEqual(dto.getCheckOut())) {
            throw new IllegalArgumentException("Thời gian nhận phòng phải trước thời gian trả phòng.");
        }

        // 3. Tính số đêm thực tế (Dựa trên chênh lệch giờ)
        long hours = Duration.between(dto.getCheckIn(), dto.getCheckOut()).toHours();
        long nights = Math.max(1, (long) Math.ceil(hours / 24.0));

        // 4. Tự tính toán tiền dựa trên giá gốc từ Database
        BigDecimal roomPricePerNight = room.getBasePricePerNight(); // Giả sử bảng Room có trường này
        BigDecimal totalRoomPrice = roomPricePerNight.multiply(BigDecimal.valueOf(nights));

        BigDecimal vat = BigDecimal.valueOf(400000); // Hoặc tính bằng % tùy bạn
        BigDecimal serviceFee = BigDecimal.valueOf(250000);
        BigDecimal discount = BigDecimal.ZERO;

        // Kiểm tra mã giảm giá gốc từ DB nếu có
        if ("WELCOME2026".equalsIgnoreCase(dto.getPromoCode())) {
            discount = BigDecimal.valueOf(200000);
        }

        BigDecimal finalTotal = totalRoomPrice.add(vat).add(serviceFee).subtract(discount);

        // 5. Khởi tạo đơn đặt phòng ở trạng thái PENDING (Giữ chỗ)
        Booking booking = new Booking();
        booking.setRoom(room);
        booking.setCustomerName(dto.getCustomerName());
        booking.setPhone(dto.getPhone());
        booking.setEmail(dto.getEmail());
        booking.setNationality(dto.getNationality());
        booking.setCheckIn(dto.getCheckIn());
        booking.setCheckOut(dto.getCheckOut());
        booking.setCheckInTimeWindow(dto.getCheckInTimeWindow());
        booking.setNote(dto.getNote());
        booking.setPaymentMethod(dto.getPaymentMethod());
        booking.setTotalPrice(finalTotal);
        booking.setStatus(BookingStatus.PENDING); // Đặt trạng thái chờ
        booking.setCreatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }
}