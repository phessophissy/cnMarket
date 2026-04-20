"use client";

import { RARITY_LABELS, RARITY_COLORS } from "@/lib/config";

export function RarityBadge({ rarity }: { rarity: 0 | 1 | 2 }) {
  const colors = RARITY_COLORS[rarity];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
    >
      {RARITY_LABELS[rarity]}
    </span>
  );
}
