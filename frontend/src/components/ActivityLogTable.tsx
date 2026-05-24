"use client";

import { useActivityLog } from "@/hooks";
import { timeAgo } from "@/lib/format";
import { truncateAddress, getExplorerTxUrl } from "@/lib/utils";

interface ActivityLogTableProps {
  limit?: number;
}

export function ActivityLogTable({ limit }: ActivityLogTableProps) {
  const { activities, clearActivities } = useActivityLog();

  const displayedActivities = limit ? activities.slice(0, limit) : activities;

  const actionBadges = {
    Mint: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    List: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    Buy: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    Cancel: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  };

  const statusColors = {
    pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    success: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    error: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  };

  return (
    <div className="rounded-[1.75rem] border border-emerald-100/10 bg-white/5 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <p className="text-xs text-slate-400 mt-1">Your on-chain action log on this device</p>
        </div>
        {activities.length > 0 && (
          <button
            onClick={clearActivities}
            className="rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-rose-300 transition hover:bg-rose-500/10"
          >
            Clear Log
          </button>
        )}
      </div>

      {displayedActivities.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-sm">
          No activity logged yet. Your transaction history will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-emerald-100/10 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                <th className="pb-3">Action</th>
                <th className="pb-3">Token ID</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Tx Hash</th>
                <th className="pb-3">Time</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100/5 text-sm text-slate-300">
              {displayedActivities.map((act) => (
                <tr key={act.id} className="group hover:bg-white/2 transition-colors">
                  <td className="py-3.5">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${actionBadges[act.action]}`}>
                      {act.action}
                    </span>
                  </td>
                  <td className="py-3.5 font-medium text-white">#{act.tokenId}</td>
                  <td className="py-3.5">
                    {act.price ? `${act.price} USDm` : "—"}
                  </td>
                  <td className="py-3.5">
                    {act.txHash ? (
                      <a
                        href={getExplorerTxUrl(act.txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline inline-flex items-center gap-1 text-xs"
                      >
                        {truncateAddress(act.txHash)}
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3.5 text-xs text-slate-400">{timeAgo(act.timestamp)}</td>
                  <td className="py-3.5 text-right">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${statusColors[act.status]}`}>
                      {act.status === "pending" && (
                        <span className="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                      )}
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
