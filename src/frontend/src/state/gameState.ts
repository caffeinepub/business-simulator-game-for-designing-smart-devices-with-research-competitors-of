import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState } from '../backend';

interface GameStateStore {
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
  updateCash: (amount: bigint) => void;
  addResearchedTech: (techId: string) => void;
  addProduct: (productId: string) => void;
  reset: () => void;
}

export const useGameState = create<GameStateStore>()(
  persist(
    (set) => ({
      gameState: null,
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
      reset: () => set({ gameState: null }),
    }),
    {
      name: 'game-state-storage',
    }
  )
);
