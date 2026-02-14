import { create } from 'zustand';

export interface MarketEvent {
  id: string;
  type: 'release' | 'price-change' | 'market-shift';
  title: string;
  description: string;
  day: number;
  impact?: string;
}

interface MarketFeedStore {
  events: MarketEvent[];
  addEvent: (event: Omit<MarketEvent, 'id'>) => void;
}

export const useMarketFeedStore = create<MarketFeedStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [{ ...event, id: `event-${Date.now()}` }, ...state.events].slice(0, 100),
    })),
}));
