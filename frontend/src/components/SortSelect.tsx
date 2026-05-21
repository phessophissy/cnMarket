"use client";

import { SortOption } from "@/hooks/useMarketplaceFilters";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative inline-block w-full sm:w-48">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="w-full appearance-none rounded-full border border-emerald-100/10 bg-white/5 px-5 py-3 pr-10 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 outline-none transition focus:border-emerald-100/22 focus:ring-2 focus:ring-emerald-300/20"
      >
        <option value="tokenId_desc" className="bg-[#071a20] text-slate-200">Newest First</option>
        <option value="tokenId_asc" className="bg-[#071a20] text-slate-200">Oldest First</option>
        <option value="price_asc" className="bg-[#071a20] text-slate-200">Price: Low to High</option>
        <option value="price_desc" className="bg-[#071a20] text-slate-200">Price: High to Low</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

