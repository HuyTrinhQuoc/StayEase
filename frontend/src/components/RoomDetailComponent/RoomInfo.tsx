import type { RoomType } from '../../type/Room';

interface Props {
    room: RoomType;
}

const RoomInfo = ({ room }: Props) => {
    // Parse chuỗi JSON amenities từ database thành mảng
    // Dùng try-catch đề phòng dữ liệu bị lỗi format
    let amenitiesList: string[] = [];
    try {
        amenitiesList = typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities;
    } catch (e) {
        amenitiesList = ["Smart TV", "Wifi miễn phí", "Điều hòa"]; // Fallback
    }

    return (
        <div className="lg:col-span-8 space-y-16">
            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y py-8">
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-secondary">square_foot</span>
                    <span className="uppercase text-xs tracking-widest text-gray-500">Diện tích</span>
                    <span className="font-medium">45m²</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-secondary">group</span>
                    <span className="uppercase text-xs tracking-widest text-gray-500">Sức chứa</span>
                    <span className="font-medium">{room.maxOccupancy} người</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-secondary">bed</span>
                    <span className="uppercase text-xs tracking-widest text-gray-500">Giường</span>
                    <span className="font-medium">{room.bedType}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-secondary">waves</span>
                    <span className="uppercase text-xs tracking-widest text-gray-500">Tầm nhìn</span>
                    <span className="font-medium">Hướng biển</span>
                </div>
            </div>

            {/* Description */}
            <section>
                <h2 className="text-3xl font-semibold mb-6 font-serif">Tổng quan phòng</h2>
                <div className="space-y-5 text-gray-600 leading-8">
                    <p>{room.description || "Nội thất hiện đại kết hợp phong cách tối giản thanh lịch tạo nên trải nghiệm nghỉ dưỡng cao cấp và yên bình."}</p>
                </div>
            </section>

            {/* Amenities */}
            <section>
                <h2 className="text-3xl font-semibold mb-8 font-serif">Tiện nghi đẳng cấp</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Tiện ích trong phòng</h3>
                        <ul className="space-y-4">
                            {amenitiesList?.map((item: string, index: number) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-green-600">check</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoomInfo;