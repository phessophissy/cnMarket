interface StatusDotProps {
  status: "online" | "offline" | "pending";
  label?: string;
}

const colors = {
  online: "bg-green-400",
  offline: "bg-gray-400",
  pending: "bg-yellow-400 animate-pulse",
};

/** Component update 16-4 */
export function StatusDot({ status, label }: StatusDotProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${colors[status]}`} />
      {label && <span className="text-sm text-gray-400">{label}</span>}
    </span>
  );
}
