import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView, useIsMobile } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

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

export default function AboutPreviewSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { ref: sectionRef, isInView: sectionVisible } = useInView({ threshold: 0.1 });
  const { ref: textRef, isInView: textVisible } = useInView({ threshold: 0.1 });
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <section ref={sectionRef} className="w-full bg-dark py-10 md:py-14 lg:py-16 relative overflow-hidden">
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

      <div className="w-full px-4 md:px-8 lg:px-16 max-w-6xl mx-auto relative z-10">
        {/* Full width image card with text overlay on top */}
        <div className={`relative w-full rounded-3xl overflow-hidden transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'}`}>
          {/* Wide horizontal image - responsive aspect ratio */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[2.5/1] overflow-hidden">
            <img
              src="https://public.readdy.ai/ai/img_res/edited_b49cdcbe206ee376ca88259ce47ce305_cb1b4c17.jpg"
              alt="Ahmed Magdy Anwar - Counseling Psychologist in Cairo"
              title="Ahmed Magdy Anwar - Counseling Psychologist"
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-top transition-all duration-1000 ${imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'}`}
            />
            {/* Dark overlay for text readability - stronger at bottom on mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-dark/20" />
            {/* Subtle animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-soft-blue/5 via-transparent to-soft-blue/5 animate-pulse-soft pointer-events-none" style={{ animationDuration: '6s' }} />
          </div>

          {/* Text content - positioned at bottom on mobile, more compact */}
          <div ref={textRef} className={`absolute inset-0 flex flex-col items-start justify-end px-4 sm:px-6 md:px-10 lg:px-16 pb-6 sm:pb-8 md:pb-10 transition-all duration-1000 delay-200 ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <span className="font-body text-[8px] sm:text-[9px] font-normal text-soft-blue uppercase tracking-widest mb-1.5 block animate-fade-in-up">
              {t('about_label')}
            </span>
            <h2 className="font-heading text-xs sm:text-sm md:text-base lg:text-xl font-normal text-white leading-snug mb-2 max-w-[200px] sm:max-w-md md:max-w-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {t('about_title')}
            </h2>

            <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-body text-[9px] sm:text-[10px] font-normal text-white hover:text-soft-blue transition-colors group/link active:scale-95 touch-manipulation"
              >
                {t('about_readMore')}
                <span className="w-4 h-4 flex items-center justify-center bg-soft-blue/20 rounded-full group-hover/link:bg-soft-blue group-hover/link:text-white group-hover/link:translate-x-1 transition-all duration-300">
                  <i className="ri-arrow-right-line text-[10px]" />
                </span>
              </Link>
            </div>
          </div>

          {/* Floating credential badge - hidden on mobile, shown on sm+ */}
          <div className="hidden sm:flex absolute bottom-4 right-4 md:bottom-6 md:right-8 bg-navy/90 backdrop-blur-sm rounded-xl px-4 py-3 items-center gap-3 border border-white/10 shadow-xl animate-float-slow cursor-default group/badge hover:shadow-2xl hover:shadow-soft-blue/20 transition-all duration-500">
            <span className="w-8 h-8 flex items-center justify-center bg-soft-blue rounded-full text-white group-hover/badge:scale-110 group-hover/badge:rotate-12 transition-all duration-500 animate-heartbeat">
              <i className="ri-shield-check-line text-sm" />
            </span>
            <div>
              <p className="font-heading text-xs font-semibold text-white">Certified Clinical Psychology</p>
              <p className="font-body text-[10px] text-white/60">AATC Program</p>
            </div>
          </div>
        </div>

        {/* Mobile-only badge card - below image */}
        <div className="sm:hidden mt-3 flex items-center gap-3 bg-navy/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 animate-fade-in-up">
          <span className="w-8 h-8 flex items-center justify-center bg-soft-blue rounded-full text-white animate-heartbeat">
            <i className="ri-shield-check-line text-sm" />
          </span>
          <div>
            <p className="font-heading text-xs font-semibold text-white">Certified Clinical Psychology</p>
            <p className="font-body text-[10px] text-white/60">AATC Program</p>
          </div>
        </div>

        {/* Mission cards below the image - dark glass style with stagger animation */}
        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <AnimatedCard delay={0}>
            <div className="glass-card glass-card-hover rounded-2xl p-5 md:p-6 border border-white/10 hover:border-soft-blue/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-soft-blue/10 active:scale-98 transition-all duration-500 group/card touch-manipulation relative overflow-hidden">
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover/card:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <span className="w-10 h-10 flex items-center justify-center bg-soft-blue/10 rounded-xl text-soft-blue mb-3 group-hover/card:bg-soft-blue group-hover/card:text-white transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-6">
                <i className="ri-mental-health-line text-lg" />
              </span>
              <h3 className="font-heading text-sm font-medium text-white mb-1 group-hover/card:text-soft-blue transition-colors duration-300">{t('about_missionLabel')}</h3>
              <p className="font-body text-xs text-white/60 leading-relaxed">{t('about_missionText')}</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={100}>
            <div className="glass-card glass-card-hover rounded-2xl p-5 md:p-6 border border-white/10 hover:border-soft-blue/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-soft-blue/10 active:scale-98 transition-all duration-500 group/card touch-manipulation relative overflow-hidden">
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover/card:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <span className="w-10 h-10 flex items-center justify-center bg-soft-blue/10 rounded-xl text-soft-blue mb-3 group-hover/card:bg-soft-blue group-hover/card:text-white transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-6">
                <i className="ri-award-line text-lg" />
              </span>
              <h3 className="font-heading text-sm font-medium text-white mb-1 group-hover/card:text-soft-blue transition-colors duration-300">Certified Professional</h3>
              <p className="font-body text-xs text-white/60 leading-relaxed">Professional accredited training with proven expertise in counseling and mental health.</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={200}>
            <div className="glass-card glass-card-hover rounded-2xl p-5 md:p-6 border border-white/10 hover:border-soft-blue/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-soft-blue/10 active:scale-98 transition-all duration-500 group/card touch-manipulation relative overflow-hidden">
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover/card:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <span className="w-10 h-10 flex items-center justify-center bg-soft-blue/10 rounded-xl text-soft-blue mb-3 group-hover/card:bg-soft-blue group-hover/card:text-white transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-6">
                <i className="ri-heart-pulse-line text-lg" />
              </span>
              <h3 className="font-heading text-sm font-medium text-white mb-1 group-hover/card:text-soft-blue transition-colors duration-300">Personalized Care</h3>
              <p className="font-body text-xs text-white/60 leading-relaxed">Tailored sessions designed around your unique needs and goals for lasting change.</p>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}