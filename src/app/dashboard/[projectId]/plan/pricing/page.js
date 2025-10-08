// src/app/dashboard/[projectId]/plan/pricing/page.js
'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import StepForm from '@/components/StepForm';
import PreviewCard from '@/components/PreviewCard';
import { useState, useEffect } from 'react'; 


// Langkah-langkah pricing
const STEPS = [
  {
    key: 'materialCost',
    title: 'Biaya Bahan Baku',
    placeholder: 'Contoh: Rp 10.000',
  },
  {
    key: 'otherCost',
    title: 'Biaya Lain-Lain',
    placeholder: 'Contoh: Rp 5.000',
  },
  {
    key: 'sellingPrice',
    title: 'Harga Jual',
    placeholder: 'Contoh: Rp 30.000',
  },
];

export default function PricingPage({ params }) {
  const { projectId } = use(params); // ✅ gunakan React.use()
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData } =
    useProjectStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    materialCost: '',
    otherCost: '',
    sellingPrice: '',
  });

  useEffect(() => {
    setCurrentProject(projectId);
    const saved = getPhaseData(projectId, 'pricing') || {};
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

    // Simpan ke store
    updatePhaseData(projectId, 'pricing', {
      [currentKey]: currentValue,
    });

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('✅ Data pricing berhasil disimpan!');
      // Opsional: redirect ke Brand atau kembali ke Plan utama
      // router.push(`/dashboard/${projectId}/plan`);
    }
  };

  const handleChange = (value) => {
    const currentKey = STEPS[currentStep].key;
    setFormData((prev) => ({ ...prev, [currentKey]: value }));
  };

  const current = STEPS[currentStep];

  // === Data untuk Preview Card ===
  const pricingData = getPhaseData(projectId, 'pricing');
  const previewItems = [
    { label: 'Biaya Bahan', value: pricingData.materialCost || '-' },
    { label: 'Biaya Lain-Lain', value: pricingData.otherCost || '-' },
    { label: 'Harga Jual', value: pricingData.sellingPrice || '-' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Manajer / Mini Business Plan
      </h1>

      <div className="flex gap-6 mt-6">
        {/* Sidebar Navigasi */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <nav className="space-y-2">
            {[
              { id: 'ide-bisnis', label: 'Ide bisnis' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'brand', label: 'Brand' },
              { id: 'validasi', label: 'Validasi' },
              { id: 'bmc', label: 'BMC' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'pricing') {
                    setCurrentStep(0);
                  } else {
                    // Redirect ke halaman lain
                    router.push(`/dashboard/${projectId}/plan/${item.id}`);
                  }
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  item.id === 'pricing'
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
          {/* Form Step-by-Step */}
          <StepForm
            title={current.title}
            placeholder={current.placeholder}
            value={formData[current.key]}
            onChange={handleChange}
            onNext={handleNext}
            isLast={currentStep === STEPS.length - 1}
          />

          {/* Card Preview */}
          <PreviewCard
            title="Preview Pricing"
            items={previewItems}
          />
        </div>
      </div>
    </div>
  );
}