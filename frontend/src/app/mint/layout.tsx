import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mint NFT",
  description: "Mint Common, Rare, or Legendary NFTs on cnMarket.",
};

export default function MintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
