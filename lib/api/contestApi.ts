import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TokenManager } from '../auth/jwt';

export type ContestApiItem = {
    id: string;
    title: string;
    short_description?: string;
    description?: string;
    start_time: string;
    end_time: string;
    platform: string;
    difficulty_level: string;
    prize?: string;
    image: string;
    status: string;
    participants?: number | string;
};

export type ContestListResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: ContestApiItem[];
    };
};

export type ContestDetailResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: ContestApiItem & {
        platform_link?: string;
        max_participants?: number;
        registration_link?: string;
        registration_deadline?: string;
        organizer?: string;
        prizes?: any[];
        created_at?: string;
        updated_at?: string;
        published_at?: string;
    };
};

export type NormalizedContest = {
    id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    platform: string;
    difficulty: string;
    prize?: string;
    image: string;
    status: string;
    participants: number;
};

export type GetContestsParams = {
    page?: number;
    page_size?: number;
    search?: string;
    status?: string;
    difficulty_level?: string; // Easy | Medium | Hard
};

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

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
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

export type CommitteePanel = {
    id: string;
    type: "STUDENT" | "ADVISOR";
    image: string;
};

export type Committee = {
    id: string;
    year: string;
    panels: CommitteePanel[];
};

export type CommitteesResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: Committee[];
};

export type CommitteeDetailResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: Committee;
};

export const contestApi = createApi({
    reducerPath: 'contestApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getContests: builder.query<
            { count: number; next: string | null; results: NormalizedContest[] },
            GetContestsParams | void
        >({
            query: (params) => {
                const q = new URLSearchParams();
                if (params?.page) q.set('page', String(params.page));
                if (params?.page_size) q.set('page_size', String(params.page_size));
                if (params?.search) q.set('search', params.search);
                if (params?.status && params.status !== 'all') q.set('status', params.status);
                if (params?.difficulty_level && params.difficulty_level !== 'all') q.set('difficulty_level', params.difficulty_level);
                const qs = q.toString();
                return { url: `/contests/${qs ? `?${qs}` : ''}` };
            },
            transformResponse: (response: ContestListResponse) => {
                const results: NormalizedContest[] = (response?.data?.results ?? []).map((c) => ({
                    id: c.id,
                    title: c.title,
                    description: c.short_description || c.description || '',
                    startTime: c.start_time,
                    endTime: c.end_time,
                    platform: c.platform,
                    difficulty: (c.difficulty_level || '').toString().toUpperCase(),
                    prize: c.prize,
                    image: c.image,
                    status: c.status,
                    participants: typeof c.participants === 'string' ? parseInt(c.participants, 10) || 0 : c.participants || 0,
                }));
                return {
                    count: response?.data?.count ?? results.length,
                    next: response?.data?.next ?? null,
                    results,
                };
            },
        }),
        getContestById: builder.query<
            NormalizedContest & {
                shortDescription?: string;
                platformLink?: string;
                maxParticipants?: number;
                registrationLink?: string;
                registrationDeadline?: string;
                organizer?: string;
                prizes?: any[];
                createdAt?: string;
                updatedAt?: string;
                publishedAt?: string;
                rawHtmlDescription?: string;
            },
            string
        >({
            query: (id) => ({ url: `/contests/${id}/` }),
            transformResponse: (response: ContestDetailResponse) => {
                const d = response.data;
                return {
                    id: d.id,
                    title: d.title,
                    description: d.short_description || d.description || '',
                    rawHtmlDescription: d.description,
                    startTime: d.start_time,
                    endTime: d.end_time,
                    platform: d.platform,
                    difficulty: (d.difficulty_level || '').toString().toUpperCase(),
                    prize: d.prize,
                    image: d.image,
                    status: d.status,
                    participants: typeof d.participants === 'string' ? parseInt(d.participants as any, 10) || 0 : (d.participants as any) || 0,
                    shortDescription: d.short_description,
                    platformLink: (d as any).platform_link,
                    maxParticipants: (d as any).max_participants,
                    registrationLink: (d as any).registration_link,
                    registrationDeadline: (d as any).registration_deadline,
                    organizer: (d as any).organizer,
                    prizes: (d as any).prizes,
                    createdAt: (d as any).created_at,
                    updatedAt: (d as any).updated_at,
                    publishedAt: (d as any).published_at,
                };
            },
        }),
        getCommittees: builder.query<Committee[], void>({
            query: () => ({ url: '/committees/' }),
            transformResponse: (response: CommitteesResponse) => response.data || [],
        }),
        getCommitteeById: builder.query<Committee, string>({
            query: (id) => ({ url: `/committees/${id}/` }),
            transformResponse: (response: CommitteeDetailResponse) => response.data,
        }),
    }),
});

export const { useGetContestsQuery, useGetContestByIdQuery, useGetCommitteesQuery, useGetCommitteeByIdQuery } = contestApi;


