import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useBookingWidget = (
    roomTypeId: string | number,
    basePrice: number,
    roomName: string
) => {
    const navigate = useNavigate();

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [availableRooms, setAvailableRooms] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const minDate = new Date().toISOString().split('T')[0];

    // Hàm helper 1: Tính số đêm ở (Dùng chung)
    const getNightsCount = useCallback((): number => {
        if (!checkIn || !checkOut) return 0;
        const timeDiff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }, [checkIn, checkOut]);

    // Hàm helper 2: Validate dữ liệu đầu vào trước khi hành động (Dùng chung)
    const validateSelection = (): boolean => {
        setErrorMessage('');

        if (!checkIn || !checkOut) {
            setErrorMessage('Vui lòng chọn đầy đủ ngày nhận và ngày trả phòng.');
            return false;
        }
        if (getNightsCount() <= 0) {
            setErrorMessage('Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày!');
            return false;
        }
        if (availableRooms <= 0) {
            setErrorMessage('Rất tiếc, loại phòng này đã hết trống trong thời gian bạn chọn.');
            return false;
        }
        return true;
    };

    // Tự động gọi API khi người dùng thay đổi ngày
    useEffect(() => {
        const fetchAvailableRooms = async () => {
            if (!checkIn || !checkOut || new Date(checkIn).getTime() >= new Date(checkOut).getTime()) {
                setAvailableRooms(0);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/v1/availability', {
                    params: { roomTypeId, checkIn, checkOut }
                });

                const available = response.data;
                setAvailableRooms(available);

                // Dùng hàm cập nhật trạng thái an toàn để tránh dependency loop
                setQuantity(prev => prev > available ? 1 : prev);
            } catch (error) {
                console.error('Lỗi kiểm tra phòng trống:', error);
                setAvailableRooms(0);
            }
        };

        fetchAvailableRooms();
    }, [checkIn, checkOut, roomTypeId]);

    // XỬ LÝ THÊM VÀO GIỎ HÀNG
    const handleAddToCart = () => {
        if (!validateSelection()) return;

        const currentCart = JSON.parse(localStorage.getItem('hotel_cart') || '[]');
        const existingIndex = currentCart.findIndex((item: any) =>
            item.roomTypeId === roomTypeId && item.checkIn === checkIn && item.checkOut === checkOut
        );

        if (existingIndex > -1) {
            const newQty = currentCart[existingIndex].quantity + quantity;
            if (newQty > availableRooms) {
                setErrorMessage(`Không thể thêm! Tổng số phòng trong giỏ (${newQty}) vượt quá số phòng trống (${availableRooms}).`);
                return;
            }
            currentCart[existingIndex].quantity = newQty;
        } else {
            currentCart.push({
                id: Date.now(),
                roomTypeId, roomName, checkIn, checkOut, quantity, pricePerNight: basePrice
            });
        }

        localStorage.setItem('hotel_cart', JSON.stringify(currentCart));
        navigate('/cart');
    };

    // XỬ LÝ ĐẶT PHÒNG NGAY
    const handleBooking = () => {
        if (!validateSelection()) return;

        if (quantity < 1 || quantity > availableRooms) {
            setErrorMessage('Số lượng phòng không hợp lệ.');
            return;
        }

        // Đã xóa cách tính toán totalNights và totalPrice ở đây vì trang Payment sẽ tự tính

        navigate('/payment', {
            state: {
                isFromCart: false,
                checkoutItems: [{
                    roomTypeId: roomTypeId,
                    roomName: roomName,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    quantity: quantity,
                    pricePerNight: basePrice
                }]
            }
        });
    };

    // QUAN TRỌNG: TRẢ VỀ CÁC HÀM VÀ BIẾN ĐỂ COMPONENT BÊN NGOÀI SỬ DỤNG
    return {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        quantity, setQuantity,
        availableRooms,
        errorMessage, setErrorMessage,
        minDate,
        handleBooking,
        handleAddToCart
    };
};