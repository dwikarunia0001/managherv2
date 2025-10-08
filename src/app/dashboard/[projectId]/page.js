// src/app/dashboard/[projectId]/page.js
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import Sidebar from '@/components/Sidebar';
import PhaseCard from '@/components/PhaseCard';

export default function DashboardPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject } = useProjectStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Set proyek aktif saat halaman dimuat
  useEffect(() => {
    setCurrentProject(projectId);
    if (!currentProject || currentProject.id !== projectId) {
      // Opsional: redirect jika proyek tidak ditemukan
    }
  }, [projectId, setCurrentProject, currentProject]);

  // Jika proyek belum dimuat, tampilkan loading
  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Memuat proyek...</p>
      </div>
    );
  }

  const handleOpenPhase = (phase) => {
    const slug = phase.toLowerCase().replace(/\s+/g, '-');
    router.push(`/dashboard/${projectId}/${slug}`);
    };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manajer / Dashboard
      </h1>

      <div className="flex gap-6">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 space-y-6">
          <PhaseCard
            title="Fase Plan"
            subtitle="Mini Business Plan"
            items={['Ide Bisnis', 'Pricing', 'Brand Identity', 'Validasi Ide', 'BMC']}
            onOpen={() => handleOpenPhase('Plan')}
          />

          <PhaseCard
            title="Fase Sell"
            subtitle="Sell & Evaluasi"
            items={['Product', 'Customer', 'Order', 'Laporan Laba / Rugi']}
            onOpen={() => handleOpenPhase('Sell')}
          />

          <PhaseCard
            title="Fase Scale Up"
            subtitle="Strategi Bisnis Lanjutan"
            items={['Marketing', 'Finance', 'Tax', 'Legal', 'HR']}
            onOpen={() => handleOpenPhase('Scale Up')}
          />
        </div>
      </div>
    </div>
  );
}