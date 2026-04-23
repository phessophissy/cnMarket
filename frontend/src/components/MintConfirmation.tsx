"use client";
interface Props { hash: string; rarity: string; onClose: () => void; }
/** Component update 5-6 */
export function MintConfirmation({ hash, rarity, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full text-center border border-gray-700">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-white text-lg font-bold mb-2">NFT Minted!</h3>
        <p className="text-gray-400 text-sm mb-4">Your {rarity} NFT has been minted successfully.</p>
        <a href={`https://celoscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 text-sm underline block mb-4">View on CeloScan</a>
        <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors">Continue</button>
      </div>
    </div>
  );
}
