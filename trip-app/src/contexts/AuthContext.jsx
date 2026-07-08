import { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/authService";
import { setupAxiosInterceptors } from "../services/axiosInstance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = user !== null;
    const isAdmin = user?.role === "ADMIN";

    useEffect(() => {
        setupAxiosInterceptors(() => {
            setUser(null);
        });

         const initialize = async () => {
            try {
                 const user = await authAPI.getUser();
                 setUser(user);
            } catch {
                  setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []);


    const refreshUser = async () => {
        try {
            const currentUser = await authAPI.getUser();
            setUser(currentUser);
            return currentUser;
        } catch (err) {
            setUser(null);
            throw err;
        }
    };


    const login = async (credentials) => {
        await authAPI.login(credentials);
        await refreshUser();
    };

    const register = async (dto) => {
        await authAPI.register(dto);
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } finally {
            setUser(null);
        }
    };


    return (
    <AuthContext.Provider
        value={{ user, loading, isAuthenticated, 
        isAdmin, login, logout, register, refreshUser }}>
        {children}
    </AuthContext.Provider>
    );
}