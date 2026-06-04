import { useMemo } from 'react';
import type { CartItem } from '../type/cart';

export const useCartItem = (item: CartItem) => {
    // Tính số đêm
    const nights = useMemo(() => {
        const inDate = new Date(item.checkIn);
        const outDate = new Date(item.checkOut);
        const diff = outDate.getTime() - inDate.getTime();
        return Math.ceil(diff / (1000 * 3600 * 24)) || 1;
    }, [item.checkIn, item.checkOut]);

    // Tổng tiền item
    const itemTotal = useMemo(() => {
        return item.pricePerNight * nights * item.quantity;
    }, [item.pricePerNight, item.quantity, nights]);

    // Format ngày
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}/${String(
            d.getMonth() + 1
        ).padStart(2, '0')}/${d.getFullYear()}`;
    };

    // Format tiền
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const checkInFormatted = formatDate(item.checkIn);
    const checkOutFormatted = formatDate(item.checkOut);

    return {
        nights,
        itemTotal,
        formatCurrency,
        checkInFormatted,
        checkOutFormatted
    };
};