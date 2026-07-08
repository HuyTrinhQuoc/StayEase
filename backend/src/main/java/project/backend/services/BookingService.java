package project.backend.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.backend.dto.BookingHistoryResponse;
import project.backend.dto.BookingRequest;
import project.backend.dto.RoomMatrixResponse;
import project.backend.entities.Booking;
import project.backend.entities.BookingDetail;
import project.backend.eNum.BookingStatus;
import project.backend.entities.User;
import project.backend.repositories.BookingRepository;
import project.backend.repositories.RoomTypeRepository;
import project.backend.repositories.RoomInventoryRepository; // IMPORT THÊM REPO NÀY
import project.backend.repositories.UserRepository;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
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


    public List<Booking> getAllBookingsForAdmin() {
        return bookingRepository.findAll();
    }

    public Object handleAdminCreateBooking(Map<String, Object> payload) {
        try {
            // 1. Ép kiểu và lấy các thông tin cơ bản từ payload Front-end gửi lên
            String guestName = (String) payload.get("guest_name");
            String guestEmail = (String) payload.get("guest_email");
            String guestPhone = (String) payload.get("guest_phone");

            java.time.LocalDate checkIn = java.time.LocalDate.parse((String) payload.get("check_in"));
            java.time.LocalDate checkOut = java.time.LocalDate.parse((String) payload.get("check_out"));

            // Tính toán tổng tiền (Đổi từ Object/Double sang BigDecimal)
            Number totalAmt = (Number) payload.get("total_price");
            BigDecimal totalPrice = BigDecimal.valueOf(totalAmt != null ? totalAmt.doubleValue() : 0.0);

            // 2. Build thực thể Entity để lưu xuống database Supabase
            Booking adminBooking = Booking.builder()
                    .bookingCode(java.util.UUID.randomUUID().toString().substring(0, 10).toUpperCase())
                    .guestName(guestName)
                    .guestEmail(guestEmail)
                    .guestPhone(guestPhone)
                    .guestNationality("Việt Nam")
                    .checkIn(checkIn)
                    .checkOut(checkOut)
                    .totalPrice(totalPrice)
                    .basePrice(totalPrice)
                    .discountAmount(BigDecimal.ZERO)
                    .totalGuests(2) // Mặc định hoặc lấy từ form nếu có
                    .status(project.backend.eNum.BookingStatus.paid) // Đặt tại quầy thông thường chọn trạng thái đã thanh toán luôn
                    .build();

            return bookingRepository.save(adminBooking);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi xử lý dữ liệu form Admin: " + e.getMessage());
        }
    }

    public Object updateBookingStatus(Integer bookingId, String nextStatus) {
        return null;
    }

    public List<project.backend.dto.RoomMatrixResponse> getRoomMatrixData(java.time.LocalDate start, java.time.LocalDate end) {
        // 1. Lấy toàn bộ danh sách bản ghi trong khoảng ngày lọc từ Repository của bạn
        // Giả định repo của bạn có hàm findByDateBetween
        var inventories = roomInventoryRepository.findByIdDateBetween(start, end);

        // 2. Nhóm dữ liệu theo Room Type ID bằng Stream API toán học của Java
        Map<project.backend.entities.RoomType, Map<String, Integer>> grouped = inventories.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        inv -> inv.getRoomType(), // Nhóm theo thực thể RoomType để lấy tên hạng phòng
                        java.util.stream.Collectors.toMap(
                                inv -> inv.getDate().toString(), // Key của map con là ngày định dạng chuỗi
                                inv -> inv.getAvailableCount(),  // Value là số lượng phòng trống
                                (existing, replacement) -> replacement // Nếu trùng lặp thì đè dữ liệu mới
                        )
                ));

        // 3. Chuyển đổi cấu trúc Map vừa gom nhóm thành list DTO trả về cho React
        return grouped.entrySet().stream().map(entry -> {
            return project.backend.dto.RoomMatrixResponse.builder()
                    .roomTypeId(entry.getKey().getId())
                    .roomTypeName(entry.getKey().getName()) // Lấy tên thật (Ví dụ: Suite Room, VIP Room...)
                    .inventoryMap(entry.getValue())
                    .build();
        }).toList();
    }
}
