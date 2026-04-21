interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ value, max, className = "" }: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={`w-full bg-emerald-100/15 rounded-full h-2 ${className}`}>
      <div
        className="bg-gradient-to-r from-emerald-300 to-teal-300 h-2 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
