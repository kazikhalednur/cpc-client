export interface JWTTokens {
    access: string;
    refresh: string;
}

export interface DecodedToken {
    sub: string; // user id
    email: string;
    name: string;
    role: string;
    exp: number;
    iat: number;
}

export class TokenManager {
    private static readonly ACCESS_TOKEN_KEY = 'access_token';
    private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

    // Store tokens in localStorage
    static setTokens(tokens: JWTTokens): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access);
            localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);
        }
    }

    // Get access token
    static getAccessToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.ACCESS_TOKEN_KEY);
        }
        return null;
    }

    // Get refresh token
    static getRefreshToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.REFRESH_TOKEN_KEY);
        }
        return null;
    }

    // Get both tokens
    static getTokens(): JWTTokens | null {
        const access = this.getAccessToken();
        const refresh = this.getRefreshToken();

        if (access && refresh) {
            return { access, refresh };
        }
        return null;
    }

    // Clear all tokens
    static clearTokens(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.ACCESS_TOKEN_KEY);
            localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        }
    }

    // Check if access token is expired
    static isAccessTokenExpired(): boolean {
        const token = this.getAccessToken();
        if (!token) return true;

        try {
            const decoded = this.decodeToken(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch {
            return true;
        }
    }

    // Decode JWT token (client-side only)
    static decodeToken(token: string): DecodedToken | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    }

    // Get user info from token
    static getUserInfo(): DecodedToken | null {
        const token = this.getAccessToken();
        if (!token) return null;
        return this.decodeToken(token);
    }

    // Check if user is authenticated
    static isAuthenticated(): boolean {
        const tokens = this.getTokens();
        if (!tokens) return false;

        // Check if access token is valid and not expired
        return !this.isAccessTokenExpired();
    }
}
