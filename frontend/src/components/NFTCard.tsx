"use client";

import Link from "next/link";
import { formatEther } from "viem";
import { RarityBadge } from "./RarityBadge";
import { RARITY_COLORS } from "@/lib/config";

interface NFTCardProps {
  tokenId: bigint;
  rarity: 0 | 1 | 2;
  price?: bigint;
  seller?: string;
  showListButton?: boolean;
}

/** Component update 28-5 */
export function NFTCard({
  tokenId,
  rarity,
  price,
  seller,
  showListButton,
}: NFTCardProps) {
  const colors = RARITY_COLORS[rarity];

  return (
    <Link href={`/nft/${tokenId.toString()}`}>
      <div className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-green-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer group">
        <div
          className={`h-48 bg-gradient-to-br ${colors.gradient} flex items-center justify-center relative`}
        >
          <span className="text-6xl font-bold text-white/20 group-hover:text-white/30 transition-colors">
            #{tokenId.toString()}
          </span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">
              CNFT #{tokenId.toString()}
            </h3>
            <RarityBadge rarity={rarity} />
          </div>
          {price !== undefined && price > 0n && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Price</span>
              <span className="text-green-400 font-medium">
                {formatEther(price)} CELO
              </span>
            </div>
          )}
          {seller && (
            <p className="text-gray-500 text-xs truncate">
              Seller: {seller.slice(0, 6)}...{seller.slice(-4)}
            </p>
          )}
          {showListButton && (
            <Link
              href={`/list/${tokenId.toString()}`}
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm mt-2 font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              List for Sale
            </Link>
          )}
        </div>
      </div>
    </Link>
  );
}

export function NFTCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-24 bg-gray-700 rounded" />
          <div className="h-5 w-16 bg-gray-700 rounded-full" />
        </div>
        <div className="h-4 w-32 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
