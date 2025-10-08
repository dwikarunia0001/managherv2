// src/app/dashboard/[projectId]/sell/page.js
'use client';

import { useEffect } from 'react';
import useProjectStore from '@/store/useProjectStore';
import MiniErpForm from '@/components/MiniErpForm';

export default function SellPage({ params }) {
  const { projectId } = params;
  const { currentProject, setCurrentProject } = useProjectStore();

  useEffect(() => {
    setCurrentProject(projectId);
  }, [projectId, setCurrentProject]);

  if (!currentProject) {
    return <div className="p-6">Proyek tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        {currentProject.name} / Sell
      </h1>
      <p className="text-gray-600 mb-6">Isi data Mini ERP Anda:</p>

      <div className="max-w-3xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <MiniErpForm projectId={projectId} />
      </div>
    </div>
  );
}