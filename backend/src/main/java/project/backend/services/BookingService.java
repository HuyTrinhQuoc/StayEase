package project.backend.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.backend.dto.BookingHistoryResponse;
import project.backend.dto.BookingRequest;
import project.backend.entities.Booking;
import project.backend.entities.BookingDetail;
import project.backend.eNum.BookingStatus;
import project.backend.entities.User;
import project.backend.repositories.BookingRepository;
import project.backend.repositories.RoomTypeRepository;
import project.backend.repositories.RoomInventoryRepository; // IMPORT THÊM REPO NÀY
import project.backend.repositories.UserRepository;


import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private RoomInventoryRepository roomInventoryRepository; // NHÚNG REPO VÀO ĐÂY

    @Transactional // Bắt buộc phải có @Transactional để nếu hết phòng, toàn bộ quá trình sẽ bị Rollback
    public Booking handleCreateBooking(BookingRequest request) {
        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId()).orElse(null);
        }
        Booking booking = Booking.builder()
                .bookingCode(UUID.randomUUID().toString().substring(0, 10).toUpperCase())
                .user(user)
                .guestName(request.getCustomerName())
                .guestPhone(request.getPhone())
                .guestEmail(request.getEmail())
                .guestNationality(request.getNationality())
                .specialRequests(request.getSpecialRequests())
                .status(BookingStatus.pending)
                .checkIn(request.getRooms().get(0).getCheckIn())
                .checkOut(request.getRooms().get(0).getCheckOut())
                .build();

        BigDecimal basePriceSum = BigDecimal.ZERO;
        int totalGuestsCounter = 0;

        for (BookingRequest.RoomItemRegister roomItem : request.getRooms()) {

            var roomType = roomTypeRepository.findById(roomItem.getRoomTypeId())
                    .orElseThrow(() -> new RuntimeException("Loại phòng không tồn tại ID: " + roomItem.getRoomTypeId()));

            long nights = ChronoUnit.DAYS.between(roomItem.getCheckIn(), roomItem.getCheckOut());
            if (nights <= 0) nights = 1;

            // ==============================================================
            // LOGIC MỚI: TRỪ INVENTORY (KHO PHÒNG) Ở ĐÂY
            // ==============================================================
            int updatedRows = roomInventoryRepository.deductInventory(
                    roomItem.getRoomTypeId(),
                    roomItem.getCheckIn(),
                    roomItem.getCheckOut(),
                    roomItem.getQuantity()
            );

            // Kiểm tra xem số ngày trừ thành công có khớp với số đêm lưu trú không?
            // Nếu khách ở 3 đêm, thì phải có 3 dòng (3 ngày) trong DB được update trừ đi.
            // Nếu updatedRows < nights => Có ít nhất 1 ngày ở giữa đã bị ai đó nhanh tay đặt mất (Hết phòng).
            if (updatedRows < nights) {
                // Ném Exception sẽ kích hoạt Rollback toàn bộ Transaction
                throw new RuntimeException("Rất tiếc, phòng " + roomType.getName() + " đã hết chỗ trong khoảng thời gian bạn chọn do có người khác vừa đặt. Vui lòng tải lại trang!");
            }
            // ==============================================================

            BigDecimal roomTypePrice = roomType.getBasePricePerNight();
            BigDecimal totalRoomPrice = roomTypePrice
                    .multiply(BigDecimal.valueOf(nights))
                    .multiply(BigDecimal.valueOf(roomItem.getQuantity()));

            basePriceSum = basePriceSum.add(totalRoomPrice);
            totalGuestsCounter += (roomItem.getQuantity() * 2);

            BookingDetail detail = BookingDetail.builder()
                    .booking(booking)
                    .roomType(roomType)
                    .totalRoomPrice(totalRoomPrice)
                    .build();

            booking.getBookingDetails().add(detail);
        }

        BigDecimal vatFee = basePriceSum.multiply(new BigDecimal("0.08"));
        BigDecimal serviceFee = basePriceSum.multiply(new BigDecimal("0.05"));
        BigDecimal finalBasePrice = basePriceSum.add(vatFee).add(serviceFee);

        BigDecimal discountAmount = BigDecimal.ZERO;
        if (request.getPromoCode() != null && !request.getPromoCode().isEmpty()) {
            discountAmount = new BigDecimal("100000");
        }

        booking.setTotalGuests(totalGuestsCounter);
        booking.setBasePrice(finalBasePrice);
        booking.setDiscountAmount(discountAmount);
        booking.setTotalPrice(finalBasePrice.subtract(discountAmount));

        return bookingRepository.save(booking);
    }

    // Thêm hàm này vào trong class BookingService của bạn
    public List<BookingHistoryResponse> getBookingHistory(Integer userId) {
        if (userId == null) {
            throw new RuntimeException("User ID không hợp lệ.");
        }

        List<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return bookings.stream().map(booking -> {
            // Trích xuất danh sách tên phòng từ BookingDetail
            List<String> rooms = booking.getBookingDetails().stream()
                    .map(detail -> detail.getRoomType().getName())
                    .distinct() // Loại bỏ tên phòng trùng lặp (nếu đặt nhiều phòng cùng loại)
                    .toList();

            return BookingHistoryResponse.builder()
                    .id(booking.getId())
                    .bookingCode(booking.getBookingCode())
                    .guestName(booking.getGuestName())
                    .checkIn(booking.getCheckIn())
                    .checkOut(booking.getCheckOut())
                    .totalPrice(booking.getTotalPrice())
                    .status(booking.getStatus().name())
                    .createdAt(booking.getCreatedAt())
                    .roomNames(rooms)
                    .build();
        }).toList();
    }



}
