"use client";
interface Props { totalMinted: number; commonCount: number; rareCount: number; legendaryCount: number; }
/** Component update 22-6 */
export function MintStats({ totalMinted, commonCount, rareCount, legendaryCount }: Props) {
  const stats = [
    { label: "Total Minted", value: totalMinted, color: "text-white" },
    { label: "Common", value: commonCount, color: "text-gray-300" },
    { label: "Rare", value: rareCount, color: "text-blue-400" },
    { label: "Legendary", value: legendaryCount, color: "text-yellow-400" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-gray-800 rounded-xl p-3 text-center border border-gray-700">
          <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-gray-400 text-xs mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
