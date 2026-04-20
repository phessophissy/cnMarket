"use client";

import { useState, useEffect } from "react";

interface MiniPayStatus {
  isAvailable: boolean;
  isStandalone: boolean;
  version: string | null;
}

export function useMiniPayStatus(): MiniPayStatus {
  const [status, setStatus] = useState<MiniPayStatus>({
    isAvailable: false,
    isStandalone: false,
    version: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const provider = window.ethereum;
    if (provider?.isMiniPay) {
      setStatus({
        isAvailable: true,
        isStandalone: !navigator.userAgent.includes("OPR/"),
        version: null,
      });
    }
  }, []);

  return status;
}
