
import React from 'react';
import { SERVICES } from '../../constants';
import { ArrowRight, Scissors, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HairService = () => {
  const hairServices = SERVICES['hair'];

  return (
    <div className="bg-alabaster min-h-screen">
      {/* Immersive Hero */}
      <section className="relative h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg" 
            className="w-full h-full object-cover opacity-10"
            alt="Hair Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-alabaster"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <span className="text-primary font-bold tracking-[0.5em] uppercase text-xs">Category 01</span>
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-espresso leading-[0.8] tracking-tighter">
              Hair <br /> <span className="italic text-primary">Architecture</span>
            </h1>
            <p className="text-2xl text-espresso/60 font-light max-w-xl leading-relaxed">
              Engineering movement, weight, and light into every strand. We don't just cut hair; we sculpt your identity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-serif font-bold text-espresso">The Cut & Color Philosophy</h2>
            <p className="text-lg text-espresso/60 leading-relaxed font-light italic">
              Every precision cut begins with a skeletal analysis. We consider your facial geometry, hair density, and lifestyle to create a look that grows in perfectly and remains manageable for months.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {hairServices.services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ x: 15 }}
                className="group flex items-center justify-between p-10 bg-white rounded-[40px] shadow-sm border border-espresso/5 transition-all hover:shadow-xl"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-espresso group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-espresso/40 italic">{service.description}</p>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-serif text-primary italic">{service.price}</span>
                  <Link to="/booking" className="text-[10px] font-bold uppercase tracking-widest text-espresso/30 opacity-0 group-hover:opacity-100 transition-all">
                    Secure Spot
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg" 
            className="rounded-[60px] shadow-2xl w-full sticky top-32"
            alt="Process"
          />
        </div>
      </section>
    </div>
  );
};

export default HairService;
