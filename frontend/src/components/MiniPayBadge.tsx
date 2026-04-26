"use client";
import { useState, useEffect } from "react";

/** Component update 26-1 */
export function MiniPayBadge() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) setIsMiniPay(true);
  }, []);
  if (!isMiniPay) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-amber-300/20 text-amber-100 px-2 py-1 rounded-full border border-amber-100/30">
      <span className="w-1.5 h-1.5 bg-amber-200 rounded-full animate-pulse" />
      MiniPay Connected
    </span>
  );
}
