'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import { useState, useEffect } from 'react';

// Langkah-langkah pricing
const STEPS = [
  { key: 'materialCost', label: 'Biaya Bahan Baku' },
  { key: 'otherCost', label: 'Biaya Lain-Lain' },
  { key: 'sellingPrice', label: 'Harga Jual' },
];

const SIDEBAR_MENU = [
  { id: 'ide-bisnis', label: 'Ide bisnis' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'validasi', label: 'Validasi' },
  { id: 'bmc', label: 'BMC' },
];

export default function PricingPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData, deletePhaseData } =
    useProjectStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    materialCost: '',
    otherCost: '',
    sellingPrice: '',
  });

  useEffect(() => {
    setCurrentProject(projectId);
    const saved = getPhaseData(projectId, 'pricing') || {};
    setFormData({
      materialCost: saved.materialCost || '',
      otherCost: saved.otherCost || '',
      sellingPrice: saved.sellingPrice || '',
    });
  }, [projectId, setCurrentProject, getPhaseData]);

  const currentStep = STEPS[currentStepIndex];
  const currentValue = formData[currentStep.key];

  const handleChange = (value) => {
    setFormData((prev) => ({ ...prev, [currentStep.key]: value }));
  };

  const handleSave = () => {
    updatePhaseData(projectId, 'pricing', {
      [currentStep.key]: currentValue,
    });
  };

  const handleSaveCurrent = () => {
  updatePhaseData(projectId, 'pricing', {
    [currentStep.key]: currentValue,
  });
};

  const handleNext = () => {
    handleSaveCurrent();
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleFinish = () => {
    // Simpan SEMUA data, bukan hanya langkah terakhir
    updatePhaseData(projectId, 'pricing', {
      materialCost: formData.materialCost,
      otherCost: formData.otherCost,
      sellingPrice: formData.sellingPrice,
    });
    alert('✅ Data pricing berhasil disimpan!');
    // Opsional: redirect ke halaman berikutnya
    // router.push(`/dashboard/${projectId}/plan/brand`);
  };

  const handleEdit = () => {
    // Kembali ke langkah pertama untuk edit ulang
    setCurrentStepIndex(0);
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleSave();
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    if (confirm('Yakin ingin menghapus semua data pricing?')) {
      deletePhaseData(projectId, 'pricing');
      setFormData({
        materialCost: '',
        otherCost: '',
        sellingPrice: '',
      });
      setCurrentStepIndex(0);
    }
  };

  // Preview selalu tampil
  const previewItems = [
    { key: 'materialCost', label: 'Biaya Bahan Baku', value: formData.materialCost || '-' },
    { key: 'otherCost', label: 'Biaya Lain-Lain', value: formData.otherCost || '-' },
    { key: 'sellingPrice', label: 'Harga Jual', value: formData.sellingPrice || '-' },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] p-4 sm:p-6">
      {/* Header */}
      <header className="mb-8">
        <div
          className="p-5 font-sans"
          style={{
            borderStyle: 'solid',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderBottomWidth: '4px',
            borderRightWidth: '4px',
            borderColor: '#000000',
            boxShadow: '4px 4px 0 0 #000000',
            backgroundColor: '#ffffff',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#000000] font-sans">
                ManagHer / Mini Business Plan
              </h1>
              <p className="text-[#000000] text-sm font-sans font-light mt-1">
                Atur strategi harga bisnismu
              </p>
            </div>
            <button
              onClick={() => router.push(`/dashboard/${projectId}`)}
              className="bg-[#ffcccc] text-[#000000] px-4 py-2 font-semibold font-sans hover:bg-[#ffa8a8] transition-colors"
              style={{
                borderStyle: 'solid',
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                borderBottomWidth: '4px',
                borderRightWidth: '4px',
                borderColor: '#000000',
              }}
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar Navigasi Utama */}
        <div
          className="w-full lg:w-64"
          style={{
            backgroundColor: '#f0f0f0',
            borderStyle: 'solid',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderBottomWidth: '4px',
            borderRightWidth: '4px',
            borderColor: '#000000',
            boxShadow: '4px 4px 0 0 #000000',
          }}
        >
          <nav className="p-4 space-y-2">
            {SIDEBAR_MENU.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'ide-bisnis') {
                    router.push(`/dashboard/${projectId}/plan`);
                  } else {
                    router.push(`/dashboard/${projectId}/plan/${item.id}`);
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 font-medium transition-colors ${
                  item.id === 'pricing'
                    ? 'bg-[#b80000] text-white'
                    : 'text-[#000000] hover:bg-[#ffcccc]'
                }`}
                style={{ borderRadius: '0', textAlign: 'left' }}
              >
                <span>•</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Konten Utama: Gabungan Langkah + Input + Preview */}
        <div className="flex-1 space-y-6">
          {/* Card: Navigasi Langkah + Input Form */}
          <div
            className="font-sans"
            style={{
              backgroundColor: '#ffffff',
              borderStyle: 'solid',
              borderTopWidth: '1px',
              borderLeftWidth: '1px',
              borderBottomWidth: '4px',
              borderRightWidth: '4px',
              borderColor: '#000000',
              boxShadow: '4px 4px 0 0 #000000',
            }}
          >
            <div className="p-6">
              {/* Navigasi Langkah */}
              <div className="mb-6">
                <h3 className="font-bold text-[#000000] mb-3">Langkah Pricing</h3>
                <div className="flex flex-wrap gap-2">
                  {STEPS.map((step, index) => (
                    <button
                      key={step.key}
                      onClick={() => setCurrentStepIndex(index)}
                      className={`px-3 py-1 text-sm font-sans transition-colors ${
                        index === currentStepIndex
                          ? 'bg-[#b80000] text-white'
                          : 'bg-[#ffcccc] text-[#000000] hover:bg-[#ffa8a8]'
                      }`}
                      style={{ borderRadius: '0' }}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <div>
                <h2 className="text-xl font-bold text-[#000000] mb-4">{currentStep.label}</h2>
                <input
                  type="text"
                  value={currentValue ?? ''}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={`Contoh: Rp ${currentStep.key === 'materialCost' ? '10.000' : currentStep.key === 'otherCost' ? '5.000' : '30.000'}`}
                  className="w-full px-4 py-3 outline-none font-sans mb-6"
                  style={{
                    borderStyle: 'solid',
                    borderTopWidth: '1px',
                    borderLeftWidth: '1px',
                    borderBottomWidth: '4px',
                    borderRightWidth: '4px',
                    borderColor: '#000000',
                  }}
                />
                <div className="flex justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={currentStepIndex === 0}
                    className={`px-4 py-2 font-semibold font-sans ${
                      currentStepIndex === 0
                        ? 'bg-[#f0f0f0] text-[#333333] cursor-not-allowed'
                        : 'bg-[#ffcccc] text-[#000000] hover:bg-[#ffa8a8]'
                    }`}
                    style={{
                      borderStyle: 'solid',
                      borderTopWidth: '1px',
                      borderLeftWidth: '1px',
                      borderBottomWidth: '4px',
                      borderRightWidth: '4px',
                      borderColor: '#000000',
                      borderRadius: '0',
                    }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={currentStepIndex === STEPS.length - 1 ? handleFinish : handleNext}
                    className="bg-[#b80000] text-white px-4 py-2 font-semibold font-sans hover:bg-[#8B0000]"
                    style={{
                      borderStyle: 'solid',
                      borderTopWidth: '1px',
                      borderLeftWidth: '1px',
                      borderBottomWidth: '4px',
                      borderRightWidth: '4px',
                      borderColor: '#000000',
                      borderRadius: '0',
                    }}
                  >
                    {currentStepIndex === STEPS.length - 1 ? 'Selesai' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card Preview (di bawah) */}
          <div
            className="font-sans"
            style={{
              backgroundColor: '#ffffff',
              borderStyle: 'solid',
              borderTopWidth: '1px',
              borderLeftWidth: '1px',
              borderBottomWidth: '4px',
              borderRightWidth: '4px',
              borderColor: '#000000',
              boxShadow: '4px 4px 0 0 #000000',
            }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#000000] mb-4">Preview Pricing</h3>
              <ul className="space-y-2 mb-6">
                {previewItems.map((item) => (
                  <li
                    key={item.key}
                    className="flex justify-between py-1 font-sans"
                    style={{ borderBottom: '1px solid #e5e5e5' }}
                  >
                    <span className="text-[#000000] text-sm font-sans font-light">{item.label}</span>
                    <span className="text-[#000000] text-sm font-sans font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-[#ffcccc] text-[#000000] px-3 py-2 font-semibold font-sans hover:bg-[#ffa8a8]"
                  style={{
                    borderStyle: 'solid',
                    borderTopWidth: '1px',
                    borderLeftWidth: '1px',
                    borderBottomWidth: '4px',
                    borderRightWidth: '4px',
                    borderColor: '#000000',
                    borderRadius: '0',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}