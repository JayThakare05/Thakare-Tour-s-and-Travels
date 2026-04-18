import { useState, useEffect } from 'react';
import FALLBACK_CARS from '../data/cars.json';
import { Phone, MessageCircle, Star, Users, Fuel, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const API = 'http://localhost:5000/api';



function CarCard({ car, onBook, lang, t }) {
  const name = lang === 'mr' ? (car.nameMarathi || car.name) : car.name;
  const fuel = lang === 'mr' ? (car.fuelTypeMarathi || car.fuelType) : car.fuelType;
  const badge = lang === 'mr' ? (car.badgeMarathi || car.badge) : car.badge;
  const features = lang === 'mr' ? (car.featuresMarathi || car.features) : car.features;

  return (
    <div className="car-card card group animate-slide-up">
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-saffron-500 to-saffron-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {badge}
          </span>
        </div>
      )}

      {/* Availability dot */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
        <span className={`w-2.5 h-2.5 rounded-full ${car.available ? 'bg-green-500 status-dot-available' : 'bg-red-500'}`} />
        <span className={`text-xs font-semibold ${car.available ? 'text-green-700' : 'text-red-600'}`}>
          {car.available ? t('available') : t('notAvailable')}
        </span>
      </div>

      {/* Car Image */}
      <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 h-48 overflow-hidden flex items-center justify-center pt-4">
        <img
          src={car.image}
          alt={name}
          className="car-image h-40 object-contain drop-shadow-lg"
          onError={e => {
            e.target.src = `https://via.placeholder.com/300x160/FF6A00/ffffff?text=${encodeURIComponent(name)}`;
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`text-xl font-bold text-gray-800 ${lang === 'mr' ? 'font-marathi' : ''}`}>
            {name}
          </h3>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Users size={14} className="text-saffron-500" />
            <span>{car.capacity} {t('capacity')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel size={14} className="text-saffron-500" />
            <span className={lang === 'mr' ? 'font-marathi' : ''}>{fuel}</span>
          </div>
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(features || []).slice(0, 4).map((f, i) => (
              <span
                key={i}
                className={`bg-orange-50 text-saffron-600 text-xs px-2.5 py-1 rounded-lg font-medium ${lang === 'mr' ? 'font-marathi' : ''}`}
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-3xl font-extrabold text-saffron-500">₹{car.pricePerKm}</span>
            <span className="text-gray-400 text-sm ml-1">{t('pricePerKm')}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => car.available && onBook(car)}
            disabled={!car.available}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              car.available
                ? 'btn-primary'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            🚘 {t('btnBook')}
          </button>
          <a
            href="tel:+918169063703"
            className="flex items-center justify-center gap-2 border-2 border-saffron-500 text-saffron-500 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-saffron-50 transition-all duration-200"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">{t('btnCall')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CarsSection({ onBook }) {
  const { t, lang } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/cars`)
      .then(res => setCars(res.data))
      .catch(() => setCars(FALLBACK_CARS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="cars" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-saffron-500 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            🚘 {lang === 'mr' ? 'आमच्या गाड्या' : 'Our Fleet'}
          </span>
          <h2 className={`section-title bg-gradient-to-r from-saffron-600 to-saffron-400 bg-clip-text text-transparent ${lang === 'mr' ? 'font-marathi' : ''}`}>
            {t('carsTitle')}
          </h2>
          <p className={`section-subtitle ${lang === 'mr' ? 'font-marathi' : ''}`}>
            {t('carsSubtitle')}
          </p>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="card h-96 shimmer" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {cars.map(car => (
              <div key={car._id} className="relative">
                <CarCard car={car} onBook={onBook} lang={lang} t={t} />
              </div>
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-green-400 rounded-3xl p-8 text-center text-white">
          <MessageCircle size={40} className="mx-auto mb-3 animate-bounce" />
          <h3 className="text-2xl font-bold mb-2">
            {lang === 'mr' ? 'व्हॉट्सअ‍ॅपवर संपर्क करा' : 'Chat on WhatsApp'}
          </h3>
          <p className="text-green-100 mb-5">
            {lang === 'mr' ? 'त्वरित बुकिंगसाठी आत्ताच संपर्क करा' : 'Get instant booking confirmation on WhatsApp'}
          </p>
          <a
            href="https://wa.me/918169063703?text=Hello%2C%20I%20want%20to%20book%20a%20car%20from%20Thakare%20Tours%20and%20Travels"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-600 font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <MessageCircle size={20} />
            WhatsApp: +91 8169063703
          </a>
        </div>
      </div>
    </section>
  );
}
