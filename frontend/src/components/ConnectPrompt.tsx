"use client";
import { useConnect } from "wagmi";
import { useEffect, useState } from "react";

/** Component update 49-10 */
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
      <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
        <p className="text-5xl mb-4">⚡</p>
        <p className="text-gray-400 mb-2">Connecting via MiniPay...</p>
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
      <p className="text-5xl mb-4">🔗</p>
      <p className="text-gray-400 mb-4">{message}</p>
      <button onClick={handleConnect}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        Connect Wallet
      </button>
    </div>
  );
}
