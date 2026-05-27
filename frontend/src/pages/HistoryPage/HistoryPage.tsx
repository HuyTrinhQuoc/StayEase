import { useState } from "react";

const bookingHistory = [
    {
        id: 1,
        hotel: "L'Héritage Saigon",
        date: "Tháng 5, 2024",
        room: "Premier City Room",
    },
    {
        id: 2,
        hotel: "L'Héritage Phu Quoc",
        date: "Tháng 12, 2023",
        room: "Beachfront Villa",
    },
];

export default function HistoryPage() {
    const [openVoucher, setOpenVoucher] = useState(false);

    return (
        <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
            <main className="max-w-7xl mx-auto px-5 lg:px-16 py-16 flex flex-col gap-20">
                {/* Welcome */}
                <section className="max-w-3xl">
                    <h1 className="text-5xl lg:text-7xl font-serif leading-tight text-black">
                        Chào mừng trở lại,
                        <br />
                        <span className="text-[#775a19]">Nguyễn Văn A</span>
                    </h1>

                    <p className="mt-8 pl-6 border-l-2 border-[#775a19] text-lg leading-8 text-[#44474d]">
                        Chuyến đi nghỉ dưỡng tiếp theo của bạn tại Đà Nẵng sẽ
                        diễn ra trong 14 ngày tới. Chúng tôi đang chuẩn bị mọi thứ
                        hoàn hảo nhất cho kỳ nghỉ của bạn.
                    </p>
                </section>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* LEFT */}
                    <div className="lg:col-span-8 flex flex-col gap-20">
                        {/* Upcoming */}
                        <section className="flex flex-col gap-8">
                            <div className="flex items-end justify-between border-b border-[#c5c6cd] pb-4">
                                <h2 className="text-4xl font-serif">
                                    Chuyến đi sắp tới
                                </h2>

                                <span className="text-xs tracking-[0.2em] uppercase text-[#44474d] font-semibold">
                  1 ĐẶT PHÒNG
                </span>
                            </div>

                            {/* Booking Card */}
                            <div className="bg-white border border-[#c5c6cd] p-6 flex flex-col gap-6 hover:border-[#775a19] transition-all duration-300">
                                {/* Top */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-3xl font-serif text-black">
                                            L'Héritage Danang Resort
                                        </h3>

                                        <div className="flex items-center gap-2 text-[#44474d]">
                      <span className="material-symbols-outlined text-[18px] text-[#775a19]">
                        calendar_month
                      </span>

                                            <span>
                        15 Tháng 10 - 18 Tháng 10, 2024
                      </span>
                                        </div>

                                        <p className="uppercase tracking-[0.2em] text-xs text-[#44474d] font-semibold mt-2">
                                            Mã đặt phòng: LR-84920
                                        </p>
                                    </div>

                                    <div className="px-4 py-2 border border-[#fed488] bg-[#fed488]/20 text-[#775a19] text-xs uppercase tracking-wider font-semibold w-fit">
                                        Đã xác nhận
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Image */}
                                    <div className="aspect-[1.3] overflow-hidden">
                                        <img
                                            src="https://lh3.googleusercontent.com/aida/ADBb0ujY5F0RB9WOZx0Hu6LMczrHcjYpgpEt9MZhKbqDQ3K2mKCcRd7-h6XqTbFNTgdc2upz3UivBABW79tI9B-gsupcieEQrvBmMUu9LvlpSA7CERuWY2UBSkFZfbg5KltMTBx-hecFFJ0m939JP1RSIqdzlk-rLmC6FGhFoLgvVYAGeit1_nRlBMirM3MyLSJg9JBOTcDmhBeIVz2MwBr9zmH-vFdFA7tWq1CBwYtvu9aFMVicrpX6AETwy6g"
                                            alt="room"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-col justify-between gap-8">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
                        <span className="text-[#44474d]">
                          Hạng phòng
                        </span>

                                                <span className="font-medium">
                          Ocean View Suite
                        </span>
                                            </div>

                                            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
                        <span className="text-[#44474d]">
                          Khách
                        </span>

                                                <span className="font-medium">
                          2 Người lớn
                        </span>
                                            </div>

                                            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
                        <span className="text-[#44474d]">
                          Dịch vụ
                        </span>

                                                <span className="font-medium text-right">
                          Ăn sáng, Đưa đón sân bay
                        </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setOpenVoucher(true)}
                                            className="bg-black text-white py-4 px-6 uppercase tracking-[0.15em] text-sm font-medium hover:bg-[#775a19] transition-all flex items-center justify-center gap-2"
                                        >
                      <span className="material-symbols-outlined text-[18px]">
                        qr_code
                      </span>

                                            Xem E-voucher
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 pt-4 border-t border-[#e5e2e1]">
                                    <button className="px-6 py-3 border border-[#c5c6cd] hover:border-[#775a19] hover:text-[#775a19] transition-all uppercase tracking-wide text-sm">
                                        Đổi ngày
                                    </button>

                                    <button className="px-6 py-3 border border-[#c5c6cd] hover:border-red-500 hover:text-red-500 transition-all uppercase tracking-wide text-sm">
                                        Yêu cầu hủy
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* History */}
                        <section className="flex flex-col gap-8">
                            <div className="flex items-end justify-between border-b border-[#c5c6cd] pb-4">
                                <h2 className="text-4xl font-serif">
                                    Lịch sử chuyến đi
                                </h2>

                                <button className="uppercase tracking-[0.2em] text-xs text-[#44474d] font-semibold">
                                    Xem tất cả
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {bookingHistory.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white border border-[#c5c6cd] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-[#775a19] transition-all"
                                    >
                                        <div>
                                            <h4 className="text-2xl font-serif">
                                                {item.hotel}
                                            </h4>

                                            <p className="text-[#44474d] mt-1">
                                                {item.date} • {item.room}
                                            </p>

                                            {item.id === 1 && (
                                                <div className="flex items-center gap-1 mt-2 text-[#775a19]">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className="material-symbols-outlined text-[18px]"
                                                        >
                              star
                            </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <button className="uppercase tracking-[0.15em] text-sm border-b border-black hover:text-[#775a19] hover:border-[#775a19] transition-all w-fit">
                                            Đặt lại
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT */}
                    <aside className="lg:col-span-4 sticky top-10">
                        <div className="bg-[#f6f3f2] border border-[#c5c6cd] p-8 flex flex-col gap-6">
                            <h3 className="text-3xl font-serif border-b border-[#c5c6cd] pb-4">
                                Hỗ trợ cá nhân
                            </h3>

                            <p className="text-[#44474d] leading-7">
                                Đội ngũ Concierge của chúng tôi luôn sẵn sàng hỗ trợ
                                mọi yêu cầu để đảm bảo kỳ nghỉ của bạn hoàn hảo nhất.
                            </p>

                            <div className="flex flex-col gap-4">
                                {[
                                    {
                                        icon: "chat",
                                        title: "Trò chuyện trực tiếp",
                                    },
                                    {
                                        icon: "room_service",
                                        title: "Yêu cầu đặc biệt",
                                    },
                                    {
                                        icon: "call",
                                        title: "Liên hệ tổng đài",
                                    },
                                ].map((item, index) => (
                                    <button
                                        key={index}
                                        className="bg-white border border-[#c5c6cd] p-4 flex items-center justify-between hover:border-[#775a19] transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#775a19]">
                        {item.icon}
                      </span>

                                            <span className="uppercase tracking-wide text-sm font-medium">
                        {item.title}
                      </span>
                                        </div>

                                        <span className="material-symbols-outlined text-[#75777e] group-hover:text-[#775a19] transition-all">
                      arrow_forward
                    </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Modal */}
            {openVoucher && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md p-8 relative">
                        <button
                            onClick={() => setOpenVoucher(false)}
                            className="absolute top-4 right-4 text-[#44474d] hover:text-black"
                        >
              <span className="material-symbols-outlined">
                close
              </span>
                        </button>

                        <div className="flex flex-col items-center text-center gap-6">
                            <h3 className="text-3xl font-serif">
                                L'Héritage Danang
                            </h3>

                            <p className="uppercase tracking-[0.2em] text-xs text-[#775a19] font-semibold">
                                E-VOUCHER CHECK-IN
                            </p>

                            {/* Fake QR */}
                            <div className="w-52 h-52 border-4 border-black p-4 grid grid-cols-2 gap-2">
                                <div className="bg-black"></div>
                                <div className="bg-black/50"></div>
                                <div className="bg-black/20"></div>
                                <div className="bg-black"></div>
                            </div>

                            <div className="w-full border-t border-[#e5e2e1] pt-6 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                  <span className="text-[#44474d]">
                    Mã số:
                  </span>

                                    <span>LR-84920</span>
                                </div>

                                <div className="flex items-center justify-between">
                  <span className="text-[#44474d]">
                    Tên khách:
                  </span>

                                    <span>Nguyễn Văn A</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}