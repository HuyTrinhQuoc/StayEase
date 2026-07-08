import { useEffect, useState } from 'react';
import {fetchBookingHistory} from "../../services/bookingServices.ts";

export interface BookingHistory {
    id: number;
    bookingCode: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    roomNames: string[];
}

const HistoryPage = () => {
    const [history, setHistory] = useState<BookingHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getHistory = async () => {
            // Lấy user từ localStorage (hoặc Context tùy dự án của bạn)
            const storedUserId = localStorage.getItem('userId');
            const userId = storedUserId ? parseInt(storedUserId) : null;

            if (!userId) {
                setError('Vui lòng đăng nhập tài khoản để xem lịch sử đặt phòng.');
                setIsLoading(false);
                return;
            }

            try {
                const data = await fetchBookingHistory(userId);
                setHistory(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getHistory();
    }, []);

    const currencyFormatter = (value: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    // Xử lý màu sắc Badge trạng thái phòng
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'confirmed': return 'bg-blue-100 text-blue-700';
            case 'checked_in': return 'bg-green-100 text-green-700';
            case 'checked_out': return 'bg-gray-100 text-gray-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-neutral-100 text-neutral-700';
        }
    };

    if (isLoading) return <div className="text-center py-20 text-neutral-500">Đang tải lịch sử đặt phòng...</div>;

    return (
        <main className="min-h-screen bg-[#fcf9f8] py-10 px-5 lg:px-16 text-[#1c1b1b]">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-3xl mb-8 border-b border-neutral-200 pb-4">Lịch sử đặt phòng của bạn</h1>

                {error ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
                ) : history.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-xl border border-neutral-200">
                        <p className="text-neutral-500">Bạn chưa có đơn đặt phòng nào trên hệ thống.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {history.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col md:flex-row justify-between gap-6 transition hover:border-[#775a19]">
                                {/* Cột Trái: Thông tin chung */}
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-serif font-semibold text-lg text-black">Mã đơn: {booking.bookingCode}</span>
                                        <span className={`px-3 py-1 text-xs rounded-full font-semibold uppercase tracking-wider ${getStatusBadge(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-neutral-600 space-y-1">
                                        <p><strong className="font-medium text-neutral-800">Khách lưu trú:</strong> {booking.guestName}</p>
                                        <p><strong className="font-medium text-neutral-800">Ngày tạo đơn:</strong> {new Date(booking.createdAt).toLocaleDateString('vi-VN')}</p>
                                        <p><strong className="font-medium text-neutral-800">Loại phòng:</strong> {booking.roomNames.join(', ')}</p>
                                    </div>
                                </div>

                                {/* Cột Phải: Check in/out và Tiền */}
                                <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-neutral-200">
                                    <div className="text-sm text-neutral-600 bg-[#f9f9f9] px-4 py-3 rounded-lg inline-block w-full md:w-auto">
                                        <p><span className="inline-block w-12 font-medium text-black">Nhận:</span> {booking.checkIn}</p>
                                        <p className="mt-1"><span className="inline-block w-12 font-medium text-black">Trả:</span> {booking.checkOut}</p>
                                    </div>
                                    <div className="text-xl font-bold text-[#775a19] mt-4 md:mt-0">
                                        {currencyFormatter(booking.totalPrice)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default HistoryPage;