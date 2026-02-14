export interface ReleaseModifiers {
  productivityBonus: number;
  attractionBonus: number;
}

export function applyProductivityModifier(baseCost: number, productivityBonus: number): number {
  // Productivity bonus reduces production cost
  // Each 1% bonus reduces cost by 1%
  const reduction = baseCost * (productivityBonus / 100);
  return Math.max(0, Math.floor(baseCost - reduction));
}

export function applyAttractionModifier(baseSales: number, attractionBonus: number): number {
  // Attraction bonus increases sales
  // Each 1% bonus increases sales by 1%
  const increase = baseSales * (attractionBonus / 100);
  return Math.floor(baseSales + increase);
}

export function applyAttractionToRating(baseRating: number, attractionBonus: number): number {
  // Attraction bonus also slightly improves rating
  // Each 10% bonus adds 0.1 to rating (capped at 5.0)
  const ratingIncrease = (attractionBonus / 100) * 0.5;
  return Math.min(5.0, baseRating + ratingIncrease);
}

export function calculateAdjustedProductionCost(
  productionVolume: number,
  unitCost: number,
  productivityBonus: number
): number {
  const baseCost = productionVolume * unitCost;
  return applyProductivityModifier(baseCost, productivityBonus);
}

export function calculateAdjustedSales(baseSales: number, attractionBonus: number): number {
  return applyAttractionModifier(baseSales, attractionBonus);
}

export function calculateAdjustedRating(baseRating: number, attractionBonus: number): number {
  return applyAttractionToRating(baseRating, attractionBonus);
}
