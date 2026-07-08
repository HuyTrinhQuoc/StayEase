package project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.config.VNPayConfig;
import project.backend.entities.Booking;
import project.backend.eNum.BookingStatus; // Thay bằng đường dẫn Enum của bạn
import project.backend.entities.Payment;
import project.backend.repositories.BookingRepository;
import jakarta.servlet.http.HttpServletRequest;
import project.backend.repositories.PaymentRepository;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private VNPayConfig vnPayConfig;


    @Autowired
    private BookingRepository bookingRepository; // Inject Repository để thao tác DB

    // =================================================================
    // API 1: TẠO URL THANH TOÁN (Gọi từ Frontend)
    // =================================================================
    @GetMapping("/create-vnpay-url")
    public ResponseEntity<?> createPaymentUrl(
            @RequestParam Integer bookingId,
            @RequestParam BigDecimal amount,
            HttpServletRequest request) {

        // 1. Tìm Booking theo ID trong Database
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy đơn đặt phòng!");
        }

        // 2. Build chuỗi URL gửi cho VNPay
        long amountInVND = amount.longValue() * 100; // VNPay yêu cầu nhân 100

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", vnPayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amountInVND));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", String.valueOf(bookingId)); // Lưu ID đơn hàng vào mã giao dịch
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don dat phong: " + bookingId);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnPayConfig.getIpAddress(request));

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        vnp_Params.put("vnp_CreateDate", formatter.format(cld.getTime()));

        cld.add(Calendar.MINUTE, 15); // Link hết hạn sau 15 phút
        vnp_Params.put("vnp_ExpireDate", formatter.format(cld.getTime()));

        // Sort và tạo Hash (Chữ ký bảo mật)
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        try {
            Iterator<String> itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = vnp_Params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    hashData.append(fieldName).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString())).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi mã hóa URL");
        }

        String vnp_SecureHash = vnPayConfig.hmacSHA512(vnPayConfig.secretKey, hashData.toString());
        String paymentUrl = vnPayConfig.vnp_PayUrl + "?" + query.toString() + "&vnp_SecureHash=" + vnp_SecureHash;

        // 3. Trả về cho React dạng JSON: { "url": "..." }
        Map<String, String> response = new HashMap<>();
        response.put("url", paymentUrl);
        return ResponseEntity.ok(response);
    }


    // =================================================================
    // API 2: IPN LISTENER (VNPay tự động gọi ngầm API này sau khi thanh toán)
    // =================================================================
    @GetMapping("/vnpay/ipn")
    public ResponseEntity<?> handleVNPayIPN(HttpServletRequest request) {
        try {
            // Lấy toàn bộ tham số do VNPay gửi sang
            Map<String, String> fields = new HashMap<>();
            for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements(); ) {
                String fieldName = URLEncoder.encode(params.nextElement(), StandardCharsets.US_ASCII.toString());
                String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    fields.put(fieldName, fieldValue);
                }
            }

            // Tách mã bảo mật vnp_SecureHash ra khỏi map
            String vnp_SecureHash = request.getParameter("vnp_SecureHash");
            fields.remove("vnp_SecureHashType");
            fields.remove("vnp_SecureHash");

            // Build chuỗi hash để so sánh
            List<String> fieldNames = new ArrayList<>(fields.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            Iterator<String> itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = fields.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    hashData.append(fieldName).append('=').append(fieldValue);
                    if (itr.hasNext()) {
                        hashData.append('&');
                    }
                }
            }

            // 1. Xác thực chữ ký xem có đúng là VNPay gọi không
            String signValue = vnPayConfig.hmacSHA512(vnPayConfig.secretKey, hashData.toString());

            if (signValue.equals(vnp_SecureHash)) { // Nếu chữ ký hợp lệ

                String vnp_TxnRef = request.getParameter("vnp_TxnRef");
                String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");

                Integer bookingId = Integer.parseInt(vnp_TxnRef);
                Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

                if (bookingOpt.isPresent()) {
                    Booking booking = bookingOpt.get();

                    // Kiểm tra xem đơn này đã được xử lý trước đó chưa (Chỉ xử lý khi chưa thanh toán xong)
                    // (Bạn sửa BookingStatus.pending thành trạng thái Enum tương ứng của bạn)
                    if (booking.getStatus() == BookingStatus.pending /* Hoặc trạng thái tương đương chưa thanh toán */) {

                        // 2. Lấy vnp_ResponseCode ("00" là thành công)
                        if ("00".equals(vnp_ResponseCode)) {

                            // 1. Cập nhật trạng thái Booking
                            // (Đảm bảo BookingStatus.success khớp với Enum của bạn, có thể là BookingStatus.confirmed)
                            booking.setStatus(BookingStatus.confirmed);
                            bookingRepository.save(booking);

                            // ==========================================
                            // 2. LƯU LỊCH SỬ VÀO BẢNG PAYMENT THEO ENTITY CỦA BẠN
                            // ==========================================
                            Payment payment = new Payment();
                            payment.setBooking(booking);

                            // Xử lý số tiền (VNPay gửi về số tiền x100, nên phải chia 100)
                            String vnpAmount = request.getParameter("vnp_Amount");
                            BigDecimal actualAmount = new BigDecimal(vnpAmount).divide(new BigDecimal(100));
                            payment.setAmount(actualAmount);

                            // Set các trường theo đúng Entity Payment của bạn
                            payment.setMethod("e_wallet"); // Hoặc "transfer" (khớp với constraint "card" | "cash" | "transfer" | "e_wallet")
                            payment.setTransactionId(request.getParameter("vnp_TransactionNo"));
                            payment.setPaidAt(LocalDateTime.now());
                            payment.setStatus("paid"); // Khớp với constraint status của bạn

                            paymentRepository.save(payment); // Lưu xuống DB!
                            // ==========================================

                            return ResponseEntity.ok(Map.of("RspCode", "00", "Message", "Confirm Success"));

                        } else {
                            // Nếu giao dịch thất bại / bị hủy
                            booking.setStatus(BookingStatus.cancelled);
                        }

                        // Lưu xuống Database
                        bookingRepository.save(booking);

                        // Trả về kết quả JSON theo đúng chuẩn tài liệu của VNPay để họ không gọi lại nữa
                        return ResponseEntity.ok(Map.of("RspCode", "00", "Message", "Confirm Success"));
                    } else {
                        // Đơn hàng đã được xác nhận (Đã xử lý rồi)
                        return ResponseEntity.ok(Map.of("RspCode", "02", "Message", "Order already confirmed"));
                    }
                } else {
                    // Không tìm thấy đơn hàng trong Database
                    return ResponseEntity.ok(Map.of("RspCode", "01", "Message", "Order not found"));
                }
            } else {
                // Sai chữ ký (Có thể bị can thiệp)
                return ResponseEntity.ok(Map.of("RspCode", "97", "Message", "Invalid Checksum"));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("RspCode", "99", "Message", "Unknown error"));
        }
    }


    // =================================================================
    // API 3: FRONTEND GỌI ĐỂ XÁC THỰC VÀ LẤY DỮ LIỆU ĐƠN HÀNG
    // =================================================================
    @GetMapping("/vnpay-verify")
    public ResponseEntity<?> verifyPayment(HttpServletRequest request) {
        try {
            Map<String, String> fields = new HashMap<>();
            for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements(); ) {
                String fieldName = URLEncoder.encode(params.nextElement(), StandardCharsets.US_ASCII.toString());
                String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    fields.put(fieldName, fieldValue);
                }
            }

            String vnp_SecureHash = request.getParameter("vnp_SecureHash");
            fields.remove("vnp_SecureHashType");
            fields.remove("vnp_SecureHash");

            // Build chuỗi hash
            List<String> fieldNames = new ArrayList<>(fields.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            Iterator<String> itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = fields.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    hashData.append(fieldName).append('=').append(fieldValue);
                    if (itr.hasNext()) {
                        hashData.append('&');
                    }
                }
            }

            // Kiểm tra chữ ký
            String signValue = vnPayConfig.hmacSHA512(vnPayConfig.secretKey, hashData.toString());
            if (signValue.equals(vnp_SecureHash)) {
                String vnp_TxnRef = request.getParameter("vnp_TxnRef");
                String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");

                Integer bookingId = Integer.parseInt(vnp_TxnRef);
                Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);

                if (bookingOpt.isPresent()) {
                    Booking booking = bookingOpt.get();

                    if ("00".equals(vnp_ResponseCode)) {
                        // CHỈ LƯU PAYMENT KHI ĐƠN HÀNG CHƯA ĐƯỢC CẬP NHẬT (Tránh F5 trang bị lưu trùng)
                        if (booking.getStatus() == BookingStatus.pending) {
                            // 1. Cập nhật Booking
                            booking.setStatus(BookingStatus.confirmed);
                            bookingRepository.save(booking);

                            // 2. Lưu lịch sử Payment
                            Payment payment = new Payment();
                            payment.setBooking(booking);
                            String vnpAmount = request.getParameter("vnp_Amount");
                            payment.setAmount(new BigDecimal(vnpAmount).divide(new BigDecimal(100)));
                            payment.setMethod("e_wallet");
                            payment.setTransactionId(request.getParameter("vnp_TransactionNo"));
                            payment.setPaidAt(LocalDateTime.now());
                            payment.setStatus("paid");
                            paymentRepository.save(payment);
                        }

                        // 3. TRẢ VỀ TOÀN BỘ THÔNG TIN BOOKING (CHỨA BOOKING_CODE) CHO REACTJS
                        return ResponseEntity.ok(booking);
                    } else {
                        booking.setStatus(BookingStatus.cancelled);
                        bookingRepository.save(booking);
                        return ResponseEntity.badRequest().body("Giao dịch thanh toán thất bại!");
                    }
                }
            }
            return ResponseEntity.badRequest().body("Chữ ký VNPay không hợp lệ!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi hệ thống");
        }
    }
}