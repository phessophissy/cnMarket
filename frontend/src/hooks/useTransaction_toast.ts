"use client";
import { useState } from "react";
export function useTransaction_toast() {
  const [active, setActive] = useState(false);
  return { active, toggle: () => setActive(v => !v) };
}
