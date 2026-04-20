/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate price input
 */
export function isValidPrice(price: string): boolean {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0 && num < 1000000;
}

/**
 * Validate token ID
 */
export function isValidTokenId(id: string): boolean {
  const num = parseInt(id, 10);
  return !isNaN(num) && num >= 0;
}
