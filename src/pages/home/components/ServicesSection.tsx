import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView, useTilt, useIsMobile } from '@/hooks/useScrollAnimation';

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

function AnimatedCard({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { ref: headerRef, isInView: headerVisible } = useInView({ threshold: 0.1 });
  const { ref: tiltRef, transform, handleMouseMove, handleMouseLeave } = useTilt(6);

  const particles = [
    { delay: 0, size: 6, left: 15, top: 25, duration: 5 },
    { delay: 1.5, size: 10, left: 80, top: 20, duration: 7 },
    { delay: 0.5, size: 4, left: 70, top: 65, duration: 6 },
    { delay: 2, size: 8, left: 25, top: 75, duration: 8 },
    { delay: 1, size: 12, left: 90, top: 45, duration: 5 },
    { delay: 3, size: 6, left: 5, top: 50, duration: 7 },
    { delay: 0.8, size: 8, left: 50, top: 15, duration: 6 },
    { delay: 2.5, size: 4, left: 60, top: 85, duration: 5 },
  ];

  const service = {
    icon: 'ri-mental-health-line',
    title: t('services_counselingTitle'),
    description: t('services_counselingDesc'),
    color: 'bg-soft-blue text-white',
  };

  return (
    <section className="w-full bg-dark py-10 md:py-14 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-blue/5 rounded-full blur-3xl animate-pulse-soft pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-soft-blue/3 rounded-full blur-3xl animate-pulse-soft pointer-events-none" style={{ animationDelay: '1s', animationDuration: '10s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl animate-pulse-soft pointer-events-none" style={{ animationDelay: '2s', animationDuration: '12s' }} />

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

      <div className="w-full px-4 md:px-8 lg:px-16 max-w-3xl mx-auto relative z-10">
        {/* Header with shimmer accent */}
        <div ref={headerRef} className={`text-center mb-10 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-body text-xs font-medium text-soft-blue uppercase tracking-widest mb-3 block animate-fade-in-up">
            {t('services_subtitle')}
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('services_title')}
          </h2>
          <div className={`w-16 h-0.5 bg-soft-blue mx-auto mt-4 transition-all duration-1000 ${headerVisible ? 'scale-x-100' : 'scale-x-0'}`} />
        </div>

        {/* Card with 3D tilt and glow border - disabled on mobile */}
        <AnimatedCard delay={200}>
          <div
            ref={isMobile ? undefined : tiltRef}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
            className={`glass-card glass-card-hover rounded-2xl p-6 md:p-8 flex flex-col group cursor-pointer active:scale-98 touch-manipulation relative overflow-hidden`}
            style={{ 
              transform: isMobile ? undefined : transform, 
              transition: 'transform 0.3s ease-out, background 0.5s, border-color 0.5s, box-shadow 0.5s' 
            }}
          >
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
            <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${service.color} mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-soft-blue/20 relative z-10`}>
              <span className="w-7 h-7 flex items-center justify-center group-hover:animate-heartbeat">
                <i className={`${service.icon} text-2xl`} />
              </span>
            </div>
            <h3 className="font-heading text-lg font-semibold text-white mb-3 group-hover:text-soft-blue transition-colors duration-300 relative z-10">
              {service.title}
            </h3>
            <p className="font-body text-sm text-white/70 leading-relaxed flex-grow mb-6 relative z-10">
              <strong>{service.description}</strong>
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <Link
                to="/booking"
                className="font-body text-xs font-medium bg-soft-blue text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-dark hover:shadow-lg hover:shadow-soft-blue/20 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap group/btn touch-manipulation animate-glow-pulse"
              >
                <span className="inline-flex items-center gap-1">
                  {t('services_bookNow')}
                  <i className="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}