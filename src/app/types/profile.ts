export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string | null;
  resumeUrl: string | null;
  socials: string | null;
  createdAt: Date;
  updatedAt: Date;
}
