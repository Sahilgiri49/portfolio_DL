
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
}

// Fix: Changed zustand import from default to named import 'create' to fix call signature error.
export const useStore = create<AppState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project, isModalOpen: !!project }),
  isModalOpen: false,
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  hoveredNode: null,
  setHoveredNode: (id) => set({ hoveredNode: id }),
}));
