interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

/** Component update 43-8 */
export function ProgressBar({ value, max, className = "" }: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
