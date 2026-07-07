// import React from "react";
//
// const SuccessPage: React.FC = () => {
//     return (
//         <div
//             className="bg-background text-on-background font-body-md antialiased selection:bg-secondary/20 selection:text-primary min-h-screen">
//             {/* HERO */}
//             <section
//                 className="relative w-full min-h-[45vh] flex flex-col items-center justify-center overflow-hidden pt-24">
//                 {/* Background */}
//                 <div className="absolute inset-0 z-0">
//                     <img
//                         src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
//                         alt="Luxury Hotel"
//                         className="w-full h-full object-cover blur-md opacity-40 scale-105"
//                     />
//
//                     <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-background"></div>
//                 </div>
//
//                 {/* Content */}
//                 <div className="relative z-10 flex flex-col items-center text-center px-5 md:px-16 max-w-4xl mx-auto">
//                     <div
//                         className="mb-8 p-4 rounded-full bg-white/50 backdrop-blur-sm border border-secondary/20 shadow-xl">
//             <span
//                 className="material-symbols-outlined text-[72px] text-secondary"
//                 style={{
//                     fontVariationSettings: "'FILL' 1",
//                 }}
//             >
//               check_circle
//             </span>
//                     </div>
//
//                     <h1 className="font-serif text-5xl md:text-7xl font-semibold text-primary mb-6">
//                         Cảm ơn quý khách!
//                     </h1>
//
//                     <p className="text-lg leading-8 text-on-surface-variant mb-12 max-w-2xl">
//                         Đặt phòng của bạn đã được xác nhận thành công. Chúng tôi rất mong
//                         được chào đón bạn đến với trải nghiệm nghỉ dưỡng tuyệt vời.
//                     </p>
//
//                     {/* Booking Status */}
//                     <div
//                         className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-outline-variant/30 rounded-full px-8 py-4 shadow-sm">
//                         <div className="flex flex-col items-center sm:items-start">
//               <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-1">
//                 Mã Đặt Phòng
//               </span>
//
//                             <span className="text-2xl font-semibold tracking-wide text-primary">
//                 #LHL-987654
//               </span>
//                         </div>
//
//                         <div className="hidden sm:block w-px h-12 bg-outline-variant/30"></div>
//
//                         <div className="flex items-center gap-3 text-secondary">
//               <span
//                   className="material-symbols-outlined"
//                   style={{
//                       fontVariationSettings: "'FILL' 1",
//                   }}
//               >
//                 verified_user
//               </span>
//
//                             <span className="text-xs uppercase tracking-[0.2em]">
//                 Đã thanh toán toàn bộ
//               </span>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* MAIN */}
//             <main className="max-w-7xl mx-auto px-5 md:px-16 py-16 md:py-24">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//                     {/* LEFT */}
//                     <div className="lg:col-span-8 flex flex-col gap-12">
//                         {/* Booking Summary */}
//                         <div
//                             className="bg-white border border-outline-variant/30 p-8 md:p-12 relative overflow-hidden rounded-xl">
//                             <div
//                                 className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
//
//                             <h2 className="text-3xl font-serif mb-8 border-b border-outline-variant/20 pb-4">
//                                 Chi tiết đặt phòng
//                             </h2>
//
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
//                                 {/* Guest */}
//                                 <div className="flex flex-col gap-2">
//                   <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
//                     Khách lưu trú
//                   </span>
//
//                                     <span className="text-xl font-medium text-primary">
//                     Nguyễn Văn A
//                   </span>
//
//                                     <span className="text-on-surface-variant">
//                     0901 234 567
//                   </span>
//
//                                     <span className="text-on-surface-variant">
//                     abc@gmail.com
//                   </span>
//                                 </div>
//
//                                 {/* Room */}
//                                 <div className="flex flex-col gap-2">
//                   <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
//                     Loại phòng
//                   </span>
//
//                                     <span className="text-2xl font-serif text-primary">
//                     Phòng Deluxe Hướng Biển
//                   </span>
//
//                                     <span className="flex items-center gap-2 text-on-surface-variant">
//                     <span className="material-symbols-outlined text-[18px]">
//                       group
//                     </span>
//                     2 Người lớn, 1 Trẻ em
//                   </span>
//                                 </div>
//
//                                 {/* Dates */}
//                                 <div
//                                     className="flex flex-col gap-2 md:col-span-2 pt-6 border-t border-outline-variant/10">
//                   <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
//                     Thời gian
//                   </span>
//
//                                     <div className="flex items-center gap-6 mt-2 flex-wrap">
//                                         <div>
//                       <span className="block text-2xl font-serif text-primary">
//                         15 Th11
//                       </span>
//
//                                             <span className="block text-on-surface-variant">
//                         Nhận phòng (14:00)
//                       </span>
//                                         </div>
//
//                                         <span className="material-symbols-outlined text-outline">
//                       arrow_right_alt
//                     </span>
//
//                                         <div>
//                       <span className="block text-2xl font-serif text-primary">
//                         17 Th11
//                       </span>
//
//                                             <span className="block text-on-surface-variant">
//                         Trả phòng (12:00)
//                       </span>
//                                         </div>
//
//                                         <div className="ml-auto bg-surface-variant px-4 py-2 rounded-full">
//                       <span className="text-xs tracking-[0.2em] font-medium">
//                         2 ĐÊM
//                       </span>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* Total */}
//                                 <div
//                                     className="flex flex-col gap-2 md:col-span-2 pt-6 border-t border-outline-variant/10">
//                                     <div className="flex justify-between items-end">
//                     <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
//                       Tổng cộng
//                     </span>
//
//                                         <span className="text-4xl font-serif text-primary">
//                       5.650.000 ₫
//                     </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* ACTIONS */}
//                         <div className="flex flex-col sm:flex-row gap-4 items-center">
//                             <button
//                                 className="w-full sm:w-auto px-8 py-4 bg-primary text-white uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 hover:opacity-90 transition rounded-lg">
//                 <span className="material-symbols-outlined text-[18px]">
//                   download
//                 </span>
//                                 Tải PDF
//                             </button>
//
//                             <button
//                                 className="w-full sm:w-auto px-8 py-4 border border-outline text-primary uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition rounded-lg">
//                 <span className="material-symbols-outlined text-[18px]">
//                   calendar_add_on
//                 </span>
//                                 Thêm lịch
//                             </button>
//
//                             <button className="text-outline underline underline-offset-4 sm:ml-auto">
//                                 In xác nhận
//                             </button>
//                         </div>
//
//                         {/* TIMELINE */}
//                         <div className="bg-surface-container-low border border-outline-variant/20 p-8 rounded-xl">
//                             <h3 className="text-2xl font-serif mb-8">
//                                 Chuẩn bị cho chuyến đi
//                             </h3>
//
//                             <div className="flex flex-col gap-8 relative">
//                                 <div className="absolute left-[11px] top-2 bottom-2 w-px bg-outline-variant/30"></div>
//
//                                 {[
//                                     {
//                                         icon: "check_circle",
//                                         title: "Đặt phòng thành công",
//                                         desc: "Hệ thống đã ghi nhận thanh toán của bạn.",
//                                     },
//                                     {
//                                         icon: "mail",
//                                         title: "Email xác nhận đã gửi",
//                                         desc: "Vui lòng kiểm tra cả hộp thư Spam.",
//                                     },
//                                     {
//                                         icon: "hotel",
//                                         title: "Nhận phòng ngày 15/11",
//                                         desc: "Check-in từ 14:00 tại quầy lễ tân.",
//                                     },
//                                 ].map((item, index) => (
//                                     <div key={index} className="flex gap-4 relative z-10">
//                                         <div
//                                             className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
//                       <span className="material-symbols-outlined text-white text-[14px]">
//                         {item.icon}
//                       </span>
//                                         </div>
//
//                                         <div>
//                                             <div className="text-lg font-medium text-primary">
//                                                 {item.title}
//                                             </div>
//
//                                             <div className="text-on-surface-variant">
//                                                 {item.desc}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* RIGHT */}
//                     <div className="lg:col-span-4 flex flex-col gap-6">
//                         {/* Weather */}
//                         <div
//                             className="bg-surface-container-low p-8 border border-outline-variant/20 rounded-xl flex flex-col items-center text-center justify-center">
//               <span className="material-symbols-outlined text-[48px] text-secondary mb-4">
//                 wb_sunny
//               </span>
//
//                             <h4 className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">
//                                 Thời tiết dự kiến
//                             </h4>
//
//                             <span className="text-4xl font-serif text-primary mb-2">
//                 28°C
//               </span>
//
//                             <span className="text-on-surface-variant">
//                 Nắng đẹp tại Phú Quốc
//               </span>
//                         </div>
//
//                         {/* Discovery */}
//                         <div className="group relative h-[240px] overflow-hidden rounded-xl cursor-pointer">
//                             <div
//                                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
//                                 style={{
//                                     backgroundImage:
//                                         "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop')",
//                                 }}
//                             ></div>
//
//                             <div
//                                 className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
//
//                             <div className="absolute bottom-0 p-6">
//                 <span className="text-xs uppercase tracking-[0.2em] text-white/80 mb-2 block">
//                   KHÁM PHÁ
//                 </span>
//
//                                 <h4 className="text-2xl font-serif text-white">
//                                     Rooftop Pool & Sunset Bar
//                                 </h4>
//                             </div>
//                         </div>
//
//                         {/* Spa */}
//                         <div
//                             className="group relative h-[300px] overflow-hidden rounded-xl border border-outline-variant/20 cursor-pointer">
//                             <div
//                                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
//                                 style={{
//                                     backgroundImage:
//                                         "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop')",
//                                 }}
//                             ></div>
//
//                             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
//
//                             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
//                 <span className="material-symbols-outlined text-[32px] text-white mb-4">
//                   spa
//                 </span>
//
//                                 <h4 className="text-3xl font-serif text-white mb-4">
//                                     Luxury Spa Retreat
//                                 </h4>
//
//                                 <p className="text-white/80 mb-6 leading-7">
//                                     Thư giãn với liệu trình spa cao cấp và không gian yên bình.
//                                 </p>
//
//                                 <button
//                                     className="px-6 py-3 border border-white text-white uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition rounded-lg">
//                                     Đặt Ngay
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }
// export default SuccessPage;


