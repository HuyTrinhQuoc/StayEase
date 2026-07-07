import { useEffect, useState } from "react";
import axios from "axios";

const AdminRatesPage = () => {
    // State quản lý danh sách hạng phòng và cấu hình giá/quỹ từ API
    const [roomTypes, setRoomTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    // 1. Gọi API lấy danh sách toàn bộ hạng phòng và thông tin cấu hình liên quan
    const fetchRoomRatesData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/admin/room-types");
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

    // 2. Xử lý thay đổi giá trị input trực tiếp trong state
    const handleInputChange = (id: number | string, field: string, value: any) => {
        setRoomTypes(prev =>
            prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    // 3. Xử lý bật/tắt Đóng/Mở trạng thái quỹ phòng (Toggle switch)
    const handleStatusToggle = (id: number | string, currentStatus: boolean) => {
        setRoomTypes(prev =>
            prev.map(item => (item.id === id ? { ...item, isAvailable: !currentStatus } : item))
        );
    };

    // 4. API Gửi cập nhật toàn bộ thay đổi lên hệ thống (Nút "Lưu thay đổi")
    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            await axios.put("http://localhost:8080/api/admin/room-types/batch-update", roomTypes);
            alert("Lưu mọi thay đổi thành công!");
            fetchRoomRatesData(); // Tải lại dữ liệu mới nhất
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            alert("Gặp lỗi khi lưu thay đổi.");
        } finally {
            setIsSaving(false);
        }
    };

    // 5. API Gửi cập nhật nhanh cho riêng lẻ từng hạng phòng (Icon Save trên từng dòng)
    const handleSaveSingleRow = async (id: number | string) => {
        const targetRow = roomTypes.find(item => item.id === id);
        if (!targetRow) return;
        try {
            await axios.put(`http://localhost:8080/api/admin/room-types/${id}`, targetRow);
            alert(`Cập nhật thành công cho hạng phòng ${targetRow.typeName}!`);
        } catch (error) {
            console.error("Lỗi cập nhật hạng phòng lẻ:", error);
            alert("Gặp lỗi khi lưu hạng phòng này.");
        }
    };

    return (
        <main
            className="
                mt-16
                h-[calc(100vh-4rem)]
                overflow-y-auto
                overflow-x-hidden
                bg-surface-container-low
                p-8
                pb-32
            "
        >
            {/* Header */}
            <div className="flex justify-between items-end border-b border-outline-variant pb-6 mb-10">
                <div>
                    <h2 className="text-3xl font-semibold text-primary">
                        Quản lý Phòng & Giá
                    </h2>
                    <p className="text-on-surface-variant mt-2">
                        Thiết lập hạng phòng, giá bán và tình trạng phòng trống.
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
                    {/* Room Types */}
                    <section className="mb-14">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-primary">
                                Hạng phòng
                            </h3>
                            <button className="text-secondary flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    add
                                </span>
                                Thêm hạng phòng
                            </button>
                        </div>

                        <div className="space-y-6">
                            {roomTypes.map((room) => (
                                <div key={room.id} className="bg-white border border-outline-variant rounded-xl overflow-hidden flex">
                                    <img
                                        src={room.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                                        alt={room.typeName}
                                        className="w-52 h-36 object-cover"
                                    />
                                    <div className="flex-1 p-6 flex justify-between items-center">
                                        <div>
                                            <h4 className="text-xl font-semibold text-primary mb-2">
                                                {room.typeName}
                                            </h4>
                                            <div className="flex gap-5 text-sm text-on-surface-variant">
                                                <span>{room.capacity || 2} Khách</span>
                                                <span>{room.roomSize || 45}m²</span>
                                                <span>{room.bedType || "1 King / 2 Twin"}</span>
                                            </div>
                                        </div>
                                        <button className="border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white transition">
                                            Chỉnh sửa
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Pricing */}
                    <section className="mb-14">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-primary mb-2">
                                Giá động & Phụ thu
                            </h3>
                            <p className="text-on-surface-variant">
                                Cấu hình giá cơ bản và phụ thu cuối tuần.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl border border-outline-variant overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left border-collapse">
                                <thead className="bg-surface-container-low">
                                <tr className="text-left border-b border-outline-variant">
                                    <th className="p-4">Hạng phòng</th>
                                    <th className="p-4">Giá cơ bản</th>
                                    <th className="p-4">Phụ thu cuối tuần</th>
                                    <th className="p-4 text-right">Hành động</th>
                                </tr>
                                </thead>

                                <tbody>
                                {roomTypes.map((room) => (
                                    <tr key={room.id} className="border-b border-outline-variant">
                                        <td className="p-4 font-medium">
                                            {room.typeName}
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="text"
                                                value={room.basePrice ? room.basePrice.toLocaleString() : ""}
                                                onChange={(e) => handleInputChange(room.id, "basePrice", Number(e.target.value.replace(/,/g, '')))}
                                                className="border-b border-outline-variant bg-transparent outline-none focus:border-secondary"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span>+</span>
                                                <input
                                                    type="text"
                                                    value={room.weekendSurcharge || 0}
                                                    onChange={(e) => handleInputChange(room.id, "weekendSurcharge", Number(e.target.value))}
                                                    className="w-16 border-b border-outline-variant bg-transparent outline-none text-center focus:border-secondary"
                                                />
                                                <span>%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleSaveSingleRow(room.id)} className="text-on-surface-variant hover:text-secondary transition">
                                                    <span className="material-symbols-outlined">
                                                        save
                                                    </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Allotment */}
                    <section>
                        <div className="flex justify-between items-end border-b border-outline-variant pb-4 mb-6">
                            <div>
                                <h3 className="text-2xl font-semibold text-primary">
                                    Quản lý quỹ phòng
                                </h3>
                                <p className="text-on-surface-variant mt-1">
                                    Đóng / mở phòng theo từng giai đoạn.
                                </p>
                            </div>

                            <div className="border border-outline-variant rounded px-4 py-2 flex items-center gap-3 bg-white">
                                <span className="material-symbols-outlined">
                                    calendar_today
                                </span>
                                <span>15/10 - 22/10/2026</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {roomTypes.map((room) => (
                                <div
                                    key={room.id}
                                    className={`bg-white border border-outline-variant rounded-xl p-5 flex justify-between items-center transition-opacity ${!room.isAvailable ? 'opacity-70' : ''}`}
                                >
                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            {room.typeName}
                                        </h4>
                                        {room.isAvailable ? (
                                            <p className="text-sm text-on-surface-variant mt-1">
                                                Sẵn sàng: {room.availableRooms || 0} phòng
                                            </p>
                                        ) : (
                                            <p className="text-sm text-red-500 mt-1">
                                                Đã đóng cho giai đoạn này
                                            </p>
                                        )}
                                    </div>

                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={!!room.isAvailable}
                                            onChange={() => handleStatusToggle(room.id, !!room.isAvailable)}
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