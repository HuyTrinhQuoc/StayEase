

const HomePage = () => {
    return (
        <div className="bg-[#fcf9f8] text-black">


            {/* HERO */}
            <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center pt-20">
                <div className="absolute inset-0">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600')",
                        }}
                    />

                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center md:px-16">
                    <h1 className="mb-6 text-5xl font-semibold text-white md:text-7xl">
                        L'Héritage Luxury
                    </h1>

                    <p className="mb-12 max-w-2xl text-xl text-white/90">
                        Tận hưởng kỳ nghỉ dưỡng trong mơ tại không gian di sản
                    </p>
                </div>

                {/* BOOKING */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-5 md:px-16">
                    <div className="mx-auto max-w-[1280px] rounded bg-black p-4 text-white shadow-2xl">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="flex flex-col gap-2">
                                    <label>Ngày nhận phòng</label>

                                    <input
                                        type="date"
                                        className="rounded border border-white/20 bg-transparent p-2"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label>Ngày trả phòng</label>

                                    <input
                                        type="date"
                                        className="rounded border border-white/20 bg-transparent p-2"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label>Số khách</label>

                                    <select className="rounded border border-white/20 bg-transparent p-2">
                                        <option>1 Người lớn</option>
                                        <option>2 Người lớn</option>
                                        <option>3 Người lớn</option>
                                    </select>
                                </div>
                            </div>

                            <button className="rounded bg-yellow-600 px-8 py-4 font-medium text-white hover:bg-yellow-700">
                                Tìm phòng trống
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="mx-auto mt-24 grid max-w-[1280px] grid-cols-1 items-center gap-16 px-5 py-24 md:grid-cols-2 md:px-16">
                <div className="overflow-hidden rounded">
                    <img
                        src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200"
                        alt="hotel"
                        className="aspect-[4/5] h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-6">
          <span className="uppercase tracking-[4px] text-yellow-700">
            Về L'Héritage Luxury
          </span>

                    <h2 className="text-4xl font-semibold">
                        Kiến trúc tân cổ điển & Triết lý phục vụ tận tâm
                    </h2>

                    <p className="text-lg leading-8 text-gray-600">
                        Nép mình bên bờ biển thanh bình, L'Héritage Luxury là bản giao
                        hưởng hoàn hảo giữa nét đẹp di sản kiến trúc tân cổ điển và tiện
                        nghi xa hoa hiện đại.
                    </p>

                    <button className="w-fit rounded border border-yellow-700 px-6 py-3 text-yellow-700 transition hover:bg-yellow-700 hover:text-white">
                        Tìm hiểu thêm
                    </button>
                </div>
            </section>

            {/* ROOMS */}
            <section className="bg-[#f6f3f2] px-5 py-24 md:px-16">
                <div className="mx-auto max-w-[1280px]">
                    <div className="mb-16 text-center">
            <span className="uppercase tracking-[4px] text-yellow-700">
              Bộ Sưu Tập
            </span>

                        <h2 className="mt-4 text-4xl font-semibold">
                            Phòng nghỉ nổi bật
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[1, 2, 3].map((room) => (
                            <div
                                key={room}
                                className="overflow-hidden rounded bg-white shadow"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200"
                                    alt="room"
                                    className="aspect-[4/3] w-full object-cover"
                                />

                                <div className="p-8">
                                    <h3 className="mb-2 text-2xl font-semibold">
                                        Deluxe Ocean View
                                    </h3>

                                    <div className="mb-6 flex gap-4 text-gray-500">
                                        <span>45m²</span>
                                        <span>2 Khách</span>
                                    </div>

                                    <div className="flex items-end justify-between border-t pt-6">
                                        <div>
                                            <span className="text-sm text-gray-500">Từ</span>

                                            <h4 className="text-2xl font-semibold text-yellow-700">
                                                2.500.000đ
                                            </h4>
                                        </div>

                                        <button className="text-yellow-700 hover:underline">
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;