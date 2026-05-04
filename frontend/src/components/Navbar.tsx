"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";
import { getInjectedConnector, getPreferredConnector } from "@/lib/connectors";

/** Component update 47-5 */
export function Navbar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMiniPay, setIsMiniPay] = useState(false);

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
      className="sticky top-0 z-40 border-b border-emerald-300/15 bg-[#081d25]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-white font-bold text-xl tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              cnMarket
            </Link>
            {isMiniPay && (
              <span className="hidden sm:inline text-xs bg-amber-300/20 text-amber-100 px-2 py-0.5 rounded-full border border-amber-200/20">
                MiniPay
              </span>
            )}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-emerald-100 bg-emerald-200/15 border border-emerald-200/25"
                      : "text-slate-300 hover:text-emerald-50 hover:bg-emerald-200/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-emerald-50 text-sm bg-emerald-200/10 border border-emerald-100/20 px-3 py-1.5 rounded-lg font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                {!isMiniPay && (
                  <button
                    onClick={() => disconnect()}
                    className="bg-rose-400/20 border border-rose-200/20 hover:bg-rose-400/30 text-rose-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#07302f] px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                {isMiniPay ? "Connect MiniPay" : "Connect Wallet"}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-slate-300 hover:text-emerald-100 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden py-2 space-y-1 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  pathname === link.href
                    ? "text-emerald-50 bg-emerald-200/15"
                    : "text-slate-300 hover:text-emerald-50 hover:bg-emerald-200/10"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
