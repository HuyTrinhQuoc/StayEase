export interface BookingLocationState {
    roomId: string | number;
    checkIn: string;  // Định dạng từ widget: "2026-11-15T14:00"
    checkOut: string; // Định dạng từ widget: "2026-11-17T12:00"
    price: number;
}

export interface PaymentFormData {
    customerName: string;
    phone: string;
    email: string;
    nationality: string;
    isBookingForOthers: boolean;
    checkInTimeWindow: string;
    note: string;
    paymentMethod: 'Thẻ Quốc Tế' | 'Ví Điện Tử' | 'Chuyển khoản' | 'Thanh toán tại Khách sạn';
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
    promoCode: string;
    agreedToTerms: boolean;
}

// Thêm vào file type/booking.ts hoặc nơi bạn quản lý Type
export interface RoomItemRegister {
    roomTypeId: number;
    checkIn: string;
    checkOut: string;
    quantity: number;
}

export interface BookingRequestPayload {
    customerName: string;
    phone: string;
    email: string;
    nationality: string;
    specialRequests: string;
    paymentMethod: string;
    promoCode: string;
    rooms: RoomItemRegister[];
}