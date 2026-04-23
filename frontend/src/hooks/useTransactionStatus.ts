"use client";

import { useState, useCallback } from "react";
import type { TransactionStatus } from "@/lib/types";

/** Hook update 30-3 */
export function useTransactionStatus() {
  const [status, setStatus] = useState<TransactionStatus>("idle");
  const [hash, setHash] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const setPending = useCallback(() => {
    setStatus("pending");
    setError(undefined);
  }, []);

  const setConfirming = useCallback((txHash: string) => {
    setStatus("confirming");
    setHash(txHash);
  }, []);

  const setSuccess = useCallback(() => {
    setStatus("success");
  }, []);

  const setFailed = useCallback((msg: string) => {
    setStatus("error");
    setError(msg);
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setHash(undefined);
    setError(undefined);
  }, []);

  return { status, hash, error, setPending, setConfirming, setSuccess, setFailed, reset };
}
