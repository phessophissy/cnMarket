"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Modal } from "./Modal";
import { useFaucet } from "@/hooks/useFaucet";
import { isAddress } from "viem";

interface FaucetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FaucetModal({ isOpen, onClose }: FaucetModalProps) {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState("");
  const { claimFaucet, hash, isPending, isConfirming, isSuccess, error, reset } = useFaucet();

  useEffect(() => {
    if (address) {
      setRecipient(address);
    }
  }, [address, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddress(recipient)) {
      claimFaucet(recipient as `0x${string}`);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const isValid = isAddress(recipient);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="USDm Faucet">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Need funds to test minting or purchasing NFTs? Request 100 mock USDm tokens to your address below.
        </p>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-[1rem] border border-emerald-100/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-100/24 focus:ring-2 focus:ring-emerald-300/20"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-rose-100/14 bg-rose-400/10 p-3 text-xs text-rose-100">
            {(error as Error).message.slice(0, 150)}
          </div>
        )}

        {isSuccess && hash && (
          <div className="rounded-xl border border-emerald-100/14 bg-emerald-400/10 p-3 text-xs text-emerald-100 space-y-1">
            <p className="font-semibold">Transaction successful!</p>
            <p>100 USDm tokens have been sent.</p>
            <a
              href={`https://celoscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-emerald-200 hover:text-emerald-100 font-medium block mt-1"
            >
              View on CeloScan →
            </a>
          </div>
        )}

        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-full border border-emerald-100/10 bg-white/5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            {isSuccess ? "Done" : "Cancel"}
          </button>
          {!isSuccess && (
            <button
              type="submit"
              disabled={!isValid || isPending || isConfirming}
              className="button-shine flex-1 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 py-3 text-sm font-semibold text-[#07302f] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Confirming..." : isConfirming ? "Minting..." : "Claim 100 USDm"}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
