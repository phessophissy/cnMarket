"use client";

import { RARITY_LABELS } from "@/lib/config";

interface RarityFilterProps {
  selected: number | null;
  onChange: (rarity: number | null) => void;
}

/** Component update 31-8 */
export function RarityFilter({ selected, onChange }: RarityFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          selected === null
            ? "bg-green-600 text-white"
            : "bg-gray-800 text-gray-400 hover:text-white"
        }`}
      >
        All
      </button>
      {RARITY_LABELS.map((label, i) => (
        <button
          key={label}
          onClick={() => onChange(i)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            selected === i
              ? "bg-green-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
