export enum ContestDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  platform: "Codeforces" | "AtCoder" | "CodeChef" | "HackerRank" | "Other";
  registrationDeadline: string;
  type: "Individual" | "Team";
  maxTeamSize?: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  image?: string;
  rules?: string[];
  prizes?: {
    position: string;
    prize: string;
  }[];
}
