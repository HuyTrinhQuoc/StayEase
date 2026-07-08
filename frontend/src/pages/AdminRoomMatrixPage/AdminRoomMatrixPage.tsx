import { useEffect, useState } from "react";
import axios from "axios";
import { format, addDays, parseISO, eachDayOfInterval } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar, RefreshCw, AlertCircle } from "lucide-react";

interface RoomInventoryRow {
    roomTypeId: number;
    roomTypeName: string;
    inventoryMap: { [dateStr: string]: number };
}

const RoomMatrixPage = () => {
    // Đặt ngày bắt đầu hiển thị mặc định (Khớp với dữ liệu của bạn)
    const [startDate, setStartDate] = useState<Date>(new Date("2026-07-07"));

    // Ma trận hiển thị theo khối 7 ngày liên tiếp để giao diện cân đối, không bị vỡ màn hình
    const daysToShow = 7;

    const [inventoryRows, setInventoryRows] = useState<RoomInventoryRow[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Tự động tính toán mảng ngày kết thúc và dải ngày hiển thị trên Header
    const endDate = addDays(startDate, daysToShow - 1);
    const matrixDates = eachDayOfInterval({ start: startDate, end: endDate }).map(date =>
        format(date, "yyyy-MM-dd")
    );

    // Hàm gọi API thật kết nối trực tiếp đến Spring Boot -> Supabase
    const fetchInventoryMatrix = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
            const response = await axios.get("http://localhost:8080/api/admin/room-matrix", {
                params: {
                    start: format(startDate, "yyyy-MM-dd"),
                    end: format(endDate, "yyyy-MM-dd")
                }
            });

            // Gán dữ liệu thật từ DB, không set cứng
            if (response.data && Array.isArray(response.data)) {
                setInventoryRows(response.data);
            } else {
                setInventoryRows([]);
            }
        } catch (error: any) {
            console.error("Lỗi kết nối API ma trận phòng:", error);
            setErrorMsg("Không thể kết nối tới máy chủ API. Vui lòng kiểm tra lại kết nối Spring Boot.");
            setInventoryRows([]);
        } finally {
            setLoading(false);
        }
    };

    // Chạy lại mỗi khi thay đổi ngày trên bộ lọc lịch (Hỗ trợ lướt xem đến tháng 10)
    useEffect(() => {
        fetchInventoryMatrix();
    }, [startDate]);

    // Các hàm dịch chuyển tuần động
    const handlePrevWeek = () => setStartDate(prev => addDays(prev, -7));
    const handleNextWeek = () => setStartDate(prev => addDays(prev, 7));
    const handleToToday = () => setStartDate(new Date());

    // Đổ màu trạng thái phòng động dựa trên số phòng trống từ Database
    const getBlockStyle = (availableCount: number | undefined) => {
        if (availableCount === undefined) {
            return "bg-gray-100 border-gray-300 text-gray-400 border-dashed";
        }
        if (availableCount === 0) {
            return "bg-red-100 border-red-400 text-red-800 font-bold"; // Đã có người đặt kín
        }
        if (availableCount <= 2) {
            return "bg-amber-100 border-amber-400 text-amber-800 font-semibold"; // Sắp hết phòng
        }
        return "bg-green-50 border-green-500 border-dashed text-green-700"; // Còn nhiều phòng trống
    };

    return (
        <main className="p-8 min-h-screen bg-gray-50 flex flex-col pt-24">
            {/* Header điều hướng */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-8 gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">
                        DỮ LIỆU ĐỒNG BỘ SUPABASE (REALTIME)
                    </p>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="text-indigo-600" size={24} />
                        Ma trận Kiểm soát Lịch Phòng trống
                    </h1>
                </div>

                {/* Bộ lọc ngày tháng động */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleToToday}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
                    >
                        Hôm nay
                    </button>

                    <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                        <button onClick={handlePrevWeek} className="p-2 hover:bg-white rounded-lg text-gray-700 transition-all shadow-sm">
                            <ChevronLeft size={16} />
                        </button>

                        {/* Thay đổi ngày ở đây để kiểm tra dữ liệu kéo dài đến tháng 10 */}
                        <input
                            type="date"
                            value={format(startDate, "yyyy-MM-dd")}
                            onChange={(e) => e.target.value && setStartDate(new Date(e.target.value))}
                            className="bg-transparent border-none text-sm font-semibold text-gray-700 px-3 py-1 focus:outline-none cursor-pointer"
                        />

                        <button onClick={handleNextWeek} className="p-2 hover:bg-white rounded-lg text-gray-700 transition-all shadow-sm">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <button
                        onClick={fetchInventoryMatrix}
                        className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl border border-gray-200 bg-white transition-all shadow-sm"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Chú thích trạng thái */}
            <div className="flex flex-wrap items-center gap-6 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-xs font-medium">
                <span className="text-gray-400 uppercase tracking-wider">Trạng thái:</span>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-green-500 bg-green-50 border-dashed"></div>
                    <span className="text-gray-600">Phòng trống (Available)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-amber-400 bg-amber-100"></div>
                    <span className="text-gray-600">Sắp hết phòng (Còn ≤ 2)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-red-500 bg-red-100"></div>
                    <span className="text-gray-600">Hết phòng trống (Occupied)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-gray-300 bg-gray-100 border-dashed"></div>
                    <span className="text-gray-600">Chưa thiết lập lịch dưới DB</span>
                </div>
            </div>

            {/* Bảng hiển thị kết quả */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md flex-1 flex flex-col">
                <div className="grid grid-cols-[260px_1fr] border-b border-gray-200 bg-gray-50 font-bold text-gray-700">
                    <div className="p-4 border-r border-gray-200 flex items-center justify-center text-xs uppercase tracking-wider text-gray-400">
                        Hạng Phòng
                    </div>
                    <div className="grid grid-cols-7 text-center">
                        {matrixDates.map((dateStr) => {
                            const dateObj = parseISO(dateStr);
                            return (
                                <div key={dateStr} className="p-3 border-r last:border-r-0 border-gray-200 flex flex-col justify-center">
                                    <span className="text-xs text-gray-400 uppercase font-medium">
                                        {format(dateObj, "eee", { locale: vi })}
                                    </span>
                                    <span className="text-base text-indigo-600 font-bold mt-0.5">
                                        {format(dateObj, "dd/MM")}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="text-center py-20 text-sm text-gray-400">
                            <RefreshCw className="animate-spin inline-block mr-2 text-indigo-600" size={18} />
                            Đang kết nối kho phòng Supabase...
                        </div>
                    ) : errorMsg ? (
                        <div className="text-center py-20 text-sm text-red-500 flex flex-col items-center justify-center gap-2">
                            <AlertCircle size={24} />
                            {errorMsg}
                        </div>
                    ) : inventoryRows.length > 0 ? (
                        inventoryRows.map((row) => (
                            <div
                                key={row.roomTypeId}
                                className="grid grid-cols-[260px_1fr] border-b border-gray-200 h-24 hover:bg-gray-50/40 transition-colors last:border-b-0"
                            >
                                <div className="p-5 flex flex-col justify-center bg-white border-r border-gray-200">
                                    <span className="font-bold text-gray-800 text-sm leading-tight">{row.roomTypeName}</span>
                                    <span className="text-[11px] text-gray-400 font-mono mt-1.5 bg-gray-100 px-2 py-0.5 rounded w-max">
                                        ID: #{row.roomTypeId}
                                    </span>
                                </div>

                                <div className="grid grid-cols-7 h-full p-2.5 gap-2.5">
                                    {matrixDates.map((dateStr) => {
                                        const count = row.inventoryMap[dateStr];
                                        return (
                                            <div
                                                key={dateStr}
                                                className={`border rounded-xl flex flex-col items-center justify-center transition-all p-1 cursor-pointer select-none hover:scale-[1.02] shadow-sm ${getBlockStyle(count)}`}
                                                title={`Ngày: ${dateStr}\nSố phòng trống: ${count ?? "N/A"}`}
                                            >
                                                <span className="text-lg font-extrabold">
                                                    {count !== undefined ? count : "-"}
                                                </span>
                                                <span className="text-[10px] uppercase tracking-wider opacity-70 font-medium mt-0.5">
                                                    {count === undefined ? "N/A" : count === 0 ? "Hết phòng" : "Trống"}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-sm text-gray-400">
                            Không tìm thấy dữ liệu phòng cho tuần này. Hãy chuyển lịch sang dải ngày khác.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default RoomMatrixPage;