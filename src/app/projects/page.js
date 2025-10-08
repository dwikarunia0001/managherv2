// src/app/projects/page.js (versi dengan Zustand)

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [manager, setManager] = useState('');

  const { projects, addProject } = useProjectStore();
  const router = useRouter();

  const handleSave = () => {
    if (!projectName.trim()) {
      alert('Nama proyek wajib diisi');
      return;
    }
    addProject({
      name: projectName.trim(),
      manager: manager.trim() || '-',
    });
    setProjectName('');
    setManager('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Proyek</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Card Tambah Proyek */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-colors hover:border-[#8B0000] hover:bg-gray-50"
        >
          <div className="text-3xl mb-2">➕</div>
          <p className="text-gray-700 font-medium">+ Tambah Proyek Baru</p>
        </div>

        {/* Daftar Proyek */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl p-6 flex justify-between items-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600">Manajer: {project.manager}</p>
              </div>
              <button
                onClick={() => router.push(`/dashboard/${project.id}`)}
                className="bg-[#8B0000] hover:bg-[#6b0000] text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
              >
                Buka
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Proyek Baru</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Proyek
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="Contoh: Toko Bunga Online"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Manajer
                </label>
                <input
                  type="text"
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="Opsional"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#8B0000] hover:bg-[#6b0000] text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}