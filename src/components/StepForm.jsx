// src/components/StepForm.js
import React from 'react';

export default function StepForm({
  title,
  placeholder,
  value,
  onChange,
  onNext,
  isLast = false,
}) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
          placeholder={placeholder}
        />
        <div className="flex justify-end">
          <button
            onClick={onNext}
            disabled={!value.trim()}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
              value.trim()
                ? 'bg-[#8B0000] hover:bg-[#6b0000] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Selesai' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}