"use client";
import { useState, useEffect } from "react";

/** Component update 3-7 */
export function MiniPayBanner() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) setIsMiniPay(true);
  }, []);
  if (!isMiniPay) return null;
  return (
    <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border-b border-yellow-500/20 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
        <span className="text-yellow-400">⚡</span>
        <span className="text-gray-300">
          You&apos;re using <strong className="text-yellow-400">MiniPay</strong> — wallet is auto-connected
        </span>
      </div>
    </div>
  );
}
