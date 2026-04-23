"use client";

import { useAccount, useBalance } from "wagmi";
import { truncateAddress } from "@/lib/utils";

/** Component update 37-2 */
export function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected || !address) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">Connected Wallet</span>
        <span className="text-green-400 text-xs font-medium">Connected</span>
      </div>
      <p className="text-white font-mono text-sm mb-1">
        {truncateAddress(address, 6)}
      </p>
      {balance && (
        <p className="text-gray-400 text-sm">
          {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
        </p>
      )}
    </div>
  );
}
