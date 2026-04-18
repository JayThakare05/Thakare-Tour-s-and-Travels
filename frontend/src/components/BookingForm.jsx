import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const API = 'http://localhost:5000/api';
const CARS_LIST = [
  { value: '', labelEn: 'Any Available', labelMr: 'कोणतीही उपलब्ध' },
  { value: 'Toyota Innova', labelEn: 'Toyota Innova (₹18/km)', labelMr: 'टोयोटा इनोवा (₹18/किमी)' },
  { value: 'Maruti Ertiga', labelEn: 'Maruti Ertiga (₹16/km)', labelMr: 'मारुती एर्टिगा (₹16/किमी)' },
  { value: 'Maruti Eeco Wagon', labelEn: 'Maruti Eeco Wagon (₹15/km)', labelMr: 'मारुती इको वॅगनर (₹15/किमी)' },
];

export default function BookingForm({ preselectedCar = '' }) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({
    name: '', phone: '', pickupCity: '', destinationCity: '',
    date: '', tripType: 'one-way', carName: preselectedCar, passengers: 2, notes: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/bookings`, form);
      setStatus('success');
      setForm({ name: '', phone: '', pickupCity: '', destinationCity: '', date: '', tripType: 'one-way', carName: '', passengers: 2, notes: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="book" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-orange-100 text-saffron-500 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            📝 {lang === 'mr' ? 'बुकिंग' : 'Booking'}
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-3 ${lang === 'mr' ? 'font-marathi' : ''}`}>
            {t('bookTitle')}
          </h2>
          <p className={`text-gray-500 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('bookSubtitle')}</p>
        </div>

        <div className="card p-8 animate-slide-up">
          {status === 'success' && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-xl">
              <p className={`font-medium ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('successMsg')}</p>
              <p className="text-sm mt-1">Contact: <strong>+91 8169063703</strong></p>
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl">
              <p className={`font-medium ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('errorMsg')}</p>
              <a href="tel:+918169063703" className="text-sm underline">+91 8169063703</a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldName')} *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={lang === 'mr' ? 'तुमचे पूर्ण नाव' : 'Your full name'} className="input-field" />
              </div>
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldPhone')} *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required pattern="[6-9]\d{9}" placeholder="9XXXXXXXXX" className="input-field" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldPickup')} *</label>
                <input type="text" name="pickupCity" value={form.pickupCity} onChange={handleChange} required placeholder={lang === 'mr' ? 'सुरुवात ठिकाण' : 'e.g. Karjat, Mumbai'} className="input-field" />
              </div>
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldDest')} *</label>
                <input type="text" name="destinationCity" value={form.destinationCity} onChange={handleChange} required placeholder={lang === 'mr' ? 'गंतव्य ठिकाण' : 'e.g. Pune, Nashik'} className="input-field" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldDate')} *</label>
                <input type="date" name="date" value={form.date} min={today} onChange={handleChange} required className="input-field" />
              </div>
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldTrip')} *</label>
                <select name="tripType" value={form.tripType} onChange={handleChange} className="input-field">
                  <option value="one-way">{t('tripOneWay')}</option>
                  <option value="round">{t('tripRound')}</option>
                  <option value="local">{t('tripLocal')}</option>
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldCar')}</label>
                <select name="carName" value={form.carName} onChange={handleChange} className="input-field">
                  {CARS_LIST.map(c => <option key={c.value} value={c.value}>{lang === 'mr' ? c.labelMr : c.labelEn}</option>)}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldPassengers')}</label>
                <input type="number" name="passengers" value={form.passengers} onChange={handleChange} min={1} max={8} className="input-field" />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldNotes')}</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder={lang === 'mr' ? 'कोणतीही विशेष आवश्यकता...' : 'Any special requirements...'} className="input-field resize-none" />
            </div>

            <button type="submit" disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-saffron-500 to-saffron-400 text-white hover:shadow-saffron-500/30 hover:scale-[1.02] active:scale-95'}`}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('submitting')}
                </span>
              ) : `🚘 ${t('btnSubmit')}`}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3 justify-center text-sm text-gray-500">
            <span>{lang === 'mr' ? 'किंवा थेट संपर्क करा:' : 'Or contact directly:'}</span>
            <a href="tel:+918169063703" className="text-saffron-500 font-semibold hover:underline">📞 +91 8169063703</a>
            <a href="https://wa.me/918169063703" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}
