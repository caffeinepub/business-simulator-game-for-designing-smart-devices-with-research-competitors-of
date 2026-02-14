import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OfficeStore {
  level: number;
  upgradeCost: bigint;
  upgrade: () => void;
}

export const useOfficeStore = create<OfficeStore>()(
  persist(
    (set) => ({
      level: 1,
      upgradeCost: BigInt(10000),
      upgrade: () =>
        set((state) => ({
          level: Math.min(state.level + 1, 20),
          upgradeCost: BigInt(10000 * (state.level + 1) * (state.level + 1)),
        })),
    }),
    {
      name: 'office-storage',
    }
  )
);
