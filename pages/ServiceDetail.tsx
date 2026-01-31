
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES, TEAM, CONTACT_DATA } from '../constants';
import { ArrowLeft, Check, Sparkle, Calendar, Instagram, ArrowUpRight, User, ShieldCheck, Activity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ServiceDetail: React.FC = () => {
  const { category, serviceId } = useParams();
  const { scrollY } = useScroll();
  
  // Parallax effects for the hero image
  const imageY = useTransform(scrollY, [0, 500], [0, 100]);
  const contentY = useTransform(scrollY, [0, 500], [0, -20]);

  const categoryData = SERVICES[category || ''];
  const service = categoryData?.services.find(s => s.id === serviceId);
  const sheri = TEAM[0];

  if (!service) {
    return (
      <div className="pt-48 pb-24 container mx-auto px-6 text-center h-screen flex flex-col items-center justify-center bg-brand-silk">
        <h2 className="text-5xl font-serif font-bold text-brand-onyx mb-8 italic">Protocol Syncing...</h2>
        <Link to="/services" className="btn-international bg-brand-onyx text-brand-silk">Return to Catalog</Link>
      </div>
    );
  }

  const protocols = [
    { 
      t: 'Discovery & Mapping', 
      d: 'A comprehensive anatomical analysis where we define your unique facial geometry and aesthetic goals.',
      icon: <User className="w-6 h-6" />,
      tag: 'Step 01'
    },
    { 
      t: 'Precision Execution', 
      d: 'Execution using master-level techniques and surgical-grade products curated specifically for your biological profile.',
      icon: <Activity className="w-6 h-6" />,
      tag: 'Step 02'
    },
    { 
      t: 'Post-Treatment Curation', 
      d: 'Artistic finishing followed by a bespoke long-term maintenance protocol to lock in your signature results.',
      icon: <Check className="w-6 h-6" />,
      tag: 'Step 03'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-brand-silk min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/services" className="inline-flex items-center space-x-4 text-brand-onyx/40 hover:text-brand-terracotta transition-all group">
            <div className="w-10 h-10 rounded-full border border-brand-onyx/10 flex items-center justify-center group-hover:border-brand-terracotta transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Back to Services</span>
          </Link>
        </motion.div>

        {/* Founder Branding - The Interactive Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-white rounded-[40px] p-8 md:p-12 border border-brand-onyx/5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10 group hover:border-brand-terracotta/20 transition-all duration-700"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-silk shadow-2xl relative z-10">
                <img src={sheri.image} alt="Sheri Shamsi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute -top-2 -right-2 bg-brand-terracotta text-white p-2 rounded-full shadow-lg z-20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="absolute inset-0 bg-brand-terracotta/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="text-center md:text-left space-y-3">
              <div className="flex flex-col">
                <h3 className="text-4xl font-serif font-bold text-brand-onyx tracking-tighter">Sheri Shamsi</h3>
                <span className="text-[11px] font-bold text-brand-terracotta uppercase tracking-[0.4em]">Founder & Master Artisan</span>
              </div>
              <p className="text-sm text-brand-onyx/40 max-w-sm font-light italic leading-relaxed">
                "Precision is the only luxury that matters. We draft beauty with surgical accuracy and human warmth."
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
             <a 
               href={CONTACT_DATA.socialLinks.instagram} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center space-x-4 bg-brand-onyx text-brand-silk px-10 py-5 rounded-full hover:bg-brand-terracotta transition-all shadow-xl group/btn"
             >
                <div className="flex flex-col text-right">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] opacity-40">Direct Access</span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em]">@sherisalon.tx</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-silk/10 flex items-center justify-center group-hover/btn:bg-white/20">
                  <Instagram className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
             </a>
             <div className="flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest text-brand-onyx/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Active for Consultations</span>
             </div>
          </div>
        </motion.div>

        {/* Main Service Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Service Details & Protocols */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Service Title Block */}
            <motion.div style={{ y: contentY }} className="space-y-8">
              <div className="space-y-4">
                <span className="text-brand-terracotta font-extrabold uppercase tracking-[0.6em] text-[10px]">Service ID: 0{service.id.slice(-1)}</span>
                <h1 className="text-6xl md:text-9xl font-serif font-bold text-brand-onyx leading-[0.8] tracking-tighter italic">
                  {service.title}
                </h1>
              </div>
              <p className="text-2xl text-brand-onyx/50 font-light leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </motion.div>

            {/* Immersive Image Display */}
            <motion.div 
              style={{ y: imageY }}
              className="relative aspect-video rounded-[60px] overflow-hidden shadow-2xl border border-brand-onyx/5 group"
            >
              <img src={service.image} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt={service.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx/60 via-transparent to-transparent opacity-40"></div>
              <div className="absolute bottom-12 left-12 flex items-center space-x-6">
                 <div className="w-16 h-16 rounded-full bg-brand-silk flex items-center justify-center text-brand-onyx shadow-2xl border border-white">
                    <Sparkle className="w-6 h-6" />
                 </div>
                 <div className="text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Verified Procedure</p>
                    <p className="text-xl font-serif italic tracking-wide">Plano Luxury Standard</p>
                 </div>
              </div>
            </motion.div>

            {/* THE PROTOCOLS SECTION */}
            <section className="space-y-16 pt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-onyx/5 pb-8">
                <div className="space-y-2">
                  <span className="text-brand-terracotta font-extrabold uppercase tracking-[0.4em] text-[10px]">Service Roadmap</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-brand-onyx">The Clinical <span className="italic font-normal">Protocol.</span></h2>
                </div>
                <p className="text-sm text-brand-onyx/40 max-w-xs font-light italic">Every session follows a strict anatomical precision framework.</p>
              </div>

              <div className="relative pl-0 md:pl-24 space-y-16">
                {/* Visual Timeline Line */}
                <div className="absolute left-0 md:left-[45px] top-8 bottom-8 w-[1px] bg-brand-onyx/5 hidden md:block">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-terracotta to-transparent origin-top"></div>
                </div>

                {protocols.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.2 }}
                    className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start group"
                  >
                    {/* Step Indicator Dot (Desktop) */}
                    <div className="absolute -left-[67px] top-6 w-12 h-12 bg-white border border-brand-onyx/10 rounded-full z-10 hidden md:flex items-center justify-center text-brand-terracotta shadow-xl group-hover:bg-brand-terracotta group-hover:text-white transition-all duration-500">
                      {step.icon}
                    </div>

                    <div className="md:col-span-12 bg-white rounded-[50px] p-10 md:p-14 border border-brand-onyx/5 shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden group/card">
                       <div className="absolute top-0 right-0 w-40 h-40 bg-brand-terracotta/5 blur-[80px] rounded-full -translate-y-20 translate-x-20"></div>
                       
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                          <span className="px-5 py-1.5 bg-brand-silk border border-brand-onyx/5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-brand-terracotta">
                            {step.tag}
                          </span>
                       </div>

                       <div className="space-y-4">
                          <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-onyx group-hover/card:text-brand-terracotta transition-colors">{step.t}</h3>
                          <p className="text-lg text-brand-onyx/50 font-light leading-relaxed max-w-3xl italic">
                            {step.d}
                          </p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side: Sticky Pricing & CTA */}
          <div className="lg:col-span-4 h-fit sticky top-40 space-y-8">
             <div className="bg-brand-onyx text-brand-silk p-12 md:p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta/20 rounded-full blur-[60px]"></div>
                
                <div className="space-y-12 relative z-10 text-center">
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-brand-terracotta">Client Investment</span>
                    <div className="text-7xl font-serif font-bold tracking-tighter italic text-brand-silk">{service.price}</div>
                    <div className="w-12 h-[2px] bg-brand-terracotta/30 mx-auto"></div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-sm font-light text-brand-silk/40 italic px-4">
                      Protocol includes complete discovery, procedural execution, and post-service curations.
                    </p>
                    <Link 
                      to="/booking" 
                      className="w-full flex items-center justify-center space-x-4 bg-brand-silk text-brand-onyx py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-brand-terracotta hover:text-brand-silk transition-all shadow-2xl group/cta"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Confirm Reservation</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all" />
                    </Link>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
