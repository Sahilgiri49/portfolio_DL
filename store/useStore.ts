

import { create } from 'zustand';
import type { Page, Project } from '../types';

interface AppState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  fetchProjects: () => Promise<void>;
}

// Fix: Changed zustand import from default to named import 'create' to fix call signature error.
export const useStore = create<AppState>((set, get) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project, isModalOpen: !!project }),
  isModalOpen: false,
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  hoveredNode: null,
  setHoveredNode: (id) => set({ hoveredNode: id }),
  projects: [],
  setProjects: (projects) => set({ projects }),
  fetchProjects: async () => {
    // This function will be called from Admin.tsx to refresh data after CRUD operations.
    // The initial fetch is in App.tsx.
    // Fix: Changed dynamic import to a namespace import to resolve module loading issue.
    const firestore = await import('firebase/firestore');
    const { db } = await import('../firebase');
    const projectsCollection = firestore.collection(db, 'projects');
    const projectSnapshot = await firestore.getDocs(projectsCollection);
    const projectsList = projectSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Project);
    set({ projects: projectsList });
  },
}));
