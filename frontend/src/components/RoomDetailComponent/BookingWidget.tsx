import type { RoomType } from '../../type/Room';
import { useBookingWidget } from '../../hooks/useBookingWidget';

interface Props {
    room: RoomType;
}

const BookingWidget = ({ room }: Props) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(room.basePricePerNight);

    // Gọi Custom Hook và lấy các state/function ra sử dụng
    const {
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        errorMessage,
        setErrorMessage,
        minDateTime,
        handleBooking
    } = useBookingWidget(room.id, room.basePricePerNight);

    return (
        <div className="lg:col-span-4">
            <div className="sticky top-32 border p-8 shadow-sm bg-white rounded-xl">
                <div className="border-b pb-6 mb-6">
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-semibold">{formattedPrice}đ</span>
                    </div>
                    <p className="uppercase text-sm text-gray-500 mt-2">/ đêm</p>
                </div>

                <div className="space-y-4">
                    {/* Hiển thị lỗi nếu có */}
                    {errorMessage && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                            {errorMessage}
                        </div>
                    )}

                    {/* Ô chọn Ngày & Giờ Nhận Phòng */}
                    <div className="border p-4 rounded hover:border-black transition-colors">
                        <p className="uppercase text-xs text-gray-500 mb-2 font-medium">Nhận phòng (Ngày & Giờ)</p>
                        <input
                            type="datetime-local"
                            min={minDateTime} // Chặn chọn thời gian trong quá khứ
                            value={checkIn}
                            onChange={(e) => {
                                setCheckIn(e.target.value);
                                setErrorMessage('');
                            }}
                            className="w-full outline-none bg-transparent cursor-pointer text-sm text-gray-800"
                        />
                    </div>

                    {/* Ô chọn Ngày & Giờ Trả Phòng */}
                    <div className="border p-4 rounded hover:border-black transition-colors">
                        <p className="uppercase text-xs text-gray-500 mb-2 font-medium">Trả phòng (Ngày & Giờ)</p>
                        <input
                            type="datetime-local"
                            min={checkIn || minDateTime} // Chặn chọn thời gian trước giờ nhận phòng
                            value={checkOut}
                            onChange={(e) => {
                                setCheckOut(e.target.value);
                                setErrorMessage('');
                            }}
                            className="w-full outline-none bg-transparent cursor-pointer text-sm text-gray-800"
                        />
                    </div>

                    <button
                        onClick={handleBooking}
                        className="w-full bg-black text-white py-4 uppercase tracking-widest font-semibold hover:bg-neutral-800 duration-300 rounded-lg mt-2"
                    >
                        Đặt phòng ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingWidget;