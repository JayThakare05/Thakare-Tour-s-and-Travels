import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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

// ── Main site pages (home / book / cars / contact) ───────────────────────────
function MainSite() {
  const [page, setPage] = useState('home');
  const [preselectedCar, setPreselectedCar] = useState('');

  const handleBookCar = (car) => {
    setPreselectedCar(car.name);
    setPage('book');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const renderPage = () => {
    switch (page) {
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

  return (
    <div className="min-h-screen">
      <Navbar currentPage={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
      <StickyButtons />
    </div>
  );
}

// ── Protected Admin Route ─────────────────────────────────────────────────────
function AdminRoute() {
  return (
    <div className="min-h-screen">
      <AdminPanel />
      <StickyButtons />
    </div>
  );
}

// ── Root App with Router ──────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminRoute />} />
          {/* Redirect any unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
