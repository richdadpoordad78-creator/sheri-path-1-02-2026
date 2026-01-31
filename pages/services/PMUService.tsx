
import React from 'react';
import { SERVICES } from '../../constants';
import { Eraser, Eye, Heart, Sparkle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PMUService = () => {
  const services = SERVICES['pmu'];

  return (
    <div className="bg-alabaster min-h-screen">
      <section className="pt-40 pb-24 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12 order-2 lg:order-1">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Eye className="w-10 h-10" />
          </div>
          <div className="space-y-6">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">Level 03</span>
            <h1 className="text-7xl md:text-9xl font-serif font-bold text-espresso leading-[0.8] tracking-tighter">
              Permanent <br /><span className="italic text-primary">Artistry</span>
            </h1>
          </div>
          <p className="text-2xl text-espresso/60 font-light max-w-lg leading-relaxed italic">
            Wake up to perfection. Our PMU specialists use ultra-fine techniques to mimic natural hair strokes and soft shadows, enhancing your features permanently.
          </p>
          <div className="pt-6">
            <Link to="/booking" className="btn-luxury text-white px-14 py-7 rounded-full font-bold uppercase tracking-widest text-xs inline-block shadow-2xl">
              Book Your Masterpiece
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
           <div className="absolute -inset-10 bg-primary/5 rounded-[120px] -rotate-3"></div>
           <img 
            src="https://images.pexels.com/photos/33580450/pexels-photo-33580450.jpeg" 
            className="relative z-10 rounded-[100px] shadow-2xl transition-all duration-1000" 
            alt="PMU" 
           />
        </div>
      </section>

      <section className="py-32 bg-espresso rounded-[100px] mx-6 text-alabaster">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.services.map(service => (
            <div key={service.id} className="p-16 rounded-[60px] border border-white/5 bg-white/5 space-y-8 group hover:bg-white/10 transition-all duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-4xl font-serif font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                <span className="text-accent text-3xl font-serif italic">{service.price}</span>
              </div>
              <p className="text-alabaster/50 leading-relaxed text-lg font-light italic">{service.description}</p>
              <div className="space-y-4">
                {['Hyper-Realistic Strokes', 'Medical-Grade Pigments', 'Long-Term Durability'].map(f => (
                  <div key={f} className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] font-bold text-accent/40">
                    <Sparkle className="w-3 h-3 text-accent" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PMUService;
