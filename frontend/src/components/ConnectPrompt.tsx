"use client";

import { useConnect } from "wagmi";

export function ConnectPrompt({ message = "Connect your wallet to continue" }: { message?: string }) {
  const { connect, connectors } = useConnect();

  const handleConnect = () => {
    const injected = connectors.find((c) => c.id === "injected");
    const wc = connectors.find((c) => c.id === "walletConnect");
    const connector = injected || wc;
    if (connector) connect({ connector });
  };

  return (
    <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
      <p className="text-5xl mb-4">🔗</p>
      <p className="text-gray-400 mb-4">{message}</p>
      <button
        onClick={handleConnect}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Connect Wallet
      </button>
    </div>
  );
}
