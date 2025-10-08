// src/app/dashboard/[projectId]/plan/bmc/page.js
'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';

const BMC_BLOCKS = [
  {
    id: 'keyPartners',
    title: 'Key Partners',
    subtitle: 'What are your key partners to get competitive advantage?',
    color: 'bg-yellow-100',
    placeholder: 'Contoh: Supplier bahan baku, platform pengiriman',
  },
  {
    id: 'keyActivities',
    title: 'Key Activities',
    subtitle: 'What are the key steps to move ahead to your customers?',
    color: 'bg-blue-100',
    placeholder: 'Contoh: Produksi, pemasaran, layanan pelanggan',
  },
  {
    id: 'keyPropositions',
    title: 'Key Propositions',
    subtitle: 'How will you make your customers’ life happier?',
    color: 'bg-yellow-200',
    placeholder: 'Contoh: Harga terjangkau, desain unik, layanan cepat',
  },
  {
    id: 'customerRelationships',
    title: 'Customer Relationships',
    subtitle: 'How often will you interact with your customers?',
    color: 'bg-blue-200',
    placeholder: 'Contoh: Chatbot, email newsletter, telepon langsung',
  },
  {
    id: 'customerSegments',
    title: 'Customer Segments',
    subtitle: 'Who are your customers? Describe your target audience in a couple of words.',
    color: 'bg-pink-100',
    placeholder: 'Contoh: Ibu rumah tangga, mahasiswa, profesional muda',
  },
  {
    id: 'keyResources',
    title: 'Key Resources',
    subtitle: 'What resources do you need to make your idea work?',
    color: 'bg-purple-100',
    placeholder: 'Contoh: Tim kreatif, modal awal, teknologi',
  },
  {
    id: 'channels',
    title: 'Channels',
    subtitle: 'How are you going to reach your customers?',
    color: 'bg-blue-300',
    placeholder: 'Contoh: Instagram, Tokopedia, WhatsApp',
  },
  {
    id: 'costStructure',
    title: 'Cost Structure',
    subtitle: 'How much are you planning to spend on the product development and marketing for a certain period?',
    color: 'bg-orange-100',
    placeholder: 'Contoh: Rp 5.000.000 untuk produksi, Rp 2.000.000 untuk iklan',
  },
  {
    id: 'revenueStreams',
    title: 'Revenue Streams',
    subtitle: 'How much are you planning to earn in a certain period? Compare your costs and revenues.',
    color: 'bg-orange-200',
    placeholder: 'Contoh: Penjualan produk Rp 10.000.000/bulan, langganan Rp 500.000/bulan',
  },
];

export default function BmcPage({ params }) {
  const { projectId } = use(params);
  const router = useRouter();
  const { currentProject, setCurrentProject, getPhaseData, updatePhaseData } =
    useProjectStore();

  const [bmcData, setBmcData] = useState({});

  useEffect(() => {
    setCurrentProject(projectId);
    const saved = getPhaseData(projectId, 'bmc') || {};
    setBmcData(saved);
  }, [projectId, setCurrentProject, getPhaseData]);

  const handleChange = (id, value) => {
    const newData = { ...bmcData, [id]: value };
    setBmcData(newData);
    updatePhaseData(projectId, 'bmc', newData);
  };

  // === Drag & Drop Handlers ===
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');

    if (!sourceId || sourceId === targetId) return;

    const sourceValue = bmcData[sourceId] || '';
    if (!sourceValue.trim()) return; // Jangan pindahkan jika kosong

    // Pindahkan: hapus dari sumber, masukkan ke target
    const newBmcData = { ...bmcData };
    newBmcData[targetId] = sourceValue;
    newBmcData[sourceId] = ''; // Kosongkan sumber

    setBmcData(newBmcData);
    updatePhaseData(projectId, 'bmc', newBmcData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Manajer / Mini Business Plan
      </h1>

      <div className="flex gap-6 mt-6">
        {/* Sidebar */}
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
                onClick={() => router.push(`/dashboard/${projectId}/plan/${item.id}`)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  item.id === 'bmc'
                    ? 'bg-[#8B0000] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* BMC Canvas */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Business Model Canvas</h2>
            <p className="text-sm text-gray-600 mb-4">
              🔹 Seret teks dari satu blok ke blok lain untuk memindahkan konten.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BMC_BLOCKS.map((block) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, block.id)}
                  className={`p-4 rounded-lg border border-gray-300 ${block.color} cursor-grab active:cursor-grabbing`}
                >
                  <h3 className="font-bold text-gray-800 mb-1">{block.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{block.subtitle}</p>
                  <textarea
                    value={bmcData[block.id] || ''}
                    onChange={(e) => handleChange(block.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none resize-none"
                    rows="4"
                    placeholder={block.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>Source: Strategyzer.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}