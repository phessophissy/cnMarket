"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

const variants = {
  primary: "bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#063d37]",
  secondary: "bg-emerald-200/10 border border-emerald-100/20 hover:bg-emerald-200/15 text-emerald-50",
  danger: "bg-rose-300/20 border border-rose-100/20 hover:bg-rose-300/30 text-rose-100",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3",
};

/** Component update 49-6 */
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`${variants[variant]} ${buttonSizes[size]} rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
