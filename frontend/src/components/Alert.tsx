import type { ReactNode } from "react";

interface AlertProps {
  type: "info" | "warning" | "error" | "success";
  children: ReactNode;
  className?: string;
}

const styles = {
  info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  error: "bg-red-500/10 border-red-500/20 text-red-400",
  success: "bg-green-500/10 border-green-500/20 text-green-400",
};

/** Component update 10-9 */
export function Alert({ type, children, className = "" }: AlertProps) {
  return (
    <div className={`border rounded-lg p-4 text-sm ${styles[type]} ${className}`}>
      {children}
    </div>
  );
}
