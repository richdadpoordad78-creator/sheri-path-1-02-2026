import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, ArrowRight, ArrowUpRight, Globe } from 'lucide-react';
import { CONTACT_DATA } from '../constants';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div className="bg-brand-silk pt-32 md:pt-48 pb-24 min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-4xl mb-16 md:mb-32 space-y-6 md:space-y-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center md:justify-start space-x-3 text-brand-terracotta text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.4em] md:tracking-[0.6em]"
          >
            <Globe className="w-4 h-4" />
            <span>Global Sanctuary Connections</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-bold tracking-tighter leading-[1] md:leading-[0.8]"
          >
            Let's <span className="italic font-normal text-brand-terracotta">Sync.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-brand-onyx/50 font-light leading-relaxed max-w-2xl mx-auto md:mx-0"
          >
            Our concierge team is available for bespoke service coordination and professional aesthetic consultations.
          </motion.p>
        </div>

        {/* Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Contact Hub */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12">
            
            {/* Direct Channels */}
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {[
                { icon: Phone, label: "Studio Line", value: CONTACT_DATA.business.phones[0].number, link: `tel:${CONTACT_DATA.business.phones[0].number}` },
                { icon: Mail, label: "Digital Mail", value: CONTACT_DATA.business.email, link: `mailto:${CONTACT_DATA.business.email}` },
                { icon: MessageCircle, label: "Concierge", value: "@SheriStar", link: CONTACT_DATA.socialLinks.telegram }
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.5 }}
                  className="group flex items-center justify-between p-6 md:p-10 bg-white border border-brand-onyx/5 rounded-[30px] md:rounded-[40px] hover:border-brand-terracotta transition-all duration-500 overflow-hidden"
                >
                  <div className="flex items-center space-x-4 md:space-x-6 min-w-0">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand-silk flex-shrink-0 flex items-center justify-center text-brand-terracotta group-hover:bg-brand-terracotta group-hover:text-brand-silk transition-all">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] md:text-[10px] font-extrabold uppercase tracking-widest text-brand-onyx/30 mb-0.5 md:mb-1">{item.label}</p>
                      <p className="text-base md:text-xl font-bold break-all sm:break-normal truncate sm:overflow-visible">{item.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 flex-shrink-0" />
                </motion.a>
              ))}
            </div>

            {/* Social Matrix */}
            <div className="p-8 md:p-12 bg-brand-onyx text-brand-silk rounded-[40px] md:rounded-[50px] space-y-8 md:space-y-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-brand-terracotta/20 blur-[60px] md:blur-[80px] rounded-full"></div>
               <h3 className="text-xl md:text-2xl font-serif italic relative z-10">Follow our artistic evolution.</h3>
               <div className="flex space-x-4 md:space-x-8 relative z-10">
                 <a 
                   href="https://www.instagram.com/aestheticsinjectorsheri/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-silk/20 flex items-center justify-center hover:bg-brand-silk hover:text-brand-onyx transition-all group"
                 >
                   <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-brand-onyx text-brand-silk text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     Aesthetic Injector
                   </span>
                 </a>
                 <a 
                   href="https://www.instagram.com/sherisalon.pmu/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-silk/20 flex items-center justify-center hover:bg-brand-silk hover:text-brand-onyx transition-all group"
                 >
                   <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-brand-onyx text-brand-silk text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     Salon & PMU
                   </span>
                 </a>
                 <a 
                   href={CONTACT_DATA.socialLinks.instagram} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-silk/20 flex items-center justify-center hover:bg-brand-silk hover:text-brand-onyx transition-all group"
                 >
                   <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-brand-onyx text-brand-silk text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     Main Channel
                   </span>
                 </a>
                 <a 
                   href={CONTACT_DATA.socialLinks.facebook} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-silk/20 flex items-center justify-center hover:bg-brand-silk hover:text-brand-onyx transition-all"
                 >
                   <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                 </a>
               </div>
               <p className="text-sm text-brand-silk/60 text-center relative z-10">
                 Explore our specialized channels for aesthetics, injectables, and permanent makeup artistry.
               </p>
            </div>
          </div>

          {/* Right: Studio Locator & Map */}
          <div className="lg:col-span-7 flex flex-col space-y-8 md:space-y-12">
            <div className="flex-1 bg-brand-nude/30 border border-brand-onyx/5 rounded-[40px] md:rounded-[60px] p-8 md:p-12 lg:p-20 space-y-10 md:space-y-16">
               <div className="space-y-4 md:space-y-6">
                 <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-onyx/30">The Destination</span>
                 <h2 className="text-3xl md:text-6xl font-serif font-bold leading-tight">Plano's Premier <br />Aesthetic HQ.</h2>
               </div>
               
               <div className="space-y-8 md:space-y-10">
                 <div className="space-y-2">
                    <p className="text-2xl md:text-3xl font-serif italic text-brand-terracotta break-words">{CONTACT_DATA.address.street}</p>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-onyx/40">{CONTACT_DATA.address.city}, {CONTACT_DATA.address.state} {CONTACT_DATA.address.zip}</p>
                 </div>

                 <a 
                   href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT_DATA.address.street + ' ' + CONTACT_DATA.address.city)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn-international bg-brand-onyx text-brand-silk w-full sm:w-auto"
                 >
                   Get Navigation
                 </a>
               </div>
            </div>

            <div className="h-[300px] md:h-[400px] bg-brand-onyx rounded-[40px] md:rounded-[60px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl relative">
              <iframe 
                title="Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.8239021665424!2d-96.713628424216!3d33.05763537354921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c1835c30adfab%3A0xc6b4802e73efdd14!2s909%20W%20Spring%20Creek%20Pkwy%20%23411%2C%20Plano%2C%20TX%2075023!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;