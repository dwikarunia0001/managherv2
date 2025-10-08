'use client';

import { use } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import StepForm from '@/components/StepForm';
import PreviewCard from '@/components/PreviewCard';

// Langkah-langkah ide bisnis
const STEPS = [
  {
    key: 'idea',
    title: 'Masukkan ide bisnis',
    placeholder: 'Contoh: Kafe dengan konsep vintage',
  },
  {
    key: 'type',
    title: 'Masukkan jenis bisnis',
    placeholder: 'Contoh: F&B / Retail / Jasa',
  },
  {
    key: 'target',
    title: 'Masukkan target pasar',
    placeholder: 'Contoh: Mahasiswa, ibu rumah tangga, profesional muda',
  },
  {
    key: 'product',
    title: 'Produk yang akan dijual',
    placeholder: 'Contoh: Kopi, kue, merchandise',
  },
  {
    key: 'capital',
    title: 'Modal yang dibutuhkan',
    placeholder: 'Contoh: Rp 5.000.000',
  },
];

// Sidebar menu (statis)
const SIDEBAR_MENU = [
  { id: 'ide-bisnis', label: 'Ide bisnis' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'validasi', label: 'Validasi' },
  { id: 'bmc', label: 'BMC' },
];

export default function PlanPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData } =
    useProjectStore();

  const [currentStep, setCurrentStep] = useState(0);
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
    if (Object.keys(saved).length > 0) {
      setFormData(saved);
      const filledSteps = STEPS.filter((step) => saved[step.key]);
      if (filledSteps.length > 0) {
        setCurrentStep(filledSteps.length < STEPS.length ? filledSteps.length : STEPS.length - 1);
      }
    }
  }, [projectId, setCurrentProject, getPhaseData]);

  const handleNext = () => {
    const currentKey = STEPS[currentStep].key;
    const currentValue = formData[currentKey];

    if (!currentValue.trim()) {
      alert('Harap isi field terlebih dahulu.');
      return;
    }

    updatePhaseData(projectId, 'businessIdea', {
      [currentKey]: currentValue,
    });

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('✅ Ide bisnis berhasil disimpan!');
    }
  };

  const handleChange = (value) => {
    const currentKey = STEPS[currentStep].key;
    setFormData((prev) => ({ ...prev, [currentKey]: value }));
  };

  const current = STEPS[currentStep];

  const businessIdeaData = getPhaseData(projectId, 'businessIdea');
  const previewItems = [
    { label: 'Ide Bisnis', value: businessIdeaData.idea || '-' },
    { label: 'Jenis Bisnis', value: businessIdeaData.type || '-' },
    { label: 'Target Pasar', value: businessIdeaData.target || '-' },
    { label: 'Produk', value: businessIdeaData.product || '-' },
    { label: 'Modal', value: businessIdeaData.capital || '-' },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] p-4 sm:p-6">
      {/* Header + Breadcrumb */}
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
              ← Kembali ke Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar — DIPERBARUI */}
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
                style={{
                  borderRadius: '0',
                  textAlign: 'left',
                }}
              >
                <span>•</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Konten Utama */}
        <div className="flex-1 space-y-6">
          {/* Step Form */}
          <div
            className="p-6 font-sans"
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
            <StepForm
              title={current.title}
              placeholder={current.placeholder}
              value={formData[current.key]}
              onChange={handleChange}
              onNext={handleNext}
              isLast={currentStep === STEPS.length - 1}
            />
          </div>

          {/* Preview Card */}
          <div
            className="p-6 font-sans"
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
            <PreviewCard
              title="Preview Ide Bisnis"
              items={previewItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}