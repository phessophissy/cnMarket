import { ActiveListing } from "@/hooks/useAllActiveListings";

export interface MarketStats {
  floorPrice: bigint;
  totalActive: number;
  rarityDistribution: {
    common: number;
    rare: number;
    legendary: number;
  };
}

export function calculateMarketStats(listings: ActiveListing[]): MarketStats {
  if (listings.length === 0) {
    return {
      floorPrice: 0n,
      totalActive: 0,
      rarityDistribution: { common: 0, rare: 0, legendary: 0 },
    };
  }

  let minPrice = listings[0].price;
  let common = 0;
  let rare = 0;
  let legendary = 0;

  for (const item of listings) {
    if (item.price < minPrice) {
      minPrice = item.price;
    }
    if (item.rarity === 0) common++;
    else if (item.rarity === 1) rare++;
    else if (item.rarity === 2) legendary++;
  }

  return {
    floorPrice: minPrice,
    totalActive: listings.length,
    rarityDistribution: { common, rare, legendary },
  };
}
