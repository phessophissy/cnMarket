"use client";
import { useState, useEffect } from "react";

export function MiniPayBadge() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) setIsMiniPay(true);
  }, []);
  if (!isMiniPay) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-500/30">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
      MiniPay Connected
    </span>
  );
}
