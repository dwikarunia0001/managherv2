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
            <img src="/managher-red-shoes-logo.png" alt="ManagHer Logo" className="h-12 w-auto" />
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
          <img src="/managher-red-shoes-logo.png" alt="ManagHer Logo" className="mx-auto h-32 mb-6" />

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

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#8B0000]">Tentang ManagHer</h2>
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
                className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#8B0000] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className={`fas ${item.icon} text-2xl text-[#8B0000]`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">{item.title}</h3>
                <p className="text-gray-700 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases Section — Ganti "Features" jadi "Fase" */}
      <section id="phases" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#8B0000]">Tiga Fase Perjalananmu ✨</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Ikuti alur yang telah teruji untuk membangun bisnis yang berkelanjutan — dari ide hingga ekspansi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Fase Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#8B0000] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 shimmer">
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
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#8B0000] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 shimmer">
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
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#8B0000] hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 shimmer">
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

      {/* Badges Section */}
      <section id="badges" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#8B0000]">Koleksi Badge 🏅</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Raih pencapaian di setiap tahap perjalananmu dan banggakan prestasimu!</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {[
              { icon: '💭', title: 'Dreamer', desc: 'Untukmu yang berani bermimpi dan memiliki visi besar', step: 'Tahap 1: Ide Bisnis' },
              { icon: '🔎', title: 'Researcher', desc: 'Untukmu yang teliti dan suka menggali informasi mendalam', step: 'Tahap 2: Validasi Ide' },
              { icon: '🎨', title: 'Creator', desc: 'Untukmu yang kreatif dan mampu mewujudkan ide menjadi nyata', step: 'Tahap 3: Prototype & Brand' },
              { icon: '👑', title: 'Boss Lady', desc: 'Untukmu yang berani mengambil keputusan dan memimpin bisnis sendiri', step: 'Tahap 4: Launch & Grow' },
              { icon: '📊', title: 'Strategist', desc: 'Untukmu yang sudah siap mengembangkan bisnis', step: 'Tahap 5: Business Model Canvas' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="badge-item p-6 rounded-2xl bg-white shadow-md text-center transform transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[#8B0000] rounded-full flex items-center justify-center text-2xl text-white">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
                <div className="mt-4 text-xs text-[#8B0000] font-medium">{item.step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#8B0000]">Apa Kata Mereka 💖</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Dengarkan kisah inspiratif dari para solopreneur yang telah memulai perjalanan mereka</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md card-hover">
              <blockquote className="text-lg italic font-medium text-gray-800">
                "Sebagai ibu rumah tangga, saya selalu ingin punya bisnis sendiri tapi tidak tahu harus mulai dari mana. ManagHer memberikan panduan step-by-step yang mudah diikuti. Sekarang saya sudah punya online shop sendiri!"
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="w-12 h-12 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold mr-4">RS</div>
                <div>
                  <p className="font-semibold">Rina S.</p>
                  <p className="text-sm text-gray-600">Pemilik Toko Kue Online</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md card-hover">
              <blockquote className="text-lg italic font-medium text-gray-800">
                "Platform ini benar-benar mengubah cara saya berpikir tentang bisnis. Dari yang awalnya hanya ide biasa, sekarang saya punya produk digital yang laku di pasaran. Terima kasih ManagHer!"
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="w-12 h-12 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold mr-4">DA</div>
                <div>
                  <p className="font-semibold">Dewi A.</p>
                  <p className="text-sm text-gray-600">Pembuat Template Digital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Memulai Perjalananmu?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Gabung sekarang dan dapatkan akses ke semua fitur, template, dan panduan eksklusif untuk membangun bisnis impianmu!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a href="/dashboard" className="bg-[#8B0000] hover:bg-[#6b0000] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:opacity-90 transition-all">
                <span>Mulai Sekarang 🚀</span>
              </a>
              <a href="#features" className="border-2 border-gray-400 hover:border-[#8B0000] px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-md">
                Lihat Demo
              </a>
            </div>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <i className="fas fa-lock text-green-600"></i>
                <span>100% Aman</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-undo text-blue-600"></i>
                <span>30 Hari Garansi Uang Kembali</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-headset text-purple-600"></i>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/managher-red-shoes-logo.png" alt="ManagHer Logo" className="h-8 w-auto" />
                <h3 className="text-xl font-bold">ManagHer</h3>
              </div>
              <p className="text-gray-400 mb-4">Platform interaktif untuk perempuan solopreneur membangun bisnis dari 0.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B0000] transition-colors">
                  <i className="fab fa-instagram text-sm text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B0000] transition-colors">
                  <i className="fab fa-twitter text-sm text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B0000] transition-colors">
                  <i className="fab fa-tiktok text-sm text-white"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Produk</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Harga</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Testimoni</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Sumber Daya</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Webinar</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Komunitas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-[#8B0000] transition-colors">Privasi</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2025 ManagHer — Solopreneur Journey. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}