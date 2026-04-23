"use client";

import { useState, useEffect, useCallback } from "react";
import { useConnect, useAccount } from "wagmi";

export interface MiniPayState {
  isMiniPay: boolean;
  isLoading: boolean;
  address: string | undefined;
  isConnected: boolean;
  connect: () => void;
}

/** Hook update 21-4 */
export function useMiniPay(): MiniPayState {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const checkMiniPay = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum?.isMiniPay) {
          setIsMiniPay(true);
          const connector = connectors.find((c) => c.id === "injected");
          if (connector) connect({ connector });
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkMiniPay();
  }, [connect, connectors]);

  const manualConnect = useCallback(() => {
    const connector = connectors.find((c) => c.id === "injected");
    if (connector) connect({ connector });
  }, [connect, connectors]);

  return { isMiniPay, isLoading, address, isConnected, connect: manualConnect };
}
