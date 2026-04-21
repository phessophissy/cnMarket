"use client";
interface Props { rarity: string; price: string; emoji: string; }
export function MintPriceCard({ rarity, price, emoji }: Props) {
  return (
    <div className="glass-surface border border-emerald-100/10 rounded-xl p-4 text-center hover:border-emerald-100/35 transition-colors">
      <div className="text-3xl mb-2">{emoji}</div>
      <h4 className="text-white font-medium">{rarity}</h4>
      <p className="text-emerald-200 font-mono mt-1">{price} CELO</p>
    </div>
  );
}
