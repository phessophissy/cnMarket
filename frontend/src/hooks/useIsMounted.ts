"use client";

import { useState, useEffect } from "react";

/** Hook update 13-6 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
