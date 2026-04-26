"use client";

import { useState, useEffect } from "react";

/** Hook update 41-2 */
/** Hook update 41-9 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
