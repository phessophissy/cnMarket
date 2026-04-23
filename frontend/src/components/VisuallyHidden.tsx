import type { ReactNode } from "react";

/** Component update 24-3 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
