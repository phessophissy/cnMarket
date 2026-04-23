"use client";

import { useState, useEffect } from "react";

/** Hook update 34-8 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
