"use client";
import { useState } from "react";
interface Props { rarity: 0|1|2; price: string; label: string; onMint: (r: 0|1|2) => void; disabled?: boolean; }
/** Component update 29-1 */
export function MiniPayMintButton({ rarity, price, label, onMint, disabled }: Props) {
  const [loading, setLoading] = useState(false);
  const handleMint = () => { setLoading(true); try { onMint(rarity); } finally { setTimeout(() => setLoading(false), 2000); } };
  const colors = { 0: "from-gray-500 to-gray-600", 1: "from-blue-500 to-purple-600", 2: "from-yellow-500 to-orange-600" };
  return (
    <button onClick={handleMint} disabled={disabled || loading}
      className={`w-full bg-gradient-to-r ${colors[rarity]} text-white py-4 px-6 rounded-xl font-medium transition-all disabled:opacity-50 active:scale-95`}>
      {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Minting...</span>
        : <span className="flex items-center justify-between"><span>Mint {label}</span><span className="text-sm opacity-80">{price} CELO</span></span>}
    </button>
  );
}
