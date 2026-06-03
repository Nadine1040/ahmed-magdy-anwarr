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

export default function CTASection() {
  const { t, i18n } = useTranslation();
  const phoneNumber = '201098945682';
  const message = encodeURIComponent(t('whatsapp_message'));
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const particles = [
    { delay: 0, size: 6, left: 20, top: 30, duration: 5 },
    { delay: 1.5, size: 10, left: 80, top: 20, duration: 7 },
    { delay: 0.5, size: 4, left: 70, top: 70, duration: 6 },
    { delay: 2, size: 8, left: 10, top: 60, duration: 8 },
    { delay: 1, size: 12, left: 50, top: 10, duration: 5 },
    { delay: 3, size: 6, left: 90, top: 50, duration: 7 },
    { delay: 0.8, size: 8, left: 40, top: 80, duration: 6 },
    { delay: 2.5, size: 4, left: 60, top: 40, duration: 5 },
  ];

  return (
    <section ref={ref} className="relative py-10 md:py-14 overflow-hidden bg-dark">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-soft-blue/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-soft-blue/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s', animationDuration: '6s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '4s', animationDuration: '10s' }} />

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

      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-gradient-to-br from-soft-blue/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-gradient-to-tl from-soft-blue/5 to-transparent pointer-events-none" />

      <div className={`relative z-10 w-full px-4 md:px-8 lg:px-16 max-w-4xl mx-auto text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug mb-4 animate-fade-in-up">
          {t('cta_title')}
        </h2>
        <p className="font-body text-base text-white/75 leading-relaxed mb-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <strong>{t('cta_subtitle')}</strong>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Link
            to="/booking"
            className="font-body text-sm font-medium bg-soft-blue text-white px-7 py-3 rounded-full hover:shadow-lg hover:shadow-soft-blue/30 hover:-translate-y-1 hover:scale-[1.03] active:scale-95 transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2 group animate-glow-pulse touch-manipulation"
          >
            {t('cta_bookBtn')}
            <span className="w-4 h-4 flex items-center justify-center bg-white text-soft-blue rounded-full group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <i className="ri-arrow-right-line text-xs" />
            </span>
          </Link>
          <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-body text-sm font-medium bg-transparent text-white border border-white/40 px-7 py-3 rounded-full hover:bg-white/15 hover:border-white/60 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03] active:scale-95 transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2 group touch-manipulation"
          >
            <span className="w-4 h-4 flex items-center justify-center text-green-400 group-hover:animate-wiggle">
              <i className="ri-whatsapp-line text-sm" />
            </span>
            {t('cta_whatsappBtn')}
          </a>
        </div>
      </div>
    </section>
  );
}