
export type Page = 'home' | 'skills' | 'projects' | 'achievements' | 'education' | 'contact';

export interface Skill {
  id: string;
  name: string;
  experience: string;
  usedIn: string;
}

export interface Project {
  id: string;
  cluster: 'Remote Sensing & AI' | 'AI Applications' | 'Blockchain + AI' | 'Data Science';
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  achievements: string;
}

export interface Achievement {
  id: string;
  title: string;
  details: string;
  proof?: string;
}

export interface Education {
  id: string;
  year: string;
  title: string;
  institution: string;
  details: string;
}