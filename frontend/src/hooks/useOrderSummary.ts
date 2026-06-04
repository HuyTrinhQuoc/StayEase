import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../type/cart';

export const useOrderSummary = (cartItems: CartItem[]) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');

    // 1. Tính toán hóa đơn tổng (Subtotal)
    const subtotal = cartItems.reduce((acc, item) => {
        const inDate = new Date(item.checkIn).getTime();
        const outDate = new Date(item.checkOut).getTime();
        const nights = Math.ceil((outDate - inDate) / (1000 * 3600 * 24)) || 1;

        return acc + (item.pricePerNight * nights * item.quantity);
    }, 0);

    // 2. Các khoản thuế phí phụ thu
    const serviceFee = subtotal * 0.05;
    const vat = subtotal * 0.08;
    const total = subtotal + serviceFee + vat;

    // 3. Hàm format tiền tệ tiện ích
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    // 4. Xử lý chuyển hướng sang trang thanh toán kèm dữ liệu hóa đơn
    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        navigate('/payment', {
            state: {
                isFromCart: true,
                cartItems: cartItems,
                billing: {
                    subtotal,
                    serviceFee,
                    vat,
                    total,
                    promoCodeApplied: promoCode || null
                }
            }
        });
    };

    return {
        promoCode,
        setPromoCode,
        subtotal,
        serviceFee,
        vat,
        total,
        formatCurrency,
        handleCheckout,
        isCartEmpty: cartItems.length === 0
    };
};