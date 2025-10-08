// src/app/dashboard/[projectId]/plan/page.js
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Manajer / Mini Business Plan
      </h1>

      <div className="flex gap-6 mt-6">
        {/* Sidebar Navigasi — DIPERBARUI */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <nav className="space-y-2">
            {SIDEBAR_MENU.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  // Redirect langsung ke halaman masing-masing
                  router.push(`/dashboard/${projectId}/plan/${item.id}`);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  item.id === 'ide-bisnis'
                    ? 'bg-[#8B0000] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Konten Utama */}
        <div className="flex-1">
          <StepForm
            title={current.title}
            placeholder={current.placeholder}
            value={formData[current.key]}
            onChange={handleChange}
            onNext={handleNext}
            isLast={currentStep === STEPS.length - 1}
          />

          <PreviewCard
            title="Preview Ide Bisnis"
            items={previewItems}
          />
        </div>
      </div>
    </div>
  );
}