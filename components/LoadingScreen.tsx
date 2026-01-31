import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const logoUrl = "https://github.com/richdadpoordad78-creator/sherimedia-files/blob/main/favicon.jpg?raw=true";

  // Optimized animations with staggered timing
  const ringAnimation = useMemo(() => ({
    rotate: 360,
    transition: {
      duration: 24,
      repeat: Infinity,
      ease: "linear",
      type: "tween"
    }
  }), []);

  const innerRingAnimation = useMemo(() => ({
    rotate: -360,
    transition: {
      duration: 28,
      repeat: Infinity,
      ease: "linear",
      type: "tween"
    }
  }), []);

  const logoFloatAnimation = useMemo(() => ({
    y: [0, -8, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      type: "tween"
    }
  }), []);

  const logoGlowAnimation = useMemo(() => ({
    boxShadow: [
      "0 0 25px rgba(220, 107, 64, 0.25)",
      "0 0 40px rgba(220, 107, 64, 0.4)",
      "0 0 25px rgba(220, 107, 64, 0.25)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      type: "tween"
    }
  }), []);

  const progressAnimation = useMemo(() => ({
    scaleX: [0, 1],
    transition: {
      duration: 2.2,
      ease: [0.87, 0, 0.13, 1],
      delay: 0.3,
      type: "tween"
    }
  }), []);

  const textRevealAnimation = useMemo(() => ({
    clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    transition: {
      duration: 1.2,
      ease: [0.77, 0, 0.18, 1],
      delay: 0.4,
      type: "tween"
    }
  }), []);

  // Static decorative elements (no animation) for performance
  const staticDots = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      left: `${10 + (i * 7)}%`,
      top: `${15 + (i * 6)}%`,
      opacity: 0.05 + (i * 0.02)
    }))
  , []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.98,
        transition: { 
          duration: 0.6, 
          ease: [0.76, 0, 0.24, 1]
        }
      }}
      className="fixed inset-0 z-[1000] bg-brand-onyx flex flex-col items-center justify-center overflow-hidden"
      style={{
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Subtle static gradient background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(220, 107, 64, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
          `
        }}
      />

      {/* Static decorative dots (no animation) */}
      {staticDots.map((dot, i) => (
        <div
          key={i}
          className="absolute w-[1px] h-[1px] bg-brand-silk rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            opacity: dot.opacity,
            transform: 'translate3d(0,0,0)'
          }}
        />
      ))}

      {/* Rotating rings - optimized */}
      <motion.div 
        animate={ringAnimation}
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-brand-silk/10 rounded-full opacity-30"
        style={{
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      />
      <motion.div 
        animate={innerRingAnimation}
        className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] border border-brand-terracotta/15 rounded-full opacity-20"
        style={{
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      />

      <div className="relative z-10 text-center space-y-12">
        {/* Logo with floating animation */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: "backOut",
                type: "tween"
              }
            }}
            className="relative w-28 h-28 md:w-32 md:h-32 mx-auto"
            style={{
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Floating logo container */}
            <motion.div
              animate={logoFloatAnimation}
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                transform: 'translate3d(0,0,0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform'
              }}
            >
              {/* Glow effect */}
              <motion.div
                animate={logoGlowAnimation}
                className="absolute inset-0 rounded-full border-2 border-brand-terracotta/30"
                style={{
                  willChange: 'box-shadow'
                }}
              />
              
              {/* Logo image */}
              <img 
                src={logoUrl} 
                alt="Sheri Salon Logo"
                className="w-full h-full object-cover rounded-full"
                loading="eager"
                decoding="async"
                style={{
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </motion.div>

            {/* Static decorative ring */}
            <div className="absolute inset-0 rounded-full border border-brand-terracotta/20 opacity-30" />
          </motion.div>

          {/* Static light rays around logo (no animation) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-8 bg-gradient-to-b from-brand-terracotta/20 to-transparent"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-70px)`,
                opacity: 0.3
              }}
            />
          ))}
        </div>

        {/* Text with clip-path reveal animation */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: {
                duration: 0.7,
                ease: "easeOut",
                delay: 0.2,
                type: "tween"
              }
            }}
            className="flex flex-col items-center"
            style={{
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="relative overflow-hidden mb-4">
              <motion.h2
                animate={textRevealAnimation}
                className="text-brand-silk text-xs md:text-sm font-bold uppercase tracking-[0.6em]"
                style={{
                  willChange: 'clip-path'
                }}
              >
                Sheri Salon
              </motion.h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.8,
                  type: "tween"
                }
              }}
              className="flex items-center space-x-4 md:space-x-6"
            >
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-brand-terracotta/60" />
              <span className="text-brand-terracotta font-serif italic text-lg md:text-xl font-light tracking-wide">
                Refining The Absolute
              </span>
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-brand-terracotta/60" />
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced progress bar with glow */}
        <div className="w-56 h-[1.5px] bg-brand-silk/10 mx-auto mt-12 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={progressAnimation}
            className="absolute inset-0 bg-gradient-to-r from-brand-terracotta via-brand-terracotta/90 to-brand-terracotta origin-left"
            style={{
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform'
            }}
          />
          {/* Static glow effect */}
          <div className="absolute inset-0 bg-brand-terracotta/20 blur-[2px] opacity-50" />
        </div>
      </div>

      {/* Static side elements with subtle entrance */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.1,
          transition: {
            duration: 1,
            delay: 0.5,
            type: "tween"
          }
        }}
        className="absolute bottom-10 right-10 text-brand-silk/10 font-serif text-7xl md:text-8xl select-none hidden md:block"
        style={{
          textShadow: '0 0 30px rgba(255,255,255,0.1)'
        }}
      >
        01
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.1,
          transition: {
            duration: 1,
            delay: 0.5,
            type: "tween"
          }
        }}
        className="absolute top-10 left-10 text-brand-silk/10 font-serif text-7xl md:text-8xl select-none hidden md:block"
        style={{
          textShadow: '0 0 30px rgba(255,255,255,0.1)'
        }}
      >
        SS
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;