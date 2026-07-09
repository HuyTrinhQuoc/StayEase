import { useState } from 'react';
import type {AuthResponse, LoginCredentials, RegisterData} from "../type/auth.ts";
import {authService} from "../services/authServices.ts";
import {setCredentials} from "../redux/authSlice.ts";
import {useDispatch} from "react-redux";

export const useLogin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(credentials);

            // DÙNG REDUX ĐỂ LƯU USER
            dispatch(setCredentials({
                token: data.token,
                userId: data.id,
                userName: data.name,

            }));

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

// export const useLogin = () => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//
//     const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await authService.login(credentials);
//             // THÊM DÒNG NÀY: Lưu tên người dùng
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('userName', data.name);
//
//             localStorage.setItem('userId', String(data.id));
//
//             return data;
//         } catch (err: any) {
//             setError(err.message);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };
//     return { login, loading, error };
// };

export const useGoogleAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loginWithGoogle = async (googleToken: string): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.loginWithGoogle(googleToken);
            // THÊM DÒNG NÀY: Lưu tên người dùng
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.name);

                localStorage.setItem('userId', String(data.id));

            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { loginWithGoogle, loading, error };
};



export const useRegister = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const register = async (userData: RegisterData): Promise<string> => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.register(userData);
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

