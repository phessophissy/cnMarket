"use client";

import Link from "next/link";

/** Component update 45-9 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-200/15 bg-[#081d25]/65 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="text-white font-bold text-xl mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              cnMarket
            </h3>
            <p className="text-slate-300 text-sm leading-6">
              Mint and trade NFTs with 3 rarity levels on the Celo blockchain.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-emerald-100 text-sm transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/mint" className="text-slate-300 hover:text-emerald-100 text-sm transition-colors">
                  Mint NFT
                </Link>
              </li>
              <li>
                <Link href="/my-nfts" className="text-slate-300 hover:text-emerald-100 text-sm transition-colors">
                  My Collection
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/phessophissy/cnMarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-100 text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://celoscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-100 text-sm transition-colors"
                >
                  CeloScan
                </a>
              </li>
            </ul>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-100 bg-emerald-200/10 border border-emerald-100/20 px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse-dot" />
              Celo Mainnet Live
            </div>
          </div>
        </div>
        <div className="border-t border-emerald-200/10 mt-8 pt-6 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} cnMarket. Built on Celo.
          </p>
        </div>
      </div>
    </footer>
  );
}
