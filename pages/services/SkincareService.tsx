
import React from 'react';
import { SERVICES } from '../../constants';
import { Check, Sparkles, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SkincareService = () => {
  const services = SERVICES['skincare'];

  return (
    <div className="bg-alabaster min-h-screen">
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/15866041/pexels-photo-15866041.jpeg" className="w-full h-full object-cover opacity-10" alt="Skin" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-xl">
              <Droplets className="w-10 h-10" />
            </div>
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-serif font-bold text-espresso tracking-tighter leading-none">Clinical <br /><span className="italic text-primary">Revival</span></h1>
          <p className="text-xl text-espresso/50 max-w-xl mx-auto italic font-light">Medical-grade chemistry for biological radiance.</p>
        </div>
      </section>

      <section className="py-32 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.services.map((service, idx) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-12 rounded-[60px] shadow-sm border border-espresso/5 space-y-8 hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-serif font-bold text-espresso leading-tight group-hover:text-primary transition-colors">{service.title}</h3>
              <span className="text-primary font-serif italic text-2xl">{service.price}</span>
            </div>
            <p className="text-espresso/60 leading-relaxed text-sm italic font-light">{service.description}</p>
            <ul className="space-y-4 pt-4 border-t border-espresso/5">
              {['Anatomical Analysis', 'Master Protocol', 'Radiant Finish'].map(f => (
                <li key={f} className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-espresso/30">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/booking" className="btn-luxury text-white w-full py-6 rounded-full block text-center font-bold uppercase tracking-widest text-[10px] shadow-xl">
              Reserve Session
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default SkincareService;
