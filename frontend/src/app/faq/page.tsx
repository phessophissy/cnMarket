"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const faqs = [
  {
    q: "What is cnMarket?",
    a: "cnMarket is a decentralized NFT marketplace built on the Celo blockchain. You can mint, buy, and sell NFTs with three different rarity levels.",
  },
  {
    q: "How much does it cost to mint?",
    a: "Common NFTs cost 0.01 USDm, Rare NFTs cost 0.03 USDm, and Legendary NFTs cost 0.05 USDm. Plus a small gas fee.",
  },
  {
    q: "What wallets are supported?",
    a: "cnMarket supports MetaMask, miniPay, and any WalletConnect-compatible wallet.",
  },
  {
    q: "Which blockchain is this on?",
    a: "cnMarket runs on the Celo blockchain (Chain ID 42220), an EVM-compatible, carbon-negative blockchain.",
  },
  {
    q: "How do I list my NFT for sale?",
    a: "Go to 'My NFTs', click on the NFT you want to sell, and click 'List for Sale'. Set your price in USDm and confirm the transaction.",
  },
  {
    q: "Are the smart contracts verified?",
    a: "Yes! Both CeloNFT and NFTMarketplace contracts are verified on Sourcify and can be viewed on CeloScan.",
  },
  {
    q: "Is cnMarket open source?",
    a: "Yes! The full source code is available on GitHub under the MIT license.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-emerald-100/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-emerald-100"
      >
        <span className="pr-4 text-base font-semibold text-white">{q}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100/12 bg-white/5 text-xl text-slate-300">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="animate-fade-in pb-5 text-sm leading-7 text-slate-300 md:text-base">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-10">
        <section className="section-shell glass-surface rounded-[2rem] px-6 py-8 md:px-8">
          <span className="eyebrow">Support Center</span>
          <h1 className="mt-4 text-5xl font-semibold md:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently asked <span className="text-gradient">questions</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/85">
            A clean reference for pricing, wallet support, network details, and how the core marketplace actions work.
          </p>
        </section>
        <div className="mt-8 feature-card rounded-[2rem] px-6 md:px-8">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </main>
    </>
  );
}
