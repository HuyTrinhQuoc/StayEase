const LoginPage = () => {
    return (
        <main className="min-h-screen bg-background relative flex items-center justify-center p-5 md:p-16 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 blur-sm"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida/ADBb0ujshfeI2EI6HkC4bSrWwiOQvsB93c8xM0SgAgHdMvpRer_cmLFIoBKvs-1Dv4KPcUeJJruXSat3C8XvNtU_x3GdOio50BXl0kK9DM9WVpRQ57c0zG8wNWdKj241ziWUM2zsrfrU0OlzdaF2WJl77dNVXHtRfuIGP0PjcUkpGdpVglm3EFBorabFyEpZROrdu1RSRgIjdUpacPAF_y_ipNUBw2qtaPRWpD6uvkORgVRFqCJE5_j4YX_IKp0')",
                    }}
                />

                <div className="absolute inset-0 bg-surface-tint/20 backdrop-blur-sm mix-blend-multiply" />

                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/80" />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[480px] bg-white border border-outline-variant/30 rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden">
                {/* Accent */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary-fixed-dim" />

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold text-primary tracking-tight uppercase mb-6">
                        LUXE HERITAGE
                    </h1>

                    <h2 className="text-2xl font-semibold text-on-surface mb-2">
                        Đăng nhập
                    </h2>

                    <p className="text-on-surface-variant">
                        Chào mừng quý khách trở lại không gian tinh tế.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    {/* Email */}
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-secondary transition-colors">
                            Địa chỉ Email
                        </label>

                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
                                mail
                            </span>

                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 pl-8 pr-0 py-2 outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-secondary transition-colors">
                            Mật khẩu
                        </label>

                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
                                lock
                            </span>

                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 pl-8 pr-10 py-2 outline-none"
                            />

                            <button
                                type="button"
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-outline hover:text-secondary transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    visibility_off
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                            />

                            <span className="text-on-surface-variant">
                                Ghi nhớ đăng nhập
                            </span>
                        </label>

                        <a
                            href="#"
                            className="text-secondary hover:underline"
                        >
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary-fixed-dim uppercase tracking-widest py-4 px-6 flex items-center justify-center gap-3 hover:opacity-90 transition-all relative overflow-hidden group"
                        >
                            <span className="relative z-10">
                                Đăng nhập
                            </span>

                            <span className="material-symbols-outlined relative z-10 text-[18px] group-hover:translate-x-1 transition-transform">
                                arrow_right_alt
                            </span>

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="relative flex items-center py-8">
                    <div className="flex-grow border-t border-outline-variant/30" />

                    <span className="mx-4 text-xs uppercase tracking-widest text-on-surface-variant">
                        Hoặc
                    </span>

                    <div className="flex-grow border-t border-outline-variant/30" />
                </div>

                {/* Google */}
                <button
                    type="button"
                    className="w-full border border-secondary text-primary bg-transparent py-4 px-6 flex items-center justify-center gap-3 hover:bg-surface-variant transition-colors"
                >
                    <span className="text-2xl font-bold text-[#4285F4]">
                        G
                    </span>

                    <span className="uppercase tracking-widest">
                        Tiếp tục với Google
                    </span>
                </button>

                {/* Footer */}
                <div className="text-center pt-8 mt-4 border-t border-outline-variant/20">
                    <p className="text-on-surface-variant">
                        Chưa có tài khoản?

                        <a
                            href="#"
                            className="text-secondary hover:underline font-medium ml-1"
                        >
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;