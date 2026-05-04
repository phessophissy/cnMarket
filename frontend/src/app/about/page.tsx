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
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <section className="section-shell glass-surface rounded-[2rem] px-6 py-8 md:px-8 md:py-10">
          <span className="eyebrow">About cnMarket</span>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-semibold md:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
                A collectible marketplace with a <span className="text-gradient">calmer on-chain feel</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/85 md:text-lg">
                cnMarket is a Celo-based NFT experience focused on clarity: rarity-based drops, stablecoin pricing,
                mobile-friendly wallet support, and a storefront that respects both collectors and first-time users.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Network</p>
                <p className="mt-3 text-2xl font-semibold text-white">Celo Mainnet</p>
              </div>
              <div className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Pricing</p>
                <p className="mt-3 text-2xl font-semibold text-white">USDm-denominated</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card card-hover rounded-[1.7rem] p-6"
            >
              <span className="text-3xl mb-3 block">{feature.icon}</span>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-sm leading-6">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="section-shell glass-surface mt-8 rounded-[2rem] p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Trust Layer</span>
              <h2 className="mt-4 text-3xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Smart contracts
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Contracts are part of the product story here, not buried implementation details. The app surfaces them clearly for verification and review.
            </p>
          </div>
          <div className="space-y-4">
            <div className="mt-8 flex flex-col gap-2 rounded-[1.4rem] border border-emerald-100/10 bg-emerald-200/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-300">CeloNFT (ERC-721)</span>
              <code className="text-emerald-200 text-xs font-mono break-all">
                0xA285c0f2cb1Bf72b94Fc71Bf3dC85C7A2da6480a
              </code>
            </div>
            <div className="flex flex-col gap-2 rounded-[1.4rem] border border-emerald-100/10 bg-emerald-200/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-300">NFTMarketplace</span>
              <code className="text-emerald-200 text-xs font-mono break-all">
                0xac37CE99815bF34f73426Ae5eEE2955Ef3544021
              </code>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
