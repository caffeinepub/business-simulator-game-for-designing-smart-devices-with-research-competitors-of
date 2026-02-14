import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, ReleasedProduct, Branding } from '../backend';

interface GameStateStore {
  gameState: GameState | null;
  releasedProducts: ReleasedProduct[];
  branding: Branding | null;
  triggeredEraEvents: string[];
  setGameState: (state: GameState) => void;
  updateCash: (amount: bigint) => void;
  addResearchedTech: (techId: string) => void;
  addProduct: (productId: string) => void;
  addReleasedProduct: (product: ReleasedProduct) => void;
  setReleasedProducts: (products: ReleasedProduct[]) => void;
  setBranding: (branding: Branding) => void;
  markTriggeredEraEvent: (eventId: string) => void;
  hasTriggeredEraEvent: (eventId: string) => boolean;
  setTriggeredEraEvents: (eventIds: string[]) => void;
  reset: () => void;
}

const defaultBranding: Branding = {
  companyName: 'TechCorp',
  companyLogo: '',
  productName: '',
  productLogo: '',
};

export const useGameState = create<GameStateStore>()(
  persist(
    (set, get) => ({
      gameState: null,
      releasedProducts: [],
      branding: null,
      triggeredEraEvents: [],
      setGameState: (state) => set({ gameState: state }),
      updateCash: (amount) =>
        set((state) => ({
          gameState: state.gameState ? { ...state.gameState, cash: amount } : null,
        })),
      addResearchedTech: (techId) =>
        set((state) => ({
          gameState: state.gameState
            ? { ...state.gameState, researchedTechs: [...state.gameState.researchedTechs, techId] }
            : null,
        })),
      addProduct: (productId) =>
        set((state) => ({
          gameState: state.gameState
            ? { ...state.gameState, products: [...state.gameState.products, productId] }
            : null,
        })),
      addReleasedProduct: (product) =>
        set((state) => ({
          releasedProducts: [...state.releasedProducts, product],
        })),
      setReleasedProducts: (products) => set({ releasedProducts: products }),
      setBranding: (branding) => set({ branding }),
      markTriggeredEraEvent: (eventId) =>
        set((state) => ({
          triggeredEraEvents: [...state.triggeredEraEvents, eventId],
        })),
      hasTriggeredEraEvent: (eventId) => {
        return get().triggeredEraEvents.includes(eventId);
      },
      setTriggeredEraEvents: (eventIds) => set({ triggeredEraEvents: eventIds }),
      reset: () => set({ gameState: null, releasedProducts: [], branding: null, triggeredEraEvents: [] }),
    }),
    {
      name: 'game-state-storage',
    }
  )
);

export { defaultBranding };
