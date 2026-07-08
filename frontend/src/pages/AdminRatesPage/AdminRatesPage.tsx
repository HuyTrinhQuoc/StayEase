import { useEffect, useState } from "react";
import axios from "axios";

const AdminRatesPage = () => {
    const [roomTypes, setRoomTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    // 1. Gọi đúng Endpoint gốc /api/v1/room-types để lấy dữ liệu thực tế
    const fetchRoomRatesData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/v1/room-types");
            if (response.data && Array.isArray(response.data)) {
                setRoomTypes(response.data);
            }
        } catch (error) {
            console.error("Lỗi lấy danh sách phòng và giá:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoomRatesData();
    }, []);

    // 2. Xử lý thay đổi dữ liệu trên State
    const handleInputChange = (id: number | string, field: string, value: any) => {
        setRoomTypes(prev =>
            prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    // 3. Xử lý bật/tắt Đóng / Mở phòng nhanh
    const handleStatusToggle = (id: number | string, currentStatus: boolean) => {
        setRoomTypes(prev =>
            prev.map(item => (item.id === id ? { ...item, isAvailable: !currentStatus } : item))
        );
    };

    // 4. Cập nhật ĐỒNG LOẠT
    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            // DỨT ĐIỂM: Chỉ bóc đúng id và basePricePerNight để gửi đi, payload cực nhẹ!
            const cleanData = roomTypes.map(row => ({
                id: row.id,
                basePricePerNight: row.basePricePerNight
            }));

            await axios.put("http://localhost:8080/api/v1/room-types/admin/rates/batch-update", cleanData);

            alert("Lưu mọi thay đổi giá lên Supabase thành công!");
            fetchRoomRatesData();
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            alert("Gặp lỗi khi lưu thay đổi hàng loạt.");
        } finally {
            setIsSaving(false);
        }
    };

    // 5. Cập nhật RIÊNG LẺ
    const handleSaveSingleRow = async (id: number | string) => {
        const targetRow = roomTypes.find(item => item.id === id);
        if (!targetRow) return;

        try {
            const payload = {
                id: targetRow.id,
                basePricePerNight: targetRow.basePricePerNight
            };

            await axios.put(`http://localhost:8080/api/v1/room-types/admin/rates/update/${id}`, payload);
            alert(`Cập nhật thành công cho hạng phòng ${targetRow.name}!`);
        } catch (error) {
            console.error("Lỗi cập nhật hạng phòng lẻ:", error);
            alert("Gặp lỗi khi lưu hạng phòng này.");
        }
    };

    return (
        <main className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-surface-container-low p-8 pb-32">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-outline-variant pb-6 mb-10">
                <div>
                    <h2 className="text-3xl font-semibold text-primary">Quản lý Phòng & Giá</h2>
                    <p className="text-on-surface-variant mt-2">
                        Thiết lập hạng phòng, giá bán trực tiếp kết nối cơ sở dữ liệu Supabase.
                    </p>
                </div>

                <button
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="bg-primary text-white px-6 py-3 rounded hover:opacity-90 transition disabled:opacity-50"
                >
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500 text-sm">Đang tải cấu hình phòng và giá...</div>
            ) : (
                <>
                    {/* Hạng phòng */}
                    <section className="mb-14">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-primary">Hạng phòng</h3>
                        </div>

                        <div className="space-y-6">
                            {roomTypes.map((room) => (
                                <div key={room.id} className="bg-white border border-outline-variant rounded-xl overflow-hidden flex shadow-sm">
                                    <img
                                        src={
                                            room.images && room.images.length > 0
                                                ? (room.images.find((img: any) => img.isPrimary || img.sortOrder === 0)?.url || room.images[0].url)
                                                : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                                        }
                                        alt={room.name}
                                        className="w-52 h-36 object-cover rounded-l-xl"
                                    />
                                    <div className="flex-1 p-6 flex justify-between items-center">
                                        <div>
                                            <h4 className="text-xl font-semibold text-primary mb-2">
                                                {room.name} {/* Khớp đúng thuộc tính name */}
                                            </h4>
                                            <div className="flex gap-5 text-sm text-on-surface-variant">
                                                <span>Sức chứa tối đa: {room.maxOccupancy || 2} Khách</span>
                                                <span>Loại giường: {room.bedType || "Chưa thiết lập"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Bảng cấu hình giá */}
                    <section className="mb-14">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-primary mb-2">Giá động & Phụ thu</h3>
                        </div>

                        <div className="bg-white rounded-xl border border-outline-variant overflow-x-auto shadow-sm">
                            <table className="w-full min-w-[900px] text-left border-collapse">
                                <thead className="bg-surface-container-low">
                                <tr className="text-left border-b border-outline-variant">
                                    <th className="p-4">Hạng phòng</th>
                                    <th className="p-4">Giá cơ bản theo đêm (VND)</th>
                                    <th className="p-4">Phụ thu cuối tuần</th>
                                    <th className="p-4 text-right">Hành động</th>
                                </tr>
                                </thead>

                                <tbody>
                                {roomTypes.map((room) => (
                                    <tr key={room.id} className="border-b border-outline-variant hover:bg-gray-50/50">
                                        <td className="p-4 font-medium">{room.name}</td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                value={room.basePricePerNight || 0} // Đổi thành basePricePerNight cho khớp Entity của bạn
                                                onChange={(e) => handleInputChange(room.id, "basePricePerNight", Number(e.target.value))}
                                                className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-secondary w-44"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span>+</span>
                                                <input
                                                    type="number"
                                                    value={room.weekendSurcharge || 0}
                                                    onChange={(e) => handleInputChange(room.id, "weekendSurcharge", Number(e.target.value))}
                                                    className="w-16 border border-gray-300 rounded px-2 py-1 outline-none text-center focus:border-secondary"
                                                />
                                                <span>%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleSaveSingleRow(room.id)} className="text-on-surface-variant hover:text-secondary transition">
                                                <span className="material-symbols-outlined">save</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Quản lý đóng mở phòng */}
                    <section>
                        <div className="flex justify-between items-end border-b border-outline-variant pb-4 mb-6">
                            <div>
                                <h3 className="text-2xl font-semibold text-primary">Quản lý quỹ phòng</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {roomTypes.map((room) => (
                                <div
                                    key={room.id}
                                    className={`bg-white border border-outline-variant rounded-xl p-5 flex justify-between items-center transition-all ${room.isAvailable === false ? 'opacity-50 bg-gray-50' : ''}`}
                                >
                                    <div>
                                        <h4 className="font-semibold text-lg">{room.name}</h4>
                                        {room.isAvailable !== false ? (
                                            <p className="text-sm text-green-600 mt-1">Đang hoạt động trên hệ thống</p>
                                        ) : (
                                            <p className="text-sm text-red-500 mt-1">Đã đóng tạm thời</p>
                                        )}
                                    </div>

                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={room.isAvailable !== false}
                                            onChange={() => handleStatusToggle(room.id, room.isAvailable !== false)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-secondary"></div>
                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};

export default AdminRatesPage;