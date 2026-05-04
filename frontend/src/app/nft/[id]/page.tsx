"use client";

import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { RarityBadge } from "@/components/RarityBadge";
import { Notification } from "@/components/Notification";
import { nftAbi, marketplaceAbi } from "@/lib/abis";
import {
  NFT_ADDRESS,
  MARKETPLACE_ADDRESS,
  RARITY_COLORS,
  RARITY_LABELS,
} from "@/lib/config";
import { useBuyNFT, useCancelListing } from "@/hooks/useMarketplace";

export default function NFTDetailPage() {
  const params = useParams();
  const tokenId = BigInt(params.id as string);
  const { address } = useAccount();

  const { data: owner } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "ownerOf",
    args: [tokenId],
  });

  const { data: rarity } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "tokenRarity",
    args: [tokenId],
  });

  const { data: listing } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getListing",
    args: [tokenId],
  });

  const {
    buy,
    approve,
    allowance,
    refetchAllowance,
    buyHash,
    approveHash,
    isBuyPending: buyPending,
    isApprovePending: approvePending,
    isBuyConfirming: buyConfirming,
    isApproveConfirming: approveConfirming,
    isBuySuccess: buySuccess,
    isApproveSuccess: approveSuccess,
    buyError,
    approveError,
    reset: buyReset,
  } = useBuyNFT();

  const {
    cancel,
    hash: cancelHash,
    isPending: cancelPending,
    isConfirming: cancelConfirming,
    isSuccess: cancelSuccess,
    error: cancelError,
    reset: cancelReset,
  } = useCancelListing();

  const rarityNum = (rarity ?? 0) as 0 | 1 | 2;
  const colors = RARITY_COLORS[rarityNum];
  const ownerStr = owner as string | undefined;
  const isOwner =
    address && ownerStr && address.toLowerCase() === ownerStr.toLowerCase();
  const isListed =
    listing &&
    listing[0] !== "0x0000000000000000000000000000000000000000";
  const isSeller =
    isListed &&
    address &&
    (listing[0] as string).toLowerCase() === address.toLowerCase();
  const listingPrice = listing?.[1] ?? 0n;
  const needsApproval = !allowance || allowance < listingPrice;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <Link
          href="/"
          className="mb-6 inline-flex rounded-full border border-emerald-100/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.92fr]">
          <div
            className={`section-shell glass-surface relative flex h-[22rem] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br ${colors.gradient} md:h-[34rem]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(to_bottom,transparent,rgba(2,8,10,0.36))]" />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/90">
              Rarity Showcase
            </div>
            <span className="absolute -bottom-10 -right-2 text-[10rem] font-semibold text-white/10">
              0{rarityNum + 1}
            </span>
            <span className="relative text-8xl font-bold text-white/22 md:text-[9rem]">
              #{tokenId.toString()}
            </span>
          </div>

          <div className="space-y-6">
            <div className="section-shell glass-surface rounded-[2rem] p-6 md:p-7">
              <span className="eyebrow">Asset Detail</span>
              <h1 className="mt-5 text-4xl font-semibold text-white md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
                CNFT #{tokenId.toString()}
              </h1>
              <div className="mt-4">
                <RarityBadge rarity={rarityNum} />
              </div>
              <p className="mt-5 text-sm leading-8 text-slate-300 md:text-base">
                Inspect ownership, listing status, and purchase controls for this collectible before you take action on-chain.
              </p>
            </div>

            <div className="feature-card rounded-[1.8rem] p-5">
              <div className="grid gap-3">
                <div className="flex justify-between gap-4 rounded-2xl border border-emerald-100/10 bg-white/5 px-4 py-3">
                  <span className="text-sm text-slate-400">Owner</span>
                  <span className="font-mono text-sm text-white">
                  {ownerStr
                    ? `${ownerStr.slice(0, 6)}...${ownerStr.slice(-4)}`
                    : "..."}
                  </span>
                </div>
                <div className="flex justify-between gap-4 rounded-2xl border border-emerald-100/10 bg-white/5 px-4 py-3">
                  <span className="text-sm text-slate-400">Rarity</span>
                  <span className="text-sm font-semibold text-white">{RARITY_LABELS[rarityNum]}</span>
                </div>
                <div className="flex justify-between gap-4 rounded-2xl border border-emerald-100/10 bg-white/5 px-4 py-3">
                  <span className="text-sm text-slate-400">Token ID</span>
                  <span className="text-sm font-semibold text-white">{tokenId.toString()}</span>
                </div>
                <div className="flex justify-between gap-4 rounded-2xl border border-emerald-100/10 bg-white/5 px-4 py-3">
                  <span className="text-sm text-slate-400">Market status</span>
                  <span className="text-sm font-semibold text-white">{isListed ? "Listed" : "Not listed"}</span>
                </div>
                {isListed && (
                  <div className="rounded-[1.4rem] border border-emerald-100/12 bg-gradient-to-r from-emerald-300/16 to-cyan-300/10 px-4 py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-300">Listed Price</span>
                      <span className="text-2xl font-semibold text-emerald-100">
                        {formatEther(listingPrice)} USDm
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="feature-card rounded-[1.8rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Actions</p>
              <div className="mt-5 space-y-3">
              {isListed && !isSeller && address && (
                <button
                  onClick={() => {
                    if (needsApproval) {
                      approve(listingPrice);
                      return;
                    }
                    buy(tokenId, listingPrice);
                  }}
                  disabled={buyPending || approvePending || buyConfirming || approveConfirming}
                  className="button-shine w-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 py-3.5 font-semibold text-[#062f2d] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {needsApproval
                    ? approvePending
                      ? "Confirm approval..."
                      : approveConfirming
                        ? "Approving USDm..."
                        : `Approve ${formatEther(listingPrice)} USDm`
                    : buyPending
                    ? "Confirm in wallet..."
                    : buyConfirming
                      ? "Processing..."
                      : `Buy for ${formatEther(listingPrice)} USDm`}
                </button>
              )}

              {isSeller && (
                <button
                  onClick={() => cancel(tokenId)}
                  disabled={cancelPending || cancelConfirming}
                  className="w-full rounded-full border border-rose-200/18 bg-rose-400/14 py-3.5 font-semibold text-rose-100 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cancelPending
                    ? "Confirm in wallet..."
                    : cancelConfirming
                      ? "Processing..."
                      : "Cancel Listing"}
                </button>
              )}

              {isOwner && !isListed && (
                <Link
                  href={`/list/${tokenId.toString()}`}
                  className="block w-full rounded-full border border-cyan-100/16 bg-cyan-300/12 py-3.5 text-center font-semibold text-cyan-100 transition hover:bg-cyan-300/18"
                >
                  List for Sale
                </Link>
              )}

              {!address && (
                <p className="text-center text-sm text-slate-400">
                  Connect wallet to interact
                </p>
              )}
            </div>
            </div>
          </div>
        </div>

        {buySuccess && buyHash && (
          <Notification
            type="success"
            message="NFT purchased successfully!"
            txHash={buyHash}
            onClose={() => {
              buyReset();
              refetchAllowance();
            }}
          />
        )}
        {approveSuccess && approveHash && (
          <Notification
            type="success"
            message="USDm approved. You can complete the purchase now."
            txHash={approveHash}
            onClose={() => {
              buyReset();
              refetchAllowance();
            }}
          />
        )}
        {buyError && (
          <Notification
            type="error"
            message={(buyError as Error).message.slice(0, 120)}
            onClose={buyReset}
          />
        )}
        {approveError && (
          <Notification
            type="error"
            message={(approveError as Error).message.slice(0, 120)}
            onClose={buyReset}
          />
        )}
        {cancelSuccess && cancelHash && (
          <Notification
            type="success"
            message="Listing cancelled!"
            txHash={cancelHash}
            onClose={cancelReset}
          />
        )}
        {cancelError && (
          <Notification
            type="error"
            message={(cancelError as Error).message.slice(0, 120)}
            onClose={cancelReset}
          />
        )}
      </main>
    </>
  );
}
