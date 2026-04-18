import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarsSection from './components/CarsSection';
import BookingForm from './components/BookingForm';
import FareCalculator from './components/FareCalculator';
import TrustSection from './components/TrustSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import StickyButtons from './components/StickyButtons';

function AppContent() {
  const isAdminUrl = new URLSearchParams(window.location.search).get('admin') === '1';
  const [page, setPage] = useState(isAdminUrl ? 'admin' : 'home');
  const [preselectedCar, setPreselectedCar] = useState('');

  // Keep URL clean after admin is loaded
  useEffect(() => {
    if (isAdminUrl) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleBookCar = (car) => {
    setPreselectedCar(car.name);
    setPage('book');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const renderPage = () => {
    switch (page) {
      case 'admin':
        return <AdminPanel />;
      case 'book':
        return (
          <>
            <div className="pt-16" />
            <BookingForm preselectedCar={preselectedCar} />
          </>
        );
      case 'cars':
        return (
          <>
            <div className="pt-16" />
            <CarsSection onBook={handleBookCar} />
          </>
        );
      case 'contact':
        return (
          <>
            <div className="pt-16" />
            <ContactSection />
          </>
        );
      default:
        return (
          <>
            <Hero setPage={setPage} />
            <CarsSection onBook={handleBookCar} />
            <FareCalculator />
            <TrustSection />
            <ContactSection />
          </>
        );
    }
  };

  const isAdmin = page === 'admin';

  return (
    <div className="min-h-screen">
      {!isAdmin && <Navbar currentPage={page} setPage={setPage} />}
      {isAdmin && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 h-16 flex items-center px-6 justify-between">
          <span className="text-white font-bold">🔧 Admin Mode</span>
          <button onClick={() => setPage('home')} className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Site
          </button>
        </div>
      )}

      <main>
        {renderPage()}
      </main>

      {!isAdmin && <Footer setPage={setPage} />}
      <StickyButtons />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
