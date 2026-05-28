const RegisterPage = () => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center px-6 py-16">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-[2px]" />
            </div>

            {/* Floating Glow */}
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-secondary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-primary/20 blur-[120px] rounded-full" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-[560px]">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/30 shadow-[0_25px_80px_rgba(0,0,0,0.25)] rounded-3xl overflow-hidden">
                    {/* Top Accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-secondary via-yellow-300 to-secondary" />

                    <div className="px-8 md:px-12 py-10">
                        {/* Logo */}
                        <div className="text-center mb-10">
                            <p className="uppercase tracking-[0.4em] text-xs text-secondary mb-3">
                                Luxury Hotel
                            </p>

                            <h1 className="text-5xl font-serif text-primary tracking-tight">
                                L'Héritage
                            </h1>

                            <p className="mt-4 text-on-surface-variant text-sm">
                                Tạo tài khoản để trải nghiệm không gian nghỉ dưỡng đẳng cấp.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6">
                            {/* Name */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.25em] text-on-surface-variant mb-2">
                                    Họ và tên
                                </label>

                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition">
                                        person
                                    </span>

                                    <input
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        className="w-full bg-transparent border-0 border-b border-outline-variant pl-9 pr-2 py-3 focus:ring-0 focus:border-secondary transition text-on-surface placeholder:text-on-surface-variant/40"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.25em] text-on-surface-variant mb-2">
                                    Email
                                </label>

                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition">
                                        mail
                                    </span>

                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full bg-transparent border-0 border-b border-outline-variant pl-9 pr-2 py-3 focus:ring-0 focus:border-secondary transition text-on-surface placeholder:text-on-surface-variant/40"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.25em] text-on-surface-variant mb-2">
                                    Số điện thoại
                                </label>

                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition">
                                        call
                                    </span>

                                    <input
                                        type="tel"
                                        placeholder="+84 123 456 789"
                                        className="w-full bg-transparent border-0 border-b border-outline-variant pl-9 pr-2 py-3 focus:ring-0 focus:border-secondary transition text-on-surface placeholder:text-on-surface-variant/40"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.25em] text-on-surface-variant mb-2">
                                    Mật khẩu
                                </label>

                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition">
                                        lock
                                    </span>

                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-transparent border-0 border-b border-outline-variant pl-9 pr-10 py-3 focus:ring-0 focus:border-secondary transition text-on-surface placeholder:text-on-surface-variant/40"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-secondary transition"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            visibility_off
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="group">
                                <label className="block text-xs uppercase tracking-[0.25em] text-on-surface-variant mb-2">
                                    Xác nhận mật khẩu
                                </label>

                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition">
                                        verified_user
                                    </span>

                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-transparent border-0 border-b border-outline-variant pl-9 pr-2 py-3 focus:ring-0 focus:border-secondary transition text-on-surface placeholder:text-on-surface-variant/40"
                                    />
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                                />

                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Tôi đồng ý với{" "}
                                    <a
                                        href="#"
                                        className="text-primary hover:text-secondary underline underline-offset-4"
                                    >
                                        Điều khoản dịch vụ
                                    </a>{" "}
                                    và{" "}
                                    <a
                                        href="#"
                                        className="text-primary hover:text-secondary underline underline-offset-4"
                                    >
                                        Chính sách bảo mật
                                    </a>
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-primary text-secondary-fixed font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:scale-[1.01] hover:bg-black transition-all duration-300 shadow-lg shadow-black/20"
                            >
                                <span>Tạo tài khoản</span>

                                <span className="material-symbols-outlined text-[20px]">
                                    arrow_forward
                                </span>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-outline-variant/30"></div>
                            </div>


                        </div>



                        {/* Footer */}
                        <div className="mt-10 text-center">
                            <p className="text-sm text-on-surface-variant">
                                Đã có tài khoản?
                            </p>

                            <a
                                href="#"
                                className="inline-flex items-center gap-2 mt-3 text-secondary uppercase tracking-[0.2em] text-xs hover:gap-3 transition-all"
                            >
                                Đăng nhập ngay

                                <span className="material-symbols-outlined text-[16px]">
                                    arrow_right_alt
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;