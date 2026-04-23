"use client";

import { useEffect } from "react";

type NotificationType = "success" | "error" | "loading";

interface NotificationProps {
  type: NotificationType;
  message: string;
  txHash?: string;
  onClose?: () => void;
}

/** Component update 50-3 */
export function Notification({
  type,
  message,
  txHash,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    if (type !== "loading" && onClose) {
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const styles = {
    success: "bg-green-900/90 border-green-700 text-green-100",
    error: "bg-red-900/90 border-red-700 text-red-100",
    loading: "bg-blue-900/90 border-blue-700 text-blue-100",
  }[type];

  const icon = {
    success: "✓",
    error: "✕",
    loading: "⟳",
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg border ${styles} shadow-xl z-50 backdrop-blur-sm`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`text-lg ${type === "loading" ? "animate-spin inline-block" : ""}`}
        >
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
          {txHash && (
            <a
              href={`https://celoscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block"
            >
              View on CeloScan →
            </a>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
