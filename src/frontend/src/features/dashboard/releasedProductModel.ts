import type { ReleasedProduct, DeviceBlueprint } from '../../backend';
import { dayToYear } from '@/utils/gameCalendar';

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

export function getCategoryFromBlueprint(blueprint: DeviceBlueprint): string {
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

export function extractFeaturesFromBlueprint(blueprint: DeviceBlueprint, hasPremium: boolean): string[] {
  const features: string[] = [];
  
  // Add category
  const category = getCategoryFromBlueprint(blueprint);
  features.push(`Category: ${category}`);
  
  // Add basic specs
  features.push(`CPU: ${blueprint.processingUnit.cores.toString()} cores`);
  if (blueprint.rams.length > 0) {
    features.push(`RAM: ${blueprint.rams[0].capacity.toString()}GB`);
  }
  if (blueprint.storages.length > 0) {
    features.push(`Storage: ${blueprint.storages[0].capacity.toString()}GB`);
  }
  
  // Add foldable-specific features if applicable
  if (category === 'foldables' && blueprint.foldableCharacteristics) {
    const fc = blueprint.foldableCharacteristics;
    features.push(`Fold Type: ${fc.foldType}`);
    features.push(`Hinge: ${fc.hingeType}`);
    
    // Only include premium features if unlocked
    const premiumFoldTypes = ['tri-fold', 'rollable', 'dual-fold'];
    const premiumHingeTypes = ['invisible', 'multi-angle', 'self-healing'];
    
    if (hasPremium) {
      if (fc.outerDisplay) {
        features.push(`Outer Display: ${fc.outerDisplaySize || 0}" (Premium)`);
      }
      if (premiumFoldTypes.includes(fc.foldType)) {
        features.push('Advanced Fold Technology (Premium)');
      }
      if (premiumHingeTypes.includes(fc.hingeType)) {
        features.push('Premium Hinge System (Premium)');
      }
    }
  }
  
  return features;
}
