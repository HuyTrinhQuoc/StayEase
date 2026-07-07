import { useEffect, useState } from "react";
import axios from "axios";

const AdminBookingPage = () => {
    // State quản lý danh sách đặt phòng từ API
    const [bookings, setBookings] = useState<any[]>([]);
    // State quản lý đặt phòng đang được chọn để hiển thị ở panel phải
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    // State quản lý bộ lọc và tìm kiếm
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("Tất cả");
    const [loading, setLoading] = useState<boolean>(false);

    // [MỚI] State quản lý bộ lọc năm từ 2024 - 2027 (Mặc định lấy năm hiện tại là 2026)
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    // [MỚI] State quản lý bộ lọc tháng (Mặc định là "Tất cả")
    const [selectedMonth, setSelectedMonth] = useState<string>("Tất cả");

    // 1. Gọi API lấy danh sách đặt phòng (Hỗ trợ Realtime Polling & Lọc theo năm 2024-2027)
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/api/admin/bookings", {
                    params: {
                        search: searchTerm,
                        status: statusFilter,
                        year: selectedYear,       // Gửi năm được lọc lên Backend
                        month: selectedMonth     // Gửi tháng được lọc lên Backend
                    }
                });
                if (response.data && Array.isArray(response.data)) {
                    setBookings(response.data);
                    // Mặc định chọn phần tử đầu tiên hiển thị lên Panel phải nếu có dữ liệu
                    if (response.data.length > 0 && !selectedBooking) {
                        setSelectedBooking(response.data[0]);
                    }
                }
            } catch (error) {
                console.error("Lỗi lấy danh sách đặt phòng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();

        // Thiết lập Realtime Polling: Tự động đồng bộ với Supabase/Spring Boot sau mỗi 10 giây
        const interval = setInterval(fetchBookings, 10000);
        return () => clearInterval(interval);
    }, [searchTerm, statusFilter, selectedYear, selectedMonth]);

    // 2. Hàm gọi chi tiết một đặt phòng khi Click vào dòng trong Table
    const handleSelectBooking = async (bookingId: string | number) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/bookings/${bookingId}`);
            if (response.data) {
                setSelectedBooking(response.data);
            }
        } catch (error) {
            console.error("Lỗi lấy chi tiết đặt phòng:", error);
        }
    };

    // Hàm trả về màu sắc tag tương ứng với từng trạng thái
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Đã thanh toán":
            case "PAID":
                return "border-[#1e8e3e]/20 bg-[#e6f4ea] text-[#1e8e3e]";
            case "Chờ chuyển khoản":
            case "PENDING":
                return "border-amber-500/20 bg-amber-50 text-amber-600";
            case "Đang lưu trú":
            case "CHECKED_IN":
                return "border-indigo-500/20 bg-indigo-50 text-indigo-600";
            default:
                return "border-gray-500/20 bg-gray-50 text-gray-600";
        }
    };

    return (
        <main className="flex gap-8 bg-surface-container-lowest p-8 min-h-screen pt-24">
            {/* Left Side */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="font-headline-md text-headline-md text-primary">
                            Quản lý Đặt phòng (Realtime)
                        </h2>
                        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                            Tổng quan trạng thái và chi tiết các giao dịch lưu trú giai đoạn 2024 - 2027.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-button text-button text-[#775a19] shadow-sm transition-opacity hover:opacity-90">
                        <span className="material-symbols-outlined text-sm">
                            add
                        </span>
                        Tạo Đặt phòng
                    </button>
                </div>

                {/* Filter */}
                <div className="ghost-border mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-surface p-4">
                    <div className="flex flex-1 flex-wrap items-center gap-4">
                        {/* Search Input */}
                        <div className="relative w-full max-w-xs">
                            <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-outline-variant">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm mã đơn, tên khách..."
                                className="w-full border-b border-primary bg-transparent py-2 pr-4 pl-9 text-sm font-body-md transition-colors focus:border-secondary focus:outline-none"
                            />
                        </div>

                        {/* [MỚI] Bộ lọc Năm giai đoạn 2024 - 2027 */}
                        <div className="group relative flex items-center border-b border-primary pb-1 transition-colors focus-within:border-secondary">
                            <span className="material-symbols-outlined mr-2 text-sm text-outline-variant">
                                calendar_today
                            </span>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="cursor-pointer appearance-none border-none bg-transparent pr-6 text-sm font-medium text-on-surface focus:ring-0"
                            >
                                <option value={2024}>Năm 2024</option>
                                <option value={2025}>Năm 2025</option>
                                <option value={2026}>Năm 2026</option>
                                <option value={2027}>Năm 2027</option>
                            </select>
                            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-sm text-outline-variant">
                                arrow_drop_down
                            </span>
                        </div>

                        {/* [MỚI] Bộ lọc Tháng */}
                        <div className="group relative flex items-center border-b border-primary pb-1 transition-colors focus-within:border-secondary">
                            <span className="material-symbols-outlined mr-2 text-sm text-outline-variant">
                                date_range
                            </span>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="cursor-pointer appearance-none border-none bg-transparent pr-6 text-sm font-medium text-on-surface focus:ring-0"
                            >
                                <option value="Tất cả">Tất cả các tháng</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                        Tháng {i + 1}
                                    </option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-sm text-outline-variant">
                                arrow_drop_down
                            </span>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                            Trạng thái:
                        </span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="cursor-pointer rounded bg-surface-container px-3 py-1.5 text-sm focus:ring-1 focus:ring-secondary"
                        >
                            <option value="Tất cả">Tất cả</option>
                            <option value="Đã thanh toán">Đã thanh toán</option>
                            <option value="Chờ chuyển khoản">Chờ chuyển khoản</option>
                            <option value="Đang lưu trú">Đang lưu trú</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="ghost-border flex flex-1 flex-col overflow-hidden rounded-xl bg-surface shadow-sm">
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                            <tr className="border-b border-outline-variant bg-surface-container-low font-label-caps text-label-caps text-on-surface-variant">
                                <th className="px-6 py-4 font-medium">Mã Đơn</th>
                                <th className="px-6 py-4 font-medium">Tên Khách Hàng</th>
                                <th className="px-6 py-4 font-medium">Hạng Phòng</th>
                                <th className="px-6 py-4 font-medium">Ngày Lưu Trú</th>
                                <th className="px-6 py-4 text-right font-medium">Tổng Tiền</th>
                                <th className="px-6 py-4 text-center font-medium">Trạng Thái</th>
                                <th className="px-6 py-4 text-right font-medium">Hành Động</th>
                            </tr>
                            </thead>

                            <tbody className="text-sm font-body-md">
                            {loading && bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">Đang đồng bộ dữ liệu...</td>
                                </tr>
                            ) : bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr
                                        key={booking.id}
                                        onClick={() => handleSelectBooking(booking.id)}
                                        className={`group cursor-pointer border-b border-outline-variant bg-surface-container-low transition-colors hover:bg-surface-container ${selectedBooking?.id === booking.id ? 'bg-surface-container' : ''}`}
                                    >
                                        <td className="px-6 py-4 font-medium text-primary">
                                            {booking.bookingCode}
                                        </td>
                                        <td className="px-6 py-4">{booking.customerName}</td>
                                        <td className="px-6 py-4 text-on-surface-variant">{booking.roomTypeName}</td>
                                        <td className="px-6 py-4">{booking.stayPeriod}</td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            {Number(booking.totalPrice).toLocaleString()}đ
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 text-outline-variant transition-colors hover:text-secondary">
                                                    <span className="material-symbols-outlined text-sm">
                                                        visibility
                                                    </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">Không tìm thấy đơn đặt phòng nào trong khoảng thời gian được chọn.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-outline-variant bg-surface p-4">
                        <span className="text-sm text-on-surface-variant">
                            Hiển thị {bookings.length > 0 ? '1' : '0'}-{bookings.length} trong {bookings.length} kết quả (Năm {selectedYear})
                        </span>

                        <div className="flex gap-1">
                            <button className="rounded bg-surface-container-low px-3 py-1 text-sm font-medium text-primary">
                                1
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <aside className="ghost-border sticky top-24 flex h-[calc(100vh-8rem)] w-80 flex-col overflow-hidden rounded-xl bg-surface shadow-sm">
                {selectedBooking ? (
                    <>
                        <div className="relative h-32 overflow-hidden bg-surface-container-low">
                            <img
                                src={selectedBooking.roomImageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDFwATgp0Wv860H0G8maMIuQXZG82vx5WfH3RQjSIS3HVniK_VgaAMRxreKdtTuTO7O-G0AC67t-YqI2MfPp5QQNOefZtdvZTkKiPzc0oaICVE-N3M8M7V7XYGDt45ztgsB4aTGOs2jlZSvgD6SEm-SLoLJYERXvFkGmjHgMLV1EnFfqtbF0CpKYX809Jaa2EgfZ1YKlJFqdT5MEgV_30bGkwWgDMKWxL64BODksvJkd0azYNm3NnZuSp7oCfoac5q5g7SyEizxruU"}
                                alt="Room"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                            <div>
                                <h3 className="mb-1 text-lg text-primary">
                                    {selectedBooking.customerName}
                                </h3>
                                <p className="flex items-center gap-1 text-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-xs">
                                        mail
                                    </span>
                                    {selectedBooking.customerEmail || "N/A"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-y border-outline-variant py-4">
                                <div>
                                    <p className="mb-1 text-[10px] text-on-surface-variant">CHECK-IN</p>
                                    <p className="text-sm font-medium">{selectedBooking.checkInDate}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-[10px] text-on-surface-variant">CHECK-OUT</p>
                                    <p className="text-sm font-medium">{selectedBooking.checkOutDate}</p>
                                </div>
                            </div>

                            <div className="rounded border border-secondary/20 bg-secondary/5 p-3">
                                <p className="mb-1 flex items-center gap-1 text-[10px] text-secondary">
                                    <span className="material-symbols-outlined text-[14px]">
                                        info
                                    </span>
                                    YÊU CẦU ĐẶC BIỆT
                                </p>
                                <p className="text-sm italic text-on-surface">
                                    "{selectedBooking.specialRequests || "Không có yêu cầu đặc biệt."}"
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 border-t border-outline-variant bg-surface-container-lowest p-4">
                            <button className="flex-1 rounded-sm border border-secondary py-2 text-center text-secondary transition-colors hover:bg-secondary/5">
                                Sửa
                            </button>
                            <button className="flex-1 rounded-sm bg-primary py-2 text-center text-on-primary shadow-sm transition-colors hover:bg-primary-container">
                                Check-in
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center text-sm text-gray-400 p-6 text-center">
                        Chọn một đơn đặt phòng để xem chi tiết thông tin.
                    </div>
                )}
            </aside>
        </main>
    );
};

export default AdminBookingPage;