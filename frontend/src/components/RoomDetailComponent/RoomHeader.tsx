//phần tiêu đề và giá
import type { RoomType } from '../../type/Room';

interface Props {
    room: RoomType;
}

const RoomHeader = ({ room }: Props) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(room.basePricePerNight);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
                <h1 className="text-4xl md:text-6xl font-semibold mb-3 font-serif">
                    {room.name}
                </h1>
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                        <span className="material-symbols-outlined">star</span>
                        <span className="material-symbols-outlined">star</span>
                        <span className="material-symbols-outlined">star</span>
                        <span className="material-symbols-outlined">star</span>
                        <span className="material-symbols-outlined">star_half</span>
                    </div>
                    <span className="text-gray-500">4.8/5 (120 đánh giá)</span>
                </div>
            </div>
            <div className="text-right">
                <p className="text-3xl font-semibold text-secondary">{formattedPrice}đ</p>
                <p className="text-gray-500 text-sm uppercase">/ đêm</p>
            </div>
        </div>
    );
};

export default RoomHeader;