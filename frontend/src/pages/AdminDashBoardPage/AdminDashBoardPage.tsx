// pages/DashboardPage.tsx

import Sidebar from "../../components/SidebarAdmin/Sidebar.tsx";
import HeaderAdmin from "../../components/Header/HeaderAdmin.tsx";


const DashboardPage = () => {
    return (
        <div className="bg-background text-on-surface font-body-md antialiased flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-background">
                <HeaderAdmin />

                <main className="flex-1 overflow-y-auto pt-24 px-8 pb-12 w-full">
                    {/* Title */}
                    <div className="mb-10">
                        <h2 className="font-headline-md text-headline-md text-primary">
                            Tổng quan
                        </h2>

                        <p className="text-on-surface-variant mt-1">
                            Chào buổi sáng, dữ liệu kinh doanh ngày hôm nay.
                        </p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                title: "Tỷ lệ lấp đầy",
                                value: "78%",
                                icon: "data_usage",
                                desc: "+5% so với tuần trước",
                            },
                            {
                                title: "Doanh thu trong ngày",
                                value: "45.500.000đ",
                                icon: "payments",
                                desc: "Đạt 92% mục tiêu",
                            },
                            {
                                title: "Check-in hôm nay",
                                value: "12",
                                icon: "flight_land",
                                desc: "4 phòng VIP",
                            },
                            {
                                title: "Check-out hôm nay",
                                value: "8",
                                icon: "flight_takeoff",
                                desc: "Đã hoàn tất: 6",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-surface border border-outline-variant p-6 rounded shadow-sm"
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

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Line Chart */}
                        <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-headline-sm text-headline-sm text-primary">
                                    Doanh thu theo tuần
                                </h3>

                                <button className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1">
                                    Tuần này
                                    <span className="material-symbols-outlined text-[16px]">
                    expand_more
                  </span>
                                </button>
                            </div>

                            <div className="h-48">
                                <svg
                                    className="w-full h-full"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 400 100"
                                >
                                    <path
                                        d="M0,80 L50,60 L100,70 L150,30 L200,40 L250,10 L300,30 L350,20 L400,5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-secondary"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                            <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
                                Hiệu suất hạng phòng
                            </h3>

                            <div className="h-48 flex items-end justify-between gap-4">
                                {[80, 60, 40, 90].map((height, index) => (
                                    <div
                                        key={index}
                                        className="w-1/4 bg-primary-container rounded-t-sm"
                                        style={{ height: `${height}%` }}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between mt-3 text-[10px] text-outline">
                                <span>Standard</span>
                                <span>Deluxe</span>
                                <span>Suite</span>
                                <span>Presidential</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Notifications */}
                        <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                            <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
                                Thông báo khẩn cấp
                            </h3>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: "directions_car",
                                        text: "Khách phòng 402 yêu cầu xe ra sân bay.",
                                    },
                                    {
                                        icon: "cleaning_services",
                                        text: "Yêu cầu dọn phòng 305 gấp.",
                                    },
                                    {
                                        icon: "restaurant",
                                        text: "Đặt bàn nhà hàng - Bàn 12.",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 p-3 border border-outline-variant rounded"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        {item.icon}
                      </span>
                                        </div>

                                        <p className="text-sm">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Room Matrix */}
                        <div className="bg-surface border border-outline-variant p-6 rounded shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-headline-sm text-headline-sm text-primary">
                                    Sơ đồ phòng rút gọn
                                </h3>

                                <a href="#" className="text-outline hover:text-primary">
                                    Mở rộng
                                </a>
                            </div>

                            <div className="grid grid-cols-6 gap-2">
                                {[
                                    "101",
                                    "102",
                                    "103",
                                    "104",
                                    "105",
                                    "106",
                                    "201",
                                    "202",
                                    "203",
                                    "204",
                                    "205",
                                    "206",
                                ].map((room) => (
                                    <div
                                        key={room}
                                        className="aspect-square border border-outline rounded-sm flex items-center justify-center text-xs"
                                    >
                                        {room}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;