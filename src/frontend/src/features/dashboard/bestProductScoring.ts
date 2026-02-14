import type { ReleasedProduct } from '../../backend';

export const DEVICE_CATEGORIES = ['smartphones', 'tablets', 'watches', 'smart-glasses', 'laptops', 'foldables'];

export function filterProductsByYearAndCategory(
  products: ReleasedProduct[],
  year: number,
  category: string
): ReleasedProduct[] {
  return products.filter((p) => Number(p.year) === year && p.category === category);
}

export function calculateProductScore(product: ReleasedProduct): number {
  // Score based on sales, rating, and price
  const salesScore = Number(product.sales) / 1000;
  const ratingScore = product.rating * 1000;
  const priceScore = Number(product.price) / 10;
  
  return salesScore + ratingScore + priceScore;
}

export function findBestProduct(products: ReleasedProduct[]): ReleasedProduct | null {
  if (products.length === 0) return null;
  
  let bestProduct = products[0];
  let bestScore = calculateProductScore(bestProduct);
  
  for (let i = 1; i < products.length; i++) {
    const score = calculateProductScore(products[i]);
    if (score > bestScore) {
      bestScore = score;
      bestProduct = products[i];
    }
  }
  
  return bestProduct;
}

export function getAvailableYears(products: ReleasedProduct[]): number[] {
  const years = new Set<number>();
  products.forEach((p) => years.add(Number(p.year)));
  return Array.from(years).sort((a, b) => b - a);
}
