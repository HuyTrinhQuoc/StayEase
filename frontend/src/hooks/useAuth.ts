import { useState } from 'react';
import type { LoginCredentials, RegisterData, AuthResponse } from '../type/auth';

const API_URL = 'http://localhost:8080/api/auth';

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Đăng nhập thất bại');

            localStorage.setItem('token', data.token);
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export const useRegister = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const register = async (userData: RegisterData): Promise<string> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.text();

            if (!response.ok) throw new Error(data || 'Đăng ký thất bại');

            setSuccessMessage(data);
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, successMessage };
};

export const useGoogleAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const loginWithGoogle = async (googleToken: string): Promise<AuthResponse> => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: googleToken }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Đăng nhập Google thất bại');

            localStorage.setItem('token', data.token);
            return data;
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loginWithGoogle, loading };
};