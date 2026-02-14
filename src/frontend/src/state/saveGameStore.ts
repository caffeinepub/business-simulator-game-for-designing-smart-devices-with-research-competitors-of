import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StoreNetwork } from '../backend';
import { createEmptyStoreNetwork } from '@/features/stores/storeNetworkModel';

interface SaveGameStore {
  currentSaveId: string | null;
  localStoreNetwork: StoreNetwork;
  setCurrentSaveId: (id: string | null) => void;
  setLocalStoreNetwork: (network: StoreNetwork) => void;
  reset: () => void;
}

export const useSaveGameStore = create<SaveGameStore>()(
  persist(
    (set) => ({
      currentSaveId: null,
      localStoreNetwork: createEmptyStoreNetwork(),
      setCurrentSaveId: (id) => set({ currentSaveId: id }),
      setLocalStoreNetwork: (network) => set({ localStoreNetwork: network }),
      reset: () => set({ currentSaveId: null, localStoreNetwork: createEmptyStoreNetwork() }),
    }),
    {
      name: 'save-game-storage',
    }
  )
);
