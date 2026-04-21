"use client";

import Link from "next/link";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

/** Component update 40-10 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="text-center py-20 glass-surface rounded-2xl border border-emerald-100/10">
      <p className="text-5xl mb-4">{icon}</p>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-slate-300">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-emerald-200 hover:text-emerald-100 mt-3 inline-block font-medium"
        >
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
