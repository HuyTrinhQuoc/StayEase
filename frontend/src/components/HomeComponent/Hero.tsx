const Hero = () => {
    return (
        <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center pt-20">
            <div className="absolute inset-0">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600')" }}
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

            {/* BOOKING BAR */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-5 md:px-16">
                <div className="mx-auto max-w-[1280px] rounded bg-black p-4 text-white shadow-2xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-2">
                                <label>Ngày nhận phòng</label>
                                <input type="date" className="rounded border border-white/20 bg-transparent p-2" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Ngày trả phòng</label>
                                <input type="date" className="rounded border border-white/20 bg-transparent p-2" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Số khách</label>
                                <select className="rounded border border-white/20 bg-transparent p-2">
                                    <option className="text-black">1 Người lớn</option>
                                    <option className="text-black">2 Người lớn</option>
                                    <option className="text-black">3 Người lớn</option>
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
    );
};

export default Hero;