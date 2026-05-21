"use client";

import { RARITY_LABELS } from "@/lib/config";

interface RarityFilterProps {
  selected: number | null;
  onChange: (rarity: number | null) => void;
}

export function RarityFilter({ selected, onChange }: RarityFilterProps) {
  const rarityColors = [
    "from-slate-400/22 to-gray-500/10 text-slate-100 border-slate-400/30",      // Common
    "from-blue-400/22 to-purple-500/10 text-blue-100 border-blue-400/30",       // Rare
    "from-yellow-400/22 to-orange-500/10 text-yellow-100 border-yellow-400/30", // Legendary
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] border transition-all ${
          selected === null
            ? "bg-gradient-to-r from-emerald-300 to-teal-300 text-[#062f2d] border-emerald-300/40 shadow-[0_4px_12px_rgba(103,240,191,0.15)]"
            : "bg-white/5 border-emerald-100/10 text-slate-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        All Tiers
      </button>
      {RARITY_LABELS.map((label, i) => {
        const isSelected = selected === i;
        const colorClasses = rarityColors[i];

        return (
          <button
            key={label}
            onClick={() => onChange(i)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] border transition-all ${
              isSelected
                ? `bg-gradient-to-r ${colorClasses} shadow-[0_4px_12px_rgba(255,255,255,0.05)]`
                : "bg-white/5 border-emerald-100/10 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

