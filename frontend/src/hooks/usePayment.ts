import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PaymentFormData } from '../type/booking';
import { bookingService } from "../services/bookingServices.ts";

export interface CheckoutItem {
    roomTypeId: number;
    roomName: string;
    checkIn: string;
    checkOut: string;
    quantity: number;
    pricePerNight: number;
}

export const usePayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Receive the list of rooms (always an array)
    const checkoutItems: CheckoutItem[] = useMemo(() => {
        return location.state?.checkoutItems || [];
    }, [location.state]);

    // 2. Automatically calculate Base Price (sum of all rooms)
    const basePrice = useMemo(() => {
        return checkoutItems.reduce((acc, item) => {
            const dateIn = new Date(item.checkIn);
            const dateOut = new Date(item.checkOut);
            // Calculate nights, ensuring at least 1 night
            const nights = Math.max(1, Math.ceil((dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24)));
            return acc + (item.pricePerNight * nights * item.quantity);
        }, 0);
    }, [checkoutItems]);

    // Calculate dynamic fees based on the total base price [cite: 65, 69]
    const vatFee = useMemo(() => basePrice * 0.08, [basePrice]);
    const serviceFee = useMemo(() => basePrice * 0.05, [basePrice]);

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

    const totalPrice = basePrice + vatFee + serviceFee - discount;

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
            const discountAmount = await bookingService.applyDiscount(form.promoCode, basePrice);
            setDiscount(discountAmount);
        } catch (err: any) {
            setPromoError(err.message);
            setDiscount(0);
        }
    };

    // const handleFinalSubmit = async () => {
    //     if (!form.customerName || !form.phone || !form.email) {
    //         alert('Vui lòng điền đầy đủ thông tin khách hàng bắt buộc.');
    //         return;
    //     }
    //     if (!form.agreedToTerms) {
    //         alert('Bạn cần đồng ý với điều khoản sử dụng để hoàn tất thanh toán.');
    //         return;
    //     }
    //
    //     setIsLoading(true);
    //     try {
    //         const storedUser = localStorage.getItem('userId');
    //         const currentUserId = storedUser ? Number(storedUser) : null; // Chuyển thẳng từ String sang Number
    //         // Prepare payload containing the LIST OF ROOMS for the Backend
    //         const payload = {
    //             customerName: form.customerName,
    //             phone: form.phone,
    //             email: form.email,
    //             nationality: form.nationality,
    //             specialRequests: `Giờ dự kiến: ${form.checkInTimeWindow}. Ghi chú: ${form.note}`,
    //             paymentMethod: form.paymentMethod,
    //             promoCode: form.promoCode,
    //             userId: currentUserId,
    //             // Map the items to the structure expected by the backend DTO
    //             rooms: checkoutItems.map(item => ({
    //                 roomTypeId: item.roomTypeId,
    //                 checkIn: item.checkIn.split('T')[0], // Extract YYYY-MM-DD
    //                 checkOut: item.checkOut.split('T')[0],
    //                 quantity: item.quantity
    //             }))
    //         };
    //
    //
    //
    //         // If checking out from the cart, clear the local cart data
    //         if (location.state?.isFromCart) {
    //             localStorage.removeItem('hotel_cart');
    //         }
    //         const responseData = await bookingService.submitPayment(payload);
    //         if (form.paymentMethod === 'Ví Điện Tử' || form.paymentMethod === 'Thẻ Quốc Tế') {
    //             // Gọi API thứ 2 để lấy link VNPay
    //             const vnpayUrl = await bookingService.getVNPayUrl(responseData.id, totalPrice);
    //
    //             // Chuyển hướng trình duyệt sang VNPay
    //             window.location.href = vnpayUrl;
    //             return;
    //         }
    //
    //
    //         alert('Đặt phòng thành công!');
    //         navigate('/success', { state: { bookingData: responseData } });
    //     } catch (err: any) {
    //         alert(err.message || 'Giao dịch thất bại, vui lòng thử lại.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };


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
                     const storedUser = localStorage.getItem('userId');
                     const currentUserId = storedUser ? Number(storedUser) : null;

            // Tạo payload
            const payload = {
                customerName: form.customerName,
                phone: form.phone,
                email: form.email,
                nationality: form.nationality,
                specialRequests: `Giờ dự kiến: ${form.checkInTimeWindow}. Ghi chú: ${form.note}`,
                paymentMethod: form.paymentMethod,
                promoCode: form.promoCode,
                userId: currentUserId,
                rooms: checkoutItems.map(item => ({
                    roomTypeId: item.roomTypeId,
                    checkIn: item.checkIn.split('T')[0],
                    checkOut: item.checkOut.split('T')[0],
                    quantity: item.quantity
                }))
            };

            // 1. GỌI API LƯU BOOKING (Chỉ gọi 1 lần duy nhất)
            const responseData = await bookingService.submitPayment(payload);

            // Xóa giỏ hàng nếu cần
            if (location.state?.isFromCart) {
                localStorage.removeItem('hotel_cart');
            }

            // 2. LẤY ID CỦA ĐƠN HÀNG VỪA TẠO
            console.log("Dữ liệu Booking Backend trả về:", responseData);
            // Đề phòng Backend trả về trường tên là 'bookingId' thay vì 'id'
            const finalBookingId = responseData.id || responseData.bookingId;

            if (!finalBookingId) {
                throw new Error("Không lấy được mã đơn hàng từ hệ thống. Vui lòng kiểm tra lại Backend!");
            }

            // 3. NẾU LÀ VNPAY THÌ ĐÁ SANG TRANG THANH TOÁN
            if (form.paymentMethod === 'Ví Điện Tử' || form.paymentMethod === 'Thẻ Quốc Tế') {
                const vnpayUrl = await bookingService.getVNPayUrl(finalBookingId, totalPrice);

                if (vnpayUrl) {
                    window.location.href = vnpayUrl;
                } else {
                    alert("Lỗi: Không nhận được đường dẫn thanh toán từ VNPay!");
                }
                return; // Dừng lại ở đây để nó tự chuyển trang
            }

            // 4. NẾU THANH TOÁN TẠI QUẦY THÌ QUA TRANG SUCCESS LUN
            alert('Đặt phòng thành công!');
            navigate('/success', { state: { bookingData: responseData } });

        } catch (err: any) {
            console.error("Lỗi khi submit:", err);
            alert(err.message || 'Giao dịch thất bại, vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        checkoutItems,
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