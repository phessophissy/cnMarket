"use client";

import { useState } from "react";

export type SortOption = "price_asc" | "price_desc" | "tokenId_asc" | "tokenId_desc";

export interface FilterableListing {
  tokenId: bigint;
  seller: string;
  price: bigint;
  rarity: 0 | 1 | 2;
}

export function useMarketplaceFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rarityFilter, setRarityFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("tokenId_desc");

  const filterAndSort = (listings: FilterableListing[]) => {
    let result = [...listings];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.tokenId.toString().includes(q) ||
          l.seller.toLowerCase().includes(q)
      );
    }

    // Rarity filter
    if (rarityFilter !== null) {
      result = result.filter((l) => l.rarity === rarityFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
        case "price_desc":
          return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
        case "tokenId_asc":
          return a.tokenId < b.tokenId ? -1 : a.tokenId > b.tokenId ? 1 : 0;
        case "tokenId_desc":
        default:
          return a.tokenId > b.tokenId ? -1 : a.tokenId < b.tokenId ? 1 : 0;
      }
    });

    return result;
  };

  return {
    searchQuery,
    setSearchQuery,
    rarityFilter,
    setRarityFilter,
    sortBy,
    setSortBy,
    filterAndSort,
  };
}
