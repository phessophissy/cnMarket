"use client";

import { useAccount, useReadContract } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { NFTCard, NFTCardSkeleton } from "@/components/NFTCard";
import { nftAbi, marketplaceAbi } from "@/lib/abis";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "@/lib/config";

function OwnedNFTCard({
  ownerAddress,
  index,
}: {
  ownerAddress: string;
  index: number;
}) {
  const { data: tokenId } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "tokenOfOwnerByIndex",
    args: [ownerAddress as `0x${string}`, BigInt(index)],
  });

  const { data: rarity } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "tokenRarity",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });

  const { data: listingData } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "isListed",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });

  if (tokenId === undefined) return <NFTCardSkeleton />;

  const isListed = listingData === true;

  return (
    <div className="relative">
      {isListed && (
        <div className="absolute top-2 right-2 z-10 bg-emerald-300/90 text-[#083935] text-xs px-2 py-1 rounded-full font-semibold">
          Listed
        </div>
      )}
      <NFTCard
        tokenId={tokenId}
        rarity={(rarity ?? 0) as 0 | 1 | 2}
        showListButton={!isListed}
      />
    </div>
  );
}

export default function MyNFTsPage() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const count = balance ? Number(balance) : 0;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <section className="section-shell glass-surface rounded-[2rem] px-6 py-8 md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Collector Dashboard</span>
              <h1 className="mt-4 text-5xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                My Collection
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                {isConnected && count > 0
                  ? `You currently hold ${count} NFT${count !== 1 ? "s" : ""} across the cnMarket collection.`
                  : "View what you own, track what is already listed, and prepare pieces for the next sale."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Wallet status</p>
                <p className="mt-3 text-xl font-semibold text-white">{isConnected ? "Connected" : "Disconnected"}</p>
              </div>
              <div className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Owned items</p>
                <p className="mt-3 text-xl font-semibold text-white">{count}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8">
          {/*
            Keep collection states visually consistent with the marketplace.
          */}
        </div>

        {!isConnected ? (
          <div className="section-shell glass-surface mt-8 rounded-[2rem] border border-emerald-100/10 px-6 py-20 text-center">
            <p className="mb-4 text-5xl">🔗</p>
            <p className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Connect to see your collection
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Once connected, you can review ownership, inspect rarity, and move directly into the listing flow.
            </p>
          </div>
        ) : isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <NFTCardSkeleton key={i} />
            ))}
          </div>
        ) : count === 0 ? (
          <div className="section-shell glass-surface mt-8 rounded-[2rem] border border-emerald-100/10 px-6 py-20 text-center">
            <p className="mb-4 text-5xl">🖼️</p>
            <p className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Your gallery is empty
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Start your collection by minting a rarity tier that fits your budget and collector profile.
            </p>
            <a
              href="/mint"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-6 py-3 text-sm font-semibold text-[#063532] transition hover:brightness-105"
            >
              Mint your first NFT
            </a>
          </div>
        ) : (
          <section className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Owned Assets</span>
                <h2 className="mt-4 text-3xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  Curated collection view
                </h2>
              </div>
              <div className="hidden rounded-full border border-emerald-100/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 md:inline-flex">
                {count} owned
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: count }, (_, i) => (
                <OwnedNFTCard key={i} ownerAddress={address!} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
