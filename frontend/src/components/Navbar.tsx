"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";

/** Component update 43-1 */
export function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) {
      setIsMiniPay(true);
      const connector = connectors.find((c) => c.id === "injected");
      if (connector) connect({ connector });
    }
  }, [connect, connectors]);

  const handleConnect = () => {
    const inj = connectors.find((c) => c.id === "injected");
    const wc = connectors.find((c) => c.id === "walletConnect");
    const connector = inj || wc;
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
    <nav aria-label="Main navigation" className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white font-bold text-xl">
              🎨 CeloNFT
            </Link>
            {isMiniPay && (
              <span className="hidden sm:inline text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                MiniPay
              </span>
            )}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline text-gray-400 text-sm bg-gray-800 px-3 py-1.5 rounded-lg font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                {!isMiniPay && (
                  <button onClick={() => disconnect()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Disconnect
                  </button>
                )}
              </div>
            ) : (
              !isMiniPay && (
                <button onClick={handleConnect}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Connect Wallet
                </button>
              )
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-400 hover:text-white p-2" aria-label="Toggle mobile menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden py-2 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg text-sm"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
