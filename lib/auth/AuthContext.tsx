'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { TokenManager, DecodedToken, JWTTokens } from './jwt';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: DecodedToken | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (tokens: JWTTokens) => void;
    logout: () => Promise<void>;
    refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<DecodedToken | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Initialize auth state
    useEffect(() => {
        const initAuth = () => {
            try {
                const userInfo = TokenManager.getUserInfo();
                const isAuth = TokenManager.isAuthenticated();

                setUser(userInfo);
                setIsAuthenticated(isAuth);
            } catch (error) {
                console.error('Auth initialization error:', error);
                TokenManager.clearTokens();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const logout = useCallback(async () => {
        try {
            // Get refresh token before clearing
            const refreshToken = TokenManager.getRefreshToken();

            // Call logout API if refresh token exists
            if (refreshToken) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/accounts/logout/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Logout API response:', data);
                } else {
                    console.warn('Logout API failed, but continuing with local logout');
                }
            }
        } catch (error) {
            console.error('Logout API error:', error);
            // Continue with local logout even if API fails
        } finally {
            // Always clear local tokens and state
            TokenManager.clearTokens();
            setUser(null);
            setIsAuthenticated(false);

            toast.success('Logged out successfully');
            router.push('/auth/signin');
        }
    }, [router]);

    const refreshToken = useCallback(async (): Promise<boolean> => {
        try {
            const refreshTokenValue = TokenManager.getRefreshToken();
            if (!refreshTokenValue) {
                logout();
                return false;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/accounts/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshTokenValue }),
            });

            if (response.ok) {
                const data = await response.json();
                const newTokens: JWTTokens = {
                    access: data.access,
                    refresh: data.refresh || refreshTokenValue, // Use new refresh token if provided
                };

                TokenManager.setTokens(newTokens);
                const userInfo = TokenManager.getUserInfo();

                setUser(userInfo);
                setIsAuthenticated(true);

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            logout();
            return false;
        }
    }, [logout]);

    // Auto refresh token when it's about to expire
    useEffect(() => {
        if (!isAuthenticated) return;

        const checkTokenExpiry = () => {
            if (TokenManager.isAccessTokenExpired()) {
                refreshToken();
            }
        };

        // Check every 5 minutes
        const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [isAuthenticated, refreshToken]);

    const login = (tokens: JWTTokens) => {
        try {
            TokenManager.setTokens(tokens);
            const userInfo = TokenManager.getUserInfo();

            setUser(userInfo);
            setIsAuthenticated(true);

            toast.success('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed');
        }
    };



    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
