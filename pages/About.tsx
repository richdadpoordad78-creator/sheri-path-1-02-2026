
import React from 'react';
import { TEAM } from '../constants';
import { Instagram, Mail, Sparkle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 md:pt-40 pb-24 bg-brand-silk space-y-24 md:space-y-32 overflow-x-hidden">
      {/* Header */}
      <section className="container mx-auto px-6 text-center max-w-4xl space-y-6 md:space-y-8">
        <div className="inline-flex items-center space-x-2 text-brand-terracotta font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px]">
          <Sparkle className="w-3 h-3" />
          <span>Established 2004</span>
        </div>
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif font-bold text-brand-onyx tracking-tighter leading-[1] md:leading-[0.8]">
          Our <span className="italic text-brand-terracotta">Legacy</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-onyx/40 max-w-2xl mx-auto font-light leading-relaxed italic px-4">
          For two decades, we have served as Plano's sanctuary for precision aesthetics. Our story is one of mastery, evolution, and an unwavering commitment to the individual.
        </p>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center overflow-hidden">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 md:-inset-10 bg-brand-terracotta/5 rounded-[60px] md:rounded-[120px] rotate-2 md:rotate-3"></div>
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1200" 
            alt="Salon Interior" 
            className="relative z-10 w-full aspect-[4/5] object-cover rounded-[50px] md:rounded-[100px] shadow-2xl"
          />
        </div>
        <div className="space-y-8 md:space-y-12 order-1 lg:order-2">
          <div className="space-y-4 md:space-y-6">
            <span className="text-brand-terracotta font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px]">The Ethos</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-onyx leading-tight">Architectural Beauty, <br /><span className="italic text-brand-terracotta">Surgically Precise.</span></h2>
          </div>
          <p className="text-lg md:text-xl text-brand-onyx/60 leading-relaxed font-light italic">
            Every guest at Sheri Salon is treated to a customized experience. We don't believe in one-size-fits-all beauty. 
            Whether it's the architectural precision of a haircut or the clinical accuracy of an aesthetic treatment, 
            our goal is to enhance what makes you unique.
          </p>
          <div className="p-8 md:p-10 bg-white rounded-[40px] md:rounded-[50px] shadow-sm border border-brand-onyx/5 italic text-brand-onyx/80 space-y-4">
            <p className="text-xl md:text-2xl font-light leading-relaxed">"Beauty is an experience, not just a service. We aim to make every guest feel like a superstar, every single day."</p>
            <p className="font-serif font-bold not-italic text-brand-terracotta">— Sheri Shamsi, Founder</p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 md:py-32 bg-white rounded-[60px] md:rounded-[100px] mx-4 md:mx-6 overflow-hidden">
        <div className="container mx-auto px-6 space-y-16 md:space-y-24">
          <div className="text-center space-y-4 md:space-y-6">
            <span className="text-brand-terracotta font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px]">The Artisans</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-onyx">Meet the <span className="italic text-brand-terracotta">Experts</span></h2>
            <div className="w-16 md:w-24 h-1 bg-brand-terracotta/20 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {TEAM.map((member) => (
              <div key={member.name} className="group flex flex-col space-y-6 md:space-y-8">
                <div className="aspect-[3/4] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-xl relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="space-y-3 md:space-y-4 text-center px-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-onyx">{member.name}</h3>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-brand-terracotta">{member.role}</p>
                  </div>
                  <p className="text-sm text-brand-onyx/50 leading-relaxed font-light italic line-clamp-3">{member.bio}</p>
                  <div className="flex justify-center space-x-6 pt-4">
                    {member.social?.instagram && (
                      <a href={member.social.instagram} target="_blank" className="text-brand-onyx/20 hover:text-brand-terracotta transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.email && member.social.email !== 'none' && (
                      <a href={`mailto:${member.social.email}`} className="text-brand-onyx/20 hover:text-brand-terracotta transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
