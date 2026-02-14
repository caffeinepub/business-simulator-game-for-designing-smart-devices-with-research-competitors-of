import type { StoreNetwork, Store } from '../../backend';

export const STORE_BUILD_COST = 100000;

export const AVAILABLE_COUNTRIES = [
  'United States',
  'China',
  'Japan',
  'Germany',
  'United Kingdom',
  'France',
  'India',
  'Brazil',
  'Canada',
  'South Korea',
  'Australia',
  'Mexico',
  'Spain',
  'Italy',
  'Netherlands',
];

export function createEmptyStoreNetwork(): StoreNetwork {
  return {
    stores: [],
    productivityBonus: BigInt(0),
    productAttractionBonus: BigInt(0),
  };
}

export function computeStoreNetworkBonuses(stores: Store[]): {
  productivityBonus: bigint;
  productAttractionBonus: bigint;
} {
  const storeCount = stores.length;
  
  // Each store provides 5% productivity bonus (reduces production cost)
  // and 3% attraction bonus (increases sales/rating)
  const productivityBonus = BigInt(storeCount * 5);
  const productAttractionBonus = BigInt(storeCount * 3);
  
  return {
    productivityBonus,
    productAttractionBonus,
  };
}

export function canBuildStoreInCountry(stores: Store[], country: string): boolean {
  return !stores.some((store) => store.country === country);
}

export function createStore(country: string): Store {
  return {
    country,
    storeName: `${country} Flagship Store`,
    location: `${country} - Main District`,
    employees: BigInt(50),
    inventoryCapacity: BigInt(10000),
    establishmentDate: BigInt(Date.now()),
  };
}

export function validateStoreBuild(
  stores: Store[],
  country: string,
  availableCash: bigint
): { valid: boolean; error?: string } {
  if (!country || country.trim() === '') {
    return { valid: false, error: 'Please select a country' };
  }

  if (availableCash < BigInt(STORE_BUILD_COST)) {
    return { valid: false, error: 'Insufficient funds to build store' };
  }

  if (!canBuildStoreInCountry(stores, country)) {
    return { valid: false, error: 'Store already exists in this country' };
  }

  return { valid: true };
}
