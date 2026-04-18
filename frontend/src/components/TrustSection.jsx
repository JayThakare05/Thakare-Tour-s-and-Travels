import { Shield, Clock, IndianRupee, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustSection() {
  const { t, lang } = useLanguage();

  const items = [
    { icon: <Shield size={32} />, titleKey: 'trust1Title', descKey: 'trust1Desc', color: 'bg-blue-50 text-blue-600' },
    { icon: <Star size={32} />, titleKey: 'trust2Title', descKey: 'trust2Desc', color: 'bg-purple-50 text-purple-600' },
    { icon: <IndianRupee size={32} />, titleKey: 'trust3Title', descKey: 'trust3Desc', color: 'bg-green-50 text-green-600' },
    { icon: <Clock size={32} />, titleKey: 'trust4Title', descKey: 'trust4Desc', color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-saffron-500 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            ✅ {lang === 'mr' ? 'विश्वास' : 'Trust & Quality'}
          </span>
          <h2 className={`section-title text-gray-800 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('trustTitle')}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="card p-6 text-center hover:-translate-y-2 transition-all duration-300">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                {item.icon}
              </div>
              <h3 className={`font-bold text-gray-800 text-lg mb-2 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t(item.titleKey)}</h3>
              <p className={`text-gray-500 text-sm leading-relaxed ${lang === 'mr' ? 'font-marathi' : ''}`}>{t(item.descKey)}</p>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {['✓ Sanitized & Safe', '✓ Licensed Vehicles', '✓ 24/7 Support', '✓ Transparent Pricing'].map(b => (
            <div key={b} className="flex items-center gap-2 bg-white border border-green-200 text-green-700 font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
