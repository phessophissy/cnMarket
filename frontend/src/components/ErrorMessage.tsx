"use client";
interface Props { error: Error | string | null; onDismiss?: () => void; }
/** Component update 35-6 */
export function ErrorMessage({ error, onDismiss }: Props) {
  if (!error) return null;
  const message = typeof error === "string" ? error : error.message;
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
      <span className="text-red-400 text-lg">⚠️</span>
      <p className="text-red-300 text-sm flex-1">{message}</p>
      {onDismiss && <button onClick={onDismiss} className="text-red-400 hover:text-red-300 text-sm">✕</button>}
    </div>
  );
}
