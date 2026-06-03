import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const { t, i18n } = useTranslation();
  const phoneNumber = '201098945682';
  const message = encodeURIComponent(t('whatsapp_message'));
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const isRTL = i18n.language === 'ar';
  const [isVisible, setIsVisible] = useState(false);

  // Show button after 1s delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`fixed bottom-6 z-40 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/20 hover:shadow-2xl hover:shadow-[#25D366]/30 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center gap-2 px-4 sm:px-5 py-3 font-body text-sm font-medium group no-tap-highlight touch-manipulation ${
        isRTL ? 'left-6' : 'right-6'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionProperty: 'opacity, transform, background, box-shadow, scale' }}
    >
      <span className="w-5 h-5 flex items-center justify-center group-hover:animate-wiggle">
        <i className="ri-whatsapp-line text-lg"></i>
      </span>
      <span className="hidden sm:inline whitespace-nowrap">
        {t('hero_contactBtn')}
      </span>
      {/* Ping effect */}
      <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-ping-slow"></span>
      <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
    </a>
  );
}