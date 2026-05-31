import type { RoomType } from '../../type/Room';

interface Props {
    room: RoomType;
}

const BookingWidget = ({ room }: Props) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(room.basePricePerNight);

    return (
        <div className="lg:col-span-4">
            <div className="sticky top-32 border p-8 shadow-sm bg-white">
                <div className="border-b pb-6 mb-6">
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-semibold">{formattedPrice}đ</span>
                    </div>
                    <p className="uppercase text-sm text-gray-500 mt-2">/ đêm</p>
                </div>

                <div className="space-y-4">
                    <div className="border p-4">
                        <p className="uppercase text-xs text-gray-500 mb-1">Nhận phòng</p>
                        <input type="date" className="w-full outline-none bg-transparent" />
                    </div>
                    <div className="border p-4">
                        <p className="uppercase text-xs text-gray-500 mb-1">Trả phòng</p>
                        <input type="date" className="w-full outline-none bg-transparent" />
                    </div>
                    <button className="w-full bg-black text-white py-4 uppercase tracking-widest hover:opacity-90 duration-300">
                        Đặt phòng ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingWidget;