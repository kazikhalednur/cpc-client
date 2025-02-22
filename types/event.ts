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
