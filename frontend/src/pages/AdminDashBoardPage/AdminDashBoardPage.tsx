// pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const [loading, setLoading] = useState<boolean>(false);

    // Quản lý tập trung toàn bộ dữ liệu động từ database thông qua API
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
                // 1. Lấy dữ liệu doanh thu thực tế theo năm đã chọn
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

                // 2. Lấy dữ liệu tổng quan cho Metrics, Hạng phòng, Thông báo & Sơ đồ phòng
                const statsResponse = await axios.get(`http://localhost:8080/api/admin/dashboard/overview`);
                if (statsResponse.data) {
                    setDashboardStats(statsResponse.data);
                }

            } catch (error) {
                console.error("Lỗi kết nối API Dashboard:", error);
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
            {/* Title & Bộ lọc năm */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="font-headline-md text-headline-md text-primary">
                        Tổng quan
                    </h2>
                    <p className="text-on-surface-variant mt-1">
                        Chào buổi sáng, dữ liệu kinh doanh ngày hôm nay.
                    </p>
                </div>

                {/* Bộ lọc năm đồng bộ chuẩn hệ thống */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-surface border border-outline-variant p-2 rounded text-sm font-medium text-primary focus:outline-none focus:border-primary cursor-pointer shadow-sm"
                >
                    <option value={2026}>Năm 2026</option>
                    <option value={2025}>Năm 2025</option>
                </select>
            </div>

            {/* Metrics - Đã map dữ liệu thực tế kết hợp với Material Icons của bạn */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    {
                        title: "Tỷ lệ lấp đầy",
                        value: `${dashboardStats.occupancyRate}%`,
                        icon: "data_usage",
                        desc: "Xem chi tiết sơ đồ",
                    },
                    {
                        title: "Doanh thu trong ngày",
                        value: `${Number(dashboardStats.todayRevenue).toLocaleString()}đ`,
                        icon: "payments",
                        desc: "Cập nhật từ hóa đơn",
                    },
                    {
                        title: "Check-in hôm nay",
                        value: `${dashboardStats.todayCheckIns}`,
                        icon: "flight_land",
                        desc: "Khách đang nhận phòng",
                    },
                    {
                        title: "Check-out hôm nay",
                        value: `${dashboardStats.todayCheckOuts}`,
                        icon: "flight_takeoff",
                        desc: "Khách trả phòng dự kiến",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="bg-surface border border-outline-variant p-6 rounded shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-label-caps text-label-caps text-on-surface-variant">
                                {item.title}
                            </h3>
                            <span className="material-symbols-outlined text-secondary">
                                {item.icon}
                            </span>
                        </div>

                        <p className="font-headline-md text-headline-md text-primary">
                            {item.value}
                        </p>

                        <div className="mt-4 text-sm flex items-center gap-1 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px] text-secondary">
                                trending_up
                            </span>
                            <span className="text-[13px]">{item.desc}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts - Biểu đồ dữ liệu động thực tế */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Biểu đồ cột Doanh thu thực tế thay cho SVG vẽ cứng */}
                <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-headline-sm text-headline-sm text-primary">
                            Doanh thu theo tháng ({selectedYear}) {loading && <span className="text-xs text-outline">(Đang tải...)</span>}
                        </h3>
                    </div>

                    <div className="h-52 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                                <YAxis tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} đ`, "Doanh thu"]} />
                                <Bar dataKey="Doanh thu" fill="var(--md-sys-color-primary, #0061A6)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Biểu đồ Hiệu suất hạng phòng từ Cơ sở dữ liệu */}
                <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
                        Hiệu suất hạng phòng
                    </h3>

                    <div className="h-48 flex items-end justify-between gap-4 px-2">
                        {dashboardStats.roomTypePerformance?.length > 0 ? (
                            dashboardStats.roomTypePerformance.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="w-1/4 bg-primary-container rounded-t-sm relative group transition-all hover:opacity-80 cursor-pointer"
                                    style={{ height: `${item.percentage || 10}%` }}
                                >
                                    {/* Tooltip khi hover vào cột */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-sm">
                                        {item.percentage}%
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center text-outline text-sm pb-10">Chưa có dữ liệu hiệu suất</div>
                        )}
                    </div>

                    <div className="flex justify-between mt-3 text-[10px] text-outline font-medium">
                        {dashboardStats.roomTypePerformance?.map((item: any, index: number) => (
                            <span key={index} className="w-1/4 text-center truncate px-1">{item.typeName}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Thông báo khẩn cấp từ DB */}
                <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
                        Thông báo khẩn cấp
                    </h3>

                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                        {dashboardStats.urgentNotifications?.length > 0 ? (
                            dashboardStats.urgentNotifications.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-4 p-3 border border-outline-variant rounded items-center bg-slate-50/50"
                                >
                                    <div className="h-8 w-8 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[18px]">
                                            {item.icon || "notifications"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-700">{item.message}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-outline text-center py-12">Hiện không có thông báo khẩn cấp nào.</p>
                        )}
                    </div>
                </div>

                {/* Sơ đồ phòng rút gọn động */}
                <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-headline-sm text-headline-sm text-primary">
                            Sơ đồ phòng rút gọn
                        </h3>
                        <span
                            onClick={() => navigate("/admin/roommatrix")}
                            className="text-sm text-outline hover:text-primary cursor-pointer font-medium hover:underline"
                        >
                            Mở rộng
                        </span>
                    </div>

                    <div className="grid grid-cols-6 gap-2 max-h-[220px] overflow-y-auto pr-1">
                        {dashboardStats.miniRoomMatrix?.length > 0 ? (
                            dashboardStats.miniRoomMatrix.map((room: any) => (
                                <div
                                    key={room.roomNumber}
                                    onClick={() => navigate("/admin/room-matrix")}
                                    className={`aspect-square border rounded-sm flex items-center justify-center text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95
                                        ${room.status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' :
                                        room.status === 'occupied' ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' :
                                            'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'}`}
                                >
                                    {room.roomNumber}
                                </div>
                            ))
                        ) : (
                            <p className="col-span-6 text-sm text-outline text-center py-12">Chưa có dữ liệu danh sách phòng.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;