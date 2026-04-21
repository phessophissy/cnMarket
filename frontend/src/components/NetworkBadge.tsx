"use client";

import { useAccount } from "wagmi";

export function NetworkBadge() {
  const { chain, isConnected } = useAccount();

  if (!isConnected || !chain) return null;

  const isCelo = chain.id === 42220;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
        isCelo
          ? "bg-emerald-300/15 text-emerald-100 border border-emerald-100/25"
          : "bg-rose-300/15 text-rose-100 border border-rose-100/25"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${isCelo ? "bg-emerald-300" : "bg-rose-300"} animate-pulse-dot`} />
      {isCelo ? "Celo" : `Wrong Network (${chain.name})`}
    </div>
  );
}
