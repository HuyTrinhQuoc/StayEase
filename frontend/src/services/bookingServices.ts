import type { PaymentFormData } from '../type/booking';

const API_BASE_URL = 'http://localhost:8080/api/bookings';

export const bookingService = {
    submitPayment: async (bookingData: Partial<PaymentFormData> & { roomId: string | number; totalPrice: number; checkIn: string; checkOut: string }) => {
        const response = await fetch(`${API_BASE_URL}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Không thể xử lý giao dịch đặt phòng.');
        }

        return await response.json();
    },

    applyDiscount: async (code: string, originalPrice: number): Promise<number> => {
        // Mô phỏng gọi API kiểm tra mã giảm giá
        if (code.toUpperCase() === 'WELCOME2026') {
            return originalPrice * 0.1;
        }
        throw new Error('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
};