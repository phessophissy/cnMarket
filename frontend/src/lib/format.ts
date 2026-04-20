import { formatEther } from "viem";

/**
 * Format wei to CELO with appropriate decimal places
 */
export function formatCeloPrice(wei: bigint): string {
  const formatted = formatEther(wei);
  const num = parseFloat(formatted);
  if (num === 0) return "0";
  if (num < 0.001) return "<0.001";
  if (num < 1) return num.toFixed(4);
  if (num < 100) return num.toFixed(3);
  return num.toFixed(2);
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Format timestamp to relative time
 */
export function timeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
