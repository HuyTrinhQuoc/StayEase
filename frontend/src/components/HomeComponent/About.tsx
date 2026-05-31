const About = () => {
    return (
        <section className="mx-auto mt-24 grid max-w-[1280px] grid-cols-1 items-center gap-16 px-5 py-24 md:grid-cols-2 md:px-16">
            <div className="overflow-hidden rounded">
                <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200"
                    alt="hotel"
                    className="aspect-[4/5] h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-6">
                <span className="uppercase tracking-[4px] text-yellow-700">Về L'Héritage Luxury</span>
                <h2 className="text-4xl font-semibold">Kiến trúc tân cổ điển & Triết lý phục vụ tận tâm</h2>
                <p className="text-lg leading-8 text-gray-600">
                    Nép mình bên bờ biển thanh bình, L'Héritage Luxury là bản giao hưởng hoàn hảo giữa nét đẹp di sản kiến trúc tân cổ điển và tiện nghi xa hoa hiện đại.
                </p>
                <button className="w-fit rounded border border-yellow-700 px-6 py-3 text-yellow-700 transition hover:bg-yellow-700 hover:text-white">
                    Tìm hiểu thêm
                </button>
            </div>
        </section>
    );
};

export default About;