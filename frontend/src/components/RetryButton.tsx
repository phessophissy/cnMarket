"use client";
interface Props { onRetry: () => void; label?: string; loading?: boolean; }
export function RetryButton({ onRetry, label = "Retry", loading }: Props) {
  return (
    <button onClick={onRetry} disabled={loading}
      className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50">
      {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span>🔄</span>}
      {label}
    </button>
  );
}
