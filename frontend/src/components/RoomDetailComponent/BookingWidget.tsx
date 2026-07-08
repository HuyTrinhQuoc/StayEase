import type { RoomType } from '../../type/Room';
import { useBookingWidget } from '../../hooks/useBookingWidget';

interface Props {
    room: RoomType;
}

const BookingWidget = ({ room }: Props) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(room.basePricePerNight);

    const {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        quantity, setQuantity,
        availableRooms,
        errorMessage, setErrorMessage,
        minDate,
        handleBooking,
        handleAddToCart
    } = useBookingWidget(room.id, room.basePricePerNight, room.name);

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
                    {errorMessage && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                            {errorMessage}
                        </div>
                    )}

                    <div className="border p-4 rounded hover:border-black transition-colors">
                        <p className="uppercase text-xs text-gray-500 mb-2 font-medium">Nhận phòng</p>
                        <input
                            type="date"
                            min={minDate}
                            value={checkIn}
                            onChange={(e) => {
                                setCheckIn(e.target.value);
                                setErrorMessage('');
                            }}
                            className="w-full outline-none bg-transparent cursor-pointer text-sm text-gray-800"
                        />
                    </div>

                    <div className="border p-4 rounded hover:border-black transition-colors">
                        <p className="uppercase text-xs text-gray-500 mb-2 font-medium">Trả phòng</p>
                        <input
                            type="date"
                            min={checkIn || minDate}
                            value={checkOut}
                            onChange={(e) => {
                                setCheckOut(e.target.value);
                                setErrorMessage('');
                            }}
                            className="w-full outline-none bg-transparent cursor-pointer text-sm text-gray-800"
                        />
                    </div>

                    {/* Khối chọn Số lượng phòng: Chỉ hiển thị/cho phép tương tác khi đã chọn đủ ngày */}
                    <div className={`border p-4 rounded transition-colors ${checkIn && checkOut ? 'hover:border-black' : 'bg-gray-50 opacity-70'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <p className="uppercase text-xs text-gray-500 font-medium">Số lượng phòng</p>
                            {checkIn && checkOut && (
                                <span className={`text-xs font-semibold ${availableRooms > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {availableRooms > 0 ? `Còn trống: ${availableRooms}` : 'Hết phòng'}
                                </span>
                            )}
                        </div>

                        <select
                            disabled={!checkIn || !checkOut || availableRooms === 0}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full outline-none bg-transparent cursor-pointer text-sm text-gray-800 disabled:cursor-not-allowed"
                        >
                            {!checkIn || !checkOut ? (
                                <option value={1}>Chọn ngày để xem phòng trống</option>
                            ) : availableRooms === 0 ? (
                                <option value={0}>0 phòng</option>
                            ) : (
                                /* Render danh sách option từ 1 đến số phòng trống tối đa */
                                Array.from({ length: availableRooms }, (_, i) => i + 1).map(num => (
                                    <option key={num} value={num}>
                                        {num} phòng
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    {/*<button*/}
                    {/*    onClick={handleBooking}*/}
                    {/*    disabled={availableRooms === 0 && checkIn !== '' && checkOut !== ''}*/}
                    {/*    className="w-full bg-black text-white py-4 uppercase tracking-widest font-semibold hover:bg-neutral-800 duration-300 rounded-lg mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed"*/}
                    {/*>*/}
                    {/*    {availableRooms === 0 && checkIn && checkOut ? 'Đã hết phòng' : 'Đặt phòng ngay'}*/}
                    {/*</button>*/}

                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {/* THÊM VÀO GIỎ */}
                        <button
                            onClick={handleAddToCart}
                            disabled={availableRooms === 0 || !checkIn || !checkOut}
                            className="w-full bg-white text-black border border-black py-4 uppercase tracking-widest font-semibold hover:bg-neutral-100 duration-300 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Thêm vào giỏ
                        </button>

                        {/* ĐẶT NGAY */}
                        <button
                            onClick={handleBooking}
                            disabled={availableRooms === 0 || !checkIn || !checkOut}
                            className="w-full bg-black text-white py-4 uppercase tracking-widest font-semibold hover:bg-neutral-800 duration-300 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {availableRooms === 0 ? 'Đã hết phòng' : 'Đặt phòng ngay'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingWidget;