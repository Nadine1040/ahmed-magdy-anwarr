import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useInView, useStaggerAnimation, useMouseGlow, useIsMobile } from '@/hooks/useScrollAnimation';
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

export default function ContactPage() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useSEO({
    title: 'Contact Ahmed Magdy Anwar | Counseling Psychologist Cairo',
    description:
      'Contact counseling psychologist Ahmed Magdy Anwar in Cairo. WhatsApp, phone, email. Mental health inquiries, session bookings. Quick response within 24 hours.',
    canonicalPath: '/contact',
    ogType: 'website',
    structuredData: {
      '@type': 'ContactPage',
      name: 'Contact Ahmed Magdy Anwar',
      description:
        'Contact counseling psychologist Ahmed Magdy Anwar in Cairo, Egypt.',
      url: '/contact',
      mainEntity: {
        '@type': 'Person',
        name: 'Ahmed Magdy Anwar',
        telephone: '+201098945682',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cairo',
          addressCountry: 'EG',
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

  const phoneNumber = '201098945682';
  const whatsappMessage = encodeURIComponent(t('whatsapp_message'));

  const { containerRef: cardsRef, visibleItems: cardsVisible } = useStaggerAnimation(3, 150);
  const { containerRef: socialRef, visibleItems: socialVisible } = useStaggerAnimation(4, 100);
  const { ref: formCardRef, position: formGlowPos, handleMouseMove: formMouseMove } = useMouseGlow();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    setStatus('idle');

    const { error } = await supabase.from('bookings').insert({
      full_name: formData.name,
      phone: formData.phone,
      session_type: 'General Inquiry',
      message: formData.message,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-dark relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s', animationDuration: '10s' }} />
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

      {/* Hero */}
      <AnimatedSection className="pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="w-full px-4 md:px-8 lg:px-16 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-semibold text-white mb-4 text-gradient animate-fade-in-up">
            {t('contact_hero_title')}
          </h1>
          <p className="font-body text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('contact_hero_subtitle')}
          </p>
        </div>
      </AnimatedSection>

      {/* Contact Cards with enhanced hover */}
      <section className="pb-10 md:pb-14">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <div className={`glass-card glass-card-hover rounded-2xl p-6 md:p-8 text-center hover:-translate-y-3 hover:shadow-lg hover:shadow-[#25D366]/20 active:scale-98 active:translate-y-0 transition-all duration-500 group cursor-pointer touch-manipulation relative overflow-hidden ${cardsVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#25D366] transition-all duration-500 group-hover:scale-110 shadow-lg shadow-transparent group-hover:shadow-[#25D366]/20 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-whatsapp-fill text-[#25D366] text-3xl group-hover:text-white transition-colors duration-300 animate-heartbeat" />
                </span>
              </div>
              <h3 className="font-heading font-medium text-lg text-white mb-2 relative z-10">
                {t('contact_whatsappTitle')}
              </h3>
              <p className="font-body text-sm text-white/70 mb-6 relative z-10">
                {t('contact_whatsappDesc')}
              </p>
              <a
                href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 font-body text-sm font-medium bg-[#25D366] text-white rounded-full px-6 py-2.5 hover:shadow-lg hover:shadow-[#25D366]/20 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap group/btn touch-manipulation relative z-10"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-whatsapp-line" />
                </span>
                {t('contact_whatsappBtn')}
              </a>
            </div>

            {/* Phone */}
            <div className={`glass-card glass-card-hover rounded-2xl p-6 md:p-8 text-center hover:-translate-y-3 hover:shadow-lg hover:shadow-soft-blue/20 active:scale-98 active:translate-y-0 transition-all duration-500 group cursor-pointer touch-manipulation relative overflow-hidden ${cardsVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-soft-blue transition-all duration-500 shadow-lg shadow-transparent group-hover:shadow-soft-blue/20 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-phone-fill text-white text-3xl animate-heartbeat" />
                </span>
              </div>
              <h3 className="font-heading font-medium text-lg text-white mb-2 relative z-10">
                {t('contact_phoneTitle')}
              </h3>
              <p className="font-body text-sm text-white/70 mb-6 relative z-10">+20 109 894 5682</p>
              <a
                href="tel:+201098945682"
                className="inline-flex items-center gap-2 font-body text-sm font-medium border border-white/20 text-white rounded-full px-6 py-2.5 hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap group/btn touch-manipulation relative z-10"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line" />
                </span>
                {t('contact_callBtn')}
              </a>
            </div>

            {/* Email */}
            <div className={`glass-card glass-card-hover rounded-2xl p-6 md:p-8 text-center hover:-translate-y-3 hover:shadow-lg hover:shadow-soft-blue/20 active:scale-98 active:translate-y-0 transition-all duration-500 group cursor-pointer touch-manipulation relative overflow-hidden ${cardsVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-soft-blue transition-all duration-500 shadow-lg shadow-transparent group-hover:shadow-soft-blue/20 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-mail-fill text-white text-3xl animate-heartbeat" />
                </span>
              </div>
              <h3 className="font-heading font-medium text-lg text-white mb-2 relative z-10">
                {t('contact_emailTitle')}
              </h3>
              <p className="font-body text-sm text-white/70 mb-6 relative z-10">
                Ahmed_magdy1990@yahoo.com
              </p>
              <a
                href="mailto:Ahmed_magdy1990@yahoo.com"
                className="inline-flex items-center gap-2 font-body text-sm font-medium border border-white/20 text-white rounded-full px-6 py-2.5 hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap group/btn touch-manipulation relative z-10"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-mail-line" />
                </span>
                {t('contact_emailBtn')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form with spotlight effect */}
      <AnimatedSection delay={200} className="pb-10 md:pb-14">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-2xl mx-auto">
            <div
              ref={!isMobile ? formCardRef : undefined}
              onMouseMove={!isMobile ? formMouseMove : undefined}
              className="glass-card glass-card-hover rounded-2xl p-6 md:p-8 transition-all duration-500 relative overflow-hidden"
            >
              {/* Mouse spotlight - disabled on mobile */}
              {!isMobile && (
                <div
                  className="absolute w-64 h-64 bg-soft-blue/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 opacity-0 hover:opacity-100"
                  style={{
                    left: `${formGlowPos.x}%`,
                    top: `${formGlowPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
              <div className="relative z-10">
                <h3 className="font-heading font-semibold text-xl text-white mb-1">
                  {t('contact_quickFormTitle')}
                </h3>
                <p className="font-body text-sm text-white/70 mb-6">
                  {t('contact_quickFormDesc')}
                </p>

                {status === 'success' && (
                  <div className="mb-5 rounded-xl bg-soft-blue/10 border border-soft-blue/20 text-soft-blue font-body text-sm px-4 py-3 animate-bounce-in flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-check-line" />
                    </span>
                    {t('contact_formSuccess')}
                  </div>
                )}
                {status === 'error' && (
                  <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-body text-sm px-4 py-3 animate-shake flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-error-warning-line" />
                    </span>
                    {t('contact_formError')}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="group/input">
                    <label className="font-body text-sm font-medium text-white block mb-1.5 transition-all duration-300 group-focus-within/input:text-soft-blue">
                      {t('contact_formName')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('contact_formNamePlaceholder')}
                      className="w-full font-body text-sm rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 group-hover/input:border-white/20"
                    />
                  </div>

                  <div className="group/input">
                    <label className="font-body text-sm font-medium text-white block mb-1.5 transition-all duration-300 group-focus-within/input:text-soft-blue">
                      {t('contact_formPhone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t('contact_formPhonePlaceholder')}
                      className="w-full font-body text-sm rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 group-hover/input:border-white/20"
                    />
                  </div>

                  <div className="group/input">
                    <label className="font-body text-sm font-medium text-white block mb-1.5 transition-all duration-300 group-focus-within/input:text-soft-blue">
                      {t('contact_formMessage')} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      maxLength={500}
                      placeholder={t('contact_formMessagePlaceholder')}
                      className="w-full font-body text-sm rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 focus:shadow-lg focus:shadow-soft-blue/10 transition-all duration-300 resize-none group-hover/input:border-white/20"
                    />
                    <p className="font-body text-xs text-white/40 mt-1 text-end">
                      {formData.message.length}/500
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-body text-sm font-medium bg-soft-blue text-white rounded-full px-6 py-2.5 hover:shadow-lg hover:shadow-soft-blue/20 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-95 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100 inline-flex items-center justify-center gap-2 group/btn touch-manipulation"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-loader-4-line animate-spin text-sm" />
                        </span>
                        {t('contact_formSubmitting')}
                      </span>
                    ) : (
                      <>
                        {t('contact_formSubmit')}
                        <span className="w-4 h-4 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform duration-300">
                          <i className="ri-send-plane-line text-xs" />
                        </span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Social Section */}
      <section className="pb-12 md:pb-16">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl text-white mb-3 animate-fade-in-up">
              {t('contact_socialTitle')}
            </h2>
            <p className="font-body text-white/70 text-base max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {t('contact_socialDesc')}
            </p>
          </div>

          <div ref={socialRef} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ahmedmagdyanwar_?igsh=MTZ6dTk1aDN4YjJkOQ=="
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`group glass-card glass-card-hover rounded-2xl p-6 text-center hover:-translate-y-3 hover:shadow-lg hover:shadow-[#E4405F]/20 active:scale-98 active:translate-y-0 transition-all duration-500 touch-manipulation relative overflow-hidden ${socialVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-16 h-16 rounded-full bg-[#E4405F]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#E4405F] group-hover:scale-110 transition-all duration-500 shadow-lg shadow-transparent group-hover:shadow-[#E4405F]/20 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-instagram-line text-[#E4405F] text-3xl group-hover:text-white transition-colors duration-300" />
                </span>
              </div>
              <h4 className="font-heading font-medium text-sm text-white mb-1 relative z-10">Instagram</h4>
              <p className="font-body text-xs text-white/60 relative z-10">@ahmedmagdyanwar_</p>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@ahmedmagdyanwar_?_r=1&_t=ZS-96UNkWYwtOC"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`group glass-card glass-card-hover rounded-2xl p-6 text-center hover:-translate-y-3 hover:shadow-lg hover:shadow-white/10 active:scale-98 active:translate-y-0 transition-all duration-500 touch-manipulation relative overflow-hidden ${socialVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-16 h-16 rounded-full bg-charcoal/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-charcoal group-hover:scale-110 transition-all duration-500 shadow-lg shadow-transparent group-hover:shadow-white/10 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-tiktok-line text-white text-3xl group-hover:text-white transition-colors duration-300" />
                </span>
              </div>
              <h4 className="font-heading font-medium text-sm text-white mb-1 relative z-10">TikTok</h4>
              <p className="font-body text-xs text-white/60 relative z-10">@ahmedmagdyanwar_</p>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1DTj8KciCK/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`group glass-card glass-card-hover rounded-2xl p-6 text-center hover:-translate-y-3 hover:shadow-lg hover:shadow-[#1877F2]/20 active:scale-98 active:translate-y-0 transition-all duration-500 touch-manipulation relative overflow-hidden ${socialVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1877F2] group-hover:scale-110 transition-all duration-500 shadow-lg shadow-transparent group-hover:shadow-[#1877F2]/20 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-facebook-circle-line text-[#1877F2] text-3xl group-hover:text-white transition-colors duration-300" />
                </span>
              </div>
              <h4 className="font-heading font-medium text-sm text-white mb-1 relative z-10">Facebook</h4>
              <p className="font-body text-xs text-white/60 relative z-10">Ahmed Magdy Anwar</p>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`group glass-card glass-card-hover rounded-2xl p-6 text-center hover:-translate-y-3 hover:shadow-lg hover:shadow-[#25D366]/20 active:scale-98 active:translate-y-0 transition-all duration-500 touch-manipulation relative overflow-hidden ${socialVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366] group-hover:scale-110 transition-all duration-500 shadow-lg shadow-transparent group-hover:shadow-[#25D366]/20 relative z-10">
                <span className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-whatsapp-line text-[#25D366] text-3xl group-hover:text-white transition-colors duration-300 animate-heartbeat" />
                </span>
              </div>
              <h4 className="font-heading font-medium text-sm text-white mb-1 relative z-10">WhatsApp</h4>
              <p className="font-body text-xs text-white/60 relative z-10">+20 109 894 5682</p>
            </a>
          </div>

          <div className="max-w-lg mx-auto mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 font-body text-sm font-medium bg-soft-blue text-white rounded-full px-7 py-2.5 hover:shadow-lg hover:shadow-soft-blue/20 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap group touch-manipulation animate-glow-pulse"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-calendar-line" />
              </span>
              {t('nav_booking')}
            </Link>
            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 font-body text-sm font-medium border border-white/20 text-white rounded-full px-7 py-2.5 hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap touch-manipulation"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-whatsapp-line" />
              </span>
              {t('cta_whatsappBtn')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}