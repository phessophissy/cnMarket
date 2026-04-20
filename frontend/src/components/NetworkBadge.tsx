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
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : "bg-red-500/10 text-red-400 border border-red-500/20"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${isCelo ? "bg-green-400" : "bg-red-400"} animate-pulse-dot`} />
      {isCelo ? "Celo" : `Wrong Network (${chain.name})`}
    </div>
  );
}
