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
    <div className="border-b border-emerald-100/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-center justify-between hover:text-emerald-100 transition-colors"
      >
        <span className="font-medium">{q}</span>
        <span className="text-slate-300 text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-slate-300 pb-4 animate-fade-in leading-7">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-slate-200/85">Everything you need to know about cnMarket</p>
        </div>
        <div className="glass-surface rounded-3xl border border-emerald-100/10 px-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </main>
    </>
  );
}
