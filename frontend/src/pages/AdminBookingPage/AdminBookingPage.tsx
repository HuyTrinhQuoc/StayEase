import { useEffect, useState } from "react";
import axios from "axios";

const AdminBookingPage = () => {
    // --------------------------------------------------------
    // 1. STATES & CONFIGURATIONS
    // --------------------------------------------------------
    const [allBookingsFromAPI, setAllBookingsFromAPI] = useState<any[]>([]); // Lưu trữ data gốc từ API
    const [displayedBookings, setDisplayedBookings] = useState<any[]>([]);   // Lưu trữ data sau khi đã qua bộ lọc
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("Tất cả");
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const [selectedMonth, setSelectedMonth] = useState<string>("Tất cả");
    const [loading, setLoading] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newBooking, setNewBooking] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        roomTypeName: "Deluxe Room",
        checkInDate: "2026-07-08",
        checkOutDate: "2026-07-10",
        totalPrice: "",
        specialRequests: "",
        status: "PENDING"
    });

    // --------------------------------------------------------
    // 2. FETCH DATA gốc từ API (Không truyền params lọc lên Server)
    // --------------------------------------------------------
    const fetchBookings = async () => {
        setLoading(true);
        try {
            // Lấy toàn bộ data thô về để Front-end tự xử lý lọc an toàn
            // Sửa từ: axios.get("http://localhost:8080/api/admin/bookings")
// Thành đường dẫn đã test chạy được ở ảnh cuối:
            const response = await axios.get("http://localhost:8080/api/bookings/admin/all");
            if (response.data && Array.isArray(response.data)) {
                setAllBookingsFromAPI(response.data);
                console.log("Dữ liệu thô nhận được từ API:", response.data);
            }
        } catch (error) {
            console.error("Lỗi đồng bộ danh sách:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        const interval = setInterval(fetchBookings, 15000); // Polling mỗi 15s để cập nhật đơn mới
        return () => clearInterval(interval);
    }, []);

    // --------------------------------------------------------
    // 3. CLIENT-SIDE FILTER & FIELD MAPPING (Bảo hiểm an toàn dữ liệu)
    // --------------------------------------------------------
    useEffect(() => {
        if (!allBookingsFromAPI || allBookingsFromAPI.length === 0) {
            setDisplayedBookings([]);
            return;
        }

        const filtered = allBookingsFromAPI.filter((booking) => {
            // Tự động nhận diện trường Ngày Check-in (bất kể database lưu check_in, checkIn, hay checkInDate)
            const rawCheckIn = booking.check_in || booking.checkIn || booking.checkInDate;
            if (!rawCheckIn) return false;

            const dateObj = new Date(rawCheckIn);
            const bookingYear = dateObj.getFullYear();
            const bookingMonth = String(dateObj.getMonth() + 1).padStart(2, '0');

            // Tự động nhận diện thông tin Khách hàng từ JSON
            const customerName = booking.customerName || booking.guest_name || booking.guestName || "";
            const customerEmail = booking.customerEmail || booking.guest_email || booking.guestEmail || "";
            const bookingCode = booking.bookingCode || booking.booking_code || booking.id?.toString() || "";

            // Khớp bộ lọc Tìm kiếm
            const matchesSearch =
                customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bookingCode.toLowerCase().includes(searchTerm.toLowerCase());

            // Khớp bộ lọc Trạng thái
            const currentStatus = booking.status || "PENDING";
            const matchesStatus = statusFilter === "Tất cả" || currentStatus === statusFilter;

            // Khớp bộ lọc Thời gian
            const matchesYear = bookingYear === selectedYear;
            const matchesMonth = selectedMonth === "Tất cả" || bookingMonth === selectedMonth;

            return matchesSearch && matchesStatus && matchesYear && matchesMonth;
        });

        setDisplayedBookings(filtered);

        // Tự động chọn hàng đầu tiên sau khi lọc xong để hiển thị chi tiết ở Panel phải
        if (filtered.length > 0) {
            setSelectedBooking(filtered[0]);
        } else {
            setSelectedBooking(null);
        }
    }, [allBookingsFromAPI, searchTerm, statusFilter, selectedYear, selectedMonth]);

    // --------------------------------------------------------
    // 4. ACTIONS
    // --------------------------------------------------------
    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/bookings/admin/create", newBooking);
            if (response.status === 200 || response.status === 201) {
                alert("Tạo đơn đặt phòng thành công!");
                setIsModalOpen(false);
                fetchBookings();
            }
        } catch (error) {
            console.error("Lỗi khi tạo đặt phòng:", error);
            alert("Không thể tạo đơn đặt phòng.");
        }
    };

    const handleUpdateStatus = async (bookingId: number, nextStatus: string) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/bookings/admin/${bookingId}/status`, {
                status: nextStatus
            });
            if (response.data) {
                alert(`Chuyển trạng thái đơn sang [${nextStatus}] thành công!`);
                fetchBookings();
            }
        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            alert("Lỗi khi cập nhật trạng thái đơn.");
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "CONFIRMED":
            case "PAID":
            case "Đã thanh toán":
                return "border-[#1e8e3e]/20 bg-[#e6f4ea] text-[#1e8e3e]";
            case "PENDING":
            case "Chờ chuyển khoản":
                return "border-amber-500/20 bg-amber-50 text-amber-600";
            case "CHECKED_IN":
            case "Đang lưu trú":
                return "border-indigo-500/20 bg-indigo-50 text-indigo-600";
            default:
                return "border-gray-500/20 bg-gray-50 text-gray-600";
        }
    };

    return (
        <main className="flex gap-8 bg-surface-container-lowest p-8 min-h-screen pt-24">
            {/* LEFT SIDE: MAIN LIST & FILTERS */}
            <div className="flex flex-1 flex-col">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="font-headline-md text-headline-md text-primary font-bold">Quản lý Đặt phòng (Realtime)</h2>
                        <p className="mt-2 font-body-md text-body-md text-on-surface-variant text-gray-500">
                            Tổng quan trạng thái dữ liệu đồng bộ trực tiếp từ Cloud Supabase.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded-md bg-black text-amber-500 px-6 py-3 font-button text-button shadow-sm font-bold hover:opacity-90 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        Tạo Đặt phòng
                    </button>
                </div>

                {/* Toolbar */}
                <div className="ghost-border mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 border border-gray-100 shadow-sm">
                    <div className="flex flex-1 flex-wrap items-center gap-4">
                        <div className="relative w-full max-w-xs">
                            <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400">search</span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm email, tên khách..."
                                className="w-full border-b border-gray-300 bg-transparent py-2 pr-4 pl-9 text-sm focus:border-amber-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center border-b border-gray-300 pb-1">
                            <span className="material-symbols-outlined mr-2 text-sm text-gray-400">calendar_today</span>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="cursor-pointer appearance-none border-none bg-transparent pr-6 text-sm focus:ring-0"
                            >
                                <option value={2024}>Năm 2024</option>
                                <option value={2025}>Năm 2025</option>
                                <option value={2026}>Năm 2026</option>
                                <option value={2027}>Năm 2027</option>
                            </select>
                        </div>

                        <div className="flex items-center border-b border-gray-300 pb-1">
                            <span className="material-symbols-outlined mr-2 text-sm text-gray-400">date_range</span>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="cursor-pointer appearance-none border-none bg-transparent pr-6 text-sm focus:ring-0"
                            >
                                <option value="Tất cả">Tất cả các tháng</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>Tháng {i + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="cursor-pointer rounded bg-gray-100 px-3 py-1.5 text-sm focus:outline-none"
                        >
                            <option value="Tất cả">Tất cả</option>
                            <option value="PENDING">Chờ chuyển khoản</option>
                            <option value="PAID">Đã thanh toán</option>
                            <option value="CONFIRMED">Xác nhận</option>
                            <option value="CHECKED_IN">Đang lưu trú</option>
                        </select>
                    </div>
                </div>

                {/* Table List */}
                <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                            <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Mã Đơn</th>
                                <th className="px-6 py-4">Khách Hàng (Email)</th>
                                <th className="px-6 py-4">Hạng Phòng</th>
                                <th className="px-6 py-4">Ngày Lưu Trú</th>
                                <th className="px-6 py-4 text-right">Tổng Tiền</th>
                                <th className="px-6 py-4 text-center">Trạng Thái</th>
                            </tr>
                            </thead>
                            <tbody className="text-sm">
                            {loading && allBookingsFromAPI.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">Đang đồng bộ dữ liệu từ Cloud Supabase...</td>
                                </tr>
                            ) : displayedBookings.length > 0 ? (
                                displayedBookings.map((booking) => {
                                    const checkIn = booking.check_in || booking.checkIn || booking.checkInDate;
                                    const checkOut = booking.check_out || booking.checkOut || booking.checkOutDate;
                                    const email = booking.guest_email || booking.customerEmail || "No Email";
                                    const name = booking.guest_name || booking.customerName || "Khách vãng lai";

                                    return (
                                        <tr
                                            key={booking.id}
                                            onClick={() => setSelectedBooking(booking)}
                                            className={`group cursor-pointer border-b border-gray-50 transition-colors hover:bg-gray-50 ${selectedBooking?.id === booking.id ? 'bg-gray-50' : ''}`}
                                        >
                                            <td className="px-6 py-4 font-bold text-amber-700">{booking.booking_code || booking.bookingCode || `BK-${booking.id}`}</td>
                                            <td className="px-6 py-4 font-medium">
                                                <div>{name}</div>
                                                <div className="text-xs text-gray-400 font-normal">{email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{booking.room_type_name || booking.roomTypeName || "Standard Room"}</td>
                                            <td className="px-6 py-4 text-gray-600 font-mono text-xs">{`${checkIn} ➔ ${checkOut}`}</td>
                                            <td className="px-6 py-4 text-right font-medium">{Number(booking.total_price || booking.totalPrice || 0).toLocaleString()}đ</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                                                    {booking.status || "PENDING"}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">Không tìm thấy đơn đặt nào khớp với bộ lọc tháng {selectedMonth}/{selectedYear}.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: INFO DETAILS */}
            <aside className="sticky top-24 flex h-[calc(100vh-8rem)] w-80 flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm">
                {selectedBooking ? (
                    <>
                        <div className="relative h-32 overflow-hidden bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500"
                                alt="Room Thumbnail"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                            <div>
                                <h3 className="mb-1 text-lg font-bold text-gray-800">
                                    {selectedBooking.guest_name || selectedBooking.customerName || "Khách Hàng"}
                                </h3>
                                <p className="flex items-center gap-1 text-sm text-gray-500">
                                    <span className="material-symbols-outlined text-xs">mail</span>
                                    {selectedBooking.guest_email || selectedBooking.customerEmail || "N/A"}
                                </p>
                                <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                    <span className="material-symbols-outlined text-xs">flag</span>
                                    Quốc tịch: {selectedBooking.guest_nationality || "Việt Nam"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
                                <div>
                                    <p className="mb-1 text-[10px] uppercase font-semibold text-gray-400 tracking-wider">CHECK-IN</p>
                                    <p className="text-xs font-medium text-gray-700 font-mono">
                                        {selectedBooking.check_in || selectedBooking.checkIn || selectedBooking.checkInDate}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-1 text-[10px] uppercase font-semibold text-gray-400 tracking-wider">CHECK-OUT</p>
                                    <p className="text-xs font-medium text-gray-700 font-mono">
                                        {selectedBooking.check_out || selectedBooking.checkOut || selectedBooking.checkOutDate}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded border border-amber-200 bg-amber-50/50 p-3">
                                <p className="mb-1 flex items-center gap-1 text-[10px] font-bold text-amber-700">
                                    <span className="material-symbols-outlined text-[14px]">info</span>
                                    THÔNG TIN LƯU TRÚ
                                </p>
                                <p className="text-xs text-gray-600">
                                    Số lượng khách: <strong>{selectedBooking.total_guests || 2} người</strong><br/>
                                    Yêu cầu đặc biệt: <em>"{selectedBooking.special_requests || selectedBooking.specialRequests || "Không có"}"</em>
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 border-t border-gray-100 p-4 bg-gray-50">
                            <button
                                onClick={() => handleUpdateStatus(selectedBooking.id, "PAID")}
                                className="flex-1 rounded border border-gray-300 py-2 text-center text-sm font-medium text-gray-700 hover:bg-white transition-colors"
                            >
                                Xác nhận tiền
                            </button>
                            <button
                                onClick={() => handleUpdateStatus(selectedBooking.id, "CHECKED_IN")}
                                className="flex-1 rounded bg-amber-600 py-2 text-center text-sm font-medium text-white hover:bg-amber-700 shadow-sm transition-colors"
                            >
                                Check-in
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center text-sm text-gray-400 p-6 text-center">
                        Chọn một đơn đặt phòng từ danh sách để xem chi tiết.
                    </div>
                )}
            </aside>

            {/* Modal giữ nguyên form tạo của bạn */}
            {isModalOpen && (
                /* ... Toàn bộ khối code overlay Modal giữ nguyên 100% như cũ của bạn ... */
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between border-b pb-3">
                            <h3 className="text-lg font-bold text-gray-800">Tạo Đơn Đặt Phòng Mới (Admin)</h3>
                            <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined text-gray-400">close</button>
                        </div>
                        <form onSubmit={handleCreateBooking} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Tên khách hàng *</label>
                                <input type="text" required className="w-full border rounded p-2 text-sm" value={newBooking.customerName} onChange={e => setNewBooking({...newBooking, customerName: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                                    <input type="email" className="w-full border rounded p-2 text-sm" value={newBooking.customerEmail} onChange={e => setNewBooking({...newBooking, customerEmail: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Số điện thoại *</label>
                                    <input type="text" required className="w-full border rounded p-2 text-sm" value={newBooking.customerPhone} onChange={e => setNewBooking({...newBooking, customerPhone: e.target.value})} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-500">Hủy</button>
                                <button type="submit" className="bg-black text-amber-500 font-bold px-5 py-2 text-sm rounded">Lưu đơn</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AdminBookingPage;