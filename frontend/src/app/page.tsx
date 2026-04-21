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
      <main className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        <div className="glass-surface rounded-3xl p-6 md:p-10 mb-10 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 h-56 w-56 bg-emerald-300/20 blur-3xl rounded-full" />
          <div className="absolute -left-24 -bottom-20 h-56 w-56 bg-teal-300/20 blur-3xl rounded-full" />
          <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-emerald-100/75 mb-4">Celo NFT Marketplace</p>
              <h1
                className="text-4xl md:text-5xl font-semibold leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Trade rare drops with <span className="text-gradient">instant finality</span>
              </h1>
              <p className="text-slate-200/85 mt-4 max-w-2xl leading-7">
                Explore active listings, discover rarity tiers, and buy directly from collectors on-chain.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-emerald-100/20 bg-emerald-200/10 p-4">
                <p className="text-slate-300">Active Listings</p>
                <p className="text-2xl font-semibold mt-1">{listingCount}</p>
              </div>
              <div className="rounded-2xl border border-emerald-100/20 bg-emerald-200/10 p-4">
                <p className="text-slate-300">Chain</p>
                <p className="text-2xl font-semibold mt-1">Celo</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <NFTCardSkeleton key={i} />
            ))}
          </div>
        ) : listingCount === 0 ? (
          <div className="text-center py-20 glass-surface rounded-3xl border border-emerald-100/10">
            <p className="text-5xl mb-4">🏪</p>
            <p className="text-slate-200 text-lg">No NFTs listed yet.</p>
            <a
              href="/mint"
              className="text-emerald-200 hover:text-emerald-100 mt-3 inline-block font-medium"
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
