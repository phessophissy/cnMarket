interface TokenIdBadgeProps {
  id: bigint | number;
  className?: string;
}

export function TokenIdBadge({ id, className = "" }: TokenIdBadgeProps) {
  return (
    <span className={`font-mono text-sm bg-gray-700 px-2 py-0.5 rounded ${className}`}>
      #{id.toString()}
    </span>
  );
}
