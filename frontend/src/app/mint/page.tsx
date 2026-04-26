"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { RarityBadge } from "@/components/RarityBadge";
import { Notification } from "@/components/Notification";
import { useMintNFT } from "@/hooks/useNFT";
import {
  MINT_PRICE_DISPLAY,
  RARITY_COLORS,
  RARITY_LABELS,
} from "@/lib/config";

const rarities = [0, 1, 2] as const;

export default function MintPage() {
  const { isConnected } = useAccount();
  const [selectedRarity, setSelectedRarity] = useState<0 | 1 | 2>(0);

  const {
    mint,
    approve,
    needsApproval,
    refetchAllowance,
    mintHash,
    approveHash,
    isMintPending,
    isApprovePending,
    isMintConfirming,
    isApproveConfirming,
    isMintSuccess,
    isApproveSuccess,
    mintError,
    approveError,
    reset,
  } = useMintNFT(selectedRarity);

  const isBusy =
    isMintPending ||
    isApprovePending ||
    isMintConfirming ||
    isApproveConfirming;

  const handleSuccess = () => {
    reset();
    refetchAllowance();
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-10 glass-surface rounded-3xl p-6 md:p-8">
          <h1
            className="text-4xl font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mint Your Next Drop
          </h1>
          <p className="text-slate-200/85 mt-2">
            Choose a rarity level and mint your unique NFT on Celo using USDm
          </p>
        </div>

        {!isConnected ? (
          <div className="text-center py-20 glass-surface rounded-3xl border border-emerald-100/10">
            <p className="text-5xl mb-4">🔗</p>
            <p className="text-slate-300">Connect your wallet to mint NFTs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {rarities.map((rarity) => {
              const colors = RARITY_COLORS[rarity];
              const isSelected = selectedRarity === rarity;

              return (
                <div
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`glass-surface cursor-pointer overflow-hidden rounded-2xl border transition-all ${
                    isSelected
                      ? `${colors.border} ring-2 ring-offset-2 ring-offset-[#071b22]`
                      : "border-emerald-100/10 hover:border-emerald-100/35"
                  }`}
                >
                  <div
                    className={`flex h-40 items-center justify-center bg-gradient-to-br ${colors.gradient}`}
                  >
                    <span className="text-4xl font-bold text-white/35">
                      {RARITY_LABELS[rarity]}
                    </span>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                      <RarityBadge rarity={rarity} />
                      <span className="text-lg font-bold text-emerald-200">
                        {MINT_PRICE_DISPLAY[rarity]}
                      </span>
                    </div>

                    {isSelected && (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          if (needsApproval) {
                            approve();
                            return;
                          }
                          mint();
                        }}
                        disabled={isBusy}
                        className={`w-full rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          needsApproval
                            ? "bg-gradient-to-r from-amber-300 to-yellow-300 text-[#073631] hover:brightness-105"
                            : "bg-gradient-to-r from-emerald-300 to-teal-300 text-[#073631] hover:brightness-105"
                        }`}
                      >
                        {needsApproval
                          ? isApprovePending
                            ? "Confirm in wallet..."
                            : isApproveConfirming
                              ? "Approving..."
                              : "Approve USDm"
                          : isMintPending
                            ? "Confirm in wallet..."
                            : isMintConfirming
                              ? "Minting..."
                              : "Mint"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isMintSuccess && (
          <Notification
            type="success"
            message="NFT minted successfully!"
            txHash={mintHash}
            onClose={handleSuccess}
          />
        )}

        {isApproveSuccess && (
          <Notification
            type="success"
            message="USDm approved. You can mint now."
            txHash={approveHash}
            onClose={handleSuccess}
          />
        )}

        {(mintError || approveError) && (
          <Notification
            type="error"
            message={((mintError || approveError) as Error).message.slice(0, 120)}
            onClose={reset}
          />
        )}
      </main>
    </>
  );
}
