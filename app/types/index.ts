export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  platform: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prize: string;
  image: string;
  status: string;
  participants: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContestDifficulty {
  EASY: "EASY";
  MEDIUM: "MEDIUM";
  HARD: "HARD";
}
