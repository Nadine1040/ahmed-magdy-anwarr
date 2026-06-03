import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView, useTilt, useScrollProgress, useIsMobile } from '@/hooks/useScrollAnimation';
import { useEffect, useState, useRef } from 'react';

function FloatingParticle({ delay, size, left, top, duration, color = 'soft-blue' }: { delay: number; size: number; left: number; top: number; duration: number; color?: string }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none animate-float ${color === 'white' ? 'bg-white/5' : 'bg-soft-blue/10'}`}
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        filter: 'blur(1px)',
      }}
    />
  );
}

function FloatingStar({ delay, size, left, top, duration }: { delay: number; size: number; left: number; top: number; duration: number }) {
  return (
    <div
      className="absolute rounded-full bg-white/20 pointer-events-none animate-twinkle"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(180, 123, 74, 0.15)`,
      }}
    />
  );
}

function FloatingHexagon({ delay, size, left, top, duration }: { delay: number; size: number; left: number; top: number; duration: number }) {
  return (
    <div
      className="absolute pointer-events-none animate-float-rotate"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0.04,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path
          d="M50 5 L93.3 30 L93.3 80 L50 105 L6.7 80 L6.7 30 Z"
          stroke="rgba(180, 123, 74, 0.5)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}

function LightBeam({ angle, delay }: { angle: number; delay: number }) {
  return (
    <div
      className="absolute pointer-events-none animate-beam"
      style={{
        width: '2px',
        height: '200%',
        top: '-50%',
        left: '50%',
        background: 'linear-gradient(to bottom, transparent, rgba(180, 123, 74, 0.04), transparent)',
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'center center',
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute w-full h-px bg-white"
          style={{
            top: `${(i + 1) * 8}%`,
            animation: `gridPulse 4s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute h-full w-px bg-white"
          style={{
            left: `${(i + 1) * 8}%`,
            animation: `gridPulse 4s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

function TextReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isInView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function TypeWriter({ text, delay = 0, speed = 50, className = '' }: { text: string; delay?: number; speed?: number; className?: string }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [started, displayText, text, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse-soft">|</span>}
    </span>
  );
}

function CountUp({ end, suffix = '', duration = 2000, delay = 0 }: { end: number; suffix?: string; duration?: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.5 });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const delayTimer = setTimeout(() => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [isInView, end, duration, delay]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer group">
      <span className="font-body text-[10px] text-white/40 group-hover:text-white/60 transition-colors">{''}</span>
      <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
        <div className="w-1 h-2 rounded-full bg-white/60 animate-scrollDown" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useIsMobile();
  const phoneNumber = '201098945682';
  const message = encodeURIComponent(t('whatsapp_message'));
  const { ref: tiltRef, transform, handleMouseMove, handleMouseLeave } = useTilt(8);
  const { ref: heroRef, progress } = useScrollProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!sectionRef.current || isMobile) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
  }, [isMobile]);

  const particles = [
    { delay: 0, size: 8, left: 15, top: 20, duration: 5 },
    { delay: 1.5, size: 12, left: 80, top: 15, duration: 7 },
    { delay: 0.5, size: 6, left: 70, top: 60, duration: 6 },
    { delay: 2, size: 10, left: 25, top: 70, duration: 8 },
    { delay: 1, size: 14, left: 90, top: 40, duration: 5 },
    { delay: 3, size: 8, left: 5, top: 45, duration: 7 },
    { delay: 0.8, size: 10, left: 50, top: 10, duration: 6 },
    { delay: 2.5, size: 6, left: 60, top: 80, duration: 5 },
    { delay: 4, size: 20, left: 35, top: 30, duration: 9, color: 'white' },
    { delay: 1.2, size: 16, left: 65, top: 75, duration: 8, color: 'white' },
    { delay: 3.5, size: 12, left: 10, top: 85, duration: 6, color: 'white' },
    { delay: 2.8, size: 18, left: 85, top: 55, duration: 10, color: 'white' },
  ];

  const stars = [
    { delay: 0, size: 2, left: 12, top: 18, duration: 3 },
    { delay: 1.5, size: 1, left: 78, top: 12, duration: 4 },
    { delay: 0.5, size: 3, left: 68, top: 58, duration: 3.5 },
    { delay: 2, size: 1.5, left: 22, top: 68, duration: 5 },
    { delay: 1, size: 2, left: 88, top: 38, duration: 3.2 },
    { delay: 3, size: 1, left: 8, top: 42, duration: 4.5 },
    { delay: 0.8, size: 2.5, left: 48, top: 8, duration: 3.8 },
    { delay: 2.5, size: 1, left: 58, top: 78, duration: 4.2 },
    { delay: 4, size: 2, left: 32, top: 28, duration: 5 },
    { delay: 1.2, size: 1.5, left: 72, top: 72, duration: 3.3 },
    { delay: 3.5, size: 1, left: 15, top: 82, duration: 4.8 },
    { delay: 2.8, size: 2, left: 82, top: 52, duration: 3.6 },
  ];

  const hexagons = [
    { delay: 0, size: 60, left: 8, top: 15, duration: 12 },
    { delay: 2, size: 80, left: 85, top: 70, duration: 15 },
    { delay: 1, size: 50, left: 75, top: 25, duration: 10 },
    { delay: 3, size: 70, left: 20, top: 80, duration: 14 },
    { delay: 1.5, size: 45, left: 45, top: 90, duration: 11 },
  ];

  const beams = [
    { angle: 25, delay: 0 },
    { angle: 45, delay: 1.5 },
    { angle: 65, delay: 3 },
    { angle: -25, delay: 2 },
    { angle: -45, delay: 4 },
  ];

  const parallaxOffset = progress * 50;

  return (
    <section
      ref={heroRef}
      className="w-full bg-dark min-h-screen flex items-center pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden relative"
    >
      {/* Background layers with parallax */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-navy transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div
        className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20dark%20premium%20background%20subtle%20texture%20minimal%20geometric%20patterns%20warm%20tones%20dark%20navy%20background%20elegant%20subtle%20light%20gradients%20no%20text%20no%20people%20high%20resolution&width=1920&height=1080&seq=hero-bg-dark-001&orientation=landscape')] bg-cover bg-center opacity-20 transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />

      {/* Animated grid */}
      <AnimatedGrid />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Animated gradient orbs with mouse parallax */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-blue/5 rounded-full blur-3xl animate-pulse-soft pointer-events-none transition-transform duration-700"
        style={{
          transform: `translateY(${-parallaxOffset * 0.3}px) translateX(${mousePosition.x * 40}px) translateY(${mousePosition.y * 40}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-soft-blue/3 rounded-full blur-3xl animate-pulse-soft pointer-events-none transition-transform duration-700"
        style={{
          animationDelay: '1s',
          transform: `translateY(${parallaxOffset * 0.2}px) translateX(${-mousePosition.x * 30}px) translateY(${-mousePosition.y * 30}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-soft-blue/3 rounded-full blur-3xl animate-pulse-soft pointer-events-none transition-transform duration-700"
        style={{
          animationDelay: '2s',
          transform: `translate(-50%, -50%) translateX(${mousePosition.x * 60}px) translateY(${mousePosition.y * 60}px)`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl animate-pulse-soft pointer-events-none transition-transform duration-700"
        style={{
          animationDelay: '3s',
          animationDuration: '8s',
          transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-soft-blue/[0.03] rounded-full blur-3xl animate-pulse-soft pointer-events-none transition-transform duration-700"
        style={{
          animationDelay: '1.5s',
          animationDuration: '10s',
          transform: `translateX(${-mousePosition.x * 25}px) translateY(${-mousePosition.y * 25}px)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Floating stars */}
      {stars.map((s, i) => (
        <FloatingStar key={`star-${i}`} {...s} />
      ))}

      {/* Floating hexagons */}
      {hexagons.map((h, i) => (
        <FloatingHexagon key={`hex-${i}`} {...h} />
      ))}

      {/* Light beams */}
      {beams.map((b, i) => (
        <LightBeam key={`beam-${i}`} {...b} />
      ))}

      {/* Rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-10">
        <div className="absolute inset-0 rounded-full border border-soft-blue/20 animate-spin-slow" />
        <div className="absolute inset-4 rounded-full border border-dashed border-soft-blue/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
      </div>

      {/* Second rotating ring - larger */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none opacity-5">
        <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: '25s' }} />
        <div className="absolute inset-8 rounded-full border border-dotted border-soft-blue/5 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
      </div>

      {/* Floating diagonal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`diag-${i}`}
            className="absolute h-px w-[200%] bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '-50%',
              transform: `rotate(-15deg)`,
              animation: `gridPulse 6s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Corner accent glows */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-soft-blue/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-soft-blue/5 to-transparent pointer-events-none" />

      <div className="w-full px-4 md:px-8 lg:px-16 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text with enhanced animations */}
          <div className={`${isRTL ? 'lg:order-2' : ''}`}>
            {/* Label with animated line */}
            <TextReveal delay={100} className="mb-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-soft-blue animate-width-expand" />
                <span className="font-body text-xs font-medium text-soft-blue uppercase tracking-widest">
                  {t('about_label')}
                </span>
                <div className="h-px w-8 bg-soft-blue animate-width-expand" style={{ animationDelay: '0.2s' }} />
              </div>
            </TextReveal>

            {/* Headline with character animation */}
            <div className="mb-5 overflow-hidden">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                <span className="text-gradient inline-block">
                  <TypeWriter text={t('hero_headline')} delay={300} speed={60} />
                </span>
              </h1>
              <div className="mt-3 h-0.5 bg-gradient-to-r from-soft-blue/50 via-soft-blue/20 to-transparent w-0 animate-width-expand" style={{ animationDelay: '1s', animationDuration: '1.5s' }} />
            </div>

            <TextReveal delay={600} className="mb-8">
              <p className="font-body text-base text-white/70 leading-relaxed max-w-lg animate-text-reveal">
                {t('hero_subtext')}
              </p>
            </TextReveal>

            {/* Stats counter */}
            <TextReveal delay={700} className="mb-6">
              <div className="flex gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-gradient">
                    <CountUp end={10} suffix="+" duration={2000} delay={800} />
                  </div>
                  <div className="font-body text-[10px] sm:text-xs text-white/50 mt-1">Years Experience</div>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-gradient">
                    <CountUp end={98} suffix="%" duration={2000} delay={1200} />
                  </div>
                  <div className="font-body text-[10px] sm:text-xs text-white/50 mt-1">Satisfaction</div>
                </div>
              </div>
            </TextReveal>

            {/* Mini credentials with enhanced hover and touch */}
            <TextReveal delay={800} className="mb-8">
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: 'ri-shield-check-line', text: t('nav_services') },
                  { icon: 'ri-award-line', text: t('about_missionLabel') },
                  { icon: 'ri-heart-pulse-line', text: t('about_visionLabel') },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:bg-white/10 hover:border-soft-blue/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-soft-blue/10 active:scale-95 transition-all duration-500 cursor-default group touch-manipulation animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="w-5 h-5 flex items-center justify-center text-soft-blue group-hover:animate-heartbeat">
                      <i className={`${item.icon} text-sm`} />
                    </span>
                    <span className="font-body text-xs text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>
            </TextReveal>

            <TextReveal delay={900} className="">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  to="/booking"
                  className="font-body text-sm font-medium bg-soft-blue text-white px-7 py-3 rounded-full hover:shadow-lg hover:shadow-soft-blue/30 hover:-translate-y-1 hover:scale-[1.03] active:scale-95 transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2 group animate-glow-pulse touch-manipulation"
                >
                  {t('hero_bookBtn')}
                  <span className="w-4 h-4 flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                    <i className={`${isRTL ? 'ri-arrow-left-line' : 'ri-arrow-right-line'} text-xs`} />
                  </span>
                </Link>
                <a
                  href={`https://wa.me/${phoneNumber}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-body text-sm font-medium bg-white/5 text-white border border-white/20 px-7 py-3 rounded-full hover:bg-white/15 hover:border-white/40 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03] active:scale-95 transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2 group touch-manipulation"
                >
                  <span className="w-4 h-4 flex items-center justify-center text-green-400 group-hover:animate-wiggle">
                    <i className="ri-whatsapp-line text-sm" />
                  </span>
                  {t('hero_contactBtn')}
                </a>
              </div>
            </TextReveal>
          </div>

          {/* Photo with 3D tilt - disabled on mobile */}
          <div className={`relative flex justify-center ${isRTL ? 'lg:order-1' : ''}`}>
            <div
              ref={isMobile ? undefined : tiltRef}
              onMouseMove={isMobile ? undefined : handleMouseMove}
              onMouseLeave={isMobile ? undefined : handleMouseLeave}
              className="relative w-full max-w-[320px] sm:max-w-[420px] group"
              style={{
                transform: isMobile ? undefined : transform,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Animated blob background */}
              <div className="absolute inset-0 bg-soft-blue/15 rounded-[3rem] -rotate-3 scale-95 translate-y-4 group-hover:rotate-0 group-hover:scale-100 group-hover:bg-soft-blue/25 transition-all duration-700 animate-morph" />
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-[3.5rem] border border-soft-blue/10 opacity-0 group-hover:opacity-100 group-hover:animate-glow-pulse transition-all duration-500 pointer-events-none" />
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 group-hover:border-soft-blue/30 transition-all duration-500">
                <img
                  src="https://static.readdy.ai/image/f6fdc0763ab361c6e2fc557f01e9705e/67da6a16bec6d43dbba06f1f282c3afc.jpeg"
                  alt="Ahmed Magdy Anwar - Counseling Psychologist in Cairo"
                  title="Ahmed Magdy Anwar - Counseling Psychologist"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
                {/* Corner glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-soft-blue/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
              </div>
              {/* Floating badge with enhanced animation */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-navy/90 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-5 sm:py-3 flex items-center gap-2 sm:gap-2.5 border border-white/10 shadow-xl animate-float hover:shadow-2xl hover:shadow-soft-blue/20 transition-all duration-500 cursor-default group/badge touch-manipulation">
                <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-soft-blue rounded-full text-white group-hover/badge:scale-125 group-hover/badge:rotate-12 transition-all duration-500">
                  <i className="ri-shield-check-line text-xs sm:text-sm" />
                </span>
                <div>
                  <p className="font-heading text-[10px] sm:text-xs font-semibold text-white">Certified Clinical Psychology</p>
                  <p className="font-body text-[8px] sm:text-[10px] text-white/60">AATC Program</p>
                </div>
              </div>
              {/* Second floating badge */}
              <div className="absolute -top-2 right-0 sm:right-4 bg-navy/90 backdrop-blur-sm rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 flex items-center gap-1.5 sm:gap-2 border border-white/10 shadow-xl animate-float hover:shadow-2xl hover:shadow-soft-blue/20 transition-all duration-500 cursor-default group/badge2 touch-manipulation"
                style={{ animationDelay: '1.5s', animationDuration: '7s' }}
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-green-500/20 rounded-full text-green-400 group-hover/badge2:scale-110 transition-all duration-500">
                  <i className="ri-user-smile-line text-xs" />
                </span>
                <div>
                  <p className="font-heading text-[9px] sm:text-[10px] font-semibold text-white">Online Sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}