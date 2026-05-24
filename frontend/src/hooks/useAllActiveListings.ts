"use client";

import { useReadContract, useReadContracts } from "wagmi";
import { marketplaceAbi, nftAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS, NFT_ADDRESS } from "@/lib/config";
import { useMemo } from "react";

export interface ActiveListing {
  tokenId: bigint;
  seller: string;
  price: bigint;
  rarity: 0 | 1 | 2;
}

export function useAllActiveListings() {
  // 1. Get total active listing count
  const { data: count, isLoading: isCountLoading, refetch: refetchCount } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getActiveListingCount",
  });

  const listingCount = count ? Number(count) : 0;

  // 2. Build contract calls for each active listing index
  const listingContracts = useMemo(() => {
    return Array.from({ length: listingCount }, (_, i) => ({
      address: MARKETPLACE_ADDRESS,
      abi: marketplaceAbi,
      functionName: "getActiveListingAt",
      args: [BigInt(i)],
    }));
  }, [listingCount]);

  // 3. Batch read active listings
  const { data: listingsData, isLoading: isListingsLoading, refetch: refetchListings } = useReadContracts({
    contracts: listingContracts,
    query: {
      enabled: listingCount > 0,
    },
  });

  // 4. Extract token IDs to batch read rarities
  const tokenIds = useMemo(() => {
    if (!listingsData) return [];
    return listingsData
      .map((res) => {
        if (res.status === "success" && res.result) {
          const [tid] = res.result as unknown as [bigint, string, bigint];
          return tid;
        }
        return null;
      })
      .filter((tid): tid is bigint => tid !== null);
  }, [listingsData]);

  // 5. Build contract calls for rarity
  const rarityContracts = useMemo(() => {
    return tokenIds.map((tid) => ({
      address: NFT_ADDRESS,
      abi: nftAbi,
      functionName: "tokenRarity",
      args: [tid],
    }));
  }, [tokenIds]);

  // 6. Batch read rarities
  const { data: raritiesData, isLoading: isRaritiesLoading } = useReadContracts({
    contracts: rarityContracts,
    query: {
      enabled: tokenIds.length > 0,
    },
  });

  // 7. Combine listings and rarities
  const listings = useMemo(() => {
    if (!listingsData) return [];
    const result: ActiveListing[] = [];

    listingsData.forEach((res, index) => {
      if (res.status === "success" && res.result) {
        const [tid, seller, price] = res.result as unknown as [bigint, string, bigint];
        
        // Find corresponding rarity
        let rarityVal: 0 | 1 | 2 = 0;
        if (raritiesData && raritiesData[index] && raritiesData[index].status === "success") {
          rarityVal = Number(raritiesData[index].result ?? 0n) as 0 | 1 | 2;
        }

        result.push({
          tokenId: tid,
          seller,
          price,
          rarity: rarityVal,
        });
      }
    });

    return result;
  }, [listingsData, raritiesData]);

  const isLoading = isCountLoading || (listingCount > 0 && isListingsLoading) || (tokenIds.length > 0 && isRaritiesLoading);

  const refetch = () => {
    refetchCount();
    refetchListings();
  };

  return {
    listings,
    isLoading,
    refetch,
  };
}
