import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StoreNetwork, Store } from '../../backend';
import { createEmptyStoreNetwork, computeStoreNetworkBonuses, createStore } from './storeNetworkModel';

interface StoreNetworkStore {
  storeNetwork: StoreNetwork;
  initializeFromSave: (network: StoreNetwork) => void;
  buildStore: (country: string) => void;
  reset: () => void;
}

export const useStoreNetworkStore = create<StoreNetworkStore>()(
  persist(
    (set) => ({
      storeNetwork: createEmptyStoreNetwork(),
      
      initializeFromSave: (network) => set({ storeNetwork: network }),
      
      buildStore: (country) =>
        set((state) => {
          const newStore = createStore(country);
          const updatedStores = [...state.storeNetwork.stores, newStore];
          const bonuses = computeStoreNetworkBonuses(updatedStores);
          
          return {
            storeNetwork: {
              stores: updatedStores,
              productivityBonus: bonuses.productivityBonus,
              productAttractionBonus: bonuses.productAttractionBonus,
            },
          };
        }),
      
      reset: () => set({ storeNetwork: createEmptyStoreNetwork() }),
    }),
    {
      name: 'store-network-storage',
    }
  )
);
