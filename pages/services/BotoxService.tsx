
import React from 'react';
import { SERVICES } from '../../constants';
import { ShieldCheck, Heart, Syringe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BotoxService = () => {
  const services = SERVICES['botox'];

  return (
    <div className="bg-espresso text-alabaster min-h-screen">
      <section className="relative h-screen flex items-center pt-24 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 relative z-10">
            <div className="inline-flex items-center space-x-3 text-accent bg-accent/10 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs">
              <Syringe className="w-4 h-4" />
              <span>Certified Aesthetics</span>
            </div>
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-alabaster leading-[0.8] tracking-tighter">
              Timeless <br /><span className="italic text-secondary">Aesthetics</span>
            </h1>
            <p className="text-xl text-alabaster/60 font-light max-w-lg leading-relaxed">
              We specialize in "Invisible Restoration." Results so natural, only you know the secret. Our board-certified experts prioritize your anatomy over trends.
            </p>
            <div className="flex space-x-6">
              <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-espresso" />)}
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold">Loved by 2,000+ Clients</p>
                <p className="text-alabaster/40 uppercase tracking-widest">In Plano, Texas</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
               <img src="https://images.pexels.com/photos/3985311/pexels-photo-3985311.jpeg" className="w-full h-full object-cover" alt="Botox Result" />
             </div>
             <div className="absolute -bottom-10 -right-10 bg-accent text-espresso p-10 rounded-[40px] shadow-2xl max-w-[250px]">
               <h4 className="text-2xl font-serif font-bold mb-4 italic">"I look refreshed, not frozen."</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">— Sarah J.</p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-white text-espresso">
        <div className="container mx-auto px-6 space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-serif font-bold">The Injection Menu</h2>
            <p className="text-espresso/40">FDA-Approved. Clinically Verified. Artistically Delivered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.services.map(service => (
              <div key={service.id} className="group p-12 rounded-[40px] border border-espresso/5 bg-alabaster hover:bg-espresso hover:text-white transition-all duration-500">
                <h3 className="text-3xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-sm opacity-60 mb-8 h-12">{service.description}</p>
                <div className="text-4xl font-serif italic mb-10 text-primary">{service.price}</div>
                <Link to="/booking" className="block text-center py-5 rounded-full border border-current font-bold uppercase tracking-widest text-[10px] group-hover:bg-accent group-hover:border-accent group-hover:text-espresso transition-all">
                  Request Consultation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BotoxService;
