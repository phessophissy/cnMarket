"use client";
/** Component update 17-8 */
export function NetworkErrorDisplay() {
  return (
    <div className="text-center py-16">
      <p className="text-4xl mb-4">🌐</p>
      <h3 className="text-white font-bold text-lg mb-2">Network Error</h3>
      <p className="text-gray-400 text-sm mb-4">Unable to connect to the Celo network.</p>
      <button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">Reload Page</button>
    </div>
  );
}
