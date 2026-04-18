import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { t, lang } = useLanguage();
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-saffron-500 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            📍 {lang === 'mr' ? 'संपर्क' : 'Contact Us'}
          </span>
          <h2 className={`section-title text-gray-800 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('locationTitle')}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-saffron-500" size={24} />
                </div>
                <div>
                  <h3 className={`font-bold text-gray-800 mb-1 ${lang === 'mr' ? 'font-marathi' : ''}`}>
                    {lang === 'mr' ? 'पत्ता' : 'Address'}
                  </h3>
                  <p className={`text-gray-600 ${lang === 'mr' ? 'font-marathi' : ''}`}>{t('locationAddr')}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-saffron-500" size={24} />
                </div>
                <div>
                  <h3 className={`font-bold text-gray-800 mb-1 ${lang === 'mr' ? 'font-marathi' : ''}`}>
                    {t('contactName')}
                  </h3>
                  <a href="tel:+918169063703" className="text-saffron-500 font-bold text-xl hover:underline">
                    {t('contactPhone')}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex gap-4">
              <a href="tel:+918169063703"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-500 to-saffron-400 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-all shadow-lg">
                <Phone size={20} /> {lang === 'mr' ? 'कॉल करा' : 'Call Now'}
              </a>
              <a href="https://wa.me/918169063703?text=Hello%20Thakare%20Tours" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-all shadow-lg">
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>

            {/* Operating hours */}
            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
              <h4 className={`font-bold text-gray-800 mb-3 ${lang === 'mr' ? 'font-marathi' : ''}`}>
                {lang === 'mr' ? '⏰ सेवा वेळ' : '⏰ Operating Hours'}
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className={lang === 'mr' ? 'font-marathi' : ''}>{lang === 'mr' ? 'सोमवार - रविवार' : 'Monday - Sunday'}</span>
                  <span className="font-semibold text-green-600">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className={lang === 'mr' ? 'font-marathi' : ''}>{lang === 'mr' ? 'आपत्कालीन' : 'Emergency'}</span>
                  <span className="font-semibold text-green-600">{lang === 'mr' ? 'कधीही' : 'Anytime'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="card overflow-hidden h-96 lg:h-full min-h-80">
            <iframe
              title="Thakare Tours Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15097.83!2d73.32!3d18.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be9c4a5b8e3b1a1%3A0x4e9f7a3b8d5e2c0f!2sKarjat%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
