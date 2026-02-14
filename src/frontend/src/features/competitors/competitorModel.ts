import { create } from 'zustand';

export interface Competitor {
  id: string;
  name: string;
  cash: bigint;
  marketShare: number;
  activeProducts: number;
  strength: number;
  strategy: 'Aggressive' | 'Balanced' | 'Conservative';
}

interface CompetitorStore {
  competitors: Competitor[];
  initializeCompetitors: (difficulty: string) => void;
  updateCompetitor: (id: string, updates: Partial<Competitor>) => void;
}

const competitorNames = [
  'TechNova',
  'FutureCorp',
  'InnovateTech',
  'DigitalDynamics',
  'SmartSystems',
  'NextGen Industries',
];

export const useCompetitorStore = create<CompetitorStore>((set) => ({
  competitors: [],
  initializeCompetitors: (difficulty) => {
    const baseStrength = difficulty === 'challenging' ? 150 : 100;
    const competitors = competitorNames.map((name, index) => ({
      id: `comp-${index}`,
      name,
      cash: BigInt(50000 + index * 10000),
      marketShare: 10 + Math.random() * 10,
      activeProducts: Math.floor(Math.random() * 5) + 1,
      strength: baseStrength + Math.floor(Math.random() * 30),
      strategy: (['Aggressive', 'Balanced', 'Conservative'] as const)[index % 3],
    }));
    set({ competitors });
  },
  updateCompetitor: (id, updates) =>
    set((state) => ({
      competitors: state.competitors.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)),
    })),
}));
