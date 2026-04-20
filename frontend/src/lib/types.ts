export type Rarity = 0 | 1 | 2;

export interface NFTItem {
  tokenId: bigint;
  rarity: Rarity;
  owner: string;
}

export interface Listing {
  tokenId: bigint;
  seller: string;
  price: bigint;
  active: boolean;
}

export interface MintEvent {
  to: string;
  tokenId: bigint;
  rarity: Rarity;
}

export type TransactionStatus = "idle" | "pending" | "confirming" | "success" | "error";
