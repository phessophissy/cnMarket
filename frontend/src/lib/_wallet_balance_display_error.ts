export class Wallet_balance_displayError extends Error {
  constructor(message: string, public code: number = 0) {
    super(message);
    this.name = "Wallet_balance_displayError";
  }
}
