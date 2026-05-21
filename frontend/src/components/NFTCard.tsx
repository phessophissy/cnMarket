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
  const glowClass = rarity === 1 ? "glow-rare" : rarity === 2 ? "glow-legendary" : "";

  return (
    <Link href={`/nft/${tokenId.toString()}`}>
      <div className={`feature-card card-hover holo-shine group cursor-pointer overflow-hidden rounded-[1.7rem] ${glowClass}`}>

        <div
          className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${colors.gradient}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(to_bottom,transparent,rgba(2,8,10,0.36))]" />
          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/90">
            On-chain collectible
          </div>
          <span className="absolute -bottom-8 -right-3 text-[8rem] font-semibold text-white/10 transition-transform duration-300 group-hover:scale-105">
            0{rarity + 1}
          </span>
          <span className="relative text-6xl font-bold text-white/30 group-hover:text-white/42 transition-colors">
            #{tokenId.toString()}
          </span>
        </div>
        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Collection Asset
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                CNFT #{tokenId.toString()}
              </h3>
            </div>
            <RarityBadge rarity={rarity} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100/10 bg-white/5 p-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Token ID</p>
              <p className="mt-2 text-base font-semibold text-white">#{tokenId.toString()}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100/10 bg-white/5 p-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Status</p>
              <p className="mt-2 text-base font-semibold text-white">
                {price !== undefined && price > 0n ? "Listed" : "Held"}
              </p>
            </div>
          </div>
          {price !== undefined && price > 0n ? (
            <div className="rounded-[1.3rem] border border-emerald-100/10 bg-gradient-to-r from-emerald-300/14 to-cyan-300/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-300">Listed price</span>
                <span className="text-xl font-semibold text-emerald-100">
                  {formatEther(price)} USDm
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-[1.3rem] border border-emerald-100/10 bg-white/5 p-4">
              <p className="text-sm leading-7 text-slate-300">
                This collectible is ready to inspect, transfer, or prepare for sale.
              </p>
            </div>
          )}
          {seller && (
            <p className="rounded-2xl border border-emerald-100/10 bg-white/5 px-4 py-3 text-xs text-slate-400">
              Seller: {seller.slice(0, 6)}...{seller.slice(-4)}
            </p>
          )}
          {showListButton && (
            <Link
              href={`/list/${tokenId.toString()}`}
              className="button-shine mt-1 block w-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 py-3 text-center text-sm font-semibold text-[#063432] transition hover:brightness-105"
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
    <div className="feature-card overflow-hidden rounded-[1.7rem] animate-pulse">
      <div className="h-56 bg-emerald-100/10" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded-full bg-emerald-100/10" />
            <div className="h-6 w-32 rounded-full bg-emerald-100/10" />
          </div>
          <div className="h-6 w-16 rounded-full bg-emerald-100/10" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="h-20 rounded-2xl bg-emerald-100/10" />
          <div className="h-20 rounded-2xl bg-emerald-100/10" />
        </div>
        <div className="h-16 rounded-2xl bg-emerald-100/10" />
      </div>
    </div>
  );
}
