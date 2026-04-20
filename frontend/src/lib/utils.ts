/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Truncate an Ethereum address for display
 */
export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format CELO amount for display
 */
export function formatCelo(wei: bigint): string {
  const ether = Number(wei) / 1e18;
  return ether.toFixed(ether < 0.01 ? 4 : 2);
}

/**
 * Get block explorer URL for a transaction hash
 */
export function getExplorerTxUrl(hash: string): string {
  return `https://celoscan.io/tx/${hash}`;
}

/**
 * Get block explorer URL for an address
 */
export function getExplorerAddressUrl(address: string): string {
  return `https://celoscan.io/address/${address}`;
}
