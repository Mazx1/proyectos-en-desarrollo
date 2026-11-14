import { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import { isAxiosError } from "axios";
import { registerRequest, loginRequest, verifyTokenRequest,  type RegisterData } from "../api/auth";
import  Cookies  from "js-cookie";

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
            console.log("Login successful:", res.data);
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
            console.log("Login successful:", res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            console.error(error);
            setErrors(parseErrors(error));
        }
    };

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
    async function checkLogin() {
        const cookies = Cookies.get();

        if (!cookies.token) {
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        try {
            const res = await verifyTokenRequest(cookies.token);

            if (!res.data) {
                setIsAuthenticated(false);
                setUser(null);
                return;
            }

            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        }
    }

    checkLogin();
}, []);

    return (
        <AuthContext.Provider
            value={{ user, signup, signin, isAuthenticated, errors }}
        >
            {children}
        </AuthContext.Provider>
    );
};
