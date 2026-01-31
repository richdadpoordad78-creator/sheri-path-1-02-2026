import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Memoized components for better performance
const MarqueeItem = React.memo(({ service }) => (
  <div className="flex items-center space-x-12 lg:space-x-24 px-12 lg:px-24">
    <span className="text-4xl sm:text-6xl lg:text-9xl font-serif italic font-light opacity-60 whitespace-nowrap hover:text-brand-terracotta hover:opacity-100 transition-all cursor-default">
      {service}
    </span>
    <div className="w-3 h-3 lg:w-5 lg:h-5 rounded-full bg-brand-terracotta flex-shrink-0" />
  </div>
));

MarqueeItem.displayName = 'MarqueeItem';

const StatItem = React.memo(({ number, label }) => (
  <div className="space-y-2">
    <h3 className="text-4xl lg:text-5xl font-serif font-bold tracking-tighter">{number}</h3>
    <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-brand-onyx/30">{label}</p>
  </div>
));

StatItem.displayName = 'StatItem';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Memoize services array
  const services = useMemo(() => 
    ["Hair Architecture", "Clinical Skin", "PMU Artistry", "Eyelash Design", "Aesthetic Medicine"], 
    []
  );
  
  // Memoize marquee items
  const marqueeItems = useMemo(() => 
    [...services, ...services, ...services], 
    [services]
  );

  // Debounced resize handler
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    // Initial check
    checkMobile();
    setIsReady(true);
    
    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [checkMobile]);

  // Optimize scroll configuration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Memoize spring config
  const springConfig = useMemo(() => ({
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  }), []);

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // FIXED: Properly use useTransform hooks
  const yText = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : -100]);
  const yImage = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : 60]);
  const yQuote = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : -180]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  // Preload critical images
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Only preload hero image for better LCP
    preloadImage("https://images.pexels.com/photos/13068357/pexels-photo-13068357.jpeg");
  }, []);

  // Don't render until ready to avoid hydration issues
  if (!isReady) {
    return (
      <div className="w-full h-screen bg-brand-silk flex items-center justify-center">
        <div className="animate-pulse text-brand-terracotta">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-brand-silk selection:bg-brand-terracotta selection:text-white overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-[100vh] lg:min-h-screen flex items-center justify-center pt-36 pb-16 md:pt-48 lg:pt-32 z-10">
        {/* Background Decorative Text */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            <motion.div 
              style={{ y: yImage }}
              className="absolute top-[65%] left-0 -translate-y-1/2 text-[22vw] font-serif font-black text-brand-onyx/[0.03] whitespace-nowrap leading-none"
            >
              PRECISION SANCTUARY
            </motion.div>
          </div>
        )}

        <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Primary Content Block */}
            <motion.div 
              style={{ y: yText, opacity: heroOpacity }}
              className="w-full lg:col-span-7 space-y-10 text-center lg:text-left"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center justify-center lg:justify-start space-x-3 text-brand-terracotta"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.5em]">
                    The Master Protocol
                  </span>
                </motion.div>
                
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(4.5rem,8.5vw,8.5rem)] font-serif font-bold leading-[0.9] tracking-tighter">
                  Refining <br />
                  <span className="italic font-normal text-brand-terracotta">The Absolute.</span>
                </h1>
              </div>
              
              <p className="text-base md:text-xl text-brand-onyx/50 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                A clinical sanctuary engineering anatomical perfection through precision hair architecture, biological skin revival, and masterful PMU.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 md:gap-10 pt-4">
                <Link 
                  to="/booking" 
                  className="btn-international w-full sm:w-auto shadow-lg bg-brand-silk hover:scale-[1.02] transition-transform duration-200"
                >
                  Reserve Session
                </Link>
                <Link 
                  to="/services" 
                  className="group flex items-center space-x-5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] py-2"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </motion.div>

            {/* Visual Stack Container */}
            <div className="w-full lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
              {/* Main Image */}
              <motion.div 
                style={{ y: yImage }}
                className="relative w-full aspect-[4/5] sm:max-w-md lg:max-w-none lg:w-[115%] rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl z-10 bg-brand-nude/20"
              >
                <img 
                  src="https://images.pexels.com/photos/13068357/pexels-photo-13068357.jpeg" 
                  className="w-full h-full object-cover"
                  alt="Sheri Salon Aesthetic"
                  fetchPriority="high"
                  loading="eager"
                  width="800"
                  height="1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx/30 to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Signature Box */}
              <motion.div 
                style={{ y: yQuote }}
                className="absolute -bottom-10 -left-2 sm:-bottom-12 sm:-left-8 lg:-left-20 w-44 h-60 sm:w-64 sm:h-80 lg:w-80 lg:h-[400px] bg-brand-onyx p-8 lg:p-14 rounded-[35px] lg:rounded-[55px] shadow-2xl z-20 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta/20 blur-[50px] rounded-full pointer-events-none" />
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-brand-silk/10 flex items-center justify-center text-brand-terracotta relative z-10">
                  <Heart className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
                </div>
                <div className="space-y-4 lg:space-y-6 relative z-10">
                  <p className="text-brand-silk text-xl sm:text-2xl lg:text-4xl font-serif leading-tight">
                    "Where precision meets sanctuary."
                  </p>
                  <p className="text-brand-silk/30 text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.4em] font-extrabold">
                    — SS MASTER DRAFT
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section - Fixed animation */}
      <div className="marquee-container bg-brand-onyx text-brand-silk py-12 lg:py-24 border-y border-brand-silk/5 relative z-20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeItems.map((service, i) => (
            <MarqueeItem key={i} service={service} />
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-48 overflow-hidden relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative group max-w-lg mx-auto lg:mx-0"
            >
              <div className="absolute -inset-6 lg:-inset-10 bg-brand-nude rounded-[60px] md:rounded-[80px] -rotate-3 transition-transform group-hover:rotate-0 duration-1000" />
              <div className="relative z-10 overflow-hidden rounded-[40px] md:rounded-[60px] shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3992863/pexels-photo-3992863.jpeg" 
                  className="w-full aspect-[4/5] object-cover transition-transform duration-[2s] group-hover:scale-110"
                  alt="The Philosophy"
                  loading="lazy"
                  width="600"
                  height="750"
                />
              </div>
            </motion.div>

            <div className="space-y-12 lg:space-y-14 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <span className="text-brand-terracotta font-extrabold uppercase tracking-[0.4em] text-[10px]">
                  01 // Philosophy
                </span>
                <h2 className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold leading-[1] md:leading-[0.9] tracking-tighter">
                  Mathematical <br />Beauty.
                </h2>
                <p className="text-lg lg:text-2xl text-brand-onyx/50 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 italic">
                  We analyze facial geometry and structural hair integrity to deliver results that are surgically accurate yet biologically natural.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-10 pt-10 border-t border-brand-onyx/10">
                <StatItem number="20+" label="Years of Master Protocols" />
                <StatItem number="5k+" label="Curated Transformations" />
              </div>
              
              <Link 
                to="/about" 
                className="btn-international w-full sm:w-auto text-center bg-transparent hover:scale-[1.02] transition-transform duration-200"
              >
                The Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic CTA */}
      <section className="py-32 lg:py-56 bg-brand-moss text-brand-silk relative overflow-hidden z-20">
        <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
        <div className="container mx-auto px-6 text-center space-y-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl lg:text-[clamp(4.5rem,10vw,11rem)] font-serif font-bold tracking-tighter leading-none"
          >
            Ready for your <br /> <span className="text-brand-nude italic font-normal">absolute</span> shift?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/booking" 
              className="inline-block bg-brand-silk text-brand-onyx px-14 py-8 lg:px-24 lg:py-12 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-[0.5em] hover:bg-brand-terracotta hover:text-brand-silk transition-all shadow-2xl"
            >
              Secure My Session
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

Home.displayName = 'Home';

export default Home;