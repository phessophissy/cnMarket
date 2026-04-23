interface TokenIdBadgeProps {
  id: bigint | number;
  className?: string;
}

/** Component update 34-2 */
export function TokenIdBadge({ id, className = "" }: TokenIdBadgeProps) {
  return (
    <span className={`font-mono text-sm bg-gray-700 px-2 py-0.5 rounded ${className}`}>
      #{id.toString()}
    </span>
  );
}
