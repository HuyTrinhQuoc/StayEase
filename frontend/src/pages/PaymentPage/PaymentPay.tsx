const PaymentPage = () => {
    return (
        <main className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 lg:grid-cols-12 lg:px-16">
                {/* LEFT SIDE */}
                <section className="lg:col-span-8 space-y-8">
                    {/* Progress */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 text-neutral-400">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-semibold">
                                    1
                                </div>
                                <span className="hidden text-xs uppercase tracking-[0.2em] md:block">
                  Chọn phòng
                </span>
                            </div>

                            <span className="material-symbols-outlined text-sm text-neutral-400">
                chevron_right
              </span>

                            <div className="flex items-center gap-2 text-black">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                                    2
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Thanh toán
                </span>
                            </div>

                            <span className="material-symbols-outlined text-sm text-neutral-400">
                chevron_right
              </span>

                            <div className="flex items-center gap-2 text-neutral-400">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-semibold">
                                    3
                                </div>
                                <span className="hidden text-xs uppercase tracking-[0.2em] md:block">
                  Hoàn tất
                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-[#f0eded] px-4 py-2 text-sm text-[#775a19]">
              <span className="material-symbols-outlined text-[18px]">
                timer
              </span>
                            <span className="uppercase tracking-[0.15em]">
                Giữ phòng: 10:00
              </span>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="mb-8 border-b border-neutral-200 pb-4 font-serif text-2xl">
                            Thông tin khách hàng
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    placeholder="+84"
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Quốc tịch
                                </label>

                                <select className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black">
                                    <option>Việt Nam</option>
                                    <option>Khác</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <input type="checkbox" className="h-4 w-4" />
                            <span className="text-sm">
                Tôi đặt phòng cho người khác
              </span>
                        </div>
                    </div>

                    {/* Special Request */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="mb-8 border-b border-neutral-200 pb-4 font-serif text-2xl">
                            Yêu cầu đặc biệt
                        </h2>

                        <div className="space-y-6">
                            <div className="max-w-sm">
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Giờ nhận phòng
                                </label>

                                <select className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black">
                                    <option>14:00 - 15:00</option>
                                    <option>15:00 - 18:00</option>
                                    <option>Sau 18:00</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Ghi chú
                                </label>

                                <textarea
                                    rows={4}
                                    placeholder="Yêu cầu thêm..."
                                    className="w-full rounded-lg border border-neutral-300 p-4 outline-none transition focus:border-black"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="mb-8 border-b border-neutral-200 pb-4 font-serif text-2xl">
                            Phương thức thanh toán
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: "credit_card",
                                    title: "Thẻ Quốc Tế",
                                    sub: "Visa / Mastercard",
                                },
                                {
                                    icon: "account_balance_wallet",
                                    title: "Ví Điện Tử",
                                    sub: "MoMo / ZaloPay",
                                },
                                {
                                    icon: "qr_code_scanner",
                                    title: "Chuyển khoản",
                                    sub: "VietQR",
                                },
                                {
                                    icon: "luggage",
                                    title: "Thanh toán tại",
                                    sub: "Khách sạn",
                                },
                            ].map((item, index) => (
                                <label
                                    key={index}
                                    className="group relative cursor-pointer rounded-xl border border-neutral-200 p-6 transition hover:border-[#775a19]"
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        defaultChecked={index === 0}
                                        className="absolute right-4 top-4"
                                    />

                                    <div className="flex flex-col items-center text-center">
                    <span className="material-symbols-outlined mb-3 text-4xl text-neutral-600">
                      {item.icon}
                    </span>

                                        <span className="text-sm font-semibold uppercase tracking-[0.15em]">
                      {item.title}
                    </span>

                                        <span className="mt-1 text-xs text-neutral-500">
                      {item.sub}
                    </span>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {/* Card Form */}
                        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-neutral-200 pt-8 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Số thẻ
                                </label>

                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Ngày hết hạn
                                </label>

                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    CVV
                                </label>

                                <input
                                    type="text"
                                    placeholder="123"
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* RIGHT SIDE */}
                <aside className="lg:col-span-4">
                    <div className="sticky top-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
                        {/* Image */}
                        <div className="relative h-56">
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
                                alt="Room"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                            <div className="absolute bottom-5 left-5 text-white">
                                <p className="mb-1 text-xs uppercase tracking-[0.2em]">
                                    L'Héritage Luxury
                                </p>

                                <h3 className="font-serif text-2xl">
                                    Phòng Deluxe Hướng Biển
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-6 p-6">
                            {/* Booking Info */}
                            <div className="grid grid-cols-2 gap-4 border-b border-neutral-200 pb-6">
                                <div>
                                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                                        Nhận phòng
                                    </p>

                                    <h4 className="font-medium">15 Th11, 2026</h4>

                                    <p className="mt-1 text-sm text-neutral-500">
                                        Từ 14:00
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                                        Trả phòng
                                    </p>

                                    <h4 className="font-medium">17 Th11, 2026</h4>

                                    <p className="mt-1 text-sm text-neutral-500">
                                        Trước 12:00
                                    </p>
                                </div>

                                <div className="col-span-2 flex items-center justify-between rounded-lg bg-neutral-100 p-3">
                                    <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#775a19]">
                      group
                    </span>

                                        <span className="text-sm">
                      2 Người lớn, 1 Trẻ em
                    </span>
                                    </div>

                                    <span className="text-sm text-neutral-500">
                    2 Đêm
                  </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="space-y-4 border-b border-neutral-200 pb-6">
                                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                    Tiền phòng
                  </span>

                                    <span>5.000.000 ₫</span>
                                </div>

                                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                    Thuế VAT
                  </span>

                                    <span>400.000 ₫</span>
                                </div>

                                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                    Phí dịch vụ
                  </span>

                                    <span>250.000 ₫</span>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="text"
                                        placeholder="Mã giảm giá"
                                        className="flex-1 border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-sm outline-none transition focus:border-black"
                                    />

                                    <button className="text-xs font-semibold uppercase tracking-[0.15em] text-[#775a19]">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>

                            {/* Total */}
                            <div>
                                <div className="mb-6 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Tổng cộng
                  </span>

                                    <span className="font-serif text-3xl text-[#775a19]">
                    5.650.000 ₫
                  </span>
                                </div>

                                <div className="mb-6 flex items-start gap-3">
                                    <input type="checkbox" className="mt-1 h-4 w-4" />

                                    <p className="text-sm leading-relaxed text-neutral-500">
                                        Tôi đồng ý với điều khoản sử dụng và chính sách
                                        bảo mật của khách sạn.
                                    </p>
                                </div>

                                <button className="w-full bg-black py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#775a19]">
                                    Xác nhận & Thanh toán
                                </button>

                                <div className="mt-5 flex items-center justify-center gap-3 text-neutral-400">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>

                                    <span className="material-symbols-outlined">
                    lock
                  </span>

                                    <span className="text-[10px] uppercase tracking-[0.15em]">
                    Thanh toán SSL bảo mật
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default PaymentPage;