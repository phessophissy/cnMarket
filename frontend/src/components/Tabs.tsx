"use client";

import { useState, type ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
}

/** Component update 22-3 */
export function Tabs({ tabs, defaultIndex = 0 }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div>
      <div className="flex border-b border-gray-800 mb-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              i === activeIndex
                ? "border-green-500 text-green-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeIndex]?.content}</div>
    </div>
  );
}
