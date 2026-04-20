"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { RarityBadge } from "@/components/RarityBadge";
import { Notification } from "@/components/Notification";
import { useMintNFT } from "@/hooks/useNFT";
import {
  MINT_PRICE_DISPLAY,
  RARITY_LABELS,
  RARITY_COLORS,
} from "@/lib/config";

const rarities = [0, 1, 2] as const;

export default function MintPage() {
  const { isConnected } = useAccount();
  const { mint, hash, isPending, isConfirming, isSuccess, error, reset } =
    useMintNFT();
  const [selectedRarity, setSelectedRarity] = useState<0 | 1 | 2 | null>(null);

  const handleMint = (rarity: 0 | 1 | 2) => {
    setSelectedRarity(rarity);
    mint(rarity);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mint NFT</h1>
          <p className="text-gray-400 mt-1">
            Choose a rarity level and mint your unique NFT on Celo
          </p>
        </div>

        {!isConnected ? (
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
            <p className="text-5xl mb-4">🔗</p>
            <p className="text-gray-400">Connect your wallet to mint NFTs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rarities.map((rarity) => {
              const colors = RARITY_COLORS[rarity];
              const isActive =
                (isPending || isConfirming) && selectedRarity === rarity;

              return (
                <div
                  key={rarity}
                  className={`bg-gray-800 rounded-xl overflow-hidden border transition-all ${
                    isActive
                      ? `${colors.border} ring-2 ring-offset-2 ring-offset-gray-950`
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                  >
                    <span className="text-4xl font-bold text-white/30">
                      {RARITY_LABELS[rarity]}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <RarityBadge rarity={rarity} />
                      <span className="text-green-400 font-bold text-lg">
                        {MINT_PRICE_DISPLAY[rarity]} CELO
                      </span>
                    </div>
                    <button
                      onClick={() => handleMint(rarity)}
                      disabled={isPending || isConfirming}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      {isPending && selectedRarity === rarity
                        ? "Confirm in wallet..."
                        : isConfirming && selectedRarity === rarity
                          ? "Minting..."
                          : "Mint"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isSuccess && hash && (
          <Notification
            type="success"
            message="NFT minted successfully!"
            txHash={hash}
            onClose={reset}
          />
        )}
        {error && (
          <Notification
            type="error"
            message={(error as Error).message.slice(0, 120)}
            onClose={reset}
          />
        )}
      </main>
    </>
  );
}
