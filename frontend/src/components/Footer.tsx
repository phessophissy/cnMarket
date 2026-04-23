"use client";

import Link from "next/link";

/** Component update 39-3 */
export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">🎨 cnMarket</h3>
            <p className="text-gray-400 text-sm">
              Mint and trade NFTs with 3 rarity levels on the Celo blockchain.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/mint" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  Mint NFT
                </Link>
              </li>
              <li>
                <Link href="/my-nfts" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
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
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://celoscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  CeloScan
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} cnMarket. Built on Celo.
          </p>
        </div>
      </div>
    </footer>
  );
}
