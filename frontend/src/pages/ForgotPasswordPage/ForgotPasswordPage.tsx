const ForgotPasswordPage = () => {
    return (
        <main className="bg-surface text-on-surface antialiased min-h-screen flex items-center justify-center relative overflow-hidden px-5">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-primary-container/30 z-10 mix-blend-multiply" />

                <img
                    src="https://lh3.googleusercontent.com/aida/ADBb0uh9XEAHBxxoF6pE6JdydgKZcDPp25TNUFpO3R-obNTyKKNQgtgUTwvqsLwg7LU4vOL0Q94kvZ39icqV7d2RRLLwzFM_nqJ6PKZNEG24VavALRRaJbDvSGKCDlIyJA8Wu6JfVG7Q2mePOXuggZw_IsB3OZ5lJbdIGY-8pv-PSCQp9ExZDZRr1EGEVl2Y4IVr2rm0WilsykUbtZv23Pd9djl6V_YL0Sd1K8yKlFS5jS9l3ndSXDxSzqs18Q"
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover scale-105"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-[500px]">
                <div
                    className="
                        bg-[rgba(253,251,247,0.9)]
                        backdrop-blur-xl
                        border
                        border-[rgba(255,222,165,0.2)]
                        shadow-[0_20px_40px_rgba(10,25,47,0.08)]
                        rounded-xl
                        p-10
                        md:p-14
                        flex
                        flex-col
                        items-center
                        text-center
                    "
                >
                    {/* Logo */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-semibold text-primary-container tracking-tight">
                            L&apos;Héritage
                        </h1>
                    </div>

                    {/* Header */}
                    <h2 className="text-3xl font-semibold text-on-surface mb-4">
                        Khôi phục mật khẩu
                    </h2>

                    <p className="text-on-surface-variant mb-10 max-w-sm leading-relaxed">
                        Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.
                    </p>

                    {/* Form */}
                    <form className="w-full flex flex-col gap-8">
                        {/* Email */}
                        <div className="w-full text-left">
                            <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="
                                    w-full
                                    bg-transparent
                                    border-0
                                    border-b
                                    border-primary-container
                                    rounded-none
                                    px-0
                                    pb-2
                                    focus:ring-0
                                    focus:border-secondary-fixed-dim
                                    outline-none
                                    transition-colors
                                    placeholder:text-on-surface-variant/50
                                "
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="
                                w-full
                                bg-primary-container
                                text-secondary-fixed
                                uppercase
                                tracking-[0.08em]
                                py-4
                                px-6
                                rounded
                                hover:bg-primary
                                transition-colors
                                duration-300
                            "
                        >
                            Gửi hướng dẫn
                        </button>
                    </form>

                    {/* Back */}
                    <div className="mt-8">
                        <a
                            href="#"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-xs
                                uppercase
                                tracking-[0.15em]
                                text-on-surface-variant
                                hover:text-secondary
                                transition-colors
                                duration-300
                                group
                            "
                        >
                            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform duration-300">
                                arrow_back
                            </span>

                            Trở lại đăng nhập
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ForgotPasswordPage;