// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Font Awesome via CDN */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-1 bg-[#8B0000] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/only-shoes-logo-removebg.png" alt="ManagHer Logo" className="h-12 w-auto" />
            <span className="text-xl font-bold text-black">ManagHer</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="font-medium text-black hover:text-[#8B0000] transition-colors">Tentang</a>
            <a href="#features" className="font-medium text-black hover:text-[#8B0000] transition-colors">Fitur</a>
            <a href="#badges" className="font-medium text-black hover:text-[#8B0000] transition-colors">Badge</a>
            <a href="#testimonials" className="font-medium text-black hover:text-[#8B0000] transition-colors">Testimoni</a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col pt-20 px-6">
          <a href="#about" className="py-4 border-b border-gray-200 font-medium" onClick={() => setIsMenuOpen(false)}>Tentang</a>
          <a href="#features" className="py-4 border-b border-gray-200 font-medium" onClick={() => setIsMenuOpen(false)}>Fitur</a>
          <a href="#badges" className="py-4 border-b border-gray-200 font-medium" onClick={() => setIsMenuOpen(false)}>Badge</a>
          <a href="#testimonials" className="py-4 border-b border-gray-200 font-medium" onClick={() => setIsMenuOpen(false)}>Testimoni</a>
          <div className="mt-auto pb-6">
            <a href="/dashboard" className="bg-[#8B0000] text-white px-6 py-3 rounded-full font-semibold inline-block w-full text-center">
              Mulai Sekarang 🚀
            </a>
          </div>
        </div>
      )}

      {/* Hero Section — Elegant & Mature */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Animasi Bintang Berkilau */}
        <div className="absolute top-50 left-50 text-xl text-[#8B0000] opacity-70 sparkle sparkle-1">✦</div>
        <div className="absolute top-40 right-20 text-xl text-[#8B0000] opacity-70 sparkle sparkle-2">✦</div>
        <div className="absolute bottom-44 left-30 text-xl text-[#8B0000] opacity-70 sparkle sparkle-1">✦</div>
        <div className="absolute bottom-60 right-40 text-xl text-[#8B0000] opacity-70 sparkle sparkle-2">✦</div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <img src="/only-shoes-logo-removebg.png" alt="ManagHer Logo" className="mx-auto h-32 mb-6" />

          {/* Slogan "From Zero to CEO" dengan gaya font Kanroji */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            <span className="block font-serif italic text-[#8B0000] text-6xl">ManagHer</span>
            <span className="block font-sans text-gray-900 text-5xl">From Zero to CEO</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Solopreneur Journey — Belajar membangun bisnis dari 0 dengan cara terstruktur, elegan, dan berdaya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="/projects" className="bg-[#8B0000] text-white px-8 py-4 rounded-xl glow-hover">
              Mulai Sekarang 🚀
            </a>
            <a
              href="#about"
              className="inline-block px-8 py-4 border-2 border-gray-300 hover:border-[#8B0000] text-gray-800 font-semibold rounded-xl transition-all hover:shadow-md"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 animate-bounce">
            <span>Scroll untuk melihat lebih banyak</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </section>

      {/* About Section — bg-gray-50 (like original) */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#C51D28]">Tentang ManagHer</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Kami hadir untuk perempuan solopreneur yang ingin membangun bisnis dengan pendekatan yang terstruktur, berkelas, dan penuh makna — bukan hanya tentang uang, tapi tentang kekuatan, identitas, dan transformasi diri.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: 'fa-lightbulb', title: 'Ide Kreatif', desc: 'Temukan ide bisnis yang menyatu dengan passion dan nilai hidupmu.' },
              { icon: 'fa-chart-line', title: 'Validasi Pasar', desc: 'Uji konsepmu dengan audiens tanpa takut gagal — pakai data, bukan asumsi.' },
              { icon: 'fa-rocket', title: 'Launch & Grow', desc: 'Luncurkan produkmu dengan percaya diri, lalu pantau pertumbuhan secara real-time.' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#C51D28] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className={`fas ${item.icon} text-2xl text-[#C51D28]`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">{item.title}</h3>
                <p className="text-gray-700 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases Section — bg-white */}
      <section id="phases" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#C51D28]">Tiga Fase Perjalananmu ✨</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Ikuti alur yang telah teruji untuk membangun bisnis yang berkelanjutan — dari ide hingga ekspansi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Fase Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#C51D28] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Fase Plan</h3>
              <p className="text-gray-700 text-sm mb-4">
                Bangun fondasi bisnismu: ide, validasi, brand, dan model bisnis.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ide Bisnis</li>
                <li>• Validasi Pasar</li>
                <li>• Brand Identity</li>
                <li>• Business Model Canvas</li>
              </ul>
            </div>

            {/* Fase Sell */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#C51D28] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Fase Sell</h3>
              <p className="text-gray-700 text-sm mb-4">
                Luncurkan produk dan kelola operasional bisnis harianmu.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Product Management</li>
                <li>• Customer & Order</li>
                <li>• Laporan Keuangan</li>
                <li>• Evaluasi Kinerja</li>
              </ul>
            </div>

            {/* Fase Scale Up */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#C51D28] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3">Fase Scale Up</h3>
              <p className="text-gray-700 text-sm mb-4">
                Kembangkan bisnismu ke level profesional dan berkelanjutan.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Strategi Marketing</li>
                <li>• Manajemen Keuangan</li>
                <li>• Legal & Perpajakan</li>
                <li>• Tim & SDM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section — bg-white, updated content */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#C51D28]">Apa Kata Mereka 💖</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Kisah nyata dari solopreneur yang telah melewati tiap fase perjalanan.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimoni Fase Plan */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#C51D28] rounded-full flex items-center justify-center text-white font-bold mb-4">AR</div>
              <blockquote className="text-sm italic font-medium text-gray-800 mb-4">
                "Fase Plan membantuku menggali passion jadi ide bisnis yang profitable. Akhirnya punya arah jelas!"
              </blockquote>
              <div className="text-xs text-[#C51D28] font-semibold">Fase Plan • Anindya R.</div>
            </div>

            {/* Testimoni Fase Sell */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#C51D28] rounded-full flex items-center justify-center text-white font-bold mb-4">KL</div>
              <blockquote className="text-sm italic font-medium text-gray-800 mb-4">
                "Dulu kewalahan urus order manual. Di Fase Sell, aku belajar sistem penjualan otomatis — sekarang bisa fokus kreatif!"
              </blockquote>
              <div className="text-xs text-[#C51D28] font-semibold">Fase Sell • Karina L.</div>
            </div>

            {/* Testimoni Fase Scale Up */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#C51D28] rounded-full flex items-center justify-center text-white font-bold mb-4">SN</div>
              <blockquote className="text-sm italic font-medium text-gray-800 mb-4">
                "Scale Up ngajarin aku bangun tim dan SOP. Sekarang bisnisku bisa jalan tanpa aku harus selalu standby!"
              </blockquote>
              <div className="text-xs text-[#C51D28] font-semibold">Fase Scale Up • Sari N.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — bg-gray-50, 3 cards per phase */}
      <section className="py-20 px-6 text-center bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#C51D28]">Siap Mulai Fase Kamu?</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Pilih fase yang sesuai dengan perjalananmu sekarang — dan mulai bangun bisnismu dengan percaya diri.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card Plan */}
            <a
              href="/plan"
              className="group bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">Fase Plan</h3>
              <p className="text-sm text-gray-700">Temukan ide & bangun fondasi bisnis.</p>
            </a>

            {/* Card Sell */}
            <a
              href="/sell"
              className="group bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Fase Sell</h3>
              <p className="text-sm text-gray-700">Kelola penjualan & operasional harian.</p>
            </a>

            {/* Card Scale Up */}
            <a
              href="/scale"
              className="group bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Fase Scale Up</h3>
              <p className="text-sm text-gray-700">Bangun sistem & ekspansi bisnis.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer — bg-white */}
      <footer className="py-12 px-6 bg-gray-50 text-gray-800 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/managher-red-shoes-logo.png" alt="ManagHer Logo" className="h-8 w-auto" />
                <h3 className="text-xl font-bold text-[#C51D28]">ManagHer</h3>
              </div>
              <p className="text-gray-600 mb-4">Platform interaktif untuk perempuan solopreneur membangun bisnis dari 0.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#C51D28] hover:text-white transition-colors">
                  <i className="fab fa-instagram text-sm text-gray-800"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#C51D28] hover:text-white transition-colors">
                  <i className="fab fa-twitter text-sm text-gray-800"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#C51D28] hover:text-white transition-colors">
                  <i className="fab fa-tiktok text-sm text-gray-800"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-[#C51D28]">Produk</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Harga</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Testimoni</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-[#C51D28]">Sumber Daya</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Webinar</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Komunitas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-[#C51D28]">Perusahaan</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-[#C51D28] transition-colors">Privasi</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>© 2025 ManagHer — Solopreneur Journey. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}