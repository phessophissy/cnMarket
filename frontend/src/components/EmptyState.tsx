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
    <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
      <p className="text-5xl mb-4">{icon}</p>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-400">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-green-400 hover:text-green-300 mt-3 inline-block font-medium"
        >
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
