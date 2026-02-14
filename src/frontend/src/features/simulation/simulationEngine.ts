import { useEffect, useRef } from 'react';
import { create } from 'zustand';
import { useCompetitorStore } from '../competitors/competitorModel';
import { useMarketFeedStore } from '../market/marketFeedStore';
import { useGameState } from '@/state/gameState';
import { dayToDateParts } from '@/utils/gameCalendar';
import { findEventsForDate, type EraEvent } from './eraEventsDataset';

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
  const { gameState, updateCash, markTriggeredEraEvent, hasTriggeredEraEvent } = useGameState();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState && competitors.length === 0) {
      initializeCompetitors(gameState.difficulty);
    }
  }, [gameState, competitors.length, initializeCompetitors]);

  // Apply era event effects
  const applyEraEventEffects = (event: EraEvent) => {
    if (!gameState) return;

    event.effects.forEach((effect) => {
      switch (effect.type) {
        case 'cash':
          const newCash = Number(gameState.cash) + effect.value;
          updateCash(BigInt(Math.max(0, newCash)));
          break;
        case 'competitor-market-share':
          // Apply market share change to all competitors
          competitors.forEach((competitor) => {
            const newShare = Math.max(0, Math.min(30, competitor.marketShare + effect.value));
            updateCompetitor(competitor.id, { marketShare: newShare });
          });
          break;
        case 'simulation-parameter':
          // Reserved for future parameter modifications
          break;
      }
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        advanceDay();

        // Check for era-specific events
        const dateParts = dayToDateParts(currentDay);
        const matchingEvents = findEventsForDate(dateParts.year, dateParts.month, dateParts.day);

        matchingEvents.forEach((event) => {
          if (!hasTriggeredEraEvent(event.id)) {
            // Mark as triggered
            markTriggeredEraEvent(event.id);

            // Apply effects
            applyEraEventEffects(event);

            // Add to market feed
            addEvent({
              type: 'era-event',
              title: event.title,
              description: event.description,
              day: currentDay,
              impact: event.impact,
            });
          }
        });

        // Existing competitor activity simulation
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
  }, [isRunning, currentDay, competitors, advanceDay, addEvent, updateCompetitor, gameState, updateCash, markTriggeredEraEvent, hasTriggeredEraEvent]);

  return { isRunning, currentDay, toggleSimulation };
}
