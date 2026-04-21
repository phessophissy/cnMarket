import type { ReactNode } from "react";

interface AlertProps {
  type: "info" | "warning" | "error" | "success";
  children: ReactNode;
  className?: string;
}

const styles = {
  info: "bg-sky-400/10 border-sky-300/25 text-sky-200",
  warning: "bg-amber-400/10 border-amber-300/25 text-amber-200",
  error: "bg-rose-400/10 border-rose-300/25 text-rose-200",
  success: "bg-emerald-400/10 border-emerald-300/25 text-emerald-200",
};

/** Component update 32-3 */
export function Alert({ type, children, className = "" }: AlertProps) {
  return (
    <div className={`border rounded-lg p-4 text-sm ${styles[type]} ${className}`}>
      {children}
    </div>
  );
}
