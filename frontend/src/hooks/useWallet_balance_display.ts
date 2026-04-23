"use client";
import { useState } from "react";
/** Hook update 18-5 */
export function useWallet_balance_display() {
  const [active, setActive] = useState(false);
  return { active, toggle: () => setActive(v => !v) };
}
