"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS } from "@/lib/config";

/** Hook update 46-6 */
export function useListNFT() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const list = (tokenId: bigint, price: bigint) => {
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: marketplaceAbi,
      functionName: "listNFT",
      args: [tokenId, price],
    });
  };

  return { list, hash, isPending, isConfirming, isSuccess, error, reset };
}

export function useCancelListing() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const cancel = (tokenId: bigint) => {
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: marketplaceAbi,
      functionName: "cancelListing",
      args: [tokenId],
    });
  };

  return { cancel, hash, isPending, isConfirming, isSuccess, error, reset };
}

export function useBuyNFT() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const buy = (tokenId: bigint, price: bigint) => {
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: marketplaceAbi,
      functionName: "buyNFT",
      args: [tokenId],
      value: price,
    });
  };

  return { buy, hash, isPending, isConfirming, isSuccess, error, reset };
}

export function useGetListing(tokenId: bigint | undefined) {
  return useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getListing",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });
}

export function useActiveListingCount() {
  return useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getActiveListingCount",
  });
}

export function useActiveListingAt(index: bigint | undefined) {
  return useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getActiveListingAt",
    args: index !== undefined ? [index] : undefined,
    query: { enabled: index !== undefined },
  });
}
