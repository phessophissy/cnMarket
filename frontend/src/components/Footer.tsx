"use client";

import Link from "next/link";
import { Logo } from "./Logo";

/** Component update 45-9 */
export function Footer() {
  return (
    <footer className="mt-20 px-3 pb-4 sm:px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="section-shell glass-surface rounded-[2rem] border border-emerald-100/10 px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr_0.85fr]">
            <div className="space-y-5">
              <Logo size="lg" />
              <p className="max-w-md text-sm leading-7 text-slate-300 sm:text-base">
                Mint, collect, and trade rarity-based NFTs with a calmer on-chain
                experience built for MiniPay, mobile wallets, and fast Celo settlement.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-100/12 bg-emerald-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                  3 Rarity Tiers
                </span>
                <span className="rounded-full border border-cyan-100/12 bg-cyan-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  USDm Pricing
                </span>
                <span className="rounded-full border border-amber-100/12 bg-amber-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">
                  Mobile Ready
                </span>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Explore
              </h4>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>
                  <Link href="/" className="transition hover:text-emerald-100">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/mint" className="transition hover:text-emerald-100">
                    Mint NFT
                  </Link>
                </li>
                <li>
                  <Link href="/my-nfts" className="transition hover:text-emerald-100">
                    My Collection
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="transition hover:text-emerald-100">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition hover:text-emerald-100">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Ecosystem
              </h4>
              <div className="space-y-3">
                <a
                  href="https://github.com/phessophissy/cnMarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-card block rounded-3xl p-4 transition hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold text-white">Open-source codebase</p>
                  <p className="mt-1 text-sm text-slate-300">Review contracts, frontend, and MiniPay support on GitHub.</p>
                </a>
                <a
                  href="https://celoscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-card block rounded-3xl p-4 transition hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold text-white">Chain visibility</p>
                  <p className="mt-1 text-sm text-slate-300">Track transactions and verify on-chain activity on CeloScan.</p>
                </a>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/14 bg-emerald-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(180deg,var(--mint-0),var(--mint-2))] animate-pulse-dot" />
                Celo Mainnet Live
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-emerald-100/10 pt-6 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} cnMarket. Crafted for collectible-first trading on Celo.</p>
            <p className="mt-2 sm:mt-0">Fast UX, clear pricing, modern wallet support.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
