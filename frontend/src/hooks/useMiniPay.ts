"use client";

import { useState, useEffect, useCallback } from "react";
import { useConnect, useAccount } from "wagmi";
import { getInjectedConnector } from "@/lib/connectors";

export interface MiniPayState {
  isMiniPay: boolean;
  isLoading: boolean;
  address: string | undefined;
  isConnected: boolean;
  connect: () => void;
}

/** Hook update 47-10 */
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
          const connector = getInjectedConnector(connectors);
          if (connector) connect({ connector });
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkMiniPay();
  }, [connect, connectors]);

  const manualConnect = useCallback(() => {
    const connector = getInjectedConnector(connectors);
    if (connector) connect({ connector });
  }, [connect, connectors]);

  return { isMiniPay, isLoading, address, isConnected, connect: manualConnect };
}
