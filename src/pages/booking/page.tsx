import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useInView, useMouseGlow, useIsMobile } from '@/hooks/useScrollAnimation';
import { useSEO } from '@/hooks/useSEO';

interface FormData {
  full_name: string;
  phone: string;
  email: string;
  session_type: string;
  preferred_date: string;
  message: string;
}

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

export default function BookingPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useIsMobile();

  useSEO({
    title: 'Book a Counseling Session | Ahmed Magdy Anwar | Cairo',
    description:
      'Book 1:1 counseling sessions online or in-person in Cairo. Mental health, family counseling, CBT. Free consultation. WhatsApp booking available.',
    canonicalPath: '/booking',
    ogType: 'website',
    structuredData: {
      '@type': 'Service',
      name: 'Counseling Session Booking',
      provider: {
        '@type': 'Person',
        name: 'Ahmed Magdy Anwar',
        jobTitle: 'Counseling Psychologist',
      },
      areaServed: {
        '@type': 'City',
        name: 'Cairo',
      },
      serviceType: 'Mental Health Counseling',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceType: 'Online and In-person',
        serviceSmsNumber: '+201098945682',
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

  const [form, setForm] = useState<FormData>({
    full_name: '',
    phone: '',
    email: '',
    session_type: '',
    preferred_date: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const sessionTypes = [
    { value: 'individual_counseling', label: t('services_counselingTitle') },
    { value: 'other', label: t('booking_other') },
  ];

  const { ref: formCardRef, position: formGlowPos, handleMouseMove: formMouseMove } = useMouseGlow();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.full_name.trim() || !form.phone.trim() || !form.session_type) {
      setError(t('booking_error_required'));
      setLoading(false);
      return;
    }

    const { error: supaError } = await supabase.from('bookings').insert({
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      session_type: form.session_type,
      preferred_date: form.preferred_date || null,
      message: form.message.trim() || null,
    });

    setLoading(false);

    if (supaError) {
      setError(t('booking_error_generic'));
      return;
    }

    setSubmitted(true);
    setForm({
      full_name: '',
      phone: '',
      email: '',
      session_type: '',
      preferred_date: '',
      message: '',
    });
  };

  const phoneNumber = '201098945682';
  const message = encodeURIComponent(t('whatsapp_message'));

  return (
    <main className="min-h-screen pt-24 pb-16 bg-dark relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s', animationDuration: '10s' }} />
      <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '5s', animationDuration: '14s' }} />

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
        <AnimatedSection className="text-center max-w-xl mx-auto mb-10 md:mb-14">
          <span className="font-body text-xs font-medium text-soft-blue uppercase tracking-widest mb-3 block animate-fade-in-up">
            {t('booking_label')}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold leading-snug mb-4 text-gradient animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('nav_booking')}
          </h1>
          <p className="font-body text-base text-white/70 leading-relaxed animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            {t('booking_desc')}
          </p>
        </AnimatedSection>

        {submitted ? (
          <div className="max-w-lg mx-auto text-center glass-card rounded-3xl p-10 md:p-14 animate-scale-in">
            <div className="w-20 h-20 flex items-center justify-center bg-soft-blue/10 rounded-2xl mx-auto mb-6 animate-bounce-in">
              <span className="w-10 h-10 flex items-center justify-center text-soft-blue animate-heartbeat">
                <i className="ri-check-double-line text-3xl" />
              </span>
            </div>
            <h2 className="font-heading text-2xl font-semibold text-white mb-3">
              {t('booking_success_title')}
            </h2>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-8">
              {t('booking_success_desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="font-body text-sm font-medium bg-soft-blue text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-soft-blue/20 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap animate-glow-pulse touch-manipulation"
              >
                {t('booking_bookAnother')}
              </button>
              <Link
                to="/"
                className="font-body text-sm font-medium bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/20 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap touch-manipulation"
              >
                {t('nav_home')}
              </Link>
            </div>
          </div>
        ) : (
          <AnimatedSection delay={200} className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Info Sidebar */}
            <div className={`lg:col-span-2 ${isRTL ? 'lg:order-2' : ''}`}>
              <div className="glass-card glass-card-hover rounded-3xl p-7 md:p-8 mb-6 transition-all duration-500 relative overflow-hidden group">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-5 relative z-10">
                  {t('booking_contactTitle')}
                </h3>
                <div className="flex flex-col gap-5 relative z-10">
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center gap-3 group active:scale-95 touch-manipulation"
                  >
                    <span className="w-12 h-12 flex items-center justify-center bg-soft-blue rounded-xl text-white group-hover:bg-white group-hover:text-soft-blue group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-soft-blue/20 animate-heartbeat">
                      <i className="ri-whatsapp-line text-xl" />
                    </span>
                    <div>
                      <p className="font-body text-xs text-white/50">WhatsApp</p>
                      <p className="font-body text-sm text-white font-medium">+20 109 894 5682</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 group cursor-default">
                    <span className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-white group-hover:bg-white group-hover:text-dark group-hover:scale-110 transition-all duration-500">
                      <i className="ri-phone-line text-xl" />
                    </span>
                    <div>
                      <p className="font-body text-xs text-white/50">{t('booking_phoneLabel')}</p>
                      <p className="font-body text-sm text-white font-medium">+20 109 894 5682</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group cursor-default">
                    <span className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-white group-hover:bg-white group-hover:text-dark group-hover:scale-110 transition-all duration-500">
                      <i className="ri-time-line text-xl" />
                    </span>
                    <div>
                      <p className="font-body text-xs text-white/50">{t('booking_hoursLabel')}</p>
                      <p className="font-body text-sm text-white font-medium">{t('booking_hoursValue')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-7 md:p-8 transition-all duration-500 relative overflow-hidden">
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  {t('common_privacyNote')}
                </p>
              </div>
            </div>

            {/* Form with spotlight */}
            <div className={`lg:col-span-3 ${isRTL ? 'lg:order-1' : ''}`}>
              <div
                ref={!isMobile ? formCardRef : undefined}
                onMouseMove={!isMobile ? formMouseMove : undefined}
                className="glass-card glass-card-hover rounded-3xl p-7 md:p-8 transition-all duration-500 relative overflow-hidden"
              >
                {/* Mouse spotlight - disabled on mobile */}
                {!isMobile && (
                  <div
                    className="absolute w-64 h-64 bg-soft-blue/10 rounded-full blur-3xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      left: `${formGlowPos.x}%`,
                      top: `${formGlowPos.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
                <div className="relative z-10">
                  {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 animate-shake">
                      <span className="w-5 h-5 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                        <i className="ri-error-warning-line text-sm" />
                      </span>
                      <p className="font-body text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div className="group/input">
                      <label htmlFor="full_name" className="font-body text-sm font-medium text-white mb-1.5 block transition-all duration-300 group-focus-within/input:text-soft-blue">
                        {t('booking_fullName')} *
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                        className="w-full font-body text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 group-hover/input:border-white/20"
                        placeholder={t('booking_fullNamePlaceholder')}
                      />
                    </div>
                    <div className="group/input">
                      <label htmlFor="phone" className="font-body text-sm font-medium text-white mb-1.5 block transition-all duration-300 group-focus-within/input:text-soft-blue">
                        {t('booking_phone')} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full font-body text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 group-hover/input:border-white/20"
                        placeholder={t('booking_phonePlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div className="group/input">
                      <label htmlFor="email" className="font-body text-sm font-medium text-white mb-1.5 block transition-all duration-300 group-focus-within/input:text-soft-blue">
                        {t('booking_email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 group-hover/input:border-white/20"
                        placeholder={t('booking_emailPlaceholder')}
                      />
                    </div>
                    <div className="group/input">
                      <label htmlFor="session_type" className="font-body text-sm font-medium text-white mb-1.5 block transition-all duration-300 group-focus-within/input:text-soft-blue">
                        {t('booking_sessionType')} *
                      </label>
                      <select
                        id="session_type"
                        name="session_type"
                        value={form.session_type}
                        onChange={handleChange}
                        required
                        className="w-full font-body text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 appearance-none group-hover/input:border-white/20"
                        style={{ backgroundImage: isRTL ? 'none' : undefined }}
                      >
                        <option value="" className="bg-dark">{t('booking_selectType')}</option>
                        {sessionTypes.map((st) => (
                          <option key={st.value} value={st.value} className="bg-dark">{st.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-5 group/input">
                    <label htmlFor="preferred_date" className="font-body text-sm font-medium text-white mb-1.5 block transition-all duration-300 group-focus-within/input:text-soft-blue">
                      {t('booking_preferredDate')}
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      name="preferred_date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full sm:w-auto font-body text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 group-hover/input:border-white/20"
                    />
                  </div>

                  <div className="mb-8 group/input">
                    <label htmlFor="message" className="font-body text-sm font-medium text-white mb-1.5 block transition-all duration-300 group-focus-within/input:text-soft-blue">
                      {t('booking_message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                      className="w-full font-body text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 resize-none group-hover/input:border-white/20"
                      placeholder={t('booking_messagePlaceholder')}
                    />
                    <p className="font-body text-xs text-white/40 mt-1.5 text-right">
                      {form.message.length}/500
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="font-body text-sm font-medium bg-soft-blue text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-soft-blue/20 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 transition-all duration-300 whitespace-nowrap disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 inline-flex items-center gap-2 group/btn animate-glow-pulse touch-manipulation"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-loader-4-line animate-spin text-sm" />
                          </span>
                          {t('booking_submitting')}
                        </>
                      ) : (
                        <>
                          {t('booking_submit')}
                          <span className="w-4 h-4 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform duration-300">
                            <i className="ri-arrow-right-line text-xs" />
                          </span>
                        </>
                      )}
                    </button>
                    <p className="font-body text-xs text-white/40">
                      * {t('booking_requiredFields')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </main>
  );
}