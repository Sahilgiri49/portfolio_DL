import type { ThreeElements } from '@react-three/fiber';

// Fix: Augment the global JSX namespace to include react-three-fiber's intrinsic elements.
// This is placed in a central types file to ensure it's available globally and fixes
// errors for components like `<mesh>`, `<group>`, `<sphereGeometry>`, etc. across the app.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export type Page = 'home' | 'skills' | 'projects' | 'achievements' | 'education' | 'contact' | 'resume';

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