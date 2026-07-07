import type { LoginCredentials, RegisterData, AuthResponse } from '../type/auth';

const API_URL = 'http://localhost:8080/api/auth';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        // SỬA: Nếu lỗi (ví dụ chưa verify email), lấy text thông báo thay vì parse JSON
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Đăng nhập thất bại');
        }

        return await response.json();
    },

    register: async (userData: RegisterData): Promise<string> => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Đăng ký thất bại');
        }

        return await response.text();
    },

    loginWithGoogle: async (googleToken: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: googleToken }),
        });

        // SỬA: Bảo vệ hàm đăng nhập Google tương tự
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Đăng nhập Google thất bại');
        }

        return await response.json();
    }
};