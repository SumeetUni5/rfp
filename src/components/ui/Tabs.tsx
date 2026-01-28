'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';

export interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onTabChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {activeTabData?.content}
      </div>
    </div>
  );
}
