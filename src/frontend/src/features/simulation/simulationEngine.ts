import { useEffect, useRef } from 'react';
import { create } from 'zustand';
import { useCompetitorStore } from '../competitors/competitorModel';
import { useMarketFeedStore } from '../market/marketFeedStore';
import { useGameState } from '@/state/gameState';

interface SimulationStore {
  isRunning: boolean;
  currentDay: number;
  toggleSimulation: () => void;
  advanceDay: () => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  isRunning: false,
  currentDay: 1,
  toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),
  advanceDay: () => set((state) => ({ currentDay: state.currentDay + 1 })),
}));

export function useSimulationEngine() {
  const { isRunning, currentDay, toggleSimulation, advanceDay } = useSimulationStore();
  const { competitors, updateCompetitor, initializeCompetitors } = useCompetitorStore();
  const { addEvent } = useMarketFeedStore();
  const { gameState } = useGameState();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState && competitors.length === 0) {
      initializeCompetitors(gameState.difficulty);
    }
  }, [gameState, competitors.length, initializeCompetitors]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        advanceDay();

        if (Math.random() > 0.7) {
          const competitor = competitors[Math.floor(Math.random() * competitors.length)];
          if (competitor) {
            const actions = ['released a new product', 'increased marketing spend', 'started new research'];
            const action = actions[Math.floor(Math.random() * actions.length)];

            addEvent({
              type: 'release',
              title: `${competitor.name} Activity`,
              description: `${competitor.name} ${action}`,
              day: currentDay,
              impact: 'Market share shifted by 0.5%',
            });

            updateCompetitor(competitor.id, {
              marketShare: Math.min(competitor.marketShare + 0.5, 30),
            });
          }
        }
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentDay, competitors, advanceDay, addEvent, updateCompetitor]);

  return { isRunning, currentDay, toggleSimulation };
}
