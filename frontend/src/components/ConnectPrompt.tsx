"use client";
import { useConnect } from "wagmi";
import { useEffect, useState } from "react";
import { getInjectedConnector, getPreferredConnector } from "@/lib/connectors";

/** Component update 49-10 */
export function ConnectPrompt({ message = "Connect your wallet to continue" }: { message?: string }) {
  const { connect, connectors } = useConnect();
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) {
      setIsMiniPay(true);
      const connector = getInjectedConnector(connectors);
      if (connector) connect({ connector });
    }
  }, [connect, connectors]);

  const handleConnect = () => {
    const connector = getPreferredConnector(connectors);
    if (connector) connect({ connector });
  };

  if (isMiniPay) {
    return (
      <div className="text-center py-20 glass-surface rounded-2xl border border-emerald-100/10">
        <p className="text-5xl mb-4">⚡</p>
        <p className="text-slate-300 mb-4">MiniPay detected. Tap below if auto-connect does not start.</p>
        <button
          onClick={handleConnect}
          className="bg-gradient-to-r from-amber-300 to-yellow-300 hover:brightness-105 text-[#063b35] px-6 py-3 rounded-lg font-semibold transition"
        >
          Connect MiniPay
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-20 glass-surface rounded-2xl border border-emerald-100/10">
      <p className="text-5xl mb-4">🔗</p>
      <p className="text-slate-300 mb-4">{message}</p>
      <button onClick={handleConnect}
        className="bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#063b35] px-6 py-3 rounded-lg font-semibold transition">
        Connect Wallet
      </button>
    </div>
  );
}
