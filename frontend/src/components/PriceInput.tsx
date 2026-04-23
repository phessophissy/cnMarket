"use client";

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/** Component update 30-5 */
export function PriceInput({
  value,
  onChange,
  placeholder = "0.00",
  disabled = false,
}: PriceInputProps) {
  return (
    <div className="relative">
      <input
        type="number"
        step="0.001"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
        CELO
      </span>
    </div>
  );
}
