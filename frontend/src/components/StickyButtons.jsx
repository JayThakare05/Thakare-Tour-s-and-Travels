import { MessageCircle } from 'lucide-react';

export default function StickyButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/918169063703?text=Hello%20Thakare%20Tours%2C%20I%20want%20to%20book%20a%20car"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-glow"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
      {/* Call */}
      <a
        href="tel:+918169063703"
        className="w-14 h-14 bg-gradient-to-r from-saffron-500 to-saffron-400 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
        title="Call Now"
      >
        <span className="text-xl">📞</span>
      </a>
    </div>
  );
}
