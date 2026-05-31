import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type{ BookingLocationState, PaymentFormData } from '../type/booking';
import {bookingService} from "../services/bookingServices.ts";


export const usePayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Hứng thông tin phòng & ngày giờ đã chọn từ trang chi tiết trước đó
    const bookingDetails = location.state as BookingLocationState || {
        roomId: 0,
        checkIn: '2026-11-15T14:00',
        checkOut: '2026-11-17T12:00',
        price: 5000000
    };

    // Khởi tạo các chi phí mặc định
    const vatFee = 400000;
    const serviceFee = 250000;
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState<PaymentFormData>({
        customerName: '',
        phone: '',
        email: '',
        nationality: 'Việt Nam',
        isBookingForOthers: false,
        checkInTimeWindow: '14:00 - 15:00',
        note: '',
        paymentMethod: 'Thẻ Quốc Tế',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        promoCode: '',
        agreedToTerms: false
    });

    const totalPrice = bookingDetails.price + vatFee + serviceFee - discount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm(prev => ({ ...prev, [name]: checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleMethodChange = (method: PaymentFormData['paymentMethod']) => {
        setForm(prev => ({ ...prev, paymentMethod: method }));
    };

    const handleApplyPromo = async () => {
        setPromoError('');
        try {
            const discountAmount = await bookingService.applyDiscount(form.promoCode, bookingDetails.price);
            setDiscount(discountAmount);
        } catch (err: any) {
            setPromoError(err.message);
            setDiscount(0);
        }
    };

    const handleFinalSubmit = async () => {
        if (!form.customerName || !form.phone || !form.email) {
            alert('Vui lòng điền đầy đủ thông tin khách hàng bắt buộc.');
            return;
        }
        if (!form.agreedToTerms) {
            alert('Bạn cần đồng ý với điều khoản sử dụng để hoàn tất thanh toán.');
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                ...form,
                roomId: bookingDetails.roomId,
                checkIn: bookingDetails.checkIn,
                checkOut: bookingDetails.checkOut,
                totalPrice
            };
            await bookingService.submitPayment(payload);
            alert('Đặt phòng thành công!');
            navigate('/completed');
        } catch (err: any) {
            alert(err.message || 'Giao dịch thất bại, vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        bookingDetails,
        form,
        vatFee,
        serviceFee,
        discount,
        totalPrice,
        promoError,
        isLoading,
        handleInputChange,
        handleMethodChange,
        handleApplyPromo,
        handleFinalSubmit
    };
};