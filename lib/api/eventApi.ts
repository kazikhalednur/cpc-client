import { Event, EventApiResponse, EventDetailResponse } from "@/types/event";

class EventApi {
    private static readonly API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://127.0.0.1:8000";

    private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.API_BASE_URL}${endpoint}`;

        const defaultOptions: RequestInit = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...options.headers,
            },
            mode: 'cors',
            credentials: 'omit',
            ...options,
        };

        try {
            console.log(`Making API request to: ${url}`);
            const response = await fetch(url, defaultOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            console.error(`Request URL: ${url}`);
            console.error(`API Base URL: ${this.API_BASE_URL}`);

            // Provide more specific error messages
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                throw new Error(`Unable to connect to backend server at ${this.API_BASE_URL}. Please ensure the server is running and CORS is configured.`);
            }

            throw error;
        }
    }

    static async getEvents(params?: {
        page?: number;
        page_size?: number;
        search?: string;
        status?: string;
        wing?: string;
    }): Promise<EventApiResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.wing) queryParams.append('wing', params.wing);

        const queryString = queryParams.toString();
        const endpoint = queryString ? `/events/?${queryString}` : '/events/';

        return this.request<EventApiResponse>(endpoint);
    }

    static async getEventById(id: string): Promise<Event> {
        const response = await this.request<EventDetailResponse>(`/events/${id}/`);
        return response.data;
    }
}

export const eventApi = EventApi;