import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
    const location = useLocation();

    // Lấy dữ liệu booking từ trang thanh toán gửi sang
    const bookingData = location.state?.bookingData;

    // Nếu không có dữ liệu (người dùng f5 hoặc gõ trực tiếp URL), điều hướng về trang chủ
    if (!bookingData) {
        return <Navigate to="/" replace />;
    }

    // Format tiền tệ
    const currencyFormatter = (value: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    // Tính toán số ngày lưu trú
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

    // Hàm tạo và tải file .ics (Thêm vào Lịch)
    const handleAddCalendar = () => {
        // Định dạng ngày theo chuẩn ICS: YYYYMMDDTHHMMSSZ
        const formatICSDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT",
            `DTSTART:${formatICSDate(checkInDate)}`,
            `DTEND:${formatICSDate(checkOutDate)}`,
            `SUMMARY:Lưu trú tại L'Héritage - ${bookingData.bookingCode}`,
            `DESCRIPTION:Mã đặt phòng: ${bookingData.bookingCode}\\nKhách hàng: ${bookingData.guestName}\\nLiên hệ: ${bookingData.guestPhone}`,
            "LOCATION:L'Héritage Luxury Hotel",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join('\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `booking-${bookingData.bookingCode}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Hàm xuất PDF thông qua giao diện In của trình duyệt
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <div className="bg-background text-on-background font-body-md antialiased selection:bg-secondary/20 selection:text-primary min-h-screen">
            {/* HERO */}
            <section className="relative w-full min-h-[45vh] flex flex-col items-center justify-center overflow-hidden pt-24 print:min-h-0 print:pt-10">
                <div className="absolute inset-0 z-0 print:hidden">
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury Hotel"
                        className="w-full h-full object-cover blur-md opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-background"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center px-5 md:px-16 max-w-4xl mx-auto">
                    <div className="mb-8 p-4 rounded-full bg-white/50 backdrop-blur-sm border border-secondary/20 shadow-xl print:shadow-none print:border-none">
                        <span className="material-symbols-outlined text-[72px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                        </span>
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl font-semibold text-primary mb-6">
                        Cảm ơn quý khách!
                    </h1>

                    <p className="text-lg leading-8 text-on-surface-variant mb-12 max-w-2xl print:hidden">
                        Đặt phòng của bạn đã được xác nhận thành công. Chúng tôi rất mong được chào đón bạn đến với trải nghiệm nghỉ dưỡng tuyệt vời.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-outline-variant/30 rounded-full px-8 py-4 shadow-sm print:border-none print:shadow-none">
                        <div className="flex flex-col items-center sm:items-start">
                            <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-1">
                                Mã Đặt Phòng
                            </span>
                            <span className="text-2xl font-semibold tracking-wide text-primary">
                                #{bookingData.bookingCode}
                            </span>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-outline-variant/30"></div>
                        <div className="flex items-center gap-3 text-secondary">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                verified_user
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em]">
                                Đã thanh toán
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN */}
            <main className="max-w-7xl mx-auto px-5 md:px-16 py-16 md:py-24 print:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT (THÔNG TIN PHÒNG) */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        <div className="bg-white border border-outline-variant/30 p-8 md:p-12 relative overflow-hidden rounded-xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>

                            <h2 className="text-3xl font-serif mb-8 border-b border-outline-variant/20 pb-4">
                                Chi tiết đặt phòng
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Khách lưu trú</span>
                                    <span className="text-xl font-medium text-primary">{bookingData.guestName}</span>
                                    <span className="text-on-surface-variant">{bookingData.guestPhone}</span>
                                    <span className="text-on-surface-variant">{bookingData.guestEmail}</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Chi tiết phòng</span>
                                    <span className="text-2xl font-serif text-primary">Phòng lưu trú cao cấp</span>
                                    <span className="flex items-center gap-2 text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[18px]">group</span>
                                        Tổng {bookingData.totalGuests} khách
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2 pt-6 border-t border-outline-variant/10">
                                    <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Thời gian</span>
                                    <div className="flex items-center gap-6 mt-2 flex-wrap">
                                        <div>
                                            <span className="block text-2xl font-serif text-primary">
                                                {checkInDate.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short' })}
                                            </span>
                                            <span className="block text-on-surface-variant">Nhận phòng (14:00)</span>
                                        </div>
                                        <span className="material-symbols-outlined text-outline">arrow_right_alt</span>
                                        <div>
                                            <span className="block text-2xl font-serif text-primary">
                                                {checkOutDate.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short' })}
                                            </span>
                                            <span className="block text-on-surface-variant">Trả phòng (12:00)</span>
                                        </div>
                                        <div className="ml-auto bg-surface-variant px-4 py-2 rounded-full">
                                            <span className="text-xs tracking-[0.2em] font-medium">{nights} ĐÊM</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2 pt-6 border-t border-outline-variant/10">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Tổng cộng</span>
                                        <span className="text-4xl font-serif text-primary">{currencyFormatter(bookingData.totalPrice)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS (CÁC NÚT TƯƠNG TÁC) - Bị ẩn khi in PDF */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center print:hidden">
                            <button onClick={handleDownloadPDF} className="w-full sm:w-auto px-8 py-4 bg-primary text-white uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 hover:opacity-90 transition rounded-lg">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Tải PDF / In
                            </button>

                            <button onClick={handleAddCalendar} className="w-full sm:w-auto px-8 py-4 border border-outline text-primary uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition rounded-lg">
                                <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                                Thêm lịch
                            </button>
                        </div>

                        {/* ĐIỀU HƯỚNG */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-outline-variant/20 pt-6 print:hidden">
                            <Link to="/" className="w-full sm:w-auto px-6 py-3 bg-surface-variant hover:bg-neutral-200 text-on-surface uppercase tracking-[0.15em] text-xs font-semibold text-center transition rounded-lg">
                                Về Trang chủ
                            </Link>
                            <Link to="/history" className="w-full sm:w-auto px-6 py-3 border border-outline text-primary hover:bg-gray-50 uppercase tracking-[0.15em] text-xs font-semibold text-center transition rounded-lg sm:ml-auto">
                                Lịch sử đặt phòng
                            </Link>
                        </div>

                    </div>

                    {/* RIGHT (THỜI TIẾT, QUẢNG CÁO) - Bị ẩn khi in PDF */}
                    <div className="lg:col-span-4 flex flex-col gap-6 print:hidden">
                        <div className="bg-surface-container-low p-8 border border-outline-variant/20 rounded-xl flex flex-col items-center text-center justify-center">
                            <span className="material-symbols-outlined text-[48px] text-secondary mb-4">wb_sunny</span>
                            <h4 className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Thời tiết dự kiến</h4>
                            <span className="text-4xl font-serif text-primary mb-2">28°C</span>
                            <span className="text-on-surface-variant">Nắng đẹp tại Phú Quốc</span>
                        </div>

                        <div className="bg-surface-container-low p-8 border border-outline-variant/20 rounded-xl flex flex-col items-center text-center justify-center">
                                <span className="material-symbols-outlined text-[48px] text-secondary mb-4">wb_sunny</span>
                                <h4 className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Thời tiết dự kiến</h4>
                                <span className="text-4xl font-serif text-primary mb-2">28°C</span>
                                <span className="text-on-surface-variant">Nắng đẹp tại Phú Quốc</span>
                        </div>

                        <div className="bg-surface-container-low p-8 border border-outline-variant/20 rounded-xl flex flex-col items-center text-center justify-center">

                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
};
export default SuccessPage;