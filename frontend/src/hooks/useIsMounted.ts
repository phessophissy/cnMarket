"use client";

import { useState, useEffect } from "react";

/** Hook update 27-3 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
