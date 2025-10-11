import { Notice, NoticeApiResponse, NoticeFilters, NoticeCategoriesResponse, NoticeDetailResponse } from '@/types/notice';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export class NoticeApi {
    private static async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get all notices with optional filtering
     */
    static async getNotices(filters?: Partial<NoticeFilters>): Promise<NoticeApiResponse> {
        const params = new URLSearchParams();

        if (filters?.searchTerm) {
            params.append('search', filters.searchTerm);
        }
        if (filters?.category && filters.category !== 'all') {
            // Map frontend category values to backend format
            const categoryMap: { [key: string]: string } = {
                'announcement': 'Announcements',
                'event': 'Events',
                'achievement': 'Achievements',
                'general': 'General'
            };
            const backendCategory = categoryMap[filters.category] || filters.category;
            params.append('category', backendCategory);
        }
        if (filters?.priority && filters.priority !== 'all') {
            // Map frontend priority values to backend format
            const priorityMap: { [key: string]: string } = {
                'high': 'HIGH',
                'medium': 'MEDIUM',
                'low': 'LOW'
            };
            const backendPriority = priorityMap[filters.priority] || filters.priority.toUpperCase();
            params.append('priority', backendPriority);
        }

        const queryString = params.toString();
        const endpoint = queryString ? `/notices/?${queryString}` : '/notices/';

        return this.request<NoticeApiResponse>(endpoint);
    }

    /**
     * Get a single notice by ID
     */
    static async getNoticeById(id: string): Promise<Notice> {
        const response = await this.request<NoticeDetailResponse>(`/notices/${id}/`);
        return response.data;
    }

    /**
     * Get pinned notices
     */
    static async getPinnedNotices(): Promise<Notice[]> {
        const response = await this.request<NoticeApiResponse>('/notices/?pinned=true');
        return response.data.results;
    }

    /**
     * Get notices by category
     */
    static async getNoticesByCategory(category: string): Promise<Notice[]> {
        const response = await this.request<NoticeApiResponse>(`/notices/?category=${category}`);
        return response.data.results;
    }

    /**
     * Search notices
     */
    static async searchNotices(query: string): Promise<Notice[]> {
        const response = await this.request<NoticeApiResponse>(`/notices/?search=${encodeURIComponent(query)}`);
        return response.data.results;
    }

    /**
     * Get all notice categories
     */
    static async getCategories(): Promise<NoticeCategoriesResponse> {
        return this.request<NoticeCategoriesResponse>('/notices/categories/');
    }
}

// Export the NoticeApi
export const noticeApi = NoticeApi;
