import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Tập hợp danh sách menu chuẩn, đồng bộ chính xác các đường dẫn (path) trong dự án của bạn
    const menuItems = [
        { icon: "dashboard", label: "Overview", path: "/admin"},
        { icon: "calendar_month", label: "Bookings", path: "/admin/booking" },
        { icon: "grid_view", label: "Room Matrix", path: "/admin/roommatrix" },
        { icon: "payments", label: "Rates", path: "/admin/rate" },
        { icon: "room_service", label: "Services", path: "/admin/services" },
        { icon: "forum", label: "Chat Support", path: "/admin/chat" },
        { icon: "settings", label: "Settings", path: "/admin/settings" },
    ];

    return (
        <nav className="bg-background h-screen w-64 fixed left-0 top-0 border-r border-outline-variant flex flex-col py-8 px-4 z-50 select-none">
            {/* Brand */}
            <div className="mb-10 px-4">
                <h1 className="font-headline-sm text-headline-sm text-primary">
                    Luxe Hotel
                </h1>
                <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
                    Admin Console
                </p>
            </div>

            {/* Menu - Đã dọn dẹp các vòng lặp thừa */}
            <ul className="flex-1 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    // Kiểm tra xem mục này có trùng với URL hiện tại hay không để kích hoạt trạng thái Active
                    const isActive = location.pathname === item.path;

                    return (
                        <li key={item.label}>
                            <button
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-label-caps text-label-caps text-left
                                    ${isActive
                                    ? "bg-surface-container text-secondary border-r-2 border-secondary font-semibold shadow-sm"
                                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                                }`}
                            >
                                <span className={`material-symbols-outlined ${isActive ? "fill" : ""}`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Button - Điều hướng nhanh sang trang tạo mới đặt phòng */}
            <div className="mt-auto pt-4 px-4 border-t border-outline-variant">
                <button
                    onClick={() => navigate("/admin/bookings/new")}
                    className="w-full bg-primary text-on-primary font-button text-button py-3 rounded hover:opacity-90 transition-opacity"
                >
                    New Booking
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;