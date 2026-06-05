import React, { useState } from 'react';
import {useGoogleAuth, useLogin} from "../../hooks/useAuth.ts";
import type {LoginCredentials} from "../../type/auth.ts";
import InputField from "../../components/LoginComponent/InputField.tsx";



const LoginPage: React.FC = () => {
    const { login, loading, error } = useLogin();
    const { loginWithGoogle } = useGoogleAuth();

    const [formData, setFormData] = useState<LoginCredentials>({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData);
            alert("Đăng nhập thành công!");
            // Điều hướng người dùng...
        } catch (err) {
            console.error("Lỗi:", err);
        }
    };

    const handleGoogleLogin = async () => {
        const mockGoogleToken = "your_google_access_token";
        try {
            await loginWithGoogle(mockGoogleToken);
            alert("Đăng nhập Google thành công!");
        } catch (err) {
            console.error("Lỗi Google:", err);
        }
    };

    return (
        <main className="min-h-screen bg-background relative flex items-center justify-center p-5 md:p-16 overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-cover bg-center scale-105 blur-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0ujshfeI2EI6HkC4bSrWwiOQvsB93c8xM0SgAgHdMvpRer_cmLFIoBKvs-1Dv4KPcUeJJruXSat3C8XvNtU_x3GdOio50BXl0kK9DM9WVpRQ57c0zG8wNWdKj241ziWUM2zsrfrU0OlzdaF2WJl77dNVXHtRfuIGP0PjcUkpGdpVglm3EFBorabFyEpZROrdu1RSRgIjdUpacPAF_y_ipNUBw2qtaPRWpD6uvkORgVRFqCJE5_j4YX_IKp0')" }} />
                <div className="absolute inset-0 bg-surface-tint/20 backdrop-blur-sm mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/80" />
            </div>

            <div className="relative z-10 w-full max-w-[480px] bg-white border border-outline-variant/30 rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold text-primary tracking-tight uppercase mb-6">LUXE HERITAGE</h1>
                    <h2 className="text-2xl font-semibold text-on-surface mb-2">Đăng nhập</h2>
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField label="Địa chỉ Email" icon="mail" type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
                    <InputField label="Mật khẩu" icon="lock" type="password" name="password" placeholder="••••••••" value={formData.password || ''} onChange={handleChange} />

                    <div className="pt-4">
                        <button type="submit" disabled={loading} className="w-full bg-primary text-secondary-fixed-dim py-4 px-6 uppercase tracking-widest hover:opacity-90">
                            {loading ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                    </div>
                </form>

                <div className="relative flex items-center py-8">
                    <div className="flex-grow border-t border-outline-variant/30" />
                    <span className="mx-4 text-xs uppercase tracking-widest text-on-surface-variant">Hoặc</span>
                    <div className="flex-grow border-t border-outline-variant/30" />
                </div>

                <button onClick={handleGoogleLogin} type="button" className="w-full border border-secondary text-primary bg-transparent py-4 px-6 flex items-center justify-center gap-3 hover:bg-surface-variant">
                    <span className="text-2xl font-bold text-[#4285F4]">G</span>
                    <span className="uppercase tracking-widest">Tiếp tục với Google</span>
                </button>
            </div>
        </main>
    );
};

export default LoginPage;