import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VNPayReturn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // location.search chính là chuỗi parameters dài ngoằng VNPay trả về
                // Ta gọi API mang chuỗi này về Backend kiểm tra
                const response = await axios.get(`http://localhost:8080/api/payment/vnpay-verify${location.search}`);

                // KHI BACKEND TRẢ VỀ THÀNH CÔNG, RESPONSE.DATA CHÍNH LÀ ĐỐI TƯỢNG BOOKING
                const fullBookingData = response.data;

                // Bây giờ fullBookingData đã có đầy đủ bookingCode, ngày tháng, tên khách...
                // Ta truyền toàn bộ nó qua trang SuccessPage y hệt như luồng Tiền mặt!
                navigate('/success', {
                    state: {
                        bookingData: fullBookingData
                    }
                });
            } catch (error) {
                console.error("Lỗi xác thực thanh toán:", error);
                alert("Giao dịch thất bại hoặc đã bị hủy bỏ!");
                navigate('/'); // Đá về trang chủ nếu lỗi
            } finally {
                setIsVerifying(false);
            }
        };

        if (location.search) {
            verifyPayment();
        }
    }, [location, navigate]);

    if (isVerifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-xl font-semibold">
                Đang xác thực kết quả thanh toán từ hệ thống...
            </div>
        );
    }

    return null;
};

export default VNPayReturn;