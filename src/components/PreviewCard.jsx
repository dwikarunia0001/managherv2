// src/components/PreviewCard.js
import React from 'react';

export default function PreviewCard({ title, items }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
      <h3 className="font-bold text-lg text-gray-800 mb-4">{title}</h3>
      {items.length === 0 || items.every(item => !item.value || item.value === '-') ? (
        <p className="text-gray-500 italic">Belum ada data yang diisi.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}