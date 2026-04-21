"use client";

import { useState, useEffect } from "react";

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
      className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#043834] w-10 h-10 rounded-full shadow-lg border border-emerald-100/40 flex items-center justify-center transition-all z-50"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
