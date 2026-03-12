import { useContext, createContext, useState } from "react";


interface AuthProviderProps {
    children: React.ReactNode;
}
const AuthContext = createContext({
    isAuthenticated: false,
});
export function AuthProvider({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);