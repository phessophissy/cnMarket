"use client";
const rarities = [
  { id: 0 as const, name: "Common", price: "0.01", emoji: "⚪", desc: "Standard rarity NFT" },
  { id: 1 as const, name: "Rare", price: "0.03", emoji: "🔵", desc: "Enhanced rarity" },
  { id: 2 as const, name: "Legendary", price: "0.05", emoji: "🌟", desc: "The rarest and most valuable" },
];
interface Props { onSelect: (r: 0|1|2) => void; selected: 0|1|2; }
/** Component update 46-5 */
export function MintRaritySelector({ onSelect, selected }: Props) {
  return (
    <div className="space-y-3">
      {rarities.map((r) => (
        <button key={r.id} onClick={() => onSelect(r.id)}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${selected === r.id ? "border-green-500 bg-green-500/10" : "border-gray-700 bg-gray-800 hover:border-gray-600"}`}>
          <span className="text-2xl">{r.emoji}</span>
          <div className="flex-1 text-left">
            <div className="text-white font-medium">{r.name}</div>
            <div className="text-gray-400 text-xs">{r.desc}</div>
          </div>
          <span className="text-green-400 font-mono text-sm">{r.price} CELO</span>
        </button>
      ))}
    </div>
  );
}
