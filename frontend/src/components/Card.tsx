import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/** Component update 42-7 */
export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`glass-surface rounded-xl border border-emerald-100/10 ${
        hover ? "card-hover cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
