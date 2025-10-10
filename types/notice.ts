export interface Notice {
    id: string;
    title: string;
    content: string;
    category: "announcement" | "event" | "achievement" | "general";
    priority: "high" | "medium" | "low";
    publishedAt: string;
    author: string;
    tags: string[];
    isPinned: boolean;
}

export interface NoticeFilters {
    searchTerm: string;
    category: string;
    priority: string;
}

export interface NoticeApiResponse {
    success: boolean;
    data: Notice[];
    total: number;
    page: number;
    limit: number;
}
