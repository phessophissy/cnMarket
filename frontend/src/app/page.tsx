"use client";

import { useReadContract } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { NFTCard, NFTCardSkeleton } from "@/components/NFTCard";
import { nftAbi, marketplaceAbi } from "@/lib/abis";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "@/lib/config";

function ListingCard({ index }: { index: number }) {
  const { data: listing } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getActiveListingAt",
    args: [BigInt(index)],
  });

  const tokenId = listing?.[0];

  const { data: rarity } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "tokenRarity",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });

  if (!listing) return <NFTCardSkeleton />;

  const [tid, seller, price] = listing;

  return (
    <NFTCard
      tokenId={tid}
      rarity={(rarity ?? 0) as 0 | 1 | 2}
      price={price}
      seller={seller}
    />
  );
}

export default function HomePage() {
  const { data: count, isLoading } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getActiveListingCount",
  });

  const listingCount = count ? Number(count) : 0;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          <p className="text-gray-400 mt-1">
            Browse and buy NFTs listed by other collectors
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <NFTCardSkeleton key={i} />
            ))}
          </div>
        ) : listingCount === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
            <p className="text-5xl mb-4">🏪</p>
            <p className="text-gray-400 text-lg">No NFTs listed yet.</p>
            <a
              href="/mint"
              className="text-green-400 hover:text-green-300 mt-2 inline-block font-medium"
            >
              Mint your first NFT →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: listingCount }, (_, i) => (
              <ListingCard key={i} index={i} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
