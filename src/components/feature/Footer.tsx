import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useScrollAnimation';

function FloatingParticle({ delay, size, left, top, duration }: { delay: number; size: number; left: number; top: number; duration: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none animate-float"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background: 'rgba(180, 123, 74, 0.08)',
        filter: 'blur(1px)',
      }}
    />
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const phoneNumber = '201098945683';
  const message = encodeURIComponent(t('whatsapp_message'));
  const { ref: footerRef, isInView: footerVisible } = useInView({ threshold: 0.05 });

  const particles = [
    { delay: 0, size: 4, left: 20, top: 30, duration: 5 },
    { delay: 1.5, size: 6, left: 80, top: 20, duration: 7 },
    { delay: 0.5, size: 3, left: 70, top: 70, duration: 6 },
    { delay: 2, size: 5, left: 10, top: 60, duration: 8 },
    { delay: 1, size: 8, left: 50, top: 10, duration: 5 },
    { delay: 3, size: 4, left: 90, top: 50, duration: 7 },
  ];

  return (
    <footer ref={footerRef} className="bg-dark text-white border-t border-white/10 relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse-soft" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse-soft" style={{ animationDelay: '1.5s', animationDuration: '10s' }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <div className={`w-full px-4 md:px-8 lg:px-16 py-14 md:py-20 relative z-10 transition-all duration-1000 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-2xl mb-4 text-white hover:text-soft-blue transition-colors duration-300 cursor-default animate-fade-in-up">
              <span className="text-gradient">Ahmed Magdy Anwar</span>
            </h3>
            <p className="font-body text-sm text-light-text leading-relaxed max-w-xs animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {t('footer_tagline')}
            </p>
            <p className="font-body text-xs text-light-text/50 mt-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              {t('common_privacyNote')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-medium text-base mb-5 text-white animate-fade-in-up">
              {t('footer_quickLinks')}
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="font-body text-sm text-light-text hover:text-white hover:translate-x-2 active:scale-95 transition-all duration-300 group/link touch-manipulation animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <i className="ri-arrow-right-s-line text-soft-blue opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 mr-1" />
                {t('nav_home')}
              </Link>
              <Link to="/about" className="font-body text-sm text-light-text hover:text-white hover:translate-x-2 active:scale-95 transition-all duration-300 group/link touch-manipulation animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <i className="ri-arrow-right-s-line text-soft-blue opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 mr-1" />
                {t('nav_about')}
              </Link>
              <Link to="/booking" className="font-body text-sm text-light-text hover:text-white hover:translate-x-2 active:scale-95 transition-all duration-300 group/link touch-manipulation animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <i className="ri-arrow-right-s-line text-soft-blue opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 mr-1" />
                {t('nav_booking')}
              </Link>
              <Link to="/contact" className="font-body text-sm text-light-text hover:text-white hover:translate-x-2 active:scale-95 transition-all duration-300 group/link touch-manipulation animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <i className="ri-arrow-right-s-line text-soft-blue opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 mr-1" />
                {t('nav_contact')}
              </Link>
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-heading font-medium text-base mb-5 text-white animate-fade-in-up">
              {t('footer_followUs')}
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-lg shadow-transparent hover:shadow-[#25D366]/20 touch-manipulation animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
                aria-label="WhatsApp"
              >
                <i className="ri-whatsapp-line text-xl animate-heartbeat" />
              </a>
              <a
                href="https://www.instagram.com/ahmedmagdyanwar_?igsh=MTZ6dTk1aDN4YjJkOQ=="
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-lg shadow-transparent hover:shadow-[#E4405F]/20 touch-manipulation animate-fade-in-up"
                style={{ animationDelay: '150ms' }}
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-xl animate-heartbeat" />
              </a>
              <a
                href="https://www.tiktok.com/@ahmedmagdyanwar_?_r=1&_t=ZS-96UNkWYwtOC"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-charcoal hover:border-white hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-lg shadow-transparent hover:shadow-white/20 touch-manipulation animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
                aria-label="TikTok"
              >
                <i className="ri-tiktok-line text-xl animate-heartbeat" />
              </a>
              <a
                href="https://www.facebook.com/share/1DTj8KciCK/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-lg shadow-transparent hover:shadow-[#1877F2]/20 touch-manipulation animate-fade-in-up"
                style={{ animationDelay: '250ms' }}
                aria-label="Facebook"
              >
                <i className="ri-facebook-circle-line text-xl animate-heartbeat" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <p className="font-body text-xs text-light-text/40">
            &copy; {new Date().getFullYear()} <span className="text-soft-blue/60">Ahmed Magdy Anwar</span>. {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}