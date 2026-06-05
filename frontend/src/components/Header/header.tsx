const Header = () => {
    return (
        <nav
            id="navbar"
            className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 shadow-sm backdrop-blur-md transition-all duration-300"
        >
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-16">
                <a href="#" className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold text-black">
                        Stay Ease
                    </h1>
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    <a
                        href="#"
                        className="border-b border-secondary pb-1 text-secondary"
                    >
                        Trang chủ
                    </a>

                    <a
                        href="#"
                        className="text-on-surface-variant transition hover:text-secondary"
                    >
                        Danh sách phòng
                    </a>

                    <a
                        href="#"
                        className="text-on-surface-variant transition hover:text-secondary"
                    >
                        Dịch vụ
                    </a>

                    <a
                        href="#"
                        className="text-on-surface-variant transition hover:text-secondary"
                    >
                        Hình ảnh
                    </a>

                    <a
                        href="#"
                        className="text-on-surface-variant transition hover:text-secondary"
                    >
                        Liên hệ
                    </a>
                </div>

                <button className="hidden rounded bg-black px-6 py-3 text-white transition hover:opacity-90 md:block">
                    Đặt ngay
                </button>

                <button className="md:hidden">
                    <span className="material-symbols-outlined text-3xl">menu</span>
                </button>
            </div>
        </nav>
    );
};

export default Header;