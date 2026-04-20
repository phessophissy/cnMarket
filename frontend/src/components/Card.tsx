import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-gray-800 rounded-xl border border-gray-700 ${
        hover ? "card-hover cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
