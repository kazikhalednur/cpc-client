import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TokenManager } from '../auth/jwt';

export interface GoogleSignupRequest {
    code: string;
    student_id: string;
}

export interface GoogleSignupResponse {
    success: boolean;
    status_code: number;
    message: string;
    data: {
        access: string;
        refresh: string;
    };
}

export interface GoogleLoginRequest {
    code: string;
}

export interface GoogleLoginResponse {
    success: boolean;
    status_code: number;
    message: string;
    data: {
        access: string;
        refresh: string;
    };
}

export interface RefreshTokenRequest {
    refresh: string;
}

export interface RefreshTokenResponse {
    access: string;
    refresh?: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8000',
    prepareHeaders: (headers) => {
        const token = TokenManager.getAccessToken();
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

import type { BaseQueryApi, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: Record<string, unknown>
) => {
    let result = await baseQuery(args, api, extraOptions);

    const error = result.error as FetchBaseQueryError | undefined;
    if (error && error.status === 401) {
        // Try to get a new token
        const refreshToken = TokenManager.getRefreshToken();
        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: '/accounts/token/refresh/',
                    method: 'POST',
                    body: { refresh: refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const { access, refresh } = refreshResult.data as RefreshTokenResponse;
                TokenManager.setTokens({ access, refresh: refresh || refreshToken });

                // Retry the original query
                result = await baseQuery(args, api, extraOptions);
            } else {
                TokenManager.clearTokens();
                if (typeof window !== 'undefined') window.location.href = '/auth/signin';
            }
        }
    }

    return result;
};

export const googleAuthApi = createApi({
    reducerPath: 'googleAuthApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        googleSignup: builder.mutation<GoogleSignupResponse, GoogleSignupRequest>({
            query: (body) => ({
                url: '/accounts/signup-google/',
                method: 'POST',
                body,
            }),
        }),
        googleLogin: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
            query: (body) => ({
                url: '/accounts/signin-google/',
                method: 'POST',
                body,
            }),
        }),
        refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
            query: (body) => ({
                url: '/accounts/token/refresh/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGoogleSignupMutation,
    useGoogleLoginMutation,
    useRefreshTokenMutation
} = googleAuthApi;
