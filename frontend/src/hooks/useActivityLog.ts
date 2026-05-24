"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

export interface ActivityItem {
  id: string;
  action: "Mint" | "List" | "Buy" | "Cancel";
  tokenId: string;
  price?: string; // represented in ether units (e.g. 0.01)
  txHash?: string;
  timestamp: number;
  status: "pending" | "success" | "error";
}

export function useActivityLog() {
  const [activities, setActivities] = useLocalStorage<ActivityItem[]>("cnmarket_activities", []);

  const addActivity = useCallback((activity: Omit<ActivityItem, "id" | "timestamp">) => {
    const newItem: ActivityItem = {
      ...activity,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Math.floor(Date.now() / 1000),
    };
    setActivities((prev) => [newItem, ...prev]);
  }, [setActivities]);

  const updateActivityStatus = useCallback((txHash: string, status: "success" | "error") => {
    setActivities((prev) =>
      prev.map((item) => (item.txHash === txHash ? { ...item, status } : item))
    );
  }, [setActivities]);

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, [setActivities]);

  return {
    activities,
    addActivity,
    updateActivityStatus,
    clearActivities,
  };
}
