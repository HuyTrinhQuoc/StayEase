package project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.backend.dto.BookingRequest;
import project.backend.entities.Booking;
import project.backend.entities.BookingDetail;
import project.backend.eNum.BookingStatus;
import project.backend.repositories.BookingRepository;
import project.backend.repositories.RoomTypeRepository;
import project.backend.repositories.RoomInventoryRepository; // IMPORT THÊM REPO NÀY

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private RoomInventoryRepository roomInventoryRepository; // NHÚNG REPO VÀO ĐÂY

    @Transactional // Bắt buộc phải có @Transactional để nếu hết phòng, toàn bộ quá trình sẽ bị Rollback
    public Booking handleCreateBooking(BookingRequest request) {

        Booking booking = Booking.builder()
                .bookingCode(UUID.randomUUID().toString().substring(0, 10).toUpperCase())
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
}