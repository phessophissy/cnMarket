"use client";

import { useState, useEffect } from "react";

/** Component update 32-9 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="button-shine fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100/30 bg-[linear-gradient(145deg,var(--mint-0),var(--cyan-0))] text-lg font-semibold text-[#063835] shadow-[0_18px_44px_rgba(2,13,15,0.36)] transition-all hover:-translate-y-1 hover:brightness-105"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
