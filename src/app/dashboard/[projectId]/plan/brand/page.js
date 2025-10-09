'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';

// Langkah-langkah brand identity
const STEPS = [
  { key: 'brandName', label: 'Nama Brand' },
  { key: 'logoUrl', label: 'Logo' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'color', label: 'Warna' },
];

const SIDEBAR_MENU = [
  { id: 'ide-bisnis', label: 'Ide bisnis' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'validasi', label: 'Validasi' },
  { id: 'bmc', label: 'BMC' },
];

const PLACEHOLDERS = {
  brandName: 'Contoh: NamaBrand',
  logoUrl: 'Contoh: https://example.com/logo.png atau upload gambar',
  tagline: 'Contoh: Tagline brand Anda',
  color: 'Contoh: #FF5733 atau "Merah"',
};

export default function BrandPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData, deletePhaseData } =
    useProjectStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    brandName: '',
    logoUrl: '',
    tagline: '',
    color: '',
  });

  useEffect(() => {
    setCurrentProject(projectId);
    const saved = getPhaseData(projectId, 'brandIdentity') || {};
    setFormData({
      brandName: saved.brandName || '',
      logoUrl: saved.logoUrl || '',
      tagline: saved.tagline || '',
      color: saved.color || '',
    });
  }, [projectId, setCurrentProject, getPhaseData]);

  const currentStep = STEPS[currentStepIndex];
  const currentValue = formData[currentStep.key];

  const handleChange = (value) => {
    setFormData((prev) => ({ ...prev, [currentStep.key]: value }));
  };

  const handleSaveCurrent = () => {
    updatePhaseData(projectId, 'brandIdentity', {
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
    updatePhaseData(projectId, 'brandIdentity', {
      brandName: formData.brandName,
      logoUrl: formData.logoUrl,
      tagline: formData.tagline,
      color: formData.color,
    });
    alert('✅ Brand identity berhasil disimpan!');
  };

  const handleReset = () => {
    if (confirm('Yakin ingin menghapus semua data brand identity?')) {
      deletePhaseData(projectId, 'brandIdentity');
      setFormData({
        brandName: '',
        logoUrl: '',
        tagline: '',
        color: '',
      });
      setCurrentStepIndex(0);
    }
  };

  const handleEdit = () => {
    setCurrentStepIndex(0);
  };

  // Preview data
  const brandData = getPhaseData(projectId, 'brandIdentity') || {};
  const previewItems = [
    { key: 'brandName', label: 'Nama Brand', value: formData.brandName || '-' },
    { key: 'logoUrl', label: 'Logo', value: formData.logoUrl || '-' },
    { key: 'tagline', label: 'Tagline', value: formData.tagline || '-' },
    { key: 'color', label: 'Warna', value: formData.color || '-' },
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
                Bangun identitas brand bisnismu
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
                  item.id === 'brand'
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
                <h3 className="font-bold text-[#000000] mb-3">Langkah Brand Identity</h3>
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

                {currentStep.key === 'logoUrl' ? (
                  <div className="mb-6">
                    <div
                      className="border-dashed border-2 border-[#000000] p-4 text-center cursor-pointer mb-3"
                      onClick={() => document.getElementById('logo-upload').click()}
                      style={{
                        borderRadius: '0',
                      }}
                    >
                      {formData.logoUrl ? (
                        <div>
                          <img
                            src={formData.logoUrl}
                            alt="Preview Logo"
                            className="mx-auto max-h-24"
                            style={{ borderRadius: '0', border: '1px solid #000000' }}
                          />
                          <p className="text-[#000000] text-sm mt-2">Klik untuk ganti logo</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[#000000]">📁 Klik untuk upload logo</p>
                          <p className="text-[#000000] text-sm mt-1">atau masukkan URL di bawah</p>
                        </div>
                      )}
                    </div>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFormData((prev) => ({ ...prev, logoUrl: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                    <input
                      type="text"
                      value={formData.logoUrl || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, logoUrl: e.target.value }))}
                      placeholder="Atau tempel URL logo di sini (opsional)"
                      className="w-full px-4 py-3 outline-none font-sans mt-2"
                      style={{
                        borderStyle: 'solid',
                        borderTopWidth: '1px',
                        borderLeftWidth: '1px',
                        borderBottomWidth: '4px',
                        borderRightWidth: '4px',
                        borderColor: '#000000',
                      }}
                    />
                  </div>
                ) : currentStep.key === 'color' ? (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <input
                        type="color"
                        value={
                          /^#[0-9A-F]{6}$/i.test(formData.color)
                            ? formData.color
                            : '#b80000'
                        }
                        onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                        className="w-12 h-12 cursor-pointer"
                        style={{
                          borderRadius: '0',
                          border: '1px solid #000000',
                          padding: '0',
                        }}
                      />
                      <span className="text-[#000000] font-sans">
                        {formData.color || 'Pilih warna'}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.color || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                      placeholder="Contoh: #FF5733 atau 'Merah'"
                      className="w-full px-4 py-3 outline-none font-sans"
                      style={{
                        borderStyle: 'solid',
                        borderTopWidth: '1px',
                        borderLeftWidth: '1px',
                        borderBottomWidth: '4px',
                        borderRightWidth: '4px',
                        borderColor: '#000000',
                      }}
                    />
                  </div>
                ) : (
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
                )}

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
              <h3 className="text-xl font-bold text-[#000000] mb-4">Preview Brand Identity</h3>
              <ul className="space-y-2 mb-6">
                {previewItems.map((item) => (
                  <li
                    key={item.key}
                    className="flex justify-between py-1 font-sans"
                    style={{ borderBottom: '1px solid #e5e5e5' }}
                  >
                    <span className="text-[#000000] text-sm font-sans font-light">{item.label}</span>
                    <span className="text-[#000000] text-sm font-sans font-medium break-all">{item.value}</span>
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

          {/* Visual Preview */}
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
              <h3 className="text-xl font-bold text-[#000000] mb-4">Visual Preview</h3>
              <div className="space-y-4">
                {/* Logo & Brand */}
                <div
                  className="p-4"
                  style={{ backgroundColor: '#f8f8f8', borderRadius: '0' }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center text-white font-bold mb-2"
                    style={{
                      backgroundColor: formData.color || '#b80000',
                      borderRadius: '0',
                      border: '1px solid #000000',
                    }}
                  >
                    {(formData.brandName || 'NB').substring(0, 2).toUpperCase()}
                  </div>
                  <p className="font-bold text-[#000000]">{formData.brandName || 'Nama Brand'}</p>
                  <p className="text-[#000000] text-sm font-light">{formData.tagline || 'Tagline brand Anda'}</p>
                </div>

                {/* Logo Image */}
                {formData.logoUrl && (
                  <div>
                    <p className="text-[#000000] text-sm font-sans font-light mb-2">Logo:</p>
                    <img
                      src={formData.logoUrl}
                      alt="Logo"
                      className="max-w-32 h-auto"
                      style={{
                        border: '1px solid #000000',
                        borderRadius: '0',
                      }}
                    />
                  </div>
                )}

                {/* Kartu Produk */}
                <div
                  className="p-4"
                  style={{ backgroundColor: '#f0f8ff', borderRadius: '0' }}
                >
                  <h4 className="font-bold text-[#000000] mb-2">Kartu Produk Preview</h4>
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-white font-bold"
                      style={{
                        backgroundColor: formData.color || '#b80000',
                        borderRadius: '0',
                        border: '1px solid #000000',
                      }}
                    >
                      {(formData.brandName || 'NB').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#000000]">Fashion kecil-kecilan</p>
                      <p className="text-[#000000] text-xs font-light">Anak muda</p>
                      <p className="text-[#000000] text-xs font-light mt-1">
                        Produk fashion dengan desain modern dan harga terjangkau untuk anak muda.
                      </p>
                      <p className="text-[#000000] text-sm font-bold mt-1">Rp 150.000</p>
                    </div>
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