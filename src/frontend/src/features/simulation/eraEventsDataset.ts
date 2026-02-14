/**
 * Era-specific timeline events dataset
 * Each event is keyed to a specific calendar date and triggers deterministic gameplay effects
 */

export interface EraEvent {
  id: string;
  year: number;
  month?: number; // 1-12, optional for year-only events
  day?: number; // 1-31, optional for year-only events
  title: string;
  description: string;
  impact?: string;
  effects: EraEventEffect[];
}

export interface EraEventEffect {
  type: 'cash' | 'competitor-market-share' | 'simulation-parameter';
  value: number;
  target?: string; // For competitor-specific effects
}

/**
 * Static dataset of era-specific events
 * Events are sorted chronologically for efficient lookup
 */
export const eraEvents: EraEvent[] = [
  {
    id: 'era-1971-microprocessor',
    year: 1971,
    month: 11,
    day: 15,
    title: 'Microprocessor Revolution',
    description: 'The first commercial microprocessor is announced, revolutionizing computing architecture.',
    impact: 'Research costs reduced by 10%',
    effects: [
      { type: 'cash', value: 5000 },
    ],
  },
  {
    id: 'era-1973-oil-crisis',
    year: 1973,
    month: 10,
    day: 17,
    title: 'Global Oil Crisis',
    description: 'Energy prices surge worldwide, affecting manufacturing and shipping costs.',
    impact: 'Production costs increased',
    effects: [
      { type: 'cash', value: -8000 },
    ],
  },
  {
    id: 'era-1975-personal-computing',
    year: 1975,
    month: 1,
    day: 1,
    title: 'Personal Computing Era Begins',
    description: 'The first personal computer kit is released, opening new market opportunities.',
    impact: 'Market expansion bonus',
    effects: [
      { type: 'cash', value: 12000 },
      { type: 'competitor-market-share', value: -1.5 },
    ],
  },
  {
    id: 'era-1977-consumer-electronics',
    year: 1977,
    month: 6,
    day: 5,
    title: 'Consumer Electronics Boom',
    description: 'Mass-market consumer electronics gain mainstream acceptance.',
    impact: 'Sales potential increased',
    effects: [
      { type: 'cash', value: 15000 },
    ],
  },
  {
    id: 'era-1980-home-computing',
    year: 1980,
    month: 1,
    day: 1,
    title: 'Home Computing Revolution',
    description: 'Home computers become affordable for middle-class families.',
    impact: 'Market size doubled',
    effects: [
      { type: 'cash', value: 20000 },
      { type: 'competitor-market-share', value: -2.0 },
    ],
  },
  {
    id: 'era-1983-video-game-crash',
    year: 1983,
    month: 12,
    day: 1,
    title: 'Video Game Market Crash',
    description: 'Oversaturation leads to a major market correction in consumer electronics.',
    impact: 'Market confidence shaken',
    effects: [
      { type: 'cash', value: -15000 },
    ],
  },
  {
    id: 'era-1985-cd-rom',
    year: 1985,
    month: 3,
    day: 2,
    title: 'CD-ROM Technology Emerges',
    description: 'Optical storage technology opens new possibilities for data distribution.',
    impact: 'Storage innovation bonus',
    effects: [
      { type: 'cash', value: 10000 },
    ],
  },
  {
    id: 'era-1989-portable-revolution',
    year: 1989,
    month: 4,
    day: 21,
    title: 'Portable Gaming Revolution',
    description: 'Handheld gaming devices prove there is a massive market for portable entertainment.',
    impact: 'Portable device demand surge',
    effects: [
      { type: 'cash', value: 18000 },
      { type: 'competitor-market-share', value: -1.0 },
    ],
  },
  {
    id: 'era-1991-world-wide-web',
    year: 1991,
    month: 8,
    day: 6,
    title: 'World Wide Web Goes Public',
    description: 'The internet becomes accessible to the public, changing communication forever.',
    impact: 'Digital connectivity era begins',
    effects: [
      { type: 'cash', value: 25000 },
    ],
  },
  {
    id: 'era-1995-internet-boom',
    year: 1995,
    month: 1,
    day: 1,
    title: 'Internet Commercialization',
    description: 'Commercial internet services explode, creating new business opportunities.',
    impact: 'E-commerce potential unlocked',
    effects: [
      { type: 'cash', value: 30000 },
      { type: 'competitor-market-share', value: -2.5 },
    ],
  },
  {
    id: 'era-1998-tech-bubble',
    year: 1998,
    month: 3,
    day: 1,
    title: 'Dot-com Bubble Inflation',
    description: 'Tech stocks soar as investors pour money into internet companies.',
    impact: 'Investment capital abundant',
    effects: [
      { type: 'cash', value: 50000 },
    ],
  },
  {
    id: 'era-2000-y2k',
    year: 2000,
    month: 1,
    day: 1,
    title: 'Y2K Transition',
    description: 'The world successfully navigates the year 2000 computer date change.',
    impact: 'Technology confidence restored',
    effects: [
      { type: 'cash', value: 15000 },
    ],
  },
  {
    id: 'era-2001-dotcom-crash',
    year: 2001,
    month: 3,
    day: 10,
    title: 'Dot-com Bubble Burst',
    description: 'The tech bubble bursts, causing widespread market correction.',
    impact: 'Market downturn',
    effects: [
      { type: 'cash', value: -40000 },
    ],
  },
  {
    id: 'era-2007-smartphone-era',
    year: 2007,
    month: 6,
    day: 29,
    title: 'Smartphone Revolution',
    description: 'The modern smartphone is introduced, transforming mobile computing.',
    impact: 'Mobile market explosion',
    effects: [
      { type: 'cash', value: 60000 },
      { type: 'competitor-market-share', value: -3.0 },
    ],
  },
  {
    id: 'era-2008-financial-crisis',
    year: 2008,
    month: 9,
    day: 15,
    title: 'Global Financial Crisis',
    description: 'A worldwide financial crisis impacts consumer spending and investment.',
    impact: 'Economic recession',
    effects: [
      { type: 'cash', value: -50000 },
    ],
  },
  {
    id: 'era-2010-tablet-boom',
    year: 2010,
    month: 4,
    day: 3,
    title: 'Tablet Computing Era',
    description: 'Tablets emerge as a new category between smartphones and laptops.',
    impact: 'New device category established',
    effects: [
      { type: 'cash', value: 35000 },
    ],
  },
  {
    id: 'era-2012-mobile-first',
    year: 2012,
    month: 1,
    day: 1,
    title: 'Mobile-First World',
    description: 'Mobile devices surpass desktop computers in global usage.',
    impact: 'Mobile dominance confirmed',
    effects: [
      { type: 'cash', value: 40000 },
      { type: 'competitor-market-share', value: -2.0 },
    ],
  },
  {
    id: 'era-2016-vr-mainstream',
    year: 2016,
    month: 3,
    day: 28,
    title: 'VR Goes Mainstream',
    description: 'Virtual reality headsets become commercially viable consumer products.',
    impact: 'Immersive technology breakthrough',
    effects: [
      { type: 'cash', value: 45000 },
    ],
  },
  {
    id: 'era-2019-5g-rollout',
    year: 2019,
    month: 4,
    day: 3,
    title: '5G Network Rollout',
    description: 'Next-generation wireless networks begin global deployment.',
    impact: 'Connectivity revolution',
    effects: [
      { type: 'cash', value: 55000 },
      { type: 'competitor-market-share', value: -1.5 },
    ],
  },
  {
    id: 'era-2020-pandemic',
    year: 2020,
    month: 3,
    day: 11,
    title: 'Global Pandemic',
    description: 'A worldwide pandemic accelerates digital transformation and remote work.',
    impact: 'Digital demand surge',
    effects: [
      { type: 'cash', value: 70000 },
    ],
  },
  {
    id: 'era-2021-chip-shortage',
    year: 2021,
    month: 6,
    day: 1,
    title: 'Global Chip Shortage',
    description: 'Semiconductor supply chain disruptions impact device production worldwide.',
    impact: 'Production constraints',
    effects: [
      { type: 'cash', value: -35000 },
    ],
  },
  {
    id: 'era-2023-ai-revolution',
    year: 2023,
    month: 11,
    day: 30,
    title: 'AI Revolution',
    description: 'Artificial intelligence becomes mainstream, transforming software and hardware.',
    impact: 'AI integration opportunities',
    effects: [
      { type: 'cash', value: 80000 },
      { type: 'competitor-market-share', value: -2.5 },
    ],
  },
  {
    id: 'era-2025-foldable-mainstream',
    year: 2025,
    month: 1,
    day: 15,
    title: 'Foldable Devices Go Mainstream',
    description: 'Foldable screen technology becomes affordable and reliable for mass market.',
    impact: 'Form factor innovation',
    effects: [
      { type: 'cash', value: 65000 },
    ],
  },
];

/**
 * Find events that match a specific date
 */
export function findEventsForDate(year: number, month: number, day: number): EraEvent[] {
  return eraEvents.filter((event) => {
    if (event.year !== year) return false;
    if (event.month !== undefined && event.month !== month) return false;
    if (event.day !== undefined && event.day !== day) return false;
    return true;
  });
}

/**
 * Check if an event matches a specific date
 */
export function eventMatchesDate(event: EraEvent, year: number, month: number, day: number): boolean {
  if (event.year !== year) return false;
  if (event.month !== undefined && event.month !== month) return false;
  if (event.day !== undefined && event.day !== day) return false;
  return true;
}
