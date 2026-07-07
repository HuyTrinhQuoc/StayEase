import { useEffect, useState } from "react";
import axios from "axios";

const RoomMatrixPage = () => {
    // State quản lý danh sách ngày hiển thị ở Header ma trận
    const [matrixDates, setMatrixDates] = useState<string[]>([
        "Nov 14", "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19"
    ]);

    // State quản lý danh sách các phòng và các block trạng thái/đặt phòng bên trong
    const [roomTimeline, setRoomTimeline] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchMatrixData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/api/admin/room-matrix");

                // Cập nhật danh sách ngày nếu API trả về danh sách động theo thời gian thực
                if (response.data.dates && Array.isArray(response.data.dates)) {
                    setMatrixDates(response.data.dates);
                }

                // Cập nhật cấu trúc timeline của từng phòng
                if (response.data.rooms && Array.isArray(response.data.rooms)) {
                    setRoomTimeline(response.data.rooms);
                }
            } catch (error) {
                console.error("Lỗi kết nối API ma trận phòng:", error);
                // Giữ lại cấu trúc rỗng nếu API lỗi để không làm hỏng giao diện
            } finally {
                setLoading(false);
            }
        };

        fetchMatrixData();
    }, []);

    // Hàm tiện ích hỗ trợ phân loại màu sắc CSS theo loại Block Trạng thái/Đặt phòng từ Database
    const getBlockStyle = (type: string) => {
        switch (type) {
            case "occupied":
            case "OCCUPIED":
                return "bg-red-100 border-red-500 text-red-800";
            case "cleaning":
            case "dirty":
            case "DIRTY":
                return "bg-yellow-100 border-yellow-400 text-yellow-800";
            case "maintenance":
            case "MAINTENANCE":
                return "bg-gray-100 border-gray-400 text-gray-700";
            case "available":
            case "AVAILABLE":
            default:
                return "bg-green-50 border-green-500 border-dashed text-green-700";
        }
    };

    return (
        <main className="p-8 min-h-screen bg-surface-container-low flex flex-col pt-24">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                        QUẢN LÝ PHÒNG
                    </p>
                    <h1 className="font-headline-md text-headline-md text-primary">
                        Ma trận Đặt phòng
                    </h1>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 bg-surface p-4 rounded-lg border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Available
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Occupied
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Dirty
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Maintenance
                        </span>
                    </div>
                </div>
            </div>

            {/* Matrix Container */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
                {/* Header */}
                <div className="grid grid-cols-[120px_1fr] border-b border-outline-variant bg-surface-container-lowest">
                    <div className="p-4 border-r border-outline-variant flex items-center justify-center">
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                            PHÒNG
                        </span>
                    </div>

                    <div className="grid grid-cols-6">
                        {matrixDates.map((date) => (
                            <div
                                key={date}
                                className="p-4 border-r last:border-r-0 border-outline-variant text-center font-button text-button text-primary"
                            >
                                {date}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 grid grid-cols-[120px_1fr] pointer-events-none">
                        <div className="border-r border-outline-variant"></div>
                        <div className="grid grid-cols-6 h-full">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="border-r border-outline-variant border-dashed opacity-50"
                                ></div>
                            ))}
                            <div></div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        {loading ? (
                            <div className="text-center py-12 text-sm text-gray-400">Đang tải cấu hình dữ liệu ma trận...</div>
                        ) : roomTimeline.length > 0 ? (
                            roomTimeline.map((room, rowIndex) => (
                                <div
                                    key={room.roomNumber}
                                    className={`grid grid-cols-[120px_1fr] border-b border-outline-variant h-16 hover:bg-surface-container-low transition-colors ${rowIndex === roomTimeline.length - 1 ? 'border-b-0' : ''}`}
                                >
                                    <div className="p-4 flex items-center justify-center font-button text-button text-primary bg-surface border-r border-outline-variant">
                                        {room.roomNumber}
                                    </div>

                                    <div className="relative w-full h-full p-2">
                                        {room.blocks && room.blocks.map((block: any, blockIndex: number) => (
                                            <div
                                                key={blockIndex}
                                                className={`absolute top-2 bottom-2 border rounded flex items-center px-3 cursor-pointer ${getBlockStyle(block.type)}`}
                                                style={{
                                                    left: block.leftPosition, // Ví dụ: "33.33%" hoặc "0px"
                                                    width: block.widthSize      // Ví dụ: "16.66%" hoặc "50%"
                                                }}
                                            >
                                                <span className={`font-label-caps text-label-caps ${block.type === 'available' ? 'opacity-50' : ''}`}>
                                                    {block.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-sm text-gray-400">Chưa có dữ liệu phòng được thiết lập.</div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-surface-container-lowest p-3 border-t border-outline-variant text-center">
                    <p className="font-label-caps text-label-caps text-on-surface-variant flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">
                            drag_indicator
                        </span>
                        Kéo và thả các khối đặt phòng để thay đổi ngày hoặc đổi phòng
                    </p>
                </div>
            </div>
        </main>
    );
};

export default RoomMatrixPage;