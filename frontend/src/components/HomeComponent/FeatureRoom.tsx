import RoomCard from './RoomCard';
import { useRooms } from '../../hooks/useRooms'; // Import Hook

const FeaturedRooms = () => {
    // Chỉ cần gọi hook ra để lấy data
    const { rooms, loading, error } = useRooms();

    return (
        <section className="bg-[#f6f3f2] px-5 py-24 md:px-16">
            <div className="mx-auto max-w-[1280px]">
                <div className="mb-16 text-center">
                    <span className="uppercase tracking-[4px] text-yellow-700">Bộ Sưu Tập</span>
                    <h2 className="mt-4 text-4xl font-semibold">Phòng nghỉ nổi bật</h2>
                </div>

                {/* Xử lý trạng thái loading / error rất nhàn */}
                {loading && <div className="text-center text-gray-500">Đang tải dữ liệu phòng...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedRooms;