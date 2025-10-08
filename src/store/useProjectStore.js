// src/store/useProjectStore.js
import { create } from 'zustand';

const useProjectStore = create((set, get) => ({
  // === Daftar Proyek ===
  projects: [
    { id: '1', name: 'Kafe Cantik', manager: 'Rina S.' },
    { id: '2', name: 'Online Store Fashion', manager: 'Dewi A.' },
  ],

  // === Proyek yang sedang aktif ===
  currentProject: null,

  // === Data per proyek per fase ===
  // Struktur: { [projectId]: { plan: { ... }, sell: { ... }, scaleUp: { ... } } }
  projectData: {},

  // --- Actions ---

  // Tambah proyek baru
  addProject: (project) =>
    set((state) => {
      const newId = Date.now().toString();
      const newProject = { ...project, id: newId };
      return {
        projects: [...state.projects, newProject],
      };
    }),

  // Set proyek aktif
  setCurrentProject: (projectId) => {
    const project = get().projects.find((p) => p.id === projectId);
    set({ currentProject: project || null });
  },

  // Di dalam store
updatePhaseData: (projectId, phaseKey, data) =>
  set((state) => {
    const current = state.projectData[projectId] || {};
    return {
      projectData: {
        ...state.projectData,
        [projectId]: {
          ...current,
          [phaseKey]: { ...current[phaseKey], ...data },
        },
      },
    };
  }),

getPhaseData: (projectId, phaseKey) => {
  return get().projectData[projectId]?.[phaseKey] || {};
},

  // Shortcut: Ambil data Ide Bisnis (bagian dari plan)
  getBusinessIdea: (projectId) => {
    return get().getPhaseData(projectId, 'businessIdea');
  },

  // Shortcut: Simpan Ide Bisnis
  saveBusinessIdea: (projectId, ideaData) => {
    get().updatePhaseData(projectId, 'businessIdea', ideaData);
  },

  // Reset semua data (opsional, untuk dev)
  resetAll: () => set({ projectData: {}, currentProject: null }),
}));

export default useProjectStore;