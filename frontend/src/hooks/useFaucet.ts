"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { erc20Abi } from "@/lib/abis";
import { USDM_ADDRESS } from "@/lib/config";
import { parseEther } from "viem";

export function useFaucet() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const claimFaucet = (toAddress: `0x${string}`) => {
    writeContract({
      address: USDM_ADDRESS,
      abi: erc20Abi,
      functionName: "mint",
      args: [toAddress, parseEther("100")], // Claim 100 USDm
    });
  };

  return { claimFaucet, hash, isPending, isConfirming, isSuccess, error, reset };
}
