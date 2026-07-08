
import { useNavigate, useLocation } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Gom tất cả các menu vào 1 danh sách duy nhất để dễ quản lý vòng lặp và gán route
    const menuItems = [
        { icon: "dashboard", label: "Overview", path: "/admin-dashboard" },
        { icon: "calendar_month", label: "Bookings", path: "/admin-booking" },
        { icon: "grid_view", label: "Room Matrix", path: "/admin-roommatrix" },
        { icon: "payments", label: "Rates", path: "/admin-rate" },
        { icon: "room_service", label: "Services", path: "/admin-services" }, // Đổi nhẹ tên icon concierge thành room_service cho đúng chuẩn Material Icon
        { icon: "settings", label: "Settings", path: "/admin-settings" },
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

            {/* Menu */}
            <ul className="flex-1 space-y-2">

                <li>
                    <a
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded bg-surface-container text-secondary border-r-2 border-secondary font-label-caps text-label-caps"
                    >
                        <span className="material-symbols-outlined fill">dashboard</span>
                        Overview
                    </a>
                </li>

                {[
                    { icon: "calendar_month", label: "Bookings", path: "/admin/booking" },
                    { icon: "grid_view", label: "Room Matrix", path: "/admin/roommatrix" },
                    { icon: "payments", label: "Rates", path: "/admin/rate" },
                    { icon: "concierge", label: "Services", path: "#" },
                    { icon: "settings", label: "Settings", path: "#" },
                    { icon: "forum", label: "Chat Support", path: "/admin/chat" },
                ].map((item) => (
                    <li key={item.label}>
                        <a
                            href={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors font-label-caps text-label-caps"
                        >
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
                            {item.label}
                        </a>
                    </li>
                ))}

                {menuItems.map((item) => {
                    // Kiểm tra xem mục này có phải trang hiện tại không
                    const isActive = location.pathname === item.path;

                    return (
                        <li key={item.label}>
                            <button
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-label-caps text-label-caps text-left
                                    ${isActive
                                    ? "bg-surface-container text-secondary border-r-2 border-secondary font-semibold"
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
            <div className="mt-auto px-4">
                <button
                    onClick={() => navigate("/admin/bookings/new")} // Hoặc path dẫn tới form tạo đặt phòng của bạn
                    className="w-full bg-primary text-on-primary font-button text-button py-3 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors"
                >
                    New Booking
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;