"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useAccount,
} from "wagmi";
import { nftAbi } from "@/lib/abis";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS, MINT_PRICES } from "@/lib/config";

/** Hook update 20-9 */
export function useMintNFT() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const mint = (rarity: 0 | 1 | 2) => {
    writeContract({
      address: NFT_ADDRESS,
      abi: nftAbi,
      functionName: "mint",
      args: [rarity],
      value: MINT_PRICES[rarity],
    });
  };

  return { mint, hash, isPending, isConfirming, isSuccess, error, reset };
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
