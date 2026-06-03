import { useTranslation } from 'react-i18next';
import { useInView, useIsMobile } from '@/hooks/useScrollAnimation';

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
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function WhyChooseSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { ref: headerRef, isInView: headerVisible } = useInView({ threshold: 0.1 });

  const particles = [
    { delay: 0, size: 6, left: 10, top: 20, duration: 5 },
    { delay: 1.5, size: 10, left: 85, top: 15, duration: 7 },
    { delay: 0.5, size: 4, left: 75, top: 60, duration: 6 },
    { delay: 2, size: 8, left: 20, top: 70, duration: 8 },
    { delay: 1, size: 12, left: 90, top: 40, duration: 5 },
    { delay: 3, size: 6, left: 5, top: 45, duration: 7 },
    { delay: 0.8, size: 8, left: 50, top: 10, duration: 6 },
    { delay: 2.5, size: 4, left: 60, top: 80, duration: 5 },
  ];

  const reasons = [
    {
      icon: 'ri-lock-line',
      title: 'Privacy First',
      description: t('why_privacy'),
    },
    {
      icon: 'ri-briefcase-line',
      title: 'Proven Experience',
      description: t('why_experience'),
    },
    {
      icon: 'ri-award-line',
      title: 'Certified Professional',
      description: t('why_certified'),
    },
    {
      icon: 'ri-heart-pulse-line',
      title: 'Personalized Care',
      description: t('why_personalized'),
    },
  ];

  return (
    <section className="w-full bg-dark py-12 md:py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse-soft" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse-soft" style={{ animationDelay: '1.5s', animationDuration: '10s' }} />
      <div className="absolute top-1/4 right-1/3 w-56 h-56 bg-white/[0.02] rounded-full blur-3xl pointer-events-none animate-pulse-soft" style={{ animationDelay: '3s', animationDuration: '12s' }} />

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

      <div className="w-full px-4 md:px-8 lg:px-16 max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="font-body text-xs font-medium text-soft-blue uppercase tracking-widest mb-3 block animate-fade-in-up">
            Trust & Excellence
          </span>
          <h2 className={`font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t('why_title')}
          </h2>
          <div className={`w-16 h-0.5 bg-soft-blue/50 mx-auto transition-all duration-700 ${headerVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: '300ms' }} />
        </div>

        {/* Grid with enhanced cards and stagger animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <div className="glass-card glass-card-hover rounded-2xl p-6 hover:-translate-y-3 hover:shadow-lg hover:shadow-soft-blue/10 active:scale-98 active:translate-y-0 transition-all duration-500 group cursor-pointer touch-manipulation relative overflow-hidden">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
                {/* Icon with glow ring */}
                <div className="relative w-14 h-14 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-500">
                  <div className="absolute inset-0 bg-soft-blue/10 rounded-xl group-hover:bg-soft-blue/20 transition-all duration-500 animate-morph" />
                  <div className="absolute inset-0 bg-white/5 rounded-xl group-hover:bg-soft-blue/30 transition-all duration-500" />
                  <span className="w-7 h-7 flex items-center justify-center text-soft-blue group-hover:text-white transition-colors duration-300 relative z-10 animate-heartbeat" style={{ animationDelay: `${index * 200}ms` }}>
                    <i className={`${reason.icon} text-xl`} />
                  </span>
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-2 group-hover:text-soft-blue transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  <strong>{reason.description}</strong>
                </p>
                {/* Animated bottom line */}
                <div className="mt-4 h-0.5 bg-soft-blue/0 group-hover:bg-soft-blue/40 transition-all duration-500 rounded-full" />
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}