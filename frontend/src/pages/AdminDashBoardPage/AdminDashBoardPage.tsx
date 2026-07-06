import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const AdminDashboardPage = () => {
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchRevenue = async () => {
            setLoading(true);
            try {
                // Gọi thẳng tới API Spring Boot (Cổng 8080) không qua instance trung gian
                const response = await axios.get(`http://localhost:8080/api/admin/dashboard/revenue`, {
                    params: { year: selectedYear }
                });

                const data = response.data;

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
            } catch (error) {
                console.error("Lỗi kết nối API:", error);
                setDefaultData(); // Khi API lỗi (hoặc chưa bật backend), vẫn hiện biểu đồ cột bằng 0 để giữ giao diện
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

        fetchRevenue();
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

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { title: "Tỷ lệ lấp đầy", value: "78%", icon: "📊", desc: "+5% so với tuần trước" },
                    { title: "Doanh thu trong ngày", value: "45.500.000đ", icon: "💰", desc: "Đạt 92% mục tiêu" },
                    { title: "Check-in hôm nay", value: "12", icon: "🔑", desc: "4 phòng VIP" },
                    { title: "Check-out hôm nay", value: "8", icon: "🚪", desc: "Đã hoàn tất: 6" },
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

                {/* Bar Chart Hiệu suất hạng phòng */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">
                        Hiệu suất hạng phòng
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-4">
                        {[80, 60, 40, 90].map((height, index) => (
                            <div key={index} className="w-1/4 bg-indigo-100 rounded-t-md" style={{ height: `${height}%` }} />
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-400">
                        <span>Standard</span>
                        <span>Deluxe</span>
                        <span>Suite</span>
                        <span>Presidential</span>
                    </div>
                </div>
            </div>

            {/* Bottom (Notifications & Room Matrix) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">Thông báo khẩn cấp</h3>
                    <div className="space-y-4">
                        {[
                            { icon: "🚗", text: "Khách phòng 402 yêu cầu xe ra sân bay." },
                            { icon: "🧹", text: "Yêu cầu dọn phòng 305 gấp." },
                            { icon: "🍴", text: "Đặt bàn nhà hàng - Bàn 12." },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-4 p-3 border border-gray-100 rounded-lg items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                                    {item.icon}
                                </div>
                                <p className="text-sm text-gray-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Sơ đồ phòng rút gọn</h3>
                        <span className="text-xs text-indigo-500 cursor-pointer hover:underline">Mở rộng</span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        {["101", "102", "103", "104", "105", "106", "201", "202", "203", "204", "205", "206"].map((room) => (
                            <div key={room} className="aspect-square border border-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer">
                                {room}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboardPage;