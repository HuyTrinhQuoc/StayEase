import type {BookingRequestPayload} from '../type/booking';
import axios from "axios";

const API_URL = 'http://localhost:8080/api/bookings';

export const bookingService = {
// Cập nhật lại tham số payload cho hàm submitPayment
    submitPayment: async (payload: BookingRequestPayload) => {
        try {
            const response = await axios.post(`${API_URL}/payment`, payload);
            return response.data;
        } catch (error: any) {
            // XỬ LÝ LẠI ĐOẠN BẮT LỖI NÀY
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // Nếu Backend trả về object (thường là mặc định của Spring Boot)
                if (typeof errorData === 'object') {
                    // Lấy trường message, nếu không có thì convert nguyên cục Object thành String để đọc
                    const errorMessage = errorData.message || JSON.stringify(errorData);
                    throw new Error(errorMessage);
                }

                // Nếu Backend trả về string thuần
                throw new Error(errorData);
            }

            throw new Error('Lỗi kết nối đến máy chủ.');
        }
    },
    applyDiscount: async (code: string, originalPrice: number): Promise<number> => {
        // Mô phỏng gọi API kiểm tra mã giảm giá
        if (code.toUpperCase() === 'WELCOME2026') {
            return originalPrice * 0.1;
        }
        throw new Error('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
};