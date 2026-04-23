"use client";
import { useState } from "react";
/** Hook update 18-10 */
export function useNft_search_filter() {
  const [active, setActive] = useState(false);
  return { active, toggle: () => setActive(v => !v) };
}
