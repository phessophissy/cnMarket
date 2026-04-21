"use client";
import { useConnect } from "wagmi";
import { useEffect, useState } from "react";

export function ConnectPrompt({ message = "Connect your wallet to continue" }: { message?: string }) {
  const { connect, connectors } = useConnect();
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) {
      setIsMiniPay(true);
      const connector = connectors.find((c) => c.id === "injected");
      if (connector) connect({ connector });
    }
  }, [connect, connectors]);

  const handleConnect = () => {
    const inj = connectors.find((c) => c.id === "injected");
    const wc = connectors.find((c) => c.id === "walletConnect");
    if (inj || wc) connect({ connector: (inj || wc)! });
  };

  if (isMiniPay) {
    return (
      <div className="text-center py-20 glass-surface rounded-2xl border border-emerald-100/10">
        <p className="text-5xl mb-4">⚡</p>
        <p className="text-slate-300 mb-2">Connecting via MiniPay...</p>
        <div className="w-8 h-8 border-2 border-amber-200/60 border-t-transparent rounded-full animate-spin mx-auto" />
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
