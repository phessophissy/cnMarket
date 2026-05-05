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
    error,
    refetchAllowance,
    mintHash,
    approveHash,
    isMintPending,
    isApprovePending,
    isMintConfirming,
    isApproveConfirming,
    isMintSuccess,
    isApproveSuccess,
    reset,
  } = useMintNFT(selectedRarity);

  const selectedColors = RARITY_COLORS[selectedRarity];
  const selectedLabel = RARITY_LABELS[selectedRarity];
  const selectedPrice = MINT_PRICE_DISPLAY[selectedRarity];

  const isBusy =
    isMintPending ||
    isApprovePending ||
    isMintConfirming ||
    isApproveConfirming;
  const mintDisabled = isBusy;

  const handleSuccess = () => {
    reset();
    refetchAllowance();
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <section className="section-shell glass-surface overflow-hidden rounded-[2rem] px-6 py-8 md:px-8 md:py-10">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-300/16 blur-3xl" />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <span className="eyebrow">Mint Experience</span>
              <div className="space-y-4">
                <h1
                  className="text-5xl font-semibold md:text-6xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Mint Your Next <span className="text-gradient">Drop</span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-200/85 md:text-lg">
                  Choose your rarity tier, approve USDm once, and mint directly on Celo with a cleaner wallet-first flow.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Common", value: "0.01 USDm" },
                  { label: "Rare", value: "0.03 USDm" },
                  { label: "Legendary", value: "0.05 USDm" },
                ].map((tier) => (
                  <div key={tier.label} className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{tier.label}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{tier.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="feature-card rounded-[1.85rem] p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Selected Tier</p>
              <div className={`mt-4 flex h-48 items-center justify-center rounded-[1.5rem] bg-gradient-to-br ${selectedColors.gradient}`}>
                <span className="text-5xl font-semibold text-white/35">{selectedLabel}</span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-white">{selectedLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Rarity determines the feel of the drop and the mint entry price.
                  </p>
                </div>
                <div className="rounded-[1.2rem] border border-emerald-100/10 bg-emerald-200/10 px-4 py-3 text-right">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Price</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-100">{selectedPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {!isConnected ? (
          <div className="section-shell glass-surface mt-8 rounded-[2rem] border border-emerald-100/10 px-6 py-20 text-center">
            <p className="mb-4 text-5xl">🔗</p>
            <p className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Connect your wallet to mint
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Your wallet unlocks pricing checks, USDm approval, and the on-chain mint flow for each rarity tier.
            </p>
          </div>
        ) : (
          <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {rarities.map((rarity) => {
              const colors = RARITY_COLORS[rarity];
              const isSelected = selectedRarity === rarity;

              return (
                <div
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`feature-card cursor-pointer overflow-hidden rounded-[1.7rem] transition-all ${
                    isSelected
                      ? `${colors.border} ring-2 ring-emerald-200/40 ring-offset-2 ring-offset-[#07151a]`
                      : "border-emerald-100/10 hover:border-emerald-100/22"
                  }`}
                >
                  <div
                    className={`flex h-44 items-center justify-center bg-gradient-to-br ${colors.gradient}`}
                  >
                    <span className="text-4xl font-bold text-white/35 md:text-[2.7rem]">
                      {RARITY_LABELS[rarity]}
                    </span>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                      <RarityBadge rarity={rarity} />
                      <span className="text-lg font-bold text-emerald-100">
                        {MINT_PRICE_DISPLAY[rarity]}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-slate-300">
                      {rarity === 0
                        ? "An accessible entry point with a clean, everyday rarity feel."
                        : rarity === 1
                          ? "A stronger collector tier for people hunting a narrower drop."
                          : "The premium mint with the most exclusive rarity profile."}
                    </p>

                    {isSelected && (
                      <div className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              approve();
                            }}
                            disabled={isBusy || !needsApproval}
                            className="button-shine rounded-full bg-gradient-to-r from-amber-300 to-yellow-300 py-3.5 font-semibold text-[#073631] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isApprovePending
                              ? "Confirm..."
                              : isApproveConfirming
                                ? "Approving..."
                                : needsApproval
                                  ? "Approve USDm"
                                  : "Approved"}
                          </button>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              mint();
                            }}
                            disabled={mintDisabled}
                            className="button-shine rounded-full bg-gradient-to-r from-emerald-300 to-teal-300 py-3.5 font-semibold text-[#073631] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isMintPending
                              ? "Confirm..."
                              : isMintConfirming
                                ? "Minting..."
                                : "Mint NFT"}
                          </button>
                        </div>
                        <p className="text-xs leading-6 text-slate-400">
                          {needsApproval
                            ? "You can tap Mint NFT after approval. If the chain has not indexed the approval yet, the app will tell you."
                            : "Approval is active. You can mint this NFT now."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
            <aside className="feature-card rounded-[1.8rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Mint Checklist</p>
              <div className="mt-5 space-y-4">
                {[
                  { step: "Choose rarity", desc: "Pick the tier that matches your preferred price and rarity profile." },
                  { step: "Approve USDm", desc: "Approve once for the selected mint amount if your wallet asks for it." },
                  { step: "Confirm mint", desc: "Mint on-chain and wait for confirmation to add the NFT to your collection." },
                ].map((item, index) => (
                  <div key={item.step} className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200/14 text-sm font-semibold text-emerald-100">
                        {index + 1}
                      </span>
                      <p className="text-base font-semibold text-white">{item.step}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>
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
