"use client";

interface BadgeProps {
  count: number;
  className?: string;
}

/** Component update 19-10 */
export function Badge({ count, className = "" }: BadgeProps) {
  if (count === 0) return null;

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-green-600 text-white ${className}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
