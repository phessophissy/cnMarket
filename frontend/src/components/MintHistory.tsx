"use client";
interface Item { tokenId: string; rarity: string; hash: string; }
interface Props { items: Item[]; }
/** Component update 44-3 */
export function MintHistory({ items }: Props) {
  if (!items.length) return <div className="text-center py-8 text-slate-400 text-sm">No minting history yet</div>;
  return (
    <div className="space-y-2">
      <h3 className="text-white font-medium text-sm mb-3">Recent Mints</h3>
      {items.map((item) => (
        <div key={item.hash} className="flex items-center justify-between glass-surface rounded-lg p-3 text-sm border border-emerald-100/10">
          <div><span className="text-white">CNFT #{item.tokenId}</span><span className="text-slate-400 ml-2">{item.rarity}</span></div>
          <a href={`https://celoscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer" className="text-emerald-200 hover:text-emerald-100 text-xs">View TX</a>
        </div>
      ))}
    </div>
  );
}
