import React from 'react';

export type TabOption = {
  id: string;
  label: string;
};

interface TabSelectorProps {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * A tab selector component for switching between views
 */
const TabSelector: React.FC<TabSelectorProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`py-3 px-6 font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary-dark'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSelector;