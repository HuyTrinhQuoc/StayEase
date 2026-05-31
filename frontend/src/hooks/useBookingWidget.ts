import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useBookingWidget = (roomId: string | number, basePrice: number) => {
    const navigate = useNavigate();

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Lấy thời gian hiện tại hệ thống (YYYY-MM-DDTHH:mm)
    const getCurrentDateTimeString = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const minDateTime = getCurrentDateTimeString();

    const handleBooking = () => {
        setErrorMessage('');

        // 1. Kiểm tra điền đủ thông tin chưa
        if (!checkIn || !checkOut) {
            setErrorMessage('Vui lòng chọn đầy đủ ngày và giờ nhận/trả phòng.');
            return;
        }

        const inDateTime = new Date(checkIn);
        const outDateTime = new Date(checkOut);

        // Tách riêng chuỗi Ngày (YYYY-MM-DD) để so sánh độc lập
        const inDateOnly = checkIn.split('T')[0];
        const outDateOnly = checkOut.split('T')[0];

        // 2. Kiểm tra logic ngày và giờ
        if (inDateOnly === outDateOnly) {
            // TRƯỜNG HỢP: CÙNG MỘT NGÀY -> BẮT BUỘC CHECK GIỜ
            if (inDateTime.getTime() >= outDateTime.getTime()) {
                setErrorMessage('Đặt phòng cùng ngày thì giờ trả phòng phải sau giờ nhận phòng ít nhất 1 phút!');
                return;
            }
        } else {
            // TRƯỜNG HỢP: KHÁC NGÀY -> CHECK NGÀY TRƯỚC/SAU
            if (inDateTime > outDateTime) {
                setErrorMessage('Ngày trả phòng không thể nằm trước ngày nhận phòng.');
                return;
            }
        }

        // 3. Mọi thứ mượt mà -> Chuyển sang trang thanh toán
        navigate('/payment', {
            state: {
                roomId,
                checkIn,  // Ví dụ: "2026-11-15T14:00"
                checkOut, // Ví dụ: "2026-11-15T18:00"
                price: basePrice
            }
        });
    };

    return {
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        errorMessage,
        setErrorMessage,
        minDateTime,
        handleBooking
    };
};