const AdminBookingPage = () => {
    return (
        <main className="flex gap-8 bg-surface-container-lowest p-8 min-h-screen pt-24">
            {/* Left Side */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="font-headline-md text-headline-md text-primary">
                            Quản lý Đặt phòng
                        </h2>

                        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                            Tổng quan trạng thái và chi tiết các giao dịch lưu trú hiện tại.
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
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative w-full max-w-xs">
                            <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-outline-variant">
                                search
                            </span>

                            <input
                                type="text"
                                placeholder="Tìm mã đơn, tên khách..."
                                className="w-full border-b border-primary bg-transparent py-2 pr-4 pl-9 text-sm font-body-md transition-colors focus:border-secondary focus:outline-none"
                            />
                        </div>

                        <div className="group relative flex items-center border-b border-primary pb-1 transition-colors focus-within:border-secondary">
                            <span className="material-symbols-outlined mr-2 text-sm text-outline-variant">
                                date_range
                            </span>

                            <select className="cursor-pointer appearance-none border-none bg-transparent pr-6 text-sm text-on-surface focus:ring-0">
                                <option>15/11/2024 - 22/11/2024</option>
                                <option>Tháng này</option>
                            </select>

                            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-sm text-outline-variant">
                                arrow_drop_down
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                            Trạng thái:
                        </span>

                        <select className="cursor-pointer rounded bg-surface-container px-3 py-1.5 text-sm focus:ring-1 focus:ring-secondary">
                            <option>Tất cả</option>
                            <option>Đã thanh toán</option>
                            <option>Chờ chuyển khoản</option>
                            <option>Đang lưu trú</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="ghost-border flex flex-1 flex-col overflow-hidden rounded-xl bg-surface shadow-sm">
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                            <tr className="border-b border-outline-variant bg-surface-container-low font-label-caps text-label-caps text-on-surface-variant">
                                <th className="px-6 py-4 font-medium">
                                    Mã Đơn
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Tên Khách Hàng
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Hạng Phòng
                                </th>

                                <th className="px-6 py-4 font-medium">
                                    Ngày Lưu Trú
                                </th>

                                <th className="px-6 py-4 text-right font-medium">
                                    Tổng Tiền
                                </th>

                                <th className="px-6 py-4 text-center font-medium">
                                    Trạng Thái
                                </th>

                                <th className="px-6 py-4 text-right font-medium">
                                    Hành Động
                                </th>
                            </tr>
                            </thead>

                            <tbody className="text-sm font-body-md">
                            <tr className="group cursor-pointer border-b border-outline-variant bg-surface-container-low transition-colors hover:bg-surface-container">
                                <td className="px-6 py-4 font-medium text-primary">
                                    #LHL-1024
                                </td>

                                <td className="px-6 py-4">
                                    Nguyễn Văn A
                                </td>

                                <td className="px-6 py-4 text-on-surface-variant">
                                    Deluxe Ocean
                                </td>

                                <td className="px-6 py-4">
                                    15/11 - 17/11
                                </td>

                                <td className="px-6 py-4 text-right font-medium">
                                    5.802.500đ
                                </td>

                                <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center rounded-full border border-[#1e8e3e]/20 bg-[#e6f4ea] px-2.5 py-0.5 text-xs font-medium text-[#1e8e3e]">
                                            Đã thanh toán
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
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-outline-variant bg-surface p-4">
                        <span className="text-sm text-on-surface-variant">
                            Hiển thị 1-3 trong 124 kết quả
                        </span>

                        <div className="flex gap-1">
                            <button className="rounded bg-surface-container-low px-3 py-1 text-sm font-medium text-primary">
                                1
                            </button>

                            <button className="rounded px-3 py-1 text-sm text-on-surface-variant hover:bg-surface-container-low">
                                2
                            </button>

                            <button className="rounded px-3 py-1 text-sm text-on-surface-variant hover:bg-surface-container-low">
                                3
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <aside className="ghost-border sticky top-24 flex h-[calc(100vh-8rem)] w-80 flex-col overflow-hidden rounded-xl bg-surface shadow-sm">
                <div className="relative h-32 overflow-hidden bg-surface-container-low">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFwATgp0Wv860H0G8maMIuQXZG82vx5WfH3RQjSIS3HVniK_VgaAMRxreKdtTuTO7O-G0AC67t-YqI2MfPp5QQNOefZtdvZTkKiPzc0oaICVE-N3M8M7V7XYGDt45ztgsB4aTGOs2jlZSvgD6SEm-SLoLJYERXvFkGmjHgMLV1EnFfqtbF0CpKYX809Jaa2EgfZ1YKlJFqdT5MEgV_30bGkwWgDMKWxL64BODksvJkd0azYNm3NnZuSp7oCfoac5q5g7SyEizxruU"
                        alt="Room"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                    <div>
                        <h3 className="mb-1 text-lg text-primary">
                            Nguyễn Văn A
                        </h3>

                        <p className="flex items-center gap-1 text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-xs">
                                mail
                            </span>

                            nguyenvana@example.com
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-outline-variant py-4">
                        <div>
                            <p className="mb-1 text-[10px] text-on-surface-variant">
                                CHECK-IN
                            </p>

                            <p className="text-sm font-medium">
                                15/11/2024
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-[10px] text-on-surface-variant">
                                CHECK-OUT
                            </p>

                            <p className="text-sm font-medium">
                                17/11/2024
                            </p>
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
                            "Cần giường phụ và phòng view biển không hút thuốc."
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
            </aside>
        </main>
    );
};

export default AdminBookingPage;