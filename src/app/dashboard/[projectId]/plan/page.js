'use client';

import { use } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';

// Langkah-langkah ide bisnis
const STEPS = [
  { key: 'idea', label: 'Ide Bisnis' },
  { key: 'type', label: 'Jenis Bisnis' },
  { key: 'target', label: 'Target Pasar' },
  { key: 'product', label: 'Produk' },
  { key: 'capital', label: 'Modal' },
];

const SIDEBAR_MENU = [
  { id: 'ide-bisnis', label: 'Ide bisnis' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'validasi', label: 'Validasi' },
  { id: 'bmc', label: 'BMC' },
];

const PLACEHOLDERS = {
  idea: 'Contoh: Kafe dengan konsep vintage',
  type: 'Contoh: F&B / Retail / Jasa',
  target: 'Contoh: Mahasiswa, ibu rumah tangga, profesional muda',
  product: 'Contoh: Kopi, kue, merchandise',
  capital: 'Contoh: Rp 5.000.000',
};

export default function PlanPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData, deletePhaseData } =
    useProjectStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    idea: '',
    type: '',
    target: '',
    product: '',
    capital: '',
  });

  useEffect(() => {
    setCurrentProject(projectId);
    const saved = getPhaseData(projectId, 'businessIdea') || {};
    setFormData({
      idea: saved.idea || '',
      type: saved.type || '',
      target: saved.target || '',
      product: saved.product || '',
      capital: saved.capital || '',
    });
  }, [projectId, setCurrentProject, getPhaseData]);

  const currentStep = STEPS[currentStepIndex];
  const currentValue = formData[currentStep.key];

  const handleChange = (value) => {
    setFormData((prev) => ({ ...prev, [currentStep.key]: value }));
  };

  const handleSaveCurrent = () => {
    updatePhaseData(projectId, 'businessIdea', {
      [currentStep.key]: currentValue,
    });
  };

  const handleNext = () => {
    if (!currentValue.trim()) {
      alert('Harap isi field terlebih dahulu.');
      return;
    }
    handleSaveCurrent();
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleSaveCurrent();
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleFinish = () => {
    if (!currentValue.trim()) {
      alert('Harap isi field terlebih dahulu.');
      return;
    }
    // Simpan semua data
    updatePhaseData(projectId, 'businessIdea', {
      idea: formData.idea,
      type: formData.type,
      target: formData.target,
      product: formData.product,
      capital: formData.capital,
    });
    alert('✅ Ide bisnis berhasil disimpan!');
  };

  const handleReset = () => {
    if (confirm('Yakin ingin menghapus semua data ide bisnis?')) {
      deletePhaseData(projectId, 'businessIdea');
      setFormData({
        idea: '',
        type: '',
        target: '',
        product: '',
        capital: '',
      });
      setCurrentStepIndex(0);
    }
  };

  const handleEdit = () => {
    setCurrentStepIndex(0);
  };

  // Preview selalu tampil
  const previewItems = [
    { key: 'idea', label: 'Ide Bisnis', value: formData.idea || '-' },
    { key: 'type', label: 'Jenis Bisnis', value: formData.type || '-' },
    { key: 'target', label: 'Target Pasar', value: formData.target || '-' },
    { key: 'product', label: 'Produk', value: formData.product || '-' },
    { key: 'capital', label: 'Modal', value: formData.capital || '-' },
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
                Bangun fondasi bisnismu langkah demi langkah
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
                  router.push(`/dashboard/${projectId}/plan/${item.id}`);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 font-medium transition-colors ${
                  item.id === 'ide-bisnis'
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

        {/* Konten Utama */}
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
                <h3 className="font-bold text-[#000000] mb-3">Langkah Ide Bisnis</h3>
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
                  placeholder={PLACEHOLDERS[currentStep.key]}
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

          {/* Preview Card */}
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
              <h3 className="text-xl font-bold text-[#000000] mb-4">Preview Ide Bisnis</h3>
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
                  onClick={handleEdit}
                  className="flex-1 bg-[#b80000] text-white px-3 py-2 font-semibold font-sans hover:bg-[#8B0000]"
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
                  Edit
                </button>
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