"use client";

import { truncateAddress } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

interface AddressDisplayProps {
  address: string;
  truncate?: boolean;
  copyable?: boolean;
  className?: string;
}

/** Component update 41-7 */
export function AddressDisplay({
  address,
  truncate = true,
  copyable = true,
  className = "",
}: AddressDisplayProps) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-sm ${className}`}>
      <span>{truncate ? truncateAddress(address) : address}</span>
      {copyable && <CopyButton text={address} label="📋" />}
    </span>
  );
}
