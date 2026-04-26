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

/** Component update 46-1 */
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
      <div className="glass-surface rounded-2xl overflow-hidden border border-emerald-100/10 card-hover cursor-pointer group">
        <div
          className={`h-48 bg-gradient-to-br ${colors.gradient} flex items-center justify-center relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          <span className="relative text-6xl font-bold text-white/25 group-hover:text-white/35 transition-colors">
            #{tokenId.toString()}
          </span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              CNFT #{tokenId.toString()}
            </h3>
            <RarityBadge rarity={rarity} />
          </div>
          {price !== undefined && price > 0n && (
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Price</span>
              <span className="text-emerald-200 font-semibold">
                {formatEther(price)} USDm
              </span>
            </div>
          )}
          {seller && (
            <p className="text-slate-400 text-xs truncate">
              Seller: {seller.slice(0, 6)}...{seller.slice(-4)}
            </p>
          )}
          {showListButton && (
            <Link
              href={`/list/${tokenId.toString()}`}
              className="block w-full text-center bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#063432] py-2 rounded-lg text-sm mt-2 font-semibold transition"
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
    <div className="glass-surface rounded-2xl overflow-hidden animate-pulse border border-emerald-100/10">
      <div className="h-48 bg-emerald-100/10" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-24 bg-emerald-100/10 rounded" />
          <div className="h-5 w-16 bg-emerald-100/10 rounded-full" />
        </div>
        <div className="h-4 w-32 bg-emerald-100/10 rounded" />
      </div>
    </div>
  );
}
