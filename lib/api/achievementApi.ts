import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TokenManager } from '../auth/jwt';

export type ApiAchievementItem = {
    id: string;
    title: string;
    team_name: string;
    rank: string;
    image: string;
    date: string; // YYYY-MM-DD
};

export type AchievementListResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: ApiAchievementItem[];
    };
};

export type GetAchievementsParams = {
    page?: number;
    page_size?: number;
    search?: string;
};

export type AchievementDetailResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: ApiAchievementItem & {
        description?: string;
    };
};

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8000',
    prepareHeaders: (headers) => {
        const token = TokenManager.getAccessToken();
        if (token) headers.set('authorization', `Bearer ${token}`);
        return headers;
    },
});

const baseQueryWithReauth = async (
    args: Parameters<typeof baseQuery>[0],
    api: Parameters<typeof baseQuery>[1],
    extraOptions: Parameters<typeof baseQuery>[2]
) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshToken = TokenManager.getRefreshToken();
        if (refreshToken) {
            const refreshResult = await baseQuery({ url: '/accounts/token/refresh/', method: 'POST', body: { refresh: refreshToken } }, api, extraOptions);
            if (refreshResult.data) {
                const { access, refresh } = refreshResult.data as { access: string; refresh?: string };
                TokenManager.setTokens({ access, refresh: refresh || refreshToken });
                result = await baseQuery(args, api, extraOptions);
            } else {
                TokenManager.clearTokens();
                if (typeof window !== 'undefined') window.location.href = '/auth/signin';
            }
        }
    }
    return result;
};

export const achievementApi = createApi({
    reducerPath: 'achievementApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAchievements: builder.query<
            {
                count: number;
                next: string | null;
                results: Array<{
                    id: string;
                    title: string;
                    team: string;
                    rank: string;
                    image: string;
                    date: string;
                }>;
            },
            GetAchievementsParams | void
        >({
            query: (params) => {
                const q = new URLSearchParams();
                if (params?.page) q.set('page', String(params.page));
                if (params?.page_size) q.set('page_size', String(params.page_size));
                if (params?.search) q.set('search', params.search);
                const qs = q.toString();
                return { url: `/achievements/${qs ? `?${qs}` : ''}` };
            },
            transformResponse: (response: AchievementListResponse) => {
                const items = response?.data?.results ?? [];
                const results = items.map((a) => ({
                    id: a.id,
                    title: a.title,
                    team: a.team_name,
                    rank: a.rank,
                    image: a.image,
                    date: a.date,
                }));
                return {
                    count: response?.data?.count ?? results.length,
                    next: response?.data?.next ?? null,
                    results,
                };
            },
        }),
        getAchievementById: builder.query<
            {
                id: string;
                title: string;
                team: string;
                rank: string;
                image: string;
                descriptionHtml?: string;
                date: string;
            },
            string
        >({
            query: (id) => ({ url: `/achievements/${id}/` }),
            transformResponse: (response: AchievementDetailResponse) => {
                const d = response.data;
                return {
                    id: d.id,
                    title: d.title,
                    team: d.team_name,
                    rank: d.rank,
                    image: d.image,
                    descriptionHtml: d.description,
                    date: d.date,
                };
            },
        }),
    }),
});

export const { useGetAchievementsQuery, useGetAchievementByIdQuery } = achievementApi;


