import { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ currentPage, setPage }) {
  const { t, toggleLang, lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'home', label: t('navHome') },
    { key: 'cars', label: t('navCars') },
    { key: 'book', label: t('navBook') },
    { key: 'contact', label: t('navContact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gradient-to-r from-saffron-600 to-saffron-500 shadow-lg shadow-saffron-500/20' 
                : 'bg-gradient-to-r from-saffron-500 to-saffron-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setPage('home')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-saffron-500 font-bold text-sm">ठा</span>
            </div>
            <div className="hidden sm:block">
              <p className={`font-bold text-white text-sm leading-tight ${lang === 'mr' ? 'font-marathi' : ''}`}>
                {lang === 'mr' ? 'ठाकरे टूर्स' : 'Thakare Tours'}
              </p>
              <p className="text-white/80 text-xs leading-tight">& Travels</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`nav-link text-sm font-medium pb-1 ${
                  currentPage === item.key ? 'text-white border-b-2 border-white' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <Globe size={14} />
              {t('langToggle')}
            </button>
            <a
              href="tel:+918169063703"
              className="hidden sm:flex items-center gap-1.5 bg-white text-saffron-500 font-semibold text-xs px-3 py-1.5 rounded-full hover:scale-105 transition-all duration-200 shadow-md"
            >
              <Phone size={14} />
              Call Now
            </a>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-saffron-600 border-t border-white/10 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => { setPage(item.key); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-white font-medium text-sm transition-all ${
                  currentPage === item.key ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+918169063703"
              className="flex items-center gap-2 w-full px-4 py-3 bg-white text-saffron-500 rounded-xl font-semibold text-sm mt-2"
            >
              <Phone size={16} />
              +91 8169063703
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
