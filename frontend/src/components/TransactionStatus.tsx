"use client";

import { Spinner } from "./Spinner";

interface TransactionStatusProps {
  status: "pending" | "confirming" | "success" | "error";
  hash?: string;
  message?: string;
}

/** Component update 11-6 */
export function TransactionStatus({ status, hash, message }: TransactionStatusProps) {
  const statusConfig = {
    pending: {
      icon: <Spinner size="sm" />,
      text: "Confirm in your wallet...",
      color: "text-yellow-400",
    },
    confirming: {
      icon: <Spinner size="sm" />,
      text: "Transaction confirming...",
      color: "text-blue-400",
    },
    success: {
      icon: <span>✅</span>,
      text: message || "Transaction successful!",
      color: "text-green-400",
    },
    error: {
      icon: <span>❌</span>,
      text: message || "Transaction failed",
      color: "text-red-400",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
      {config.icon}
      <div>
        <p className={`font-medium ${config.color}`}>{config.text}</p>
        {hash && (
          <a
            href={`https://celoscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xs font-mono"
          >
            {hash.slice(0, 10)}...{hash.slice(-8)}
          </a>
        )}
      </div>
    </div>
  );
}
