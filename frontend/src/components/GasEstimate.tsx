"use client";
interface Props { action: string; estimatedGas?: string; }
/** Component update 22-1 */
export function GasEstimate({ action, estimatedGas = "~0.001" }: Props) {
  return <div className="flex items-center justify-between text-xs text-gray-500 px-2"><span>Est. gas for {action}</span><span>{estimatedGas} CELO</span></div>;
}
