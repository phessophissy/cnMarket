import type { ReactNode } from "react";

/** Component update 40-9 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
