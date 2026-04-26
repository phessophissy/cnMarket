"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useAccount,
} from "wagmi";
import { erc20Abi, marketplaceAbi } from "@/lib/abis";
import { MARKETPLACE_ADDRESS, USDM_ADDRESS } from "@/lib/config";

/** Hook update 42-2 */
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
  const { address } = useAccount();
  const {
    writeContract: writeBuy,
    data: buyHash,
    isPending: isBuyPending,
    error: buyError,
    reset: resetBuy,
  } = useWriteContract();
  const {
    writeContract: writeApprove,
    data: approveHash,
    isPending: isApprovePending,
    error: approveError,
    reset: resetApprove,
  } = useWriteContract();

  const { isLoading: isBuyConfirming, isSuccess: isBuySuccess } = useWaitForTransactionReceipt({ hash: buyHash });
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: USDM_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, MARKETPLACE_ADDRESS] : undefined,
    query: { enabled: !!address },
  });

  const buy = (tokenId: bigint, price: bigint) => {
    writeBuy({
      address: MARKETPLACE_ADDRESS,
      abi: marketplaceAbi,
      functionName: "buyNFT",
      args: [tokenId],
    });
  };

  const approve = (amount: bigint) => {
    writeApprove({
      address: USDM_ADDRESS,
      abi: erc20Abi,
      functionName: "approve",
      args: [MARKETPLACE_ADDRESS, amount],
    });
  };

  return {
    buy,
    approve,
    allowance,
    refetchAllowance,
    buyHash,
    approveHash,
    isBuyPending,
    isApprovePending,
    isBuyConfirming,
    isApproveConfirming,
    isBuySuccess,
    isApproveSuccess,
    buyError,
    approveError,
    error: buyError || approveError,
    reset: () => {
      resetBuy();
      resetApprove();
    },
  };
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
