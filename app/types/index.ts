export interface Contest {
  id: string;
  title: string;
  image: string;
  date: string;
  participants: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Upcoming" | "Ongoing" | "Completed";
  platform: string;
  prize: string;
  description: string;
}

export interface ContestDifficulty {
  EASY: "EASY";
  MEDIUM: "MEDIUM";
  HARD: "HARD";
}
