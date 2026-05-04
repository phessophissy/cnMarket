"use client";

import { useEffect, useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useAccount,
} from "wagmi";
import { nftAbi, erc20Abi } from "@/lib/abis";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS, MINT_PRICES, USDM_ADDRESS } from "@/lib/config";

/** Hook update 40-7 */
export function useMintNFT(rarity: 0 | 1 | 2) {
  const { address } = useAccount();
  const [locallyApprovedAmount, setLocallyApprovedAmount] = useState<bigint>(0n);
  const { writeContract: writeMint, data: mintHash, isPending: isMintPending, error: mintError, reset: resetMint } = useWriteContract();
  const { writeContract: writeApprove, data: approveHash, isPending: isApprovePending, error: approveError, reset: resetApprove } = useWriteContract();

  const { isLoading: isMintConfirming, isSuccess: isMintSuccess } = useWaitForTransactionReceipt({ hash: mintHash });
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: USDM_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, NFT_ADDRESS] : undefined,
    query: { enabled: !!address },
  });

  const price = MINT_PRICES[rarity];
  const hasAllowance = allowance !== undefined && allowance >= price;
  const hasLocalApproval = locallyApprovedAmount >= price;
  const needsApproval = !(hasAllowance || hasLocalApproval);

  useEffect(() => {
    if (isApproveSuccess) {
      setLocallyApprovedAmount(price);
      refetchAllowance();
    }
  }, [isApproveSuccess, price, refetchAllowance]);

  useEffect(() => {
    if (isMintSuccess) {
      setLocallyApprovedAmount(0n);
      refetchAllowance();
    }
  }, [isMintSuccess, refetchAllowance]);

  const approve = () => {
    writeApprove({
      address: USDM_ADDRESS,
      abi: erc20Abi,
      functionName: "approve",
      args: [NFT_ADDRESS, price],
    });
  };

  const mint = () => {
    writeMint({
      address: NFT_ADDRESS,
      abi: nftAbi,
      functionName: "mint",
      args: [rarity],
    });
  };

  const reset = () => {
    setLocallyApprovedAmount(0n);
    resetMint();
    resetApprove();
  };

  return {
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
    error: mintError || approveError,
    reset,
  };
}

export function useApproveNFT() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = (tokenId: bigint) => {
    writeContract({
      address: NFT_ADDRESS,
      abi: nftAbi,
      functionName: "approve",
      args: [MARKETPLACE_ADDRESS, tokenId],
    });
  };

  return { approve, hash, isPending, isConfirming, isSuccess, error, reset };
}

export function useTokenRarity(tokenId: bigint | undefined) {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "tokenRarity",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });
}

export function useTokenOwner(tokenId: bigint | undefined) {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "ownerOf",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });
}

export function useUserNFTBalance() {
  const { address } = useAccount();
  return useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
}

export function useUserTokenByIndex(ownerAddress: string | undefined, index: bigint) {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "tokenOfOwnerByIndex",
    args: ownerAddress ? [ownerAddress as `0x${string}`, index] : undefined,
    query: { enabled: !!ownerAddress },
  });
}

export function useTotalSupply() {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "totalSupply",
  });
}

export function useGetApproved(tokenId: bigint | undefined) {
  return useReadContract({
    address: NFT_ADDRESS,
    abi: nftAbi,
    functionName: "getApproved",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });
}
