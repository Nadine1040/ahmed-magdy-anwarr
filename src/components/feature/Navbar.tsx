import { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection, useWindowSize } from '@/hooks/useScrollAnimation';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { scrollDirection, scrollY } = useScrollDirection();
  const { width } = useWindowSize();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const isRTL = i18n.language === 'ar';
  const isMobile = width < 768;
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setScrolled(scrollY > 50);
  }, [scrollY]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        closeMobileMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        closeMobileMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // Close menu when route changes
  useEffect(() => {
    if (mobileOpen) {
      closeMobileMenu();
    }
  }, [location.pathname]);

  // Hide navbar on scroll down, show on scroll up
  const navbarHidden = scrollDirection === 'down' && scrollY > 100 && !mobileOpen;

  const toggleLang = () => {
    const next = isRTL ? 'en' : 'ar';
    i18n.changeLanguage(next);
  };

  const openMobileMenu = useCallback(() => {
    setMobileOpen(true);
    // Small delay to trigger CSS transition
    requestAnimationFrame(() => {
      setMenuVisible(true);
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMenuVisible(false);
    setTimeout(() => {
      setMobileOpen(false);
    }, 350);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (mobileOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }, [mobileOpen, openMobileMenu, closeMobileMenu]);

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/booking', label: t('nav_booking') },
    { to: '/contact', label: t('nav_contact') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          navbarHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-xl shadow-lg shadow-black/10 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-16 flex items-center justify-between">
          <Link
            to="/"
            className={`font-heading font-semibold text-lg md:text-xl tracking-tight whitespace-nowrap hover:scale-105 transition-transform duration-300 ${
              scrolled ? 'text-white' : 'text-white'
            }`}
          >
            <span className="text-gradient">Ahmed Magdy Anwar</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative font-body text-sm font-medium transition-colors duration-200 hover:text-soft-blue whitespace-nowrap py-1 ${
                  location.pathname === link.to ? 'text-soft-blue' : 'text-white/80'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-soft-blue to-[#D4A574] transition-all duration-300 rounded-full ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/booking"
              className="font-body text-sm font-medium bg-soft-blue text-white rounded-full px-5 py-2 hover:bg-soft-blue/90 hover:shadow-lg hover:shadow-soft-blue/20 hover:scale-105 transition-all duration-200 whitespace-nowrap animate-glow-pulse"
            >
              {t('nav_booking')}
            </Link>
            <button
              onClick={toggleLang}
              className="font-body text-sm font-medium text-white/80 border border-white/20 rounded-full px-4 py-1.5 hover:bg-white/10 hover:text-white hover:scale-105 hover:border-soft-blue/40 transition-all duration-200 whitespace-nowrap"
            >
              {isRTL ? 'English' : 'العربية'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 active:scale-95 no-tap-highlight z-50 relative"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-2xl transition-transform duration-300`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              menuVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-[280px] max-w-[85vw] bg-dark/98 backdrop-blur-xl shadow-2xl border-${isRTL ? 'r' : 'l'} border-white/10 flex flex-col transition-transform duration-300 ease-out ${
              menuVisible
                ? 'translate-x-0'
                : isRTL
                  ? '-translate-x-full'
                  : 'translate-x-full'
            }`}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="font-heading text-sm font-semibold text-white">
                Menu
              </span>
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 active:scale-95"
                aria-label="Close menu"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={`font-body text-base font-medium py-3 px-3 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation flex items-center gap-3 ${
                      location.pathname === link.to
                        ? 'text-soft-blue bg-soft-blue/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    style={{
                      transitionDelay: `${idx * 40}ms`,
                      opacity: menuVisible ? 1 : 0,
                      transform: menuVisible ? 'translateX(0)' : `translateX(${isRTL ? -20 : 20}px)`,
                    }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === link.to ? 'bg-soft-blue' : 'bg-white/20'}`} />
                    {link.label}
                    {location.pathname === link.to && (
                      <span className="ml-auto w-5 h-5 flex items-center justify-center text-soft-blue">
                        <i className="ri-check-line text-sm"></i>
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="px-5 py-5 border-t border-white/10 flex flex-col gap-3">
              <Link
                to="/booking"
                onClick={closeMobileMenu}
                className="font-body text-sm font-medium bg-soft-blue text-white rounded-full px-5 py-3 text-center hover:bg-soft-blue/90 hover:shadow-lg hover:shadow-soft-blue/20 transition-all duration-200 active:scale-95 animate-glow-pulse"
              >
                {t('nav_booking')}
              </Link>
              <button
                onClick={() => {
                  toggleLang();
                  closeMobileMenu();
                }}
                className="font-body text-sm font-medium text-white/80 border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/10 hover:text-white hover:border-soft-blue/40 transition-all duration-200 w-full active:scale-95"
              >
                {isRTL ? 'English' : 'العربية'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}