import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const [loading, setLoading] = useState<boolean>(false);

    // State quản lý toàn bộ dữ liệu động thay thế cho dữ liệu cứng ban đầu
    const [dashboardStats, setDashboardStats] = useState<any>({
        occupancyRate: 0,
        todayRevenue: 0,
        todayCheckIns: 0,
        todayCheckOuts: 0,
        roomTypePerformance: [],
        urgentNotifications: [],
        miniRoomMatrix: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // 1. Gọi API lấy Doanh thu theo năm
                const revResponse = await axios.get(`http://localhost:8080/api/admin/dashboard/revenue`, {
                    params: { year: selectedYear }
                });

                const data = revResponse.data;
                if (data && Array.isArray(data)) {
                    const fullYearData = Array.from({ length: 12 }, (_, i) => {
                        const monthNum = i + 1;
                        const found = data.find((d: any) => d.month === monthNum);
                        return {
                            name: `T${monthNum}`,
                            "Doanh thu": found ? found.revenue : 0,
                        };
                    });
                    setRevenueData(fullYearData);
                } else {
                    setDefaultData();
                }

                // 2. Gọi API lấy dữ liệu tổng quan cho Metrics, Hạng phòng, Thông báo & Sơ đồ phòng
                const statsResponse = await axios.get(`http://localhost:8080/api/admin/dashboard/overview`);
                if (statsResponse.data) {
                    setDashboardStats(statsResponse.data);
                }

            } catch (error) {
                console.error("Lỗi kết nối API:", error);
                setDefaultData();
            } finally {
                setLoading(false);
            }
        };

        const setDefaultData = () => {
            const emptyData = Array.from({ length: 12 }, (_, i) => ({
                name: `T${i + 1}`,
                "Doanh thu": 0,
            }));
            setRevenueData(emptyData);
        };

        fetchDashboardData();
    }, [selectedYear]);

    return (
        <main className="flex-1 overflow-y-auto pt-24 px-8 pb-12 w-full bg-slate-50 text-slate-800">
            {/* Title */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-bold text-indigo-600">
                        Tổng quan
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Chào buổi sáng, dữ liệu kinh doanh ngày hôm nay.
                    </p>
                </div>

                {/* Bộ lọc chọn năm */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-white border border-gray-300 p-2 rounded text-sm focus:outline-none focus:border-indigo-500"
                >
                    <option value={2026}>Năm 2026</option>
                    <option value={2025}>Năm 2025</option>
                </select>
            </div>

            {/* Metrics - Đã map dữ liệu thực tế từ API */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { title: "Tỷ lệ lấp đầy", value: `${dashboardStats.occupancyRate}%`, icon: "📊", desc: "Xem chi tiết chiến lược giá" },
                    { title: "Doanh thu trong ngày", value: `${Number(dashboardStats.todayRevenue).toLocaleString()}đ`, icon: "💰", desc: "Quản lý danh sách hóa đơn" },
                    { title: "Check-in hôm nay", value: `${dashboardStats.todayCheckIns}`, icon: "🔑", desc: "Xử lý nhận phòng nhanh" },
                    { title: "Check-out hôm nay", value: `${dashboardStats.todayCheckOuts}`, icon: "🚪", desc: "Xử lý trả phòng khách sạn" },
                ].map((item) => (
                    <div key={item.title} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">{item.title}</h3>
                            <span className="text-xl">{item.icon}</span>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">{item.value}</p>
                        <div className="mt-4 text-xs flex items-center gap-1 text-gray-500">
                            <span>📈 {item.desc}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Biểu đồ cột Doanh thu */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">
                        Doanh thu thực tế theo tháng ({selectedYear}) {loading && "(Đang tải...)"}
                    </h3>
                    <div className="h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                <YAxis tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} đ`, "Doanh thu"]} />
                                <Bar dataKey="Doanh thu" fill="#4f46e5" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart Hiệu suất hạng phòng - Đã đổi thành dữ liệu động từ DB */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">
                        Hiệu suất hạng phòng
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-4">
                        {dashboardStats.roomTypePerformance.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="w-1/4 bg-indigo-100 rounded-t-md relative group transition-all hover:bg-indigo-200"
                                style={{ height: `${item.percentage}%` }}
                            >
                                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-400">
                        {dashboardStats.roomTypePerformance.map((item: any, index: number) => (
                            <span key={index}>{item.typeName}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom (Notifications & Room Matrix) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Thông báo khẩn cấp - Đã đổi thành dữ liệu động từ DB */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">Thông báo khẩn cấp</h3>
                    <div className="space-y-4">
                        {dashboardStats.urgentNotifications.length > 0 ? (
                            dashboardStats.urgentNotifications.map((item: any, index: number) => (
                                <div key={index} className="flex gap-4 p-3 border border-gray-100 rounded-lg items-center">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                                        🔔
                                    </div>
                                    <p className="text-sm text-gray-600">{item.message}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-10">Hiện không có thông báo khẩn cấp nào.</p>
                        )}
                    </div>
                </div>

                {/* Sơ đồ phòng rút gọn - Đã thêm liên kết chuyển trang và đổi sang dữ liệu động từ DB */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Sơ đồ phòng rút gọn</h3>
                        <span
                            onClick={() => navigate("/admin-roommatrix")}
                            className="text-xs text-indigo-500 cursor-pointer hover:underline font-medium"
                        >
                            Mở rộng
                        </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        {dashboardStats.miniRoomMatrix.map((room: any) => (
                            <div
                                key={room.roomNumber}
                                onClick={() => navigate("/admin/room-matrix")}
                                className={`aspect-square border rounded-md flex items-center justify-center text-xs font-medium transition-colors cursor-pointer
                                    ${room.status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' :
                                    room.status === 'occupied' ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' :
                                        'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'}`}
                            >
                                {room.roomNumber}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboardPage;