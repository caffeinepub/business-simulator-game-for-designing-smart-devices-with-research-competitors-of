import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Investment {
  id: string;
  type: string;
  amount: bigint;
  description: string;
  timestamp: number;
}

interface InvestmentStore {
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, 'id' | 'timestamp'>) => void;
}

export const useInvestmentStore = create<InvestmentStore>()(
  persist(
    (set) => ({
      investments: [],
      addInvestment: (investment) =>
        set((state) => ({
          investments: [
            {
              ...investment,
              id: `inv-${Date.now()}`,
              timestamp: Date.now(),
            },
            ...state.investments,
          ].slice(0, 100),
        })),
    }),
    {
      name: 'investment-storage',
    }
  )
);
