// src/components/PhaseCard.js
import React from 'react';

export default function PhaseCard({ title, subtitle, items, onOpen }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-lg text-gray-900">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <button
          onClick={onOpen}
          className="bg-[#8B0000] hover:bg-[#6b0000] text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Buka
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <ol className="list-decimal pl-5 space-y-1 text-gray-800">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}