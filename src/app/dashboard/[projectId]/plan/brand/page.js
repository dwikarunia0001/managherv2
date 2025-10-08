// src/app/dashboard/[projectId]/plan/brand/page.js
'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import StepForm from '@/components/StepForm';
import PreviewCard from '@/components/PreviewCard';

// Langkah-langkah brand identity
const STEPS = [
  {
    key: 'brandName',
    title: 'Nama Brand',
    placeholder: 'Contoh: NamaBrand',
  },
  {
    key: 'logoUrl',
    title: 'Logo',
    placeholder: 'Contoh: https://example.com/logo.png atau upload gambar',
  },
  {
    key: 'tagline',
    title: 'Tagline',
    placeholder: 'Contoh: Tagline brand Anda',
  },
  {
    key: 'color',
    title: 'Warna',
    placeholder: 'Contoh: #FF5733 atau "Merah"',
  },
];

export default function BrandPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData } =
    useProjectStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    brandName: '',
    logoUrl: '',
    tagline: '',
    color: '',
  });

  useEffect(() => {
    setCurrentProject(projectId);
    const saved = getPhaseData(projectId, 'brandIdentity') || {};
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
    updatePhaseData(projectId, 'brandIdentity', {
      [currentKey]: currentValue,
    });

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('✅ Brand identity berhasil disimpan!');
    }
  };

  const handleChange = (value) => {
    const currentKey = STEPS[currentStep].key;
    setFormData((prev) => ({ ...prev, [currentKey]: value }));
  };

  const current = STEPS[currentStep];

  // === Data untuk Preview Card ===
  const brandData = getPhaseData(projectId, 'brandIdentity');
  const previewItems = [
    { label: 'Nama Brand', value: brandData.brandName || '-' },
    { label: 'Logo', value: brandData.logoUrl || '-' },
    { label: 'Tagline', value: brandData.tagline || '-' },
    { label: 'Warna', value: brandData.color || '-' },
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
              { id: 'brand', label: 'Brand Identity' },
              { id: 'validasi', label: 'Validasi' },
              { id: 'bmc', label: 'BMC' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  router.push(`/dashboard/${projectId}/plan/${item.id}`);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  item.id === 'brand'
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
            title="Preview Brand Identity"
            items={previewItems}
          />

          {/* Preview Visual Sederhana (Opsional) */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Visual Preview</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-2"
                  style={{ backgroundColor: brandData.color || '#8B0000' }}
                >
                  {brandData.brandName?.substring(0, 2).toUpperCase() || 'NB'}
                </div>
                <p className="font-semibold">{brandData.brandName || 'Nama Brand'}</p>
                <p className="text-sm text-gray-600">{brandData.tagline || 'Tagline brand Anda'}</p>
              </div>

              {brandData.logoUrl && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Logo:</p>
                  <img
                    src={brandData.logoUrl}
                    alt="Logo"
                    className="max-w-32 h-auto border border-gray-300 rounded"
                  />
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Kartu Produk Preview</h4>
                <div className="flex items-start space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: brandData.color || '#8B0000' }}
                  >
                    {brandData.brandName?.substring(0, 2).toUpperCase() || 'NB'}
                  </div>
                  <div>
                    <p className="font-semibold">Fashion kecil-kecilan</p>
                    <p className="text-xs text-gray-600">Anak muda</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Produk fashion dengan desain modern dan harga terjangkau untuk anak muda.
                    </p>
                    <p className="text-sm font-medium text-green-600 mt-1">Rp 150.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}