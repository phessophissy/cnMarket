"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

/** Component update 13-1 */
export function CopyButton({ text, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-gray-400 hover:text-white transition-colors text-sm ${className}`}
      title="Copy to clipboard"
    >
      {copied ? "✓ Copied!" : label || "Copy"}
    </button>
  );
}
