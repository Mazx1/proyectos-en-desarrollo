import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse } from "../types/types";


interface AuthProviderProps {
    children: React.ReactNode;
}
const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (userData: AuthResponse) => {},
});
export function AuthProvider({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [refreshToken, setRefreshToken] = useState<string>("");


    function getAccessToken(){
        return accessToken;
    }

    function saveUser(userData: AuthResponse){
        setAccessToken(userData.body.accessToken);
        setRefreshToken(userData.body.refreshToken);

        localStorage.setItem("Token", JSON.stringify(userData.body.refreshToken));
        setIsAuthenticated(true);
    }   


    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);