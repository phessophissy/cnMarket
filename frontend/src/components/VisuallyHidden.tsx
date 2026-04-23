import type { ReactNode } from "react";

/** Component update 14-5 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
