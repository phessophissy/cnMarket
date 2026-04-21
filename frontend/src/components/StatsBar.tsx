"use client";

import { useReadContract } from "wagmi";
import { nftAbi } from "@/lib/abis";
import { NFT_ADDRESS } from "@/lib/config";

/** Component update 50-9 */
export function StatsBar() {
  const { data: totalSupply } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "totalSupply",
  });

  const stats = [
    { label: "Total Minted", value: totalSupply?.toString() ?? "—" },
    { label: "Rarity Levels", value: "3" },
    { label: "Network", value: "Celo" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-surface border border-emerald-100/10 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-emerald-200">{stat.value}</p>
          <p className="text-slate-300 text-sm mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
