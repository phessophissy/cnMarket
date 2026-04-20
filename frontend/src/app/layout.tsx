import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: {
    default: "cnMarket — NFT Marketplace on Celo",
    template: "%s | cnMarket",
  },
  description: "Mint and trade NFTs with 3 rarity levels on Celo blockchain. Common, Rare, and Legendary NFTs available.",
  keywords: ["NFT", "Celo", "marketplace", "mint", "blockchain", "ERC-721", "cnMarket"],
  authors: [{ name: "cnMarket" }],
  openGraph: {
    title: "cnMarket — NFT Marketplace on Celo",
    description: "Mint and trade NFTs with 3 rarity levels on Celo blockchain.",
    url: "https://cnmarket.vercel.app",
    siteName: "cnMarket",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cnMarket — NFT Marketplace on Celo",
    description: "Mint and trade NFTs with 3 rarity levels on Celo blockchain.",
  },
  other: {
    "talentapp:project_verification":
      "1e71d5edf0a173bc0c8e088eed0429480af9919177e00e6a37d8d84e46a1f9f9796df14d5e506ff40dd26794e9709f437b41e91e80dd2a2171d788f9c8976a68",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col">
        <Providers>
          {children}
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
