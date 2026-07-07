export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
    id: number;
    name: string;
    email: string;
    role: 'GUEST' | 'ADMIN' | string; 
}