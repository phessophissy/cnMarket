import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "cnMarket",
  description: "Mint and trade NFTs with 3 rarity levels on Celo",
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
        </Providers>
      </body>
    </html>
  );
}
