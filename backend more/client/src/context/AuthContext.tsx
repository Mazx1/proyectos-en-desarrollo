import { createContext, useState, useContext, type ReactNode } from "react";
import { isAxiosError } from "axios";
import { registerRequest, loginRequest, type RegisterData } from "../api/auth";

type LoginData = { email: string; password: string };

type AuthContextValue = {
    user: unknown;
    signup: (userData: RegisterData) => Promise<void>;
    signin: (userData: LoginData) => Promise<void>;
    isAuthenticated: boolean;
    errors: string[];
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("There is no AuthProvider");
    }
    return context;
};

// Convierte cualquier error en un arreglo de strings para mostrar en pantalla
const parseErrors = (error: unknown): string[] => {
    if (isAxiosError(error)) {
        const data = error.response?.data;
        if (Array.isArray(data)) return data.map(String);
        if (data?.message) return [String(data.message)];
    }
    return ["Error de conexión"];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<unknown>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const signup = async (userData: RegisterData): Promise<void> => {
        try {
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.error(error);
            setErrors(parseErrors(error));
        }
    };

    const signin = async (userData: LoginData): Promise<void> => {
        try {
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.error(error);
            setErrors(parseErrors(error));
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, signup, signin, isAuthenticated, errors }}
        >
            {children}
        </AuthContext.Provider>
    );
};
