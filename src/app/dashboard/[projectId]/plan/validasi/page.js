// src/app/dashboard/[projectId]/plan/validasi/page.js
'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import PreviewCard from '@/components/PreviewCard';

export default function ValidasiPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData } =
    useProjectStore();

  // State form
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    activity: '',
    feedbackScale: '',
    feedbackNote: '',
  });

  // State data validasi (array)
  const [validationData, setValidationData] = useState([]);

  useEffect(() => {
    setCurrentProject(projectId);
    const saved = getPhaseData(projectId, 'validation') || [];
    if (Array.isArray(saved)) {
      setValidationData(saved);
    }
  }, [projectId, setCurrentProject, getPhaseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.gender.trim() || !formData.age.trim() || !formData.activity.trim()) {
      alert('Jenis Kelamin, Usia, dan Aktivitas wajib diisi.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      gender: formData.gender,
      age: formData.age,
      activity: formData.activity,
      feedbackScale: formData.feedbackScale || '0',
      feedbackNote: formData.feedbackNote || '-',
      date: new Date().toLocaleString(),
    };

    const updatedData = [...validationData, newEntry];
    setValidationData(updatedData);

    // Simpan ke store
    updatePhaseData(projectId, 'validation', updatedData);

    // Reset form
    setFormData({
      gender: '',
      age: '',
      activity: '',
      feedbackScale: '',
      feedbackNote: '',
    });

    alert('✅ Data validasi berhasil disimpan!');
  };

  // === Statistik untuk Dashboard ===
  const stats = {
    total: validationData.length,
    gender: {
      female: validationData.filter((d) => d.gender.toLowerCase().includes('perempuan')).length,
      male: validationData.filter((d) => d.gender.toLowerCase().includes('laki')).length,
    },
    ageGroups: {
      '<20': validationData.filter((d) => parseInt(d.age) < 20).length,
      '20-29': validationData.filter((d) => parseInt(d.age) >= 20 && parseInt(d.age) <= 29).length,
      '30-39': validationData.filter((d) => parseInt(d.age) >= 30 && parseInt(d.age) <= 39).length,
      '40+': validationData.filter((d) => parseInt(d.age) >= 40).length,
    },
    activities: Object.keys(
      validationData.reduce((acc, d) => {
        acc[d.activity] = (acc[d.activity] || 0) + 1;
        return acc;
      }, {})
    ),
  };

  // Emoji scale
  const getFeedbackEmoji = (scale) => {
    const num = parseInt(scale);
    if (num >= 4) return '😍';
    if (num === 3) return '😊';
    if (num === 2) return '😐';
    if (num === 1) return '😞';
    return '❓';
  };

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
                  item.id === 'validasi'
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
        <div className="flex-1 space-y-6">
          {/* Form Input */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Input Data Validasi</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin
                </label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="Contoh: Perempuan / Laki-laki"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usia
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="Contoh: 23"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aktivitas Saat Ini
                </label>
                <input
                  type="text"
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="Contoh: Mahasiswa / Pekerja kantoran / Pelajar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skala Feedback (1-5)
                </label>
                <input
                  type="number"
                  name="feedbackScale"
                  min="1"
                  max="5"
                  value={formData.feedbackScale}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="Contoh: 4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Penjelasan Feedback
                </label>
                <textarea
                  name="feedbackNote"
                  value={formData.feedbackNote}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  rows="3"
                  placeholder="Contoh: Suka modelnya, tapi harganya agak tinggi"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-[#8B0000] hover:bg-[#6b0000] text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>

          {/* Tabel Data Validasi */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tabel Data Validasi</h2>
            {validationData.length === 0 ? (
              <p className="text-gray-500 italic">Belum ada data validasi.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 text-left">JK</th>
                      <th className="py-2 text-left">Usia</th>
                      <th className="py-2 text-left">Aktivitas</th>
                      <th className="py-2 text-left">Skala</th>
                      <th className="py-2 text-left">Feedback</th>
                      <th className="py-2 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validationData.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2">{item.gender}</td>
                        <td className="py-2">{item.age}</td>
                        <td className="py-2">{item.activity}</td>
                        <td className="py-2">
                          {item.feedbackScale} {getFeedbackEmoji(item.feedbackScale)}
                        </td>
                        <td className="py-2">{item.feedbackNote}</td>
                        <td className="py-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs">
                            ✏️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-sm text-gray-600">
                  Total data validasi: <strong>{stats.total}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Dashboard Hasil Validasi Ide */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Hasil Validasi Ide</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Distribusi Jenis Kelamin */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Distribusi Jenis Kelamin</h3>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto"
                      style={{ backgroundColor: '#f87171' }}
                    ></div>
                    <p className="text-xs mt-1">Perempuan</p>
                    <p className="text-sm font-bold">{stats.gender.female}</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto"
                      style={{ backgroundColor: '#3b82f6' }}
                    ></div>
                    <p className="text-xs mt-1">Laki-laki</p>
                    <p className="text-sm font-bold">{stats.gender.male}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-center space-x-4 text-xs">
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: '#f87171' }}></div>
                    Perempuan
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: '#3b82f6' }}></div>
                    Laki-laki
                  </span>
                </div>
              </div>

              {/* Distribusi Usia */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Distribusi Usia</h3>
                <div className="space-y-2">
                  {Object.entries(stats.ageGroups).map(([group, count]) => (
                    <div key={group} className="flex items-center">
                      <div
                        className="w-full h-6 bg-blue-200 rounded mr-2"
                        style={{ width: `${(count / Math.max(1, stats.total)) * 100}%` }}
                      ></div>
                      <span className="text-xs">{group}: {count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribusi Aktivitas */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Distribusi Aktivitas</h3>
                <div className="space-y-2">
                  {stats.activities.map((activity) => {
                    const count = validationData.filter((d) => d.activity === activity).length;
                    return (
                      <div key={activity} className="flex items-center">
                        <div
                          className="w-full h-6 bg-purple-200 rounded mr-2"
                          style={{ width: `${(count / Math.max(1, stats.total)) * 100}%` }}
                        ></div>
                        <span className="text-xs">{activity}: {count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Skala by JK, Usia, Aktivitas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Skala by JK</h3>
                <div className="space-y-1">
                  {['Perempuan', 'Laki-laki'].map((jk) => {
                    const filtered = validationData.filter((d) => d.gender.includes(jk));
                    const avg = filtered.length > 0 ? filtered.reduce((sum, d) => sum + parseInt(d.feedbackScale), 0) / filtered.length : 0;
                    return (
                      <div key={jk} className="flex items-center">
                        <div
                          className="w-full h-4 bg-green-200 rounded mr-2"
                          style={{ width: `${Math.min(avg * 20, 100)}%` }}
                        ></div>
                        <span className="text-xs">{jk}: {avg.toFixed(1)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Skala by Usia</h3>
                <div className="space-y-1">
                  {Object.entries(stats.ageGroups).map(([group, count]) => {
                    if (count === 0) return null;
                    const filtered = validationData.filter((d) => {
                      const age = parseInt(d.age);
                      if (group === '<20') return age < 20;
                      if (group === '20-29') return age >= 20 && age <= 29;
                      if (group === '30-39') return age >= 30 && age <= 39;
                      if (group === '40+') return age >= 40;
                      return false;
                    });
                    const avg = filtered.length > 0 ? filtered.reduce((sum, d) => sum + parseInt(d.feedbackScale), 0) / filtered.length : 0;
                    return (
                      <div key={group} className="flex items-center">
                        <div
                          className="w-full h-4 bg-yellow-200 rounded mr-2"
                          style={{ width: `${Math.min(avg * 20, 100)}%` }}
                        ></div>
                        <span className="text-xs">{group}: {avg.toFixed(1)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Skala by Aktivitas</h3>
                <div className="space-y-1">
                  {stats.activities.map((activity) => {
                    const filtered = validationData.filter((d) => d.activity === activity);
                    const avg = filtered.length > 0 ? filtered.reduce((sum, d) => sum + parseInt(d.feedbackScale), 0) / filtered.length : 0;
                    return (
                      <div key={activity} className="flex items-center">
                        <div
                          className="w-full h-4 bg-orange-200 rounded mr-2"
                          style={{ width: `${Math.min(avg * 20, 100)}%` }}
                        ></div>
                        <span className="text-xs">{activity}: {avg.toFixed(1)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}