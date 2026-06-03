import { useTranslation } from 'react-i18next';
import { useInView, useTilt, useIsMobile } from '@/hooks/useScrollAnimation';
import { useSEO } from '@/hooks/useSEO';

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

function AnimatedSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
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

export default function About() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useIsMobile();

  useSEO({
    title: 'About Ahmed Magdy Anwar | Counseling Psychologist',
    description:
      'Learn about Ahmed Magdy Anwar, certified counseling psychologist. Education, certifications, experience & expertise in Cairo.',
    canonicalPath: '/about',
    ogType: 'profile',
    ogImage:
      'https://ahmedmagdyanwar.my.canva.site/_assets/media/61e2b894eae94fbd7dbb17bec281e93a.png',
    structuredData: {
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Ahmed Magdy Anwar',
        jobTitle: 'Counseling Psychologist',
        description:
          'Professional counseling psychologist helping individuals achieve better mental well-being and personal growth in Cairo, Egypt.',
        url: '/about',
        image:
          'https://ahmedmagdyanwar.my.canva.site/_assets/media/61e2b894eae94fbd7dbb17bec281e93a.png',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cairo',
          addressCountry: 'EG',
        },
        telephone: '+201098945682',
        sameAs: [
          'https://www.instagram.com/ahmedmagdyanwar_',
          'https://www.tiktok.com/@ahmedmagdyanwar_',
          'https://www.facebook.com/share/1DTj8KciCK',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Certification',
            name: 'Certified Clinical Psychology',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Ein-Shams University',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Certification',
            name: 'AATC Program',
            recognizedBy: {
              '@type': 'Organization',
              name: 'AATC Program',
            },
          },
        ],
        knowsAbout: [
          'Clinical Psychology',
          'Cognitive Behavioral Therapy',
          'Family Counseling',
          'Marriage Counseling',
          'Mental Health',
          'Positive Psychology',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Ahmed Magdy Anwar Counseling',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cairo',
            addressCountry: 'EG',
          },
        },
      },
    },
  });

  const particles = [
    { delay: 0, size: 6, left: 10, top: 15, duration: 5 },
    { delay: 1.5, size: 10, left: 85, top: 10, duration: 7 },
    { delay: 0.5, size: 4, left: 75, top: 55, duration: 6 },
    { delay: 2, size: 8, left: 20, top: 65, duration: 8 },
    { delay: 1, size: 12, left: 90, top: 35, duration: 5 },
    { delay: 3, size: 6, left: 5, top: 40, duration: 7 },
    { delay: 0.8, size: 8, left: 50, top: 10, duration: 6 },
    { delay: 2.5, size: 4, left: 60, top: 75, duration: 5 },
    { delay: 1.2, size: 6, left: 30, top: 80, duration: 6 },
    { delay: 3.5, size: 10, left: 70, top: 25, duration: 8 },
    { delay: 0.3, size: 8, left: 15, top: 45, duration: 7 },
    { delay: 4, size: 5, left: 80, top: 70, duration: 6 },
  ];

  const credentials = [
    { icon: 'ri-graduation-cap-line', label: t('about_education_label'), text: t('about_education_text') },
    { icon: 'ri-award-line', label: t('about_certification_label'), text: t('about_certification_text') },
    { icon: 'ri-building-line', label: t('about_membership_label'), text: t('about_membership_text') },
  ];

  const expertiseList = t('about_expertise_items').split('|');

  const experiences = [
    { icon: 'ri-hospital-line', title: t('about_exp_title_1'), org: t('about_exp_org_1'), date: t('about_exp_date_1'), text: t('about_exp_1') },
    { icon: 'ri-briefcase-4-line', title: t('about_exp_title_2'), org: t('about_exp_org_2'), date: t('about_exp_date_2'), text: t('about_exp_2') },
    { icon: 'ri-team-line', title: t('about_exp_title_3'), org: t('about_exp_org_3'), date: t('about_exp_date_3'), text: t('about_exp_3') },
    { icon: 'ri-heart-pulse-line', title: t('about_exp_title_4'), org: t('about_exp_org_4'), date: t('about_exp_date_4'), text: t('about_exp_4') },
  ];

  const { ref: credTiltRef, transform: credTransform, handleMouseMove: credMouseMove, handleMouseLeave: credMouseLeave } = useTilt(5);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-dark relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s', animationDuration: '10s' }} />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '5s', animationDuration: '14s' }} />

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
        {/* Hero */}
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12 md:mb-16">
          {/* Photo with enhanced hover */}
          <div className={`relative flex justify-center ${isRTL ? 'lg:order-2' : ''} group`}>
            <div className="relative w-full max-w-[380px]">
              <div className="absolute inset-0 bg-soft-blue/20 rounded-[3rem] rotate-2 scale-95 translate-y-3 group-hover:rotate-0 group-hover:scale-100 group-hover:bg-soft-blue/30 transition-all duration-700 animate-morph" />
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 group-hover:border-soft-blue/30 transition-all duration-500">
                <img
                  src="https://ahmedmagdyanwar.my.canva.site/_assets/media/61e2b894eae94fbd7dbb17bec281e93a.png"
                  alt="Ahmed Magdy Anwar - Counseling Psychologist in Cairo"
                  title="Ahmed Magdy Anwar - Counseling Psychologist"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
                {/* Hover corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-soft-blue/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse-soft" />
                {/* Bottom glow */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-soft-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Text with shimmer name */}
          <div className={isRTL ? 'lg:order-1' : ''}>
            <span className="font-body text-xs font-medium text-soft-blue uppercase tracking-widest mb-3 block animate-fade-in-up">
              {t('about_label')}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold leading-snug mb-6 text-gradient animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Ahmed Magdy Anwar
            </h1>
            <p className="font-body text-base text-white/70 leading-relaxed mb-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              {t('about_bio_1')}
            </p>
            <p className="font-body text-base text-white/70 leading-relaxed mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {t('about_bio_2')}
            </p>
            <p className="font-body text-base text-white/70 leading-relaxed animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              {t('about_bio_3')}
            </p>
          </div>
        </AnimatedSection>

        {/* Credentials with 3D tilt */}
        <AnimatedSection delay={100} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 md:mb-16">
          {credentials.map((item, idx) => (
            <div
              key={idx}
              ref={idx === 1 && !isMobile ? credTiltRef : undefined}
              onMouseMove={idx === 1 && !isMobile ? credMouseMove : undefined}
              onMouseLeave={idx === 1 && !isMobile ? credMouseLeave : undefined}
              className="glass-card glass-card-hover rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl hover:shadow-soft-blue/10 active:scale-98 transition-all duration-500 group cursor-pointer touch-manipulation relative overflow-hidden"
              style={{
                transform: idx === 1 && !isMobile ? credTransform : undefined,
                transition: 'transform 0.3s ease-out, background 0.5s, border-color 0.5s, box-shadow 0.5s',
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-soft-blue rounded-xl text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-soft-blue/20 relative z-10 animate-heartbeat" style={{ animationDelay: `${idx * 200}ms` }}>
                <i className={`${item.icon} text-xl`} />
              </div>
              <p className="font-heading text-xs font-medium text-soft-blue uppercase tracking-wider mb-1 relative z-10">{item.label}</p>
              <p className="font-body text-sm text-white/80 leading-relaxed relative z-10">{item.text}</p>
            </div>
          ))}
        </AnimatedSection>

        {/* Background & Expertise with animated tags */}
        <AnimatedSection delay={200} className="glass-card glass-card-hover rounded-3xl p-8 md:p-12 mb-12 md:mb-16 relative overflow-hidden">
          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 flex items-center justify-center bg-soft-blue rounded-xl text-white hover:scale-110 hover:rotate-6 active:scale-95 transition-all duration-500 shadow-lg shadow-soft-blue/20 animate-heartbeat">
              <i className="ri-brain-line text-xl" />
            </div>
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-white">
              {t('about_expertise_label')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {expertiseList.map((item, idx) => (
              <span
                key={idx}
                className="font-body text-sm text-white/80 bg-white/10 rounded-full px-4 py-2 hover:bg-soft-blue hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-soft-blue/20 active:scale-95 transition-all duration-500 cursor-default animate-pop touch-manipulation"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {item.trim()}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection delay={300} className="bg-dark border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <div className="w-12 h-12 flex items-center justify-center bg-soft-blue rounded-xl text-white shadow-lg shadow-soft-blue/20 animate-heartbeat">
              <i className="ri-bar-chart-box-line text-xl" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white">
              {t('about_exp_label')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {experiences.map((item, idx) => (
              <AnimatedCard key={idx} delay={idx * 150}>
                <div className="flex flex-col bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-soft-blue/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-soft-blue/10 active:scale-98 transition-all duration-500 cursor-default group touch-manipulation relative overflow-hidden">
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-11 h-11 flex items-center justify-center bg-soft-blue rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-soft-blue/20 animate-heartbeat" style={{ animationDelay: `${idx * 200}ms` }}>
                      <i className={`${item.icon} text-lg`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm font-semibold text-white truncate">{item.title}</h3>
                      <p className="font-body text-xs text-white/50">{item.org}</p>
                    </div>
                    <span className="font-body text-xs text-soft-blue bg-soft-blue/10 rounded-full px-3 py-1 whitespace-nowrap">{item.date}</span>
                  </div>
                  <p className="font-body text-sm text-white/70 leading-relaxed relative z-10">{item.text}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}