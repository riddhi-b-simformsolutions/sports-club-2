// T010 — Club and Activity models

export interface Activity {
  name: string;
  description: string;
  schedule?: string;
}

export interface Club {
  id: string;
  name: string;
  sport: string;
  sportIcon: string;
  tagline: string;
  location: string;
  coverImageUrl: string;
  heroImageUrl: string;
  foundingYear: number;
  memberCount: number;
  description: string;
  achievements: string[];
  activities: Activity[];
  accentColor: string;
}
