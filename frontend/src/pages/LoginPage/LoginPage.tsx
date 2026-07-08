import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleAuth, useLogin } from "../../hooks/useAuth.ts";
import type { LoginCredentials } from "../../type/auth.ts";
import InputField from "../../components/LoginComponent/InputField.tsx";
// Import Component nút bấm Google chuẩn
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
    const { login, loading, error } = useLogin();
    const { loginWithGoogle, loading: googleLoading, error: googleError } = useGoogleAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginCredentials>({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // SỬA: Chuẩn hóa chữ hoa chữ thường của Role từ backend gửi về
    const handleRoleNavigation = (role: string) => {
        const normalizedRole = String(role || '').toUpperCase();
        if (normalizedRole === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    // 1. Đăng nhập truyền thống
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await login({
                email: formData.email.trim(),
                password: formData.password
            });
            alert("Đăng nhập thành công!"); // Hiển thị thông báo thành công
            handleRoleNavigation(data.role);
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
        }
    };

    return (
        <main className="min-h-screen bg-background relative flex items-center justify-center p-5 md:p-16 overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-cover bg-center scale-105 blur-sm" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')" }} />
                <div className="absolute inset-0 bg-surface-tint/20 backdrop-blur-sm mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/80" />
            </div>

            <div className="relative z-10 w-full max-w-[480px] bg-white border border-outline-variant/30 rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold text-primary tracking-tight uppercase mb-6">Stay Ease</h1>
                    <h2 className="text-2xl font-semibold text-on-surface mb-2">Đăng nhập</h2>
                </div>

                {(error || googleError) && (
                    <div className="text-red-500 text-sm mb-4">{error || googleError}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField label="Địa chỉ Email" icon="mail" type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
                    <InputField label="Mật khẩu" icon="lock" type="password" name="password" placeholder="••••••••" value={formData.password || ''} onChange={handleChange} />

                    <div className="pt-4">
                        <button type="submit" disabled={loading || googleLoading} className="w-full bg-primary text-secondary-fixed-dim py-4 px-6 uppercase tracking-widest hover:opacity-90">
                            {loading ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                    </div>
                </form>

                <div className="relative flex items-center py-8">
                    <div className="flex-grow border-t border-outline-variant/30" />
                    <span className="mx-4 text-xs uppercase tracking-widest text-on-surface-variant">Hoặc</span>
                    <div className="flex-grow border-t border-outline-variant/30" />
                </div>

                {/* SỬA: Dùng nút GoogleLogin chính thức để truyền đúng ID Token về Java */}
                <div className="flex justify-center w-full">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            if (credentialResponse.credential) {
                                try {
                                    const data = await loginWithGoogle(credentialResponse.credential);
                                    alert("Đăng nhập bằng Google thành công!"); // Hiển thị thông báo thành công
                                    handleRoleNavigation(data.role);
                                } catch (err) {
                                    console.error("Lỗi xác thực Google với Backend:", err);
                                }
                            }
                        }}
                        onError={() => {
                            alert("Đăng nhập Google thất bại!");
                        }}
                    />
                </div>

                <div className="mt-8 text-center pt-4">
                    <p className="text-sm text-on-surface-variant">
                        Chưa có tài khoản? <Link to="/register" className="text-primary font-semibold hover:underline">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;