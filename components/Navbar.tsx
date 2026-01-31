import React, { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, ArrowUpRight, Instagram, Facebook, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { CONTACT_DATA } from '../constants';

// Memoize static components
const NavLink = memo(({ link, location, isOpen, setIsOpen }) => (
  <Link
    to={link.path}
    className={`group flex items-center space-x-6 py-2 ${
      location.pathname === link.path ? 'text-brand-silk' : 'text-brand-silk/30 hover:text-brand-silk'
    } transition-colors`}
    onClick={() => setIsOpen(false)}
  >
    <span className="text-brand-terracotta font-serif italic text-2xl">
      0{link.id}
    </span>
    <span className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">
      {link.name}
    </span>
  </Link>
));

NavLink.displayName = 'NavLink';

const DesktopNavLink = memo(({ link, location }) => (
  <Link
    to={link.path}
    className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative group py-2 ${
      location.pathname === link.path
        ? 'text-brand-terracotta'
        : 'text-brand-onyx hover:text-brand-terracotta'
    }`}
  >
    {link.name}
    <motion.div 
      className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-terracotta origin-right"
      initial={false}
      animate={{ scaleX: location.pathname === link.path ? 1 : 0 }}
    />
  </Link>
));

DesktopNavLink.displayName = 'DesktopNavLink';

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  // Memoized nav links with IDs for better performance
  const navLinks = [
    { id: 1, name: 'Services', path: '/services' },
    { id: 2, name: 'The Studio', path: '/about' },
    { id: 3, name: 'Artisans', path: '/team' },
    { id: 4, name: 'Connect', path: '/contact' },
  ];

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Batch DOM reads and writes
    requestAnimationFrame(() => {
      setScrolled(scrollY > 20);
    });
  }, []);

  // Use passive scroll listener for better performance
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Use CSS classes instead of inline styles for scroll lock
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('overflow-hidden', 'h-screen');
    } else {
      document.documentElement.classList.remove('overflow-hidden', 'h-screen');
    }
  }, [isOpen]);

  // Preload contact page when hovering over Connect link
  const preloadContactPage = useCallback(() => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/contact';
    link.as = 'document';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style jsx>{`
        .backdrop-blur-xl {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .will-change-transform {
          will-change: transform;
        }
        
        .nav-transition {
          transition-property: background-color, border-color, padding, transform;
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .nav-transition,
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      <nav 
        className={`fixed top-0 left-0 w-full z-[999] nav-transition ${
          scrolled || isOpen 
            ? 'bg-brand-silk/95 backdrop-blur-xl border-b border-brand-onyx/5 py-4 shadow-sm' 
            : 'bg-transparent py-8'
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Scroll Progress Indicator - Use CSS for better performance */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-brand-terracotta origin-left z-[1001] will-change-transform"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center relative h-10 md:h-12">
          
          {/* Logo with optimized image */}
          <Link 
            to="/" 
            className={`flex items-center transition-colors duration-500 relative z-[1100] ${
              isOpen ? 'text-brand-silk' : 'text-brand-onyx'
            }`}
            onClick={() => setIsOpen(false)}
            aria-label="Home"
          >
            <div
              className={`w-9 h-9 md:w-11 md:h-11 rounded-full border overflow-hidden flex items-center justify-center transition-all duration-500 ${
                isOpen ? 'border-brand-silk/20' : 'border-brand-onyx'
              }`}
            >
              {/* Use optimized image with explicit dimensions */}
              <img
                src="https://github.com/richdadpoordad78-creator/sherimedia-files/blob/main/favicon.jpg?raw=true"
                alt="Sheri Salon Logo"
                className="w-full h-full object-cover"
                width="44"
                height="44"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="flex flex-col ml-3 md:ml-4">
              <span className="text-[10px] md:text-xs font-extrabold tracking-[0.3em] uppercase leading-none">
                Sheri Salon
              </span>
              {!isOpen && (
                <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.1em] mt-1 opacity-60 text-brand-terracotta">
                  Aesthetic Sanctuary
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation - Optimized with memoized components */}
          <div className="hidden lg:flex items-center space-x-10 xl:space-x-14">
            {navLinks.map((link) => (
              <DesktopNavLink
                key={link.id}
                link={link}
                location={location}
              />
            ))}
            
            <Link 
              to="/booking" 
              className="flex items-center space-x-3 bg-brand-onyx text-brand-silk px-8 py-4 rounded-full hover:bg-brand-terracotta transition-all shadow-lg active:scale-95 will-change-transform"
              prefetch="intent"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                Reserve Session
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden relative z-[1100] p-2 -mr-2 transition-colors duration-500 ${
              isOpen ? 'text-brand-silk' : 'text-brand-onyx'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="w-7 h-7" aria-hidden="true" />
            ) : (
              <Menu className="w-7 h-7" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Optimized animations and reduced re-renders */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 w-full h-[100dvh] bg-brand-onyx text-brand-silk z-[1000] flex flex-col pt-32 pb-10 px-8 md:px-16"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Menu"
          >
            {/* Use CSS for noise texture to reduce paint operations */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            
            <div className="flex-1 flex flex-col justify-between relative z-10 max-w-lg mx-auto w-full">
              <nav className="flex flex-col space-y-4 md:space-y-8 pt-4" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * link.id + 0.2 }}
                  >
                    <NavLink
                      link={link}
                      location={location}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link 
                    to="/booking"
                    className="w-full flex items-center justify-center space-x-6 bg-brand-silk text-brand-onyx py-8 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] shadow-2xl active:scale-95 transition-all will-change-transform"
                    onClick={() => setIsOpen(false)}
                    prefetch="intent"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                    <span>Reserve Session</span>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-between items-center"
                >
                  <div className="flex space-x-8">
                    <a
                      href={CONTACT_DATA.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-silk/20 hover:text-brand-terracotta transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" aria-hidden="true" />
                    </a>
                    <a
                      href={CONTACT_DATA.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-silk/20 hover:text-brand-terracotta transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-silk/10">
                    © 2024 Sheri Salon TX
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;