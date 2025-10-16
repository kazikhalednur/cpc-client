import { TokenManager } from '../auth/jwt';

class ApiClient {
    private baseURL: string;

    constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8000';
    }

    private async getHeaders(includeAuth = true): Promise<HeadersInit> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (includeAuth) {
            const token = TokenManager.getAccessToken();
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }

        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (response.status === 401) {
            // Token expired, try to refresh
            const refreshSuccess = await this.refreshToken();
            if (refreshSuccess) {
                // Retry the original request
                const newToken = TokenManager.getAccessToken();
                if (newToken) {
                    const retryResponse = await fetch(response.url, {
                        ...response,
                        headers: {
                            ...response.headers,
                            Authorization: `Bearer ${newToken}`,
                        },
                    });
                    return this.handleResponse<T>(retryResponse);
                }
            }
            // If refresh failed, redirect to login
            TokenManager.clearTokens();
            window.location.href = '/auth/signin';
            throw new Error('Authentication failed');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    private async refreshToken(): Promise<boolean> {
        try {
            const refreshTokenValue = TokenManager.getRefreshToken();
            if (!refreshTokenValue) return false;

            const response = await fetch(`${this.baseURL}/accounts/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshTokenValue }),
            });

            if (response.ok) {
                const data = await response.json();
                TokenManager.setTokens({
                    access: data.access,
                    refresh: data.refresh || refreshTokenValue,
                });
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    async get<T>(endpoint: string, includeAuth = true): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'GET',
            headers: await this.getHeaders(includeAuth),
        });

        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data?: unknown, includeAuth = true): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: await this.getHeaders(includeAuth),
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data?: unknown, includeAuth = true): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: await this.getHeaders(includeAuth),
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    async patch<T>(endpoint: string, data?: unknown, includeAuth = true): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PATCH',
            headers: await this.getHeaders(includeAuth),
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string, includeAuth = true): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: await this.getHeaders(includeAuth),
        });

        return this.handleResponse<T>(response);
    }
}

export const apiClient = new ApiClient();
