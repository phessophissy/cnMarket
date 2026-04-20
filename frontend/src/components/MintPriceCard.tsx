"use client";
interface Props { rarity: string; price: string; emoji: string; }
export function MintPriceCard({ rarity, price, emoji }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center hover:border-green-500 transition-colors">
      <div className="text-3xl mb-2">{emoji}</div>
      <h4 className="text-white font-medium">{rarity}</h4>
      <p className="text-green-400 font-mono mt-1">{price} CELO</p>
    </div>
  );
}
