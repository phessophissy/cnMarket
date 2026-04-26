"use client";

import { Navbar } from "@/components/Navbar";

export default function AboutPage() {
  const features = [
    {
      icon: "🎨",
      title: "Three Rarity Levels",
      description: "Mint Common, Rare, or Legendary NFTs with unique visual styling and pricing.",
    },
    {
      icon: "💰",
      title: "Built-in Marketplace",
      description: "List your NFTs for sale and buy from other collectors directly on-chain.",
    },
    {
      icon: "🔒",
      title: "Secure & Decentralized",
      description: "Smart contracts verified on CeloScan with ReentrancyGuard protection.",
    },
    {
      icon: "⚡",
      title: "Low Gas Fees",
      description: "Built on Celo for fast, affordable transactions. Mint for as low as 0.01 USDm.",
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Works with miniPay, MetaMask, and WalletConnect on any device.",
    },
    {
      icon: "🌍",
      title: "Open Source",
      description: "Fully open-source codebase. Contribute on GitHub and help build the future.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            About <span className="text-gradient">cnMarket</span>
          </h1>
          <p className="text-slate-200/85 text-lg max-w-2xl mx-auto">
            cnMarket is a decentralized NFT marketplace built on the Celo blockchain.
            Mint, collect, and trade unique digital assets with three rarity levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-surface rounded-2xl p-6 card-hover"
            >
              <span className="text-3xl mb-3 block">{feature.icon}</span>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-sm leading-6">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-surface rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Smart Contracts</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-emerald-200/10 rounded-lg border border-emerald-100/15">
              <span className="text-slate-300 text-sm">CeloNFT (ERC-721)</span>
              <code className="text-emerald-200 text-xs font-mono break-all">
                0xA285c0f2cb1Bf72b94Fc71Bf3dC85C7A2da6480a
              </code>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-emerald-200/10 rounded-lg border border-emerald-100/15">
              <span className="text-slate-300 text-sm">NFTMarketplace</span>
              <code className="text-emerald-200 text-xs font-mono break-all">
                0xac37CE99815bF34f73426Ae5eEE2955Ef3544021
              </code>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
