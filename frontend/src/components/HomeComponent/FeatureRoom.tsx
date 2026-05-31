import { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import { getRoomTypes } from '../../services/RoomServices.ts';
import type { RoomType } from '../../type/Room';

const FeaturedRooms = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            const data = await getRoomTypes();
            setRooms(data);
            setLoading(false);
        };
        fetchRooms();
    }, []);

    return (
        <section className="bg-[#f6f3f2] px-5 py-24 md:px-16">
            <div className="mx-auto max-w-[1280px]">
                <div className="mb-16 text-center">
                    <span className="uppercase tracking-[4px] text-yellow-700">Bộ Sưu Tập</span>
                    <h2 className="mt-4 text-4xl font-semibold">Phòng nghỉ nổi bật</h2>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500">Đang tải dữ liệu phòng...</div>
                ) : (
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