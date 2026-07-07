import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    userId: number | null;
    userName: string | null;
    role: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    // Tạm thời lấy từ localStorage lúc khởi tạo để tránh mất state khi f5
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
    userName: localStorage.getItem('userName'),
    role: localStorage.getItem('role'), // Nếu JWT của bạn trả về role
    isAuthenticated: !!localStorage.getItem('token')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; userId: number; userName: string; role?: string }>
        ) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.role = action.payload.role || null;
            state.isAuthenticated = true;

            // Vẫn lưu localStorage dự phòng
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', String(action.payload.userId));
            localStorage.setItem('userName', action.payload.userName);
            if (action.payload.role) localStorage.setItem('role', action.payload.role);
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
            state.userName = null;
            state.role = null;
            state.isAuthenticated = false;
            localStorage.clear();
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;