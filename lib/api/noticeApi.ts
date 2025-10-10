import { Notice, NoticeApiResponse, NoticeFilters } from '@/types/notice';

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
            params.append('category', filters.category);
        }
        if (filters?.priority && filters.priority !== 'all') {
            params.append('priority', filters.priority);
        }

        const queryString = params.toString();
        const endpoint = queryString ? `/notices/?${queryString}` : '/notices/';

        return this.request<NoticeApiResponse>(endpoint);
    }

    /**
     * Get a single notice by ID
     */
    static async getNoticeById(id: string): Promise<Notice> {
        return this.request<Notice>(`/notices/${id}/`);
    }

    /**
     * Get pinned notices
     */
    static async getPinnedNotices(): Promise<Notice[]> {
        const response = await this.request<NoticeApiResponse>('/notices/?pinned=true');
        return response.data;
    }

    /**
     * Get notices by category
     */
    static async getNoticesByCategory(category: string): Promise<Notice[]> {
        const response = await this.request<NoticeApiResponse>(`/notices/?category=${category}`);
        return response.data;
    }

    /**
     * Search notices
     */
    static async searchNotices(query: string): Promise<Notice[]> {
        const response = await this.request<NoticeApiResponse>(`/notices/?search=${encodeURIComponent(query)}`);
        return response.data;
    }
}

// Mock API for development/testing
export class MockNoticeApi {
    private static mockNotices: Notice[] = [
        {
            id: "1",
            title: "ICPC Regional Contest 2024 Registration Open",
            content: "Registration for the ICPC Regional Contest 2024 is now open! This is a great opportunity for our students to showcase their programming skills and compete at the regional level. The contest will be held on March 15, 2024, and registration closes on February 28, 2024.",
            category: "announcement",
            priority: "high",
            publishedAt: "2024-01-15T10:00:00Z",
            author: "CPC Admin",
            tags: ["ICPC", "Contest", "Programming", "Competition"],
            isPinned: true,
        },
        {
            id: "2",
            title: "Advanced Algorithm Workshop Series",
            content: "We're excited to announce our new Advanced Algorithm Workshop Series! This comprehensive program will cover advanced data structures, dynamic programming, graph algorithms, and more. The workshops will be held every Saturday starting from February 1, 2024.",
            category: "event",
            priority: "high",
            publishedAt: "2024-01-12T14:30:00Z",
            author: "Workshop Team",
            tags: ["Workshop", "Algorithms", "Learning", "Data Structures"],
            isPinned: true,
        },
        {
            id: "3",
            title: "Congratulations to Team Phoenix - ICPC Regional Finalists",
            content: "We're proud to announce that Team Phoenix has qualified for the ICPC Regional Finals! Their outstanding performance in the preliminary rounds has earned them a spot in the regional competition. Congratulations to all team members for their hard work and dedication.",
            category: "achievement",
            priority: "medium",
            publishedAt: "2024-01-10T16:45:00Z",
            author: "CPC Admin",
            tags: ["Achievement", "ICPC", "Team Phoenix", "Success"],
            isPinned: false,
        },
        {
            id: "4",
            title: "New Problem Set Added to Practice Platform",
            content: "We've added 50 new problems to our practice platform covering various topics including dynamic programming, graph theory, and number theory. These problems are designed to help students prepare for competitive programming contests.",
            category: "general",
            priority: "medium",
            publishedAt: "2024-01-08T09:15:00Z",
            author: "Problem Set Team",
            tags: ["Practice", "Problems", "Learning", "Platform"],
            isPinned: false,
        },
        {
            id: "5",
            title: "Weekly Programming Contest Schedule",
            content: "Our weekly programming contests will now be held every Friday at 6:00 PM. The contests will feature problems of varying difficulty levels suitable for both beginners and advanced programmers. Join us for an exciting evening of competitive programming!",
            category: "event",
            priority: "low",
            publishedAt: "2024-01-05T11:20:00Z",
            author: "Contest Team",
            tags: ["Weekly Contest", "Programming", "Friday", "Competition"],
            isPinned: false,
        },
    ];

    static async getNotices(filters?: Partial<NoticeFilters>): Promise<NoticeApiResponse> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredNotices = [...this.mockNotices];

        // Apply filters
        if (filters?.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            filteredNotices = filteredNotices.filter(notice =>
                notice.title.toLowerCase().includes(searchTerm) ||
                notice.content.toLowerCase().includes(searchTerm) ||
                notice.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        if (filters?.category && filters.category !== 'all') {
            filteredNotices = filteredNotices.filter(notice => notice.category === filters.category);
        }

        if (filters?.priority && filters.priority !== 'all') {
            filteredNotices = filteredNotices.filter(notice => notice.priority === filters.priority);
        }

        // Sort by pinned first, then by published date
        filteredNotices.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });

        return {
            success: true,
            data: filteredNotices,
            total: filteredNotices.length,
            page: 1,
            limit: 10,
        };
    }

    static async getNoticeById(id: string): Promise<Notice> {
        await new Promise(resolve => setTimeout(resolve, 300));

        const notice = this.mockNotices.find(n => n.id === id);
        if (!notice) {
            throw new Error(`Notice with id ${id} not found`);
        }

        return notice;
    }

    static async getPinnedNotices(): Promise<Notice[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.mockNotices.filter(notice => notice.isPinned);
    }

    static async getNoticesByCategory(category: string): Promise<Notice[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.mockNotices.filter(notice => notice.category === category);
    }

    static async searchNotices(query: string): Promise<Notice[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const searchTerm = query.toLowerCase();
        return this.mockNotices.filter(notice =>
            notice.title.toLowerCase().includes(searchTerm) ||
            notice.content.toLowerCase().includes(searchTerm) ||
            notice.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
}

// Export the appropriate API based on environment
export const noticeApi = process.env.NODE_ENV === 'development' ? MockNoticeApi : NoticeApi;
