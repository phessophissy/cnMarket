import { ZERO_ADDRESS } from "./constants";
export const NFT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const MARKETPLACE_ADDRESS = (process.env
  .NEXT_PUBLIC_MARKETPLACE_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const RARITY_LABELS = ["Common", "Rare", "Legendary"] as const;

export const RARITY_COLORS = {
  0: {
    bg: "bg-gray-500",
    text: "text-gray-100",
    gradient: "from-slate-400 to-gray-600",
    border: "border-gray-500",
  },
  1: {
    bg: "bg-blue-500",
    text: "text-blue-100",
    gradient: "from-blue-400 to-purple-600",
    border: "border-blue-500",
  },
  2: {
    bg: "bg-yellow-500",
    text: "text-yellow-100",
    gradient: "from-yellow-400 to-orange-600",
    border: "border-yellow-500",
  },
} as const;

export const MINT_PRICES: Record<0 | 1 | 2, bigint> = {
  0: BigInt("10000000000000000"), // 0.01 CELO
  1: BigInt("30000000000000000"), // 0.03 CELO
  2: BigInt("50000000000000000"), // 0.05 CELO
};

export const MINT_PRICE_DISPLAY: Record<0 | 1 | 2, string> = {
  0: "0.01",
  1: "0.03",
  2: "0.05",
};
