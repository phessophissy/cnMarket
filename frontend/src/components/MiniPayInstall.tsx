"use client";
import { useState, useEffect } from "react";

/** Component update 44-5 */
export function MiniPayInstall() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ethereum?.isMiniPay && /Android|iPhone/i.test(navigator.userAgent)) {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="flex items-start gap-3">
        <span className="text-2xl">📱</span>
        <div className="flex-1">
          <h4 className="text-white font-medium text-sm">Try MiniPay</h4>
          <p className="text-gray-400 text-xs mt-1">Use MiniPay for auto-connect and low fees.</p>
          <a href="https://play.google.com/store/apps/details?id=com.opera.minipay" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-2 text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
            Download MiniPay →
          </a>
        </div>
        <button onClick={() => setShow(false)} className="text-gray-500 hover:text-gray-300 text-sm" aria-label="Dismiss">✕</button>
      </div>
    </div>
  );
}
