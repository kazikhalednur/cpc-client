export interface Speaker {
  id: number;
  name: string;
  designation: string;
  organization: string;
  country: string;
}

export interface Event {
  id: string;
  wing: string;
  title: string;
  image: string;
  event_date: string;
  short_description: string;
  description: string;
  registration_deadline: string;
  registration_link?: string;
  venue: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  published_at: string;
  speakers: Speaker[];
  guests: Speaker[];
}

export interface EventApiResponse {
  success: boolean;
  status_code: number;
  message: string;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Event[];
  };
}

export interface EventDetailResponse {
  success: boolean;
  status_code: number;
  message: string;
  data: Event;
}

// Legacy interface for backward compatibility
export interface EventData {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  keynoteSpeaker: string;
  guests: string[];
  eventDate: string;
  registrationDeadline: string;
  venue: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
}
