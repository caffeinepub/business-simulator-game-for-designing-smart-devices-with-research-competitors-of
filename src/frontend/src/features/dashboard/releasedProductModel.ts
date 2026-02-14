import type { ReleasedProduct } from '../../backend';

export function dayToYear(day: number): number {
  return Math.floor((day - 1) / 365) + 1;
}

export function createReleasedProduct(
  name: string,
  category: string,
  currentDay: number,
  price: number,
  productionVolume: number,
  marketingBudget: number,
  productLogo?: string,
  adjustedSales?: number,
  adjustedRating?: number
): ReleasedProduct {
  const year = dayToYear(currentDay);
  
  // Use adjusted values if provided, otherwise calculate base values
  const sales = adjustedSales !== undefined ? adjustedSales : productionVolume;
  
  // Calculate a score based on release inputs
  const baseScore = (price * productionVolume) / 1000 + marketingBudget / 100;
  const baseRating = Math.min(5.0, baseScore / 10000);
  const rating = adjustedRating !== undefined ? adjustedRating : baseRating;
  
  return {
    productId: `${name}-${Date.now()}`,
    name,
    category,
    year: BigInt(year),
    sales: BigInt(sales),
    rating,
    price: BigInt(price),
    features: productLogo ? [productLogo] : [],
  };
}

export function getCategoryFromBlueprint(blueprint: any): string {
  if (blueprint.category.__kind__ === 'singleCategory') {
    return blueprint.category.singleCategory;
  } else if (blueprint.category.__kind__ === 'categoryList' && blueprint.category.categoryList.length > 0) {
    return blueprint.category.categoryList[0];
  }
  return 'unknown';
}

export function getProductLogo(product: ReleasedProduct): string | undefined {
  return product.features && product.features.length > 0 ? product.features[0] : undefined;
}
