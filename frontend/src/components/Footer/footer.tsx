const Footer = () => {
    return (
        <footer className="mt-24 bg-black px-5 pb-8 pt-24 text-white md:px-16">
            <div className="mx-auto mb-16 grid max-w-[1280px] grid-cols-1 gap-8 md:grid-cols-4">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold">
                        Stay Ease
                    </h2>

                    <p className="text-sm text-gray-300">
                        Trải nghiệm sự sang trọng thanh lịch và dịch vụ xuất sắc tại
                        Stay Ease Hotel.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold uppercase tracking-widest">
                        Liên hệ
                    </h4>

                    <p className="flex items-center gap-2 text-sm text-gray-300">
            <span className="material-symbols-outlined">
              location_on
            </span>

                        123 Đường Ven Biển, Đà Nẵng
                    </p>

                    <p className="flex items-center gap-2 text-sm text-gray-300">
            <span className="material-symbols-outlined">
              call
            </span>

                        Hotline: 1900 xxxx
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold uppercase tracking-widest">
                        Liên kết
                    </h4>

                    <a href="#" className="text-sm text-gray-300 hover:text-white">
                        Chính sách bảo mật
                    </a>

                    <a href="#" className="text-sm text-gray-300 hover:text-white">
                        Chính sách hủy phòng
                    </a>

                    <a href="#" className="text-sm text-gray-300 hover:text-white">
                        Câu hỏi thường gặp
                    </a>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold uppercase tracking-widest">
                        Bản tin
                    </h4>

                    <p className="text-sm text-gray-300">
                        Đăng ký để nhận ưu đãi đặc biệt.
                    </p>

                    <div className="flex border-b border-white/30 pb-2">
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            className="w-full bg-transparent outline-none placeholder:text-gray-400"
                        />

                        <button>
              <span className="material-symbols-outlined">
                arrow_forward
              </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 md:flex-row">
                <p className="text-sm text-gray-400">
                    © 2024 Stay Ease Hotel. All rights reserved.
                </p>

                <div className="flex gap-4">
          <span className="material-symbols-outlined cursor-pointer">
            share
          </span>

                    <span className="material-symbols-outlined cursor-pointer">
            language
          </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;