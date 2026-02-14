import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SaveGameStore {
  currentSaveId: string | null;
  setCurrentSaveId: (id: string | null) => void;
  localSaveData: Record<string, any>;
  updateLocalSave: (saveId: string, data: any) => void;
}

export const useSaveGameStore = create<SaveGameStore>()(
  persist(
    (set) => ({
      currentSaveId: null,
      setCurrentSaveId: (id) => set({ currentSaveId: id }),
      localSaveData: {},
      updateLocalSave: (saveId, data) =>
        set((state) => ({
          localSaveData: { ...state.localSaveData, [saveId]: data },
        })),
    }),
    {
      name: 'save-game-storage',
    }
  )
);
