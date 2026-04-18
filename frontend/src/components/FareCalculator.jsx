import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CARS = [
  { name: 'Toyota Innova', nameMr: 'टोयोटा इनोवा', rate: 18, fuel: 'Diesel' },
  { name: 'Maruti Ertiga', nameMr: 'मारुती एर्टिगा', rate: 16, fuel: 'CNG/Diesel' },
  { name: 'Maruti Eeco Wagon', nameMr: 'मारुती इको वॅगनर', rate: 15, fuel: 'CNG' },
];

export default function FareCalculator() {
  const { t, lang } = useLanguage();
  const [distance, setDistance] = useState('');
  const [selectedCar, setSelectedCar] = useState(0);
  const [tripType, setTripType] = useState('one-way');

  const car = CARS[selectedCar];
  const dist = parseFloat(distance) || 0;
  const multiplier = tripType === 'round' ? 2 : 1;
  const baseFare = dist * car.rate * multiplier;
  const driverAllowance = dist > 150 ? 300 : 0;
  const toll = Math.round(dist * 0.5);
  const total = baseFare + driverAllowance + toll;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-orange-100 text-saffron-500 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            💰 {lang === 'mr' ? 'भाडे कॅल्क्युलेटर' : 'Fare Calculator'}
          </span>
          <h2 className={`text-3xl font-bold text-gray-800 mb-3 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('calcTitle')}</h2>
          <p className={`text-gray-500 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('calcSubtitle')}</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <div className="space-y-5">
            {/* Car select */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-2 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('calcCar')}</label>
              <div className="grid grid-cols-3 gap-3">
                {CARS.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCar(i)}
                    className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${selectedCar === i ? 'border-saffron-500 bg-orange-50 text-saffron-600' : 'border-gray-200 text-gray-600 hover:border-saffron-300'}`}
                  >
                    <div className={lang === 'mr' ? 'font-marathi text-xs' : 'text-xs'}>{lang === 'mr' ? c.nameMr : c.name}</div>
                    <div className="text-saffron-500 font-bold mt-1">₹{c.rate}/km</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Distance & Trip type */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('calcDistance')}</label>
                <input
                  type="number"
                  value={distance}
                  onChange={e => setDistance(e.target.value)}
                  min={1}
                  placeholder={lang === 'mr' ? 'किमी' : 'km'}
                  className="input-field"
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('fieldTrip')}</label>
                <select value={tripType} onChange={e => setTripType(e.target.value)} className="input-field">
                  <option value="one-way">{t('tripOneWay')}</option>
                  <option value="round">{t('tripRound')}</option>
                </select>
              </div>
            </div>

            {/* Estimate Output */}
            {dist > 0 && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 animate-fade-in">
                <h3 className={`text-center font-bold text-gray-700 mb-4 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('calcEstimate')}</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{lang === 'mr' ? 'बेस भाडे' : 'Base Fare'} ({dist} km × ₹{car.rate} × {multiplier})</span>
                    <span className="font-semibold">₹{baseFare.toLocaleString('en-IN')}</span>
                  </div>
                  {driverAllowance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">{lang === 'mr' ? 'चालक भत्ता' : 'Driver Allowance'}</span>
                      <span className="font-semibold">₹{driverAllowance}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">{lang === 'mr' ? 'अंदाजे टोल' : 'Approx. Toll'}</span>
                    <span className="font-semibold">₹{toll}</span>
                  </div>
                  <div className="border-t border-orange-200 pt-2 flex justify-between">
                    <span className="font-bold text-gray-700">{lang === 'mr' ? 'एकूण अंदाज' : 'Total Estimate'}</span>
                    <span className="font-extrabold text-saffron-500 text-xl">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <p className={`text-xs text-center text-gray-400 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('calcNote')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
