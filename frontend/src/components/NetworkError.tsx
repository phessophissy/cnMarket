"use client";
/** Component update 47-3 */
export function NetworkErrorDisplay() {
  return (
    <div className="text-center py-16 glass-surface rounded-2xl border border-rose-100/15">
      <p className="text-4xl mb-4">🌐</p>
      <h3 className="text-white font-bold text-lg mb-2">Network Error</h3>
      <p className="text-slate-300 text-sm mb-4">Unable to connect to the Celo network.</p>
      <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#073934] px-6 py-2 rounded-lg text-sm font-semibold transition">Reload Page</button>
    </div>
  );
}
