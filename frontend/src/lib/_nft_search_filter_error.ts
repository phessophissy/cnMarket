export class Nft_search_filterError extends Error {
  constructor(message: string, public code: number = 0) {
    super(message);
    this.name = "Nft_search_filterError";
  }
}
