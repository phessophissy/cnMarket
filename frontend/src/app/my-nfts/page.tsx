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
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 glass-surface rounded-3xl p-6 md:p-8">
          <h1 className="text-4xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            My Collection
          </h1>
          <p className="text-slate-200/85 mt-2">
            {isConnected && count > 0
              ? `You own ${count} NFT${count !== 1 ? "s" : ""}`
              : "View and manage your NFT collection"}
          </p>
        </div>

        {!isConnected ? (
          <div className="text-center py-20 glass-surface rounded-3xl border border-emerald-100/10">
            <p className="text-5xl mb-4">🔗</p>
            <p className="text-slate-300">
              Connect your wallet to view your NFTs
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <NFTCardSkeleton key={i} />
            ))}
          </div>
        ) : count === 0 ? (
          <div className="text-center py-20 glass-surface rounded-3xl border border-emerald-100/10">
            <p className="text-5xl mb-4">🖼️</p>
            <p className="text-slate-200 text-lg">
              You don&apos;t own any NFTs yet.
            </p>
            <a
              href="/mint"
              className="text-emerald-200 hover:text-emerald-100 mt-2 inline-block font-medium"
            >
              Mint your first NFT →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }, (_, i) => (
              <OwnedNFTCard key={i} ownerAddress={address!} index={i} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
