import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TokenManager } from '../auth/jwt';

export type BlogCategory = {
    title: string;
    slug: string;
};

export type BlogCategoriesResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: BlogCategory[];
};

export type ApiBlogItem = {
    id: string;
    title: string;
    slug: string;
    author: string;
    author_avatar: string;
    published_at: string;
    read_time: string;
    short_description: string;
    image: string;
    tags: string; // comma separated
    category: string; // category title
    likes: number;
    bookmarks: number;
};

export type BlogListResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: ApiBlogItem[];
    };
};

export type GetBlogsParams = {
    page?: number;
    page_size?: number;
    author?: string;
    category?: string; // slug
};

export type BlogDetailResponse = {
    success: boolean;
    status_code: number;
    message: string;
    data: ApiBlogItem & {
        author_bio?: string | null;
        content: string; // HTML
        views_count?: number;
        is_liked?: boolean;
        is_bookmarked?: boolean;
        status?: string;
    };
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

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getBlogCategories: builder.query<BlogCategory[], void>({
            query: () => ({ url: '/blogs/categories/' }),
            transformResponse: (response: BlogCategoriesResponse) => response.data || [],
        }),
        getBlogs: builder.query<
            {
                count: number;
                next: string | null;
                results: Array<{
                    id: string;
                    title: string;
                    slug: string;
                    author: string;
                    authorAvatar: string;
                    date: string;
                    readTime: string;
                    excerpt: string;
                    image: string;
                    tags: string[];
                    category: string;
                    likes: number;
                    bookmarks: number;
                }>;
            },
            GetBlogsParams | void
        >({
            query: (params) => {
                const q = new URLSearchParams();
                if (params?.page) q.set('page', String(params.page));
                if (params?.page_size) q.set('page_size', String(params.page_size));
                if (params?.author) q.set('author', params.author);
                if (params?.category) q.set('category', params.category);
                const qs = q.toString();
                return { url: `/blogs/${qs ? `?${qs}` : ''}` };
            },
            transformResponse: (response: BlogListResponse) => {
                const items = response?.data?.results ?? [];
                const results = items.map((b) => ({
                    id: b.id,
                    title: b.title,
                    slug: b.slug,
                    author: b.author,
                    authorAvatar: b.author_avatar,
                    date: b.published_at,
                    readTime: b.read_time,
                    excerpt: b.short_description,
                    image: b.image,
                    tags: (b.tags || '').split(',').map(t => t.trim()).filter(Boolean),
                    category: b.category,
                    likes: b.likes || 0,
                    bookmarks: b.bookmarks || 0,
                }));
                return {
                    count: response?.data?.count ?? results.length,
                    next: response?.data?.next ?? null,
                    results,
                };
            },
        }),
        likeBlog: builder.mutation<{ liked: boolean; likes: number }, { slug: string }>({
            query: ({ slug }) => ({
                url: `/blogs/${slug}/like/`,
                method: 'POST',
                body: undefined,
            }),
            transformResponse: (response: { success: boolean; status_code: number; message: string; data: { liked: boolean; likes: number } }) => response.data,
        }),
        bookmarkBlog: builder.mutation<{ bookmarked: boolean; bookmarks: number }, { slug: string }>({
            query: ({ slug }) => ({
                url: `/blogs/${slug}/bookmark/`,
                method: 'POST',
                body: undefined,
            }),
            transformResponse: (response: { success: boolean; status_code: number; message: string; data: { bookmarked: boolean; bookmarks: number } }) => response.data,
        }),
        getBlogBySlug: builder.query<
            {
                id: string;
                title: string;
                slug: string;
                author: string;
                authorAvatar: string;
                authorBio?: string | null;
                shortDescription: string;
                contentHtml: string;
                image: string;
                tags: string[];
                readTime: string;
                viewsCount?: number;
                status?: string;
                publishedAt: string;
                category: string;
                likes: number;
                bookmarks: number;
                isLiked?: boolean;
                isBookmarked?: boolean;
            },
            string
        >({
            query: (slug) => ({ url: `/blogs/${slug}/` }),
            transformResponse: (response: BlogDetailResponse) => {
                const d = response.data;
                return {
                    id: d.id,
                    title: d.title,
                    slug: d.slug,
                    author: d.author,
                    authorAvatar: d.author_avatar,
                    authorBio: d.author_bio ?? null,
                    shortDescription: d.short_description,
                    contentHtml: d.content,
                    image: d.image,
                    tags: (d.tags || '').split(',').map(t => t.trim()).filter(Boolean),
                    readTime: d.read_time,
                    viewsCount: d.views_count,
                    status: d.status,
                    publishedAt: d.published_at,
                    category: d.category,
                    likes: d.likes || 0,
                    bookmarks: d.bookmarks || 0,
                    isLiked: d.is_liked,
                    isBookmarked: d.is_bookmarked,
                };
            },
        }),
    }),
});

export const { useGetBlogCategoriesQuery, useGetBlogsQuery, useGetBlogBySlugQuery, useLikeBlogMutation, useBookmarkBlogMutation } = blogApi;


