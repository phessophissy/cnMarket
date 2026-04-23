"use client";

import { truncateAddress } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

interface AddressDisplayProps {
  address: string;
  truncate?: boolean;
  copyable?: boolean;
  className?: string;
}

/** Component update 48-2 */
/** Component update 48-4 */
/** Component update 48-6 */
/** Component update 48-8 */
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
