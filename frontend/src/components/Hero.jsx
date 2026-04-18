import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ setPage }) {
  const { t, lang } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(160deg, #ffffff 0%, #f5f0ff 15%, #fff8f0 40%, #ffe8c8 70%, #ffb347 100%)',
      }}
    >
      {/* Soft light blob effects like the poster */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(180, 210, 255, 0.35)' }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(180, 210, 255, 0.25)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255, 150, 50, 0.25)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255, 120, 0, 0.2)' }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-8 pb-6">

        {/* Blessing text row — just like the poster top */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm font-semibold font-marathi"
          style={{ color: '#7B3F00' }}>
          <span>|| जय महाकाल ||</span>
          <span>|| श्री गणेशाय नमः ||</span>
          <span>|| आई अंबे भवानी प्रसन्न ||</span>
        </div>

        {/* Main title — dark saffron like the poster */}
        <h1
          className="font-extrabold leading-tight mb-2 font-marathi"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            color: '#B22200',
            textShadow: '1px 2px 0px rgba(0,0,0,0.12)',
            letterSpacing: '-0.5px',
          }}
        >
          ठाकरे
        </h1>
        <h2
          className="font-extrabold leading-tight mb-4 font-marathi"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            color: '#B22200',
            textShadow: '1px 2px 0px rgba(0,0,0,0.12)',
          }}
        >
          टूर्स अँड ट्रॅव्हल्स
        </h2>

        {/* Tagline — poster style */}
        <p
          className="font-semibold mb-1 font-marathi text-lg sm:text-xl"
          style={{ color: '#4A1A00' }}
        >
          इनोवा, एर्टिगा, इको, गाडी योग्य दरात
        </p>
        <p
          className="font-semibold mb-6 font-marathi text-lg sm:text-xl"
          style={{ color: '#4A1A00' }}
        >
          भाड्याने मिळेल.
        </p>

        {/* Dotted separator like the poster */}
        <div className="flex items-center gap-1 mb-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#CC5500', opacity: 0.5 }} />
          ))}
        </div>

        {/* Cars row — 3 cars side by side like the poster */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full mb-8 items-end">
          {[
            { src: '/cars/Innoa.jpeg', label: 'Innova', labelMr: 'इनोवा' },
            { src: '/cars/echjpeg', label: 'Eeco', labelMr: 'इको' },
            { src: '/cars/erga.jpeg', label: 'Ertiga', labelMr: 'एर्टिगा' },
          ].map((car, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={car.src}
                alt={car.label}
                className="w-full max-w-[160px] sm:max-w-[220px] object-contain drop-shadow-xl"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.18))' }}
                onError={e => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>

        {/* "Providing new..." tagline */}
        <p className="text-base sm:text-lg font-medium mb-6" style={{ color: '#5A2D00' }}>
          {lang === 'mr'
            ? 'नवीन, स्वच्छ आणि किफायतशीर गाड्या...'
            : 'Providing new, sanitised and budget cars...'}
        </p>

        {/* Location badge — gold pill like poster */}
        <div className="mb-2">
          <span className="text-xs font-semibold px-5 py-1 rounded-full font-marathi"
            style={{ background: '#9B6B00', color: '#fff' }}>
            - ठिकाण -
          </span>
        </div>
        <div className="mb-8 px-6 py-3 rounded-xl font-marathi font-bold text-lg sm:text-2xl"
          style={{ background: '#FFD700', color: '#7B1A00', boxShadow: '0 4px 18px rgba(200,120,0,0.25)' }}>
          भिसेगाव ता. कर्जत जि. रायगड
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => setPage('book')}
            className="flex items-center gap-2 font-bold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #CC3300, #FF6A00)', color: '#fff' }}
          >
            🚘 {lang === 'mr' ? 'बुकिंग करा' : 'Book a Ride'}
          </button>
          <button
            onClick={() => setPage('cars')}
            className="font-bold text-base sm:text-lg px-8 py-4 rounded-2xl border-2 hover:scale-105 transition-all duration-300"
            style={{ borderColor: '#CC3300', color: '#CC3300', background: 'rgba(255,255,255,0.7)' }}
          >
            {lang === 'mr' ? 'गाड्या पाहा' : 'View Cars'} →
          </button>
        </div>
      </div>

      {/* Bottom contact bar — dark saffron/brown like the poster */}
      <div className="w-full mt-auto py-5 px-4" style={{ background: '#8B2500' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-white text-center">
          <span className="font-marathi font-semibold text-base sm:text-lg text-orange-100">संपर्क:</span>
          <span className="font-marathi font-bold text-xl sm:text-2xl" style={{ color: '#FFD700' }}>
            श्री.नरेश सुरेश ठाकरे
          </span>
          <a
            href="tel:+918169063703"
            className="font-bold text-xl sm:text-2xl hover:scale-105 transition-all"
            style={{ color: '#FFD700' }}
          >
            +91 8169063703
          </a>
          <div className="flex gap-3 mt-1 sm:mt-0">
            <a href="tel:+918169063703"
              className="flex items-center gap-2 bg-white font-bold px-5 py-2 rounded-xl hover:scale-105 transition-all text-sm shadow-lg"
              style={{ color: '#8B2500' }}>
              <Phone size={16} /> Call Now
            </a>
            <a href="https://wa.me/918169063703" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white font-bold px-5 py-2 rounded-xl hover:scale-105 transition-all text-sm shadow-lg">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
