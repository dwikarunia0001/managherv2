// src/components/Sidebar.js
import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'plan', label: 'Plan' },
    { id: 'sell', label: 'Sell' },
    { id: 'scale-up', label: 'Scale Up' },
  ];

  return (
    <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[#8B0000] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}