import { useParams, Link } from 'react-router-dom';
import {useRoomDetail} from "../../hooks/useRoomDetail.ts";
import RoomHeader from "../../components/RoomDetailComponent/RoomHeader.tsx";
import BookingWidget from "../../components/RoomDetailComponent/BookingWidget.tsx";
import RoomInfo from "../../components/RoomDetailComponent/RoomInfo.tsx";
import RoomGallery from "../../components/RoomDetailComponent/RoomGallery.tsx";


const RoomDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    // Gọi hook truyền ID vào
    const { room, loading, error } = useRoomDetail(id);

    if (loading) return <div className="pt-32 text-center text-xl">Đang tải thông tin phòng...</div>;
    if (error || !room) return <div className="pt-32 text-center text-xl text-red-500">{error || "Không tìm thấy phòng!"}</div>;

    return (
        <main className="bg-surface text-on-surface pt-28 pb-32 px-5 md:px-16 max-w-[1280px] mx-auto">
            <div className="flex items-center gap-2 text-sm uppercase mb-8 text-gray-500">
                <Link to="/" className="hover:text-black">Trang chủ</Link>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span>Danh sách phòng</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-secondary">{room.name}</span>
            </div>

            <RoomHeader room={room} />
            <RoomGallery images={room.images || []} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <RoomInfo room={room} />
                <BookingWidget room={room} />
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t px-4 py-3 flex justify-between items-center z-50">
                <div>
                    <p className="text-xl font-semibold">
                        {new Intl.NumberFormat('vi-VN').format(room.basePricePerNight)}đ
                    </p>
                    <p className="text-xs uppercase text-gray-500">/ đêm</p>
                </div>
                <button className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm">
                    Đặt ngay
                </button>
            </div>
        </main>
    );
};

export default RoomDetailPage;