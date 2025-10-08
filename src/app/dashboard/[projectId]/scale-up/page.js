// src/app/dashboard/[projectId]/scale-up/page.js
'use client';

import { use, useEffect } from 'react';
import useProjectStore from '@/store/useProjectStore';
import ChecklistForm from '@/components/ChecklistForm';

const SCALE_UP_ITEMS = [
  'Marketing',
  'Finance',
  'Tax',
  'Legal',
  'HR',
];

export default function ScaleUpPage({ params }) {
  const { projectId } = use(params);
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
        {currentProject.name} / Scale Up
      </h1>
      <p className="text-gray-600 mb-6">Lengkapi area pengembangan bisnis:</p>

      <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ChecklistForm
          projectId={projectId}
          phaseKey="scaleUp"
          items={SCALE_UP_ITEMS}
        />
      </div>
    </div>
  );
}