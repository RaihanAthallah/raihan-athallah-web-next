export interface Experience {
  id: string;
  position: string;
  company: string;
  description: string;
  startDate: Date;
  endDate: Date | null; // Nullable DateTime
  createdAt: Date;
  updatedAt: Date;
  achievements: Achievement[]; // Array of achievements
}

export interface Achievement {
  id: string;
  description: string;
  experienceId: string;
}
