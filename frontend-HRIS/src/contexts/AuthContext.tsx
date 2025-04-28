"use client";

import { createContext, useContext, useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContext {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data } = await api.get('/api/user');
            setUser(data);
        } catch (error) {
            localStorage.removeItem('token');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email:string, password:string) => {
        const { data } = await api.post('/api/login', { email, password });
        localStorage.setItem('token', data.token);
        await checkAuth();
        router.push('/dashboard');
    }

    const register = async (registerData: RegisterData) => {
        const { data } = await api.post('/api/register', registerData);
        localStorage.setItem('token', data.token);
        await checkAuth();
        router.push('/dashboard');
    };

    const logout = async () => {
        try {
            await api.post('/api/logout');
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            router.push('/');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}