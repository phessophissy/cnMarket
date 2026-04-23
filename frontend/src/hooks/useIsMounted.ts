"use client";

import { useState, useEffect } from "react";

/** Hook update 11-7 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
