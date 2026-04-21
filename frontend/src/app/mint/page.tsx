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
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-10 glass-surface rounded-3xl p-6 md:p-8">
          <h1 className="text-4xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            Mint Your Next Drop
          </h1>
          <p className="text-slate-200/85 mt-2">
            Choose a rarity level and mint your unique NFT on Celo
          </p>
        </div>

        {!isConnected ? (
          <div className="text-center py-20 glass-surface rounded-3xl border border-emerald-100/10">
            <p className="text-5xl mb-4">🔗</p>
            <p className="text-slate-300">Connect your wallet to mint NFTs</p>
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
                  className={`glass-surface rounded-2xl overflow-hidden border transition-all ${
                    isActive
                      ? `${colors.border} ring-2 ring-offset-2 ring-offset-[#071b22]`
                      : "border-emerald-100/10 hover:border-emerald-100/35"
                  }`}
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                  >
                    <span className="text-4xl font-bold text-white/35">
                      {RARITY_LABELS[rarity]}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <RarityBadge rarity={rarity} />
                      <span className="text-emerald-200 font-bold text-lg">
                        {MINT_PRICE_DISPLAY[rarity]} CELO
                      </span>
                    </div>
                    <button
                      onClick={() => handleMint(rarity)}
                      disabled={isPending || isConfirming}
                      className="w-full bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed text-[#073631] py-3 rounded-lg font-semibold transition"
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
