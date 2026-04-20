export class Transaction_toastError extends Error {
  constructor(message: string, public code: number = 0) {
    super(message);
    this.name = "Transaction_toastError";
  }
}
