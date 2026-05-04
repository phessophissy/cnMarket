"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { parseEther } from "viem";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { RarityBadge } from "@/components/RarityBadge";
import { Notification } from "@/components/Notification";
import { nftAbi } from "@/lib/abis";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS, RARITY_COLORS } from "@/lib/config";
import { useApproveNFT } from "@/hooks/useNFT";
import { useListNFT } from "@/hooks/useMarketplace";

export default function ListNFTPage() {
  const params = useParams();
  const router = useRouter();
  const tokenId = BigInt(params.id as string);
  const { address } = useAccount();
  const [price, setPrice] = useState("");
  const [localApproved, setLocalApproved] = useState(false);

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

  const { data: approved } = useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "getApproved",
    args: [tokenId],
  });

  const {
    approve,
    isPending: approvePending,
    isConfirming: approveConfirming,
    isSuccess: approveSuccess,
    error: approveError,
    reset: approveReset,
  } = useApproveNFT();

  const {
    list,
    hash: listHash,
    isPending: listPending,
    isConfirming: listConfirming,
    isSuccess: listSuccess,
    error: listError,
    reset: listReset,
  } = useListNFT();

  useEffect(() => {
    if (approveSuccess) setLocalApproved(true);
  }, [approveSuccess]);

  useEffect(() => {
    if (listSuccess) {
      const timer = setTimeout(() => router.push("/my-nfts"), 2000);
      return () => clearTimeout(timer);
    }
  }, [listSuccess, router]);

  const rarityNum = (rarity ?? 0) as 0 | 1 | 2;
  const colors = RARITY_COLORS[rarityNum];
  const ownerStr = owner as string | undefined;
  const isOwner =
    address && ownerStr && address.toLowerCase() === ownerStr.toLowerCase();
  const isApproved =
    localApproved ||
    (approved &&
      (approved as string).toLowerCase() === MARKETPLACE_ADDRESS.toLowerCase());

  if (ownerStr && !isOwner) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-8 md:py-10">
          <div className="section-shell glass-surface rounded-[2rem] border border-rose-200/16 px-6 py-20 text-center">
            <p className="mb-4 text-5xl">⛔</p>
            <p className="text-2xl font-semibold text-rose-100" style={{ fontFamily: "var(--font-heading)" }}>
              You don&apos;t own this NFT
            </p>
            <Link
              href="/my-nfts"
              className="mt-5 inline-flex rounded-full border border-rose-200/16 bg-rose-400/10 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-400/16"
            >
              ← Back to My NFTs
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-10">
        <Link
          href="/my-nfts"
          className="mb-6 inline-flex rounded-full border border-emerald-100/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Back to My NFTs
        </Link>

        <div className="mb-8 section-shell glass-surface rounded-[2rem] px-6 py-8 md:px-8">
          <span className="eyebrow">Listing Flow</span>
          <h1 className="mt-4 text-5xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            List NFT for Sale
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
            Prepare the asset for market, approve transfer rights once, then set a USDm price that feels right for your rarity tier.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="feature-card overflow-hidden rounded-[1.8rem]">
          <div
            className={`flex h-64 items-center justify-center bg-gradient-to-br ${colors.gradient}`}
          >
            <span className="text-7xl font-bold text-white/20">
              #{tokenId.toString()}
            </span>
          </div>

            <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                CNFT #{tokenId.toString()}
              </h2>
              <RarityBadge rarity={rarityNum} />
            </div>
            <div className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
              <p className="text-sm leading-7 text-slate-300">
                Listing keeps custody logic on-chain while letting buyers discover this NFT directly from the marketplace feed.
              </p>
            </div>

            {!isApproved ? (
              <div className="space-y-4">
                <div className="rounded-[1.4rem] border border-amber-100/14 bg-amber-200/10 p-4">
                  <p className="text-sm leading-7 text-slate-200">
                    <span className="font-medium text-amber-100">
                      Step 1:
                    </span>{" "}
                    Approve the marketplace contract to transfer this NFT on
                    your behalf.
                  </p>
                </div>
                <button
                  onClick={() => approve(tokenId)}
                  disabled={approvePending || approveConfirming}
                  className="button-shine w-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 py-3.5 font-semibold text-[#063433] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {approvePending
                    ? "Confirm in wallet..."
                    : approveConfirming
                      ? "Approving..."
                      : "Approve Marketplace"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-[1.4rem] border border-emerald-100/14 bg-emerald-200/10 p-4">
                  <p className="text-sm leading-7 text-slate-200">
                    <span className="font-medium text-emerald-100">
                      Step 2:
                    </span>{" "}
                    Set your listing price in USDm.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Price (USDm)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.05"
                    className="w-full rounded-[1.2rem] border border-emerald-100/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-emerald-100/24 focus:ring-2 focus:ring-emerald-300/20"
                  />
                </div>
                <button
                  onClick={() => {
                    if (price && parseFloat(price) > 0) {
                      list(tokenId, parseEther(price));
                    }
                  }}
                  disabled={
                    listPending ||
                    listConfirming ||
                    !price ||
                    parseFloat(price) <= 0
                  }
                  className="button-shine w-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 py-3.5 font-semibold text-[#062f2e] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {listPending
                    ? "Confirm in wallet..."
                    : listConfirming
                      ? "Listing..."
                      : "List for Sale"}
                </button>
              </div>
            )}
            </div>
          </div>

          <aside className="feature-card rounded-[1.8rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Seller Notes</p>
            <div className="mt-5 space-y-4">
              {[
                "Approval only grants the marketplace permission to move this NFT during a sale.",
                "Pricing is entered in USDm for more stable collector-facing value.",
                "After listing, your NFT will become visible on the live marketplace feed.",
              ].map((item, index) => (
                <div key={item} className="rounded-[1.4rem] border border-emerald-100/10 bg-white/5 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Tip {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {approveSuccess && (
          <Notification
            type="success"
            message="Marketplace approved! Now set your price."
            onClose={approveReset}
          />
        )}
        {approveError && (
          <Notification
            type="error"
            message={(approveError as Error).message.slice(0, 120)}
            onClose={approveReset}
          />
        )}
        {listSuccess && listHash && (
          <Notification
            type="success"
            message="NFT listed for sale! Redirecting..."
            txHash={listHash}
            onClose={listReset}
          />
        )}
        {listError && (
          <Notification
            type="error"
            message={(listError as Error).message.slice(0, 120)}
            onClose={listReset}
          />
        )}
      </main>
    </>
  );
}
