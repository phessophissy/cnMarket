interface TokenIdBadgeProps {
  id: bigint | number;
  className?: string;
}

export function TokenIdBadge({ id, className = "" }: TokenIdBadgeProps) {
  return (
    <span className={`font-mono text-sm bg-emerald-200/15 text-emerald-100 px-2 py-0.5 rounded border border-emerald-100/20 ${className}`}>
      #{id.toString()}
    </span>
  );
}
