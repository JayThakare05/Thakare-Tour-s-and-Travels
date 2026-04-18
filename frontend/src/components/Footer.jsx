import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ setPage }) {
  const { lang } = useLanguage();
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-saffron-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">ठा</span>
              </div>
              <div>
                <p className={`font-bold text-lg leading-tight ${lang === 'mr' ? 'font-marathi' : ''}`}>
                  {lang === 'mr' ? 'ठाकरे टूर्स अँड ट्रॅव्हल्स' : 'Thakare Tours & Travels'}
                </p>
                <p className="text-gray-400 text-xs">{lang === 'mr' ? 'भिसेगाव, ता. कर्जत, जि. रायगड' : 'Bhisegaon, Karjat, Raigad'}</p>
              </div>
            </div>
            <p className={`text-gray-400 text-sm leading-relaxed ${lang === 'mr' ? 'font-marathi' : ''}`}>
              {lang === 'mr' ? 'नवीन, स्वच्छ आणि किफायतशीर गाड्या' : 'Providing new, sanitised and budget cars since 2020.'}
            </p>
            {/* Blessing text */}
            <div className={`mt-4 text-saffron-400 text-xs font-marathi space-y-0.5`}>
              <p>|| जय महाकाल || श्री गणेशाय नमः ||</p>
              <p>|| आई अंबे भवानी प्रसन्न ||</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              {lang === 'mr' ? 'जलद दुवे' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {[
                { key: 'home', labelEn: 'Home', labelMr: 'मुख्यपृष्ठ' },
                { key: 'cars', labelEn: 'Our Cars', labelMr: 'आमच्या गाड्या' },
                { key: 'book', labelEn: 'Book Now', labelMr: 'बुकिंग करा' },
                { key: 'contact', labelEn: 'Contact', labelMr: 'संपर्क' },
              ].map(link => (
                <li key={link.key}>
                  <button
                    onClick={() => setPage(link.key)}
                    className={`text-gray-400 hover:text-saffron-400 text-sm transition-colors ${lang === 'mr' ? 'font-marathi' : ''}`}
                  >
                    → {lang === 'mr' ? link.labelMr : link.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              {lang === 'mr' ? 'संपर्क' : 'Contact'}
            </h4>
            <div className="space-y-3">
              <p className={`text-gray-400 text-sm ${lang === 'mr' ? 'font-marathi' : ''}`}>
                {lang === 'mr' ? 'श्री. नरेश सुरेश ठाकरे' : 'Shri. Naresh Suresh Thakare'}
              </p>
              <a href="tel:+918169063703" className="flex items-center gap-2 text-saffron-400 font-bold hover:text-saffron-300 transition-colors">
                <Phone size={16} /> +91 8169063703
              </a>
              <a href="https://wa.me/918169063703" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 font-semibold hover:text-green-300 transition-colors text-sm">
                <MessageCircle size={16} /> WhatsApp Chat
              </a>
              <p className={`text-gray-500 text-xs mt-3 ${lang === 'mr' ? 'font-marathi' : ''}`}>
                {lang === 'mr' ? 'भिसेगाव, ता. कर्जत, जि. रायगड, महाराष्ट्र' : 'Bhisegaon, Tal. Karjat, Dist. Raigad, Maharashtra'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className={`text-gray-500 text-sm ${lang === 'mr' ? 'font-marathi' : ''}`}>
            {lang === 'mr' ? '© २०२४ ठाकरे टूर्स अँड ट्रॅव्हल्स. सर्व हक्क राखीव.' : '© 2024 Thakare Tours and Travels. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
