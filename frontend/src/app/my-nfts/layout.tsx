import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My NFTs",
  description: "View and manage your NFT collection on cnMarket.",
};

export default function MyNFTsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
