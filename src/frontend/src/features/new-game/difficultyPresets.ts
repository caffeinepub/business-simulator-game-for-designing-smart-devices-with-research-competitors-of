export const difficultyPresets = {
  normal: {
    name: 'Normal',
    description: 'Balanced gameplay for a steady progression. Recommended for first-time players.',
    startingCash: BigInt(100000),
    competitorStrength: 100,
    rdCostMultiplier: 1.0,
    marketVolatility: 1.0,
  },
  challenging: {
    name: 'Challenging',
    description:
      'For economic strategy veterans. Higher costs, stronger competitors, and volatile markets test your skills.',
    startingCash: BigInt(50000),
    competitorStrength: 150,
    rdCostMultiplier: 1.5,
    marketVolatility: 1.8,
  },
};
