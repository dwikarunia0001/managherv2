'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import Sidebar from '@/components/Sidebar';
// ❌ PhaseCard dihapus karena tidak digunakan

export default function DashboardPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject } = useProjectStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setCurrentProject(projectId);
  }, [projectId, setCurrentProject]);

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
        <div
          className="px-6 py-4 text-[#000000] font-sans"
          style={{
            borderStyle: 'solid',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderBottomWidth: '4px',
            borderRightWidth: '4px',
            borderColor: '#000000',
            boxShadow: '4px 4px 0 0 #000000',
          }}
        >
          Memuat proyek...
        </div>
      </div>
    );
  }

  const handleOpenPhase = (phase) => {
    const slug = phase.toLowerCase().replace(/\s+/g, '-');
    router.push(`/dashboard/${projectId}/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] p-4 sm:p-6">
      {/* Header dengan Breadcrumb */}
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
                ManagHer / Dashboard
              </h1>
              <p className="text-[#000000] text-sm font-sans font-light mt-1">
                {currentProject.name} • Dikelola oleh {currentProject.manager}
              </p>
            </div>
            <button
              onClick={() => router.push('/projects')}
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
              ← Kembali ke Proyek
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div
          className="w-full lg:w-64"
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
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="flex-1 space-y-6">
          {/* Fase Plan */}
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
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#000000] font-sans">Fase Plan</h2>
                <p className="text-[#000000] text-sm font-sans font-light mt-1">
                  Mini Business Plan
                </p>
                <ul className="mt-3 space-y-1">
                  {['Ide Bisnis', 'Pricing', 'Brand Identity', 'Validasi Ide', 'BMC'].map((item, i) => (
                    <li key={i} className="text-[#000000] text-sm font-sans font-light">{i + 1}. {item}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleOpenPhase('Plan')}
                className="bg-[#b80000] text-white px-5 py-2 font-semibold font-sans hover:bg-[#8B0000] transition-colors whitespace-nowrap"
                style={{
                  borderStyle: 'solid',
                  borderTopWidth: '1px',
                  borderLeftWidth: '1px',
                  borderBottomWidth: '4px',
                  borderRightWidth: '4px',
                  borderColor: '#000000',
                }}
              >
                Buka Fase
              </button>
            </div>
          </div>

          {/* Fase Sell */}
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
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#000000] font-sans">Fase Sell</h2>
                <p className="text-[#000000] text-sm font-sans font-light mt-1">
                  Sell & Evaluasi
                </p>
                <ul className="mt-3 space-y-1">
                  {['Product', 'Customer', 'Order', 'Laporan Laba / Rugi'].map((item, i) => (
                    <li key={i} className="text-[#000000] text-sm font-sans font-light">{i + 1}. {item}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleOpenPhase('Sell')}
                className="bg-[#b80000] text-white px-5 py-2 font-semibold font-sans hover:bg-[#8B0000] transition-colors whitespace-nowrap"
                style={{
                  borderStyle: 'solid',
                  borderTopWidth: '1px',
                  borderLeftWidth: '1px',
                  borderBottomWidth: '4px',
                  borderRightWidth: '4px',
                  borderColor: '#000000',
                }}
              >
                Buka Fase
              </button>
            </div>
          </div>

          {/* Fase Scale Up */}
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
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#000000] font-sans">Fase Scale Up</h2>
                <p className="text-[#000000] text-sm font-sans font-light mt-1">
                  Strategi Bisnis Lanjutan
                </p>
                <ul className="mt-3 space-y-1">
                  {['Marketing', 'Finance', 'Tax', 'Legal', 'HR'].map((item, i) => (
                    <li key={i} className="text-[#000000] text-sm font-sans font-light">{i + 1}. {item}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleOpenPhase('Scale Up')}
                className="bg-[#b80000] text-white px-5 py-2 font-semibold font-sans hover:bg-[#8B0000] transition-colors whitespace-nowrap"
                style={{
                  borderStyle: 'solid',
                  borderTopWidth: '1px',
                  borderLeftWidth: '1px',
                  borderBottomWidth: '4px',
                  borderRightWidth: '4px',
                  borderColor: '#000000',
                }}
              >
                Buka Fase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}