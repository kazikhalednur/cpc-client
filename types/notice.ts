export interface Notice {
    id: string;
    title: string;
    content: string;
    category: string; // Backend returns full category names like "Announcements"
    priority: string; // Backend returns uppercase like "HIGH", "MEDIUM", "LOW"
    tags: string[];
    is_pinned: boolean; // Backend uses snake_case
    status: string; // Backend includes status field
    published_at: string; // Backend uses snake_case
    updated_at: string; // Backend includes updated_at field
}

export interface NoticeFilters {
    searchTerm: string;
    category: string;
    priority: string;
}

export interface NoticeApiResponse {
    success: boolean;
    status_code: number;
    message: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: Notice[];
    };
}

export interface NoticeCategory {
    title: string;
}

export interface NoticeCategoriesResponse {
    success: boolean;
    status_code: number;
    message: string;
    data: NoticeCategory[];
}

export interface NoticeDetailResponse {
    success: boolean;
    status_code: number;
    message: string;
    data: Notice;
}
