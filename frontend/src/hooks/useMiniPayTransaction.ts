"use client";

import { useCallback, useState } from "react";
import { useAccount } from "wagmi";

export type MiniPayTxStatus = "idle" | "pending" | "success" | "error";

/** Hook update 9-9 */
export function useMiniPayTransaction() {
  const { address } = useAccount();
  const [status, setStatus] = useState<MiniPayTxStatus>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendTransaction = useCallback(
    async (to: string, value: string, data?: string) => {
      if (!address || !window.ethereum) {
        setError("No wallet connected");
        setStatus("error");
        return null;
      }
      setStatus("pending");
      setError(null);
      try {
        const hash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [{ from: address, to, value, data: data || "0x" }],
        });
        setTxHash(hash as string);
        setStatus("success");
        return hash;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Transaction failed";
        setError(message);
        setStatus("error");
        return null;
      }
    },
    [address]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setTxHash(null);
    setError(null);
  }, []);

  return { sendTransaction, status, txHash, error, reset };
}
