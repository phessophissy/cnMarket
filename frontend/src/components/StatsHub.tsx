"use client";

import { MarketStats } from "@/lib/stats";
import { formatCeloPrice } from "@/lib/format";

interface StatsHubProps {
  stats: MarketStats;
}

export function StatsHub({ stats }: StatsHubProps) {
  const { floorPrice, totalActive, rarityDistribution } = stats;

  const total = totalActive || 1; // avoid division by zero
  const commonPct = Math.round((rarityDistribution.common / total) * 100);
  const rarePct = Math.round((rarityDistribution.rare / total) * 100);
  const legendaryPct = Math.round((rarityDistribution.legendary / total) * 100);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Floor Price Card */}
      <div className="group relative overflow-hidden rounded-[1.75rem] border border-emerald-100/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-colors" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Floor Price</p>
        <p className="mt-4 text-3xl font-bold text-white tracking-tight">
          {totalActive > 0 ? `${formatCeloPrice(floorPrice)}` : "—"}{" "}
          <span className="text-sm font-medium text-emerald-300">USDm</span>
        </p>
        <p className="mt-2 text-xs text-slate-400">Lowest listed price in marketplace</p>
      </div>

      {/* Active Listings Card */}
      <div className="group relative overflow-hidden rounded-[1.75rem] border border-emerald-100/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-colors" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Total Active Listings</p>
        <p className="mt-4 text-3xl font-bold text-white tracking-tight">
          {totalActive} <span className="text-sm font-medium text-cyan-300">Active</span>
        </p>
        <p className="mt-2 text-xs text-slate-400">Currently available for purchase</p>
      </div>

      {/* Rarity Distribution Card */}
      <div className="group relative overflow-hidden rounded-[1.75rem] border border-emerald-100/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:col-span-1">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 transition-colors" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Rarity Spread</p>
        
        {totalActive === 0 ? (
          <p className="mt-4 text-sm text-slate-400">No active listings to visualize distribution</p>
        ) : (
          <div className="mt-4 space-y-3">
            {/* Visual stacked progress bar */}
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                style={{ width: `${commonPct}%` }}
                className="bg-gradient-to-r from-slate-400 to-gray-500 transition-all duration-500"
                title={`Common: ${commonPct}%`}
              />
              <div
                style={{ width: `${rarePct}%` }}
                className="bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500"
                title={`Rare: ${rarePct}%`}
              />
              <div
                style={{ width: `${legendaryPct}%` }}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-500"
                title={`Legendary: ${legendaryPct}%`}
              />
            </div>

            {/* Labels and values */}
            <div className="flex justify-between text-[0.7rem] font-semibold tracking-wider text-slate-400">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                COM {commonPct}%
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                RAR {rarePct}%
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                LEG {legendaryPct}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
