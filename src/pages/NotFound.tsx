import { useLocation, Link } from "react-router-dom";
import { useSEO } from '@/hooks/useSEO';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist. Return to Ahmed Magdy Anwar counseling psychologist homepage.',
    canonicalPath: location.pathname,
    noIndex: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-dark overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-soft-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>

      <div className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-white/5 select-none pointer-events-none z-0 animate-pulse-soft">
        404
      </div>

      <div className={`relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Icon */}
        <div className="w-24 h-24 flex items-center justify-center bg-soft-blue/10 rounded-2xl mx-auto mb-6 animate-bounce-in">
          <span className="w-12 h-12 flex items-center justify-center text-soft-blue">
            <i className="ri-error-warning-line text-4xl"></i>
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold mt-2 text-white font-heading animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Page Not Found</h1>
        <p className="mt-2 text-sm text-white/50 font-body animate-fade-in" style={{ animationDelay: '0.3s' }}>
          The page <span className="font-mono text-white/70">{location.pathname}</span> does not exist.
        </p>
        <p className="mt-4 text-base text-white/70 font-body max-w-md mx-auto leading-relaxed animate-blur-in" style={{ animationDelay: '0.4s' }}>
          The page you are looking for might have been moved, deleted, or does not exist. Return to the homepage to explore our counseling services.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mt-8 font-body text-sm font-medium bg-soft-blue text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-soft-blue/20 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap touch-manipulation animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-home-line"></i>
          </span>
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}