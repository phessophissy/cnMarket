"use client";
import { useState, useEffect } from "react";

export function MiniPayBanner() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) setIsMiniPay(true);
  }, []);
  if (!isMiniPay) return null;
  return (
    <div className="bg-gradient-to-r from-amber-300/15 to-emerald-300/15 border-b border-amber-200/20 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
        <span className="text-amber-100">⚡</span>
        <span className="text-emerald-50">
          You&apos;re using <strong className="text-amber-100">MiniPay</strong> — wallet is auto-connected
        </span>
      </div>
    </div>
  );
}
