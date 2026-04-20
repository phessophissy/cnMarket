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
        <div className="absolute top-2 right-2 z-10 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My NFTs</h1>
          <p className="text-gray-400 mt-1">
            {isConnected && count > 0
              ? `You own ${count} NFT${count !== 1 ? "s" : ""}`
              : "View and manage your NFT collection"}
          </p>
        </div>

        {!isConnected ? (
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
            <p className="text-5xl mb-4">🔗</p>
            <p className="text-gray-400">
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
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
            <p className="text-5xl mb-4">🖼️</p>
            <p className="text-gray-400 text-lg">
              You don&apos;t own any NFTs yet.
            </p>
            <a
              href="/mint"
              className="text-green-400 hover:text-green-300 mt-2 inline-block font-medium"
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
