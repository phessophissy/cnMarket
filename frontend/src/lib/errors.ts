export class AppError extends Error {
  constructor(message: string, public code: string, public recoverable = true) {
    super(message); this.name = "AppError";
  }
}
export class WalletError extends AppError { constructor(m: string) { super(m, "WALLET_ERROR"); this.name = "WalletError"; } }
export class TransactionError extends AppError { constructor(m: string, public txHash?: string) { super(m, "TX_ERROR", false); this.name = "TransactionError"; } }
export class NetworkError extends AppError { constructor(m = "Network error") { super(m, "NETWORK_ERROR"); this.name = "NetworkError"; } }

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message;
  if (error instanceof Error) {
    if (error.message.includes("user rejected")) return "Transaction cancelled by user";
    if (error.message.includes("insufficient funds")) return "Insufficient CELO balance";
    return error.message;
  }
  return "An unexpected error occurred";
}
export function isUserRejection(error: unknown): boolean {
  return error instanceof Error && (error.message.toLowerCase().includes("user rejected") || error.message.toLowerCase().includes("user denied"));
}
