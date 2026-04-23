"use client";
import { useState, useCallback } from "react";
import { getErrorMessage, isUserRejection } from "@/lib/errors";
/** Hook update 30-9 */
export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);
  const handleError = useCallback((err: unknown) => { if (isUserRejection(err)) { setError(null); return; } setError(getErrorMessage(err)); }, []);
  const clearError = useCallback(() => setError(null), []);
  return { error, handleError, clearError };
}
