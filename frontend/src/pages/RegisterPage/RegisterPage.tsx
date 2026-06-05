import React, { useState } from 'react';
import {useRegister} from "../../hooks/useAuth.ts";
import InputField from "../../components/LoginComponent/InputField.tsx";
import type {RegisterData} from "../../type/auth.ts";


const RegisterPage: React.FC = () => {

    const { register, loading, error, successMessage } = useRegister();

    // Mở rộng thêm confirmPassword (chỉ cần ở local state của component này)
    const [formData, setFormData] = useState<RegisterData & { confirmPassword?: string }>({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        try {
            await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center px-6 py-16">
            <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" alt="Luxury Hotel" className="w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 w-full max-w-[560px]">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/30 rounded-3xl px-8 md:px-12 py-10">
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-serif text-primary">L'Héritage</h1>
                        <p className="mt-4 text-on-surface-variant text-sm">Tạo tài khoản để trải nghiệm không gian nghỉ dưỡng đẳng cấp.</p>
                    </div>

                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    {successMessage && <div className="text-green-600 text-sm mb-4">{successMessage}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField label="Họ và tên" icon="person" name="name" placeholder="Nguyễn Văn A" value={formData.name} onChange={handleChange} />
                        <InputField label="Email" icon="mail" type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
                        <InputField label="Số điện thoại" icon="call" type="tel" name="phone" placeholder="+84 123 456 789" value={formData.phone} onChange={handleChange} />
                        <InputField label="Mật khẩu" icon="lock" type="password" name="password" placeholder="••••••••" value={formData.password || ''} onChange={handleChange} />
                        <InputField label="Xác nhận mật khẩu" icon="verified_user" type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword || ''} onChange={handleChange} />

                        <button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-primary text-secondary-fixed uppercase tracking-[0.2em]">
                            {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;