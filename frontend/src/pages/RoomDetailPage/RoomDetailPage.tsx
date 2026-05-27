const RoomDetailPage = () => {
    return (
        <main className="bg-surface text-on-surface pt-28 pb-32 px-5 md:px-16 max-w-[1280px] mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm uppercase mb-8 text-gray-500">
                <span>Trang chủ</span>

                <span className="material-symbols-outlined text-sm">
          chevron_right
        </span>

                <span>Danh sách phòng</span>

                <span className="material-symbols-outlined text-sm">
          chevron_right
        </span>

                <span className="text-secondary">
          Phòng Deluxe Hướng Biển
        </span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-4xl md:text-6xl font-semibold mb-3 font-serif">
                        Phòng Deluxe Hướng Biển
                    </h1>

                    <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">
                star_half
              </span>
                        </div>

                        <span className="text-gray-500">
              4.8/5 (120 đánh giá)
            </span>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-3xl font-semibold text-secondary">
                        2.500.000đ
                    </p>

                    <p className="text-gray-500 text-sm uppercase">
                        / đêm
                    </p>
                </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16 h-[600px]">
                <div className="md:col-span-2 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                        alt="Room"
                        className="w-full h-full object-cover hover:scale-105 duration-700"
                    />
                </div>

                <div className="hidden md:grid grid-rows-2 gap-3">
                    <div className="overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1582719508461-905c673771fd"
                            alt="Bathroom"
                            className="w-full h-full object-cover hover:scale-105 duration-700"
                        />
                    </div>

                    <div className="overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                            alt="Balcony"
                            className="w-full h-full object-cover hover:scale-105 duration-700"
                        />

                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <button className="border border-white text-white px-5 py-2 uppercase tracking-widest text-sm hover:bg-white hover:text-black duration-300">
                                Xem tất cả ảnh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left */}
                <div className="lg:col-span-8 space-y-16">
                    {/* Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y py-8">
                        {[
                            {
                                icon: "square_foot",
                                title: "Diện tích",
                                value: "45m²",
                            },
                            {
                                icon: "group",
                                title: "Sức chứa",
                                value: "2 người",
                            },
                            {
                                icon: "bed",
                                title: "Giường",
                                value: "1 King-size",
                            },
                            {
                                icon: "waves",
                                title: "Tầm nhìn",
                                value: "Hướng biển",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center text-center gap-2"
                            >
                <span className="material-symbols-outlined text-4xl text-secondary">
                  {item.icon}
                </span>

                                <span className="uppercase text-xs tracking-widest text-gray-500">
                  {item.title}
                </span>

                                <span className="font-medium">
                  {item.value}
                </span>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 font-serif">
                            Tôn vinh vẻ đẹp đại dương
                        </h2>

                        <div className="space-y-5 text-gray-600 leading-8">
                            <p>
                                Phòng Deluxe Hướng Biển mang đến không gian nghỉ
                                dưỡng sang trọng với tầm nhìn trực diện biển tuyệt đẹp.
                            </p>

                            <p>
                                Nội thất hiện đại kết hợp phong cách tối giản thanh
                                lịch tạo nên trải nghiệm nghỉ dưỡng cao cấp và yên
                                bình.
                            </p>
                        </div>
                    </section>

                    {/* Amenities */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-8 font-serif">
                            Tiện nghi đẳng cấp
                        </h2>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                                    Phòng ngủ & Giải trí
                                </h3>

                                <ul className="space-y-4">
                                    {[
                                        "Smart TV 55-inch",
                                        "Wifi miễn phí",
                                        "Điều hòa riêng",
                                        "Két an toàn",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                      <span className="material-symbols-outlined">
                        check
                      </span>

                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                                    Phòng tắm
                                </h3>

                                <ul className="space-y-4">
                                    {[
                                        "Bồn tắm cao cấp",
                                        "Vòi sen mưa",
                                        "Áo choàng tắm",
                                        "Bộ vệ sinh cá nhân",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                      <span className="material-symbols-outlined">
                        check
                      </span>

                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Policies */}
                    <section className="bg-gray-50 p-8">
                        <h2 className="text-3xl font-semibold mb-8 font-serif">
                            Chính sách & Quy định
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 text-gray-600">
                            <div>
                                <h4 className="uppercase text-sm tracking-widest text-secondary mb-3">
                                    Nhận / Trả phòng
                                </h4>

                                <p>Nhận phòng: 14:00</p>
                                <p>Trả phòng: 12:00</p>
                            </div>

                            <div>
                                <h4 className="uppercase text-sm tracking-widest text-secondary mb-3">
                                    Chính sách hủy
                                </h4>

                                <p>
                                    Hủy miễn phí trước 48 giờ so với ngày nhận phòng.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right booking */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32 border p-8 shadow-sm">
                        <div className="border-b pb-6 mb-6">
                            <div className="flex items-end gap-3">
                <span className="text-4xl font-semibold">
                  2.500.000đ
                </span>

                                <span className="line-through text-gray-400">
                  3.000.000đ
                </span>
                            </div>

                            <p className="uppercase text-sm text-gray-500 mt-2">
                                / đêm
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="border p-4">
                                <p className="uppercase text-xs text-gray-500 mb-1">
                                    Nhận phòng
                                </p>

                                <p>15/11/2026</p>
                            </div>

                            <div className="border p-4">
                                <p className="uppercase text-xs text-gray-500 mb-1">
                                    Trả phòng
                                </p>

                                <p>17/11/2026</p>
                            </div>

                            <div className="border p-4">
                                <p className="uppercase text-xs text-gray-500 mb-1">
                                    Khách
                                </p>

                                <p>2 Người lớn</p>
                            </div>

                            <button className="w-full bg-black text-white py-4 uppercase tracking-widest hover:opacity-90 duration-300">
                                Đặt phòng ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile booking */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t px-4 py-3 flex justify-between items-center z-50">
                <div>
                    <p className="text-2xl font-semibold">
                        2.500.000đ
                    </p>

                    <p className="text-xs uppercase text-gray-500">
                        / đêm
                    </p>
                </div>

                <button className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm">
                    Đặt ngay
                </button>
            </div>
        </main>
    );
};

export default RoomDetailPage;