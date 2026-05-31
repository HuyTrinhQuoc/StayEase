import type { RoomType } from '../../type/Room';

interface Props {
    room: RoomType;
}

const RoomCard = ({ room }: Props) => {
    // Tìm ảnh đại diện từ Backend
    const primaryImage = room.images?.find(img => img.isPrimary) || room.images?.[0];
    const imageUrl = primaryImage ? primaryImage.url : 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461';

    // Format tiền tệ VNĐ
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(room.basePricePerNight);

    return (
        <div className="overflow-hidden rounded bg-white shadow transition-transform hover:-translate-y-1 hover:shadow-xl">
            <img
                src={imageUrl}
                alt={primaryImage?.altText || room.name}
                className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-8">
                <h3 className="mb-2 text-2xl font-semibold">{room.name}</h3>
                <div className="mb-6 flex gap-4 text-gray-500">
                    <span>{room.maxOccupancy} Khách</span>
                    <span>{room.bedType}</span>
                </div>
                <div className="flex items-end justify-between border-t pt-6">
                    <div>
                        <span className="text-sm text-gray-500">Từ</span>
                        <h4 className="text-2xl font-semibold text-yellow-700">
                            {formattedPrice}
                        </h4>
                    </div>
                    <button className="text-yellow-700 hover:underline">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;