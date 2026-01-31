import React from 'react';
import { SERVICES, TEAM } from '../constants';
import { Check, ChevronRight, Sparkle, Calendar, Info, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Services: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const sheri = TEAM[0];

  const setCategory = (cat: string | null) => {
    setSearchParams(cat ? { category: cat } : {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = Object.keys(SERVICES);

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const ticketVars: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  // Function to get booking URL based on category
  const getBookingUrl = (category: string | null): string | null => {
    if (!category) return null;
    
    const categoryLower = category.toLowerCase();
    
    // Waxing, Threading, and Lip Filler all go to Square
    if (categoryLower === 'waxing' || categoryLower === 'threading' || categoryLower === 'lip filler') {
      return "https://squareup.com/appointments/book/3m8lq8bpe448v3/LDCAG2W6871R8/services";
    }
    
    // Skin Care goes to adenskincare.com
    if (categoryLower === 'skin care' || categoryLower === 'skincare') {
      return "https://adenskincare.com/";
    }
    
    // Other categories use internal booking
    return null;
  };

  // Function to handle booking button click
  const handleBookingClick = (category: string | null) => {
    if (!category) return;
    
    const bookingUrl = getBookingUrl(category);
    if (bookingUrl) {
      // Open external URL in new tab
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      // For internal booking, navigate to /booking
      // This will be handled by the Link component
    }
  };

  return (
    <div className="pt-48 pb-24 px-6 md:px-12 bg-brand-silk min-h-screen">
      <div className="container mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-24">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-brand-onyx/5 pb-12">
              <div className="space-y-6">
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex items-center space-x-3 text-brand-terracotta"
                 >
                    <div className="w-12 h-[1px] bg-current"></div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.5em]">The Master Catalog</span>
                 </motion.div>
                 <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-brand-onyx leading-none">
                    {activeCategory ? <span className="capitalize">{activeCategory} <span className="italic font-normal text-brand-terracotta">Protocols.</span></span> : "Service Menu."}
                 </h1>
              </div>

              {/* Category Switcher */}
              <div className="flex flex-wrap gap-4">
                 <button 
                    onClick={() => setCategory(null)}
                    className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${!activeCategory ? 'bg-brand-onyx text-brand-silk' : 'bg-transparent text-brand-onyx/40 hover:text-brand-onyx border border-brand-onyx/10'}`}
                 >
                   All Categories
                 </button>
                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setCategory(cat)}
                     className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-brand-onyx text-brand-silk' : 'bg-transparent text-brand-onyx/40 hover:text-brand-onyx border border-brand-onyx/10'}`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!activeCategory ? (
            <motion.div 
              key="landing"
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {categories.map((key) => (
                <motion.div 
                  key={key}
                  variants={ticketVars}
                  whileHover={{ y: -10 }}
                  onClick={() => setCategory(key)}
                  className="group relative bg-brand-onyx border border-brand-onyx/5 p-12 rounded-[60px] cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 h-[450px] flex flex-col justify-between"
                >
                   {/* Full Bleed Background Image with Overlay */}
                   <div className="absolute inset-0 z-0">
                     <img 
                       src={SERVICES[key].categoryImage} 
                       className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2s]" 
                       alt={key}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx via-brand-onyx/20 to-transparent"></div>
                   </div>

                   <div className="space-y-4 relative z-10">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.6em] text-brand-terracotta">Series 2024</span>
                      <h3 className="text-5xl font-serif font-bold capitalize tracking-tighter text-brand-silk">{key}</h3>
                      <p className="text-sm text-brand-silk/40 italic font-light">{SERVICES[key].services.length} Signature Services</p>
                   </div>

                   <div className="flex items-center space-x-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-brand-silk flex items-center justify-center border border-brand-silk/5 group-hover:bg-brand-terracotta group-hover:text-brand-silk transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-silk opacity-40 group-hover:opacity-100 transition-opacity">Analyze Protocols</span>
                   </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="service-list"
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="space-y-20"
            >
              {/* Back Link */}
              <button 
                onClick={() => setCategory(null)}
                className="inline-flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.5em] text-brand-onyx/30 hover:text-brand-terracotta transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                <span>Return to Overview</span>
              </button>

              {/* Service Tickets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
                {SERVICES[activeCategory].services.map((service, i) => {
                  // Check if this category should use external booking
                  const hasExternalBooking = getBookingUrl(activeCategory) !== null;
                  
                  return (
                  <motion.div 
                    key={service.id}
                    variants={ticketVars}
                    className="relative group h-full flex flex-col"
                  >
                    <div className="bg-white border-x border-t border-brand-onyx/5 rounded-t-[40px] p-10 flex-1 flex flex-col justify-between relative overflow-hidden">
                       
                       <div className="flex items-center justify-between mb-12 relative z-10">
                          <div className="flex items-center space-x-4">
                             <div className="relative">
                                <img src={sheri.image} className="w-14 h-14 rounded-full object-cover border-2 border-brand-silk shadow-lg" alt="Sheri" />
                                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full border-2 border-white p-0.5">
                                   <Check className="w-2.5 h-2.5 text-white stroke-[5]" />
                                </div>
                             </div>
                             <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-onyx">Sheri Shamsi</h4>
                                <p className="text-[8px] font-extrabold text-brand-terracotta uppercase tracking-[0.2em]">Master Certified</p>
                             </div>
                          </div>
                          <div className="text-[10px] font-bold text-brand-onyx/10 tracking-tighter">REF: {service.id.toUpperCase()}</div>
                       </div>

                       <div className="space-y-6 relative z-10">
                          <h3 className="text-4xl font-serif font-bold text-brand-onyx tracking-tighter leading-[0.9] group-hover:text-brand-terracotta transition-colors duration-500">
                             {service.title}
                          </h3>
                          <p className="text-sm text-brand-onyx/50 font-light italic leading-relaxed">
                             {service.description}
                          </p>
                       </div>

                       <Sparkle className="absolute -bottom-10 -right-10 w-48 h-48 text-brand-onyx/5 group-hover:rotate-45 transition-transform duration-[2s]" />
                    </div>

                    <div className="flex items-center px-4 bg-white">
                       <div className="w-8 h-8 rounded-full bg-brand-silk -ml-8 border border-brand-onyx/5"></div>
                       <div className="flex-1 border-b-2 border-dotted border-brand-onyx/10 h-[1px]"></div>
                       <div className="w-8 h-8 rounded-full bg-brand-silk -mr-8 border border-brand-onyx/5"></div>
                    </div>

                    <div className="bg-white border-x border-b border-brand-onyx/5 rounded-b-[40px] p-10 pt-6 space-y-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                       <div className="flex justify-between items-end">
                          <div className="space-y-1">
                             <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-brand-onyx/30">Investment</span>
                             <div className="text-3xl font-serif font-bold text-brand-onyx">{service.price}</div>
                          </div>
                          
                          {/* Conditional rendering based on category */}
                          {hasExternalBooking ? (
                            <button
                              onClick={() => handleBookingClick(activeCategory)}
                              className="w-12 h-12 rounded-full bg-brand-onyx flex items-center justify-center text-brand-silk hover:bg-brand-terracotta transition-all shadow-lg group-hover:scale-110 cursor-pointer"
                            >
                              <Calendar className="w-5 h-5" />
                            </button>
                          ) : (
                            <Link 
                              to="/booking"
                              className="w-12 h-12 rounded-full bg-brand-onyx flex items-center justify-center text-brand-silk hover:bg-brand-terracotta transition-all shadow-lg group-hover:scale-110"
                            >
                              <Calendar className="w-5 h-5" />
                            </Link>
                          )}
                       </div>

                       <Link 
                          to={`/services/${activeCategory}/${service.id}`}
                          className="flex items-center space-x-3 text-[9px] font-bold uppercase tracking-[0.4em] text-brand-onyx/40 hover:text-brand-onyx transition-colors"
                       >
                          <span>Service Details</span>
                          <Info className="w-3 h-3" />
                       </Link>
                    </div>
                  </motion.div>
                )})}
              </div>

              {SERVICES[activeCategory].services.length === 0 && (
                <div className="py-32 text-center space-y-8">
                   <h2 className="text-4xl font-serif font-bold italic text-brand-onyx/20 tracking-tighter">Drafting the protocols...</h2>
                   <p className="text-sm text-brand-onyx/30 uppercase tracking-[0.4em] font-bold">New Services Pending</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Services;