import type { SupportedWallet } from "./constants";
export function detectWallet(): SupportedWallet | null {
  if (typeof window === "undefined") return null;
  if (window.ethereum?.isMiniPay) return "MiniPay";
  if (window.ethereum?.isMetaMask) return "MetaMask";
  return null;
}
export function getWalletDisplayName(wallet: SupportedWallet): string {
  return wallet;
}
