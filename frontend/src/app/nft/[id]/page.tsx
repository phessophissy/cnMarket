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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block"
        >
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`h-72 md:h-96 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
          >
            <span className="text-8xl font-bold text-white/20">
              #{tokenId.toString()}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                CNFT #{tokenId.toString()}
              </h1>
              <div className="mt-2">
                <RarityBadge rarity={rarityNum} />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Owner</span>
                <span className="text-white font-mono text-sm">
                  {ownerStr
                    ? `${ownerStr.slice(0, 6)}...${ownerStr.slice(-4)}`
                    : "..."}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rarity</span>
                <span className="text-white">{RARITY_LABELS[rarityNum]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Token ID</span>
                <span className="text-white">{tokenId.toString()}</span>
              </div>
              {isListed && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Listed Price</span>
                  <span className="text-green-400 font-bold">
                    {formatEther(listingPrice)} USDm
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
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
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
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
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
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
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  List for Sale
                </Link>
              )}

              {!address && (
                <p className="text-center text-gray-500 text-sm">
                  Connect wallet to interact
                </p>
              )}
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
