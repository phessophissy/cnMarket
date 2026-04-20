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
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-20 bg-gray-900 rounded-xl border border-red-800">
            <p className="text-5xl mb-4">⛔</p>
            <p className="text-red-400 font-medium">
              You don&apos;t own this NFT
            </p>
            <Link
              href="/my-nfts"
              className="text-gray-400 hover:text-white mt-4 inline-block text-sm"
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
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/my-nfts"
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block"
        >
          ← Back to My NFTs
        </Link>

        <h1 className="text-3xl font-bold mb-6">List NFT for Sale</h1>

        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <div
            className={`h-48 bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
          >
            <span className="text-6xl font-bold text-white/20">
              #{tokenId.toString()}
            </span>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                CNFT #{tokenId.toString()}
              </h2>
              <RarityBadge rarity={rarityNum} />
            </div>

            {!isApproved ? (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 text-sm">
                    <span className="text-yellow-400 font-medium">
                      Step 1:
                    </span>{" "}
                    Approve the marketplace contract to transfer this NFT on
                    your behalf.
                  </p>
                </div>
                <button
                  onClick={() => approve(tokenId)}
                  disabled={approvePending || approveConfirming}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
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
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 text-sm">
                    <span className="text-green-400 font-medium">
                      Step 2:
                    </span>{" "}
                    Set your listing price in CELO.
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Price (CELO)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.05"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
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
