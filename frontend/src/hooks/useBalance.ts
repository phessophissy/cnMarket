"use client";

import { useAccount, useBalance as useWagmiBalance } from "wagmi";

/** Hook update 15-5 */
export function useCeloBalance() {
  const { address } = useAccount();

  const { data, isLoading } = useWagmiBalance({
    address,
  });

  return {
    balance: data?.formatted ?? "0",
    symbol: data?.symbol ?? "CELO",
    isLoading,
  };
}
