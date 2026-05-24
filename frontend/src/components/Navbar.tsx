"use client";

import { usePathname } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";
import { getInjectedConnector, getPreferredConnector } from "@/lib/connectors";
import { Logo } from "./Logo";
import Link from "next/link";
import { FaucetModal } from "./FaucetModal";


/** Component update 47-5 */
export function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [isFaucetOpen, setIsFaucetOpen] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) {
      setIsMiniPay(true);
      const connector = getInjectedConnector(connectors);
      if (connector) connect({ connector });
    }
  }, [connect, connectors]);

  const handleConnect = () => {
    const connector = getPreferredConnector(connectors);
    if (connector) connect({ connector });
  };

  const navLinks = [
    { href: "/", label: "Marketplace" },
    { href: "/mint", label: "Mint" },
    { href: "/my-nfts", label: "My NFTs" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-40 px-3 pt-3 sm:px-4 md:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="section-shell glass-surface border border-emerald-100/10 px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 lg:gap-8">
              <Logo />
              <div className="hidden xl:flex items-center gap-3 rounded-full border border-white/6 bg-white/5 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                <span className="h-2 w-2 rounded-full bg-[linear-gradient(180deg,var(--mint-0),var(--mint-2))] animate-pulse-dot" />
                Live on Celo
              </div>
              <div className="hidden md:flex items-center gap-1 rounded-full border border-emerald-100/10 bg-[#071a20]/70 p-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      pathname === link.href
                        ? "bg-gradient-to-r from-emerald-300 to-teal-300 text-[#062f2d] shadow-[0_8px_20px_rgba(103,240,191,0.18)]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {isMiniPay && (
                <span className="hidden sm:inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-100">
                  MiniPay
                </span>
              )}
              <button
                onClick={() => setIsFaucetOpen(true)}
                className="hidden md:inline-flex rounded-full border border-emerald-100/14 bg-emerald-200/10 px-3.5 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-200/20"
              >
                Faucet
              </button>
              {isConnected ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-full border border-emerald-100/14 bg-emerald-200/10 px-3.5 py-1.5 text-xs font-mono text-emerald-50 md:text-sm md:px-4 md:py-2">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                  {!isMiniPay && (
                    <button
                      onClick={() => disconnect()}
                      className="hidden md:inline-flex rounded-full border border-rose-200/18 bg-rose-400/12 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/18"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="button-shine rounded-full bg-gradient-to-r from-emerald-300 via-mint-200 to-teal-300 px-4 py-2.5 text-sm font-semibold text-[#07302f] transition hover:brightness-105 sm:px-5"
                >
                  {isMiniPay ? "Connect MiniPay" : "Connect Wallet"}
                </button>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden rounded-full border border-emerald-100/12 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div className="mt-4 animate-fade-in rounded-[1.6rem] border border-emerald-100/10 bg-[#071a20]/78 p-3 md:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mb-1 block rounded-2xl px-4 py-3 text-sm font-semibold transition-all last:mb-0 ${
                    pathname === link.href
                      ? "bg-gradient-to-r from-emerald-300 to-teal-300 text-[#062f2d]"
                      : "text-slate-200 hover:bg-white/6"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  setIsFaucetOpen(true);
                  setMobileOpen(false);
                }}
                className="mt-3 w-full rounded-2xl border border-emerald-100/14 bg-emerald-200/10 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-200/20"
              >
                Mock USDm Faucet
              </button>

              {isConnected && !isMiniPay && (
                <button
                  onClick={() => {
                    disconnect();
                    setMobileOpen(false);
                  }}
                  className="mt-2 w-full rounded-2xl border border-rose-200/18 bg-rose-400/12 py-2.5 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/18"
                >
                  Disconnect Wallet
                </button>
              )}

              <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-100/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>Chain</span>
                <span className="text-emerald-100">Celo Mainnet</span>
              </div>
            </div>
          )}

        </div>
      </div>
      <FaucetModal isOpen={isFaucetOpen} onClose={() => setIsFaucetOpen(false)} />
    </nav>
  );
}

