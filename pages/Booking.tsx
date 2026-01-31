
import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES } from '../constants';
import { CheckCircle2, Loader2, Send, Calendar, Clock, User, ClipboardList, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [availableServices, setAvailableServices] = useState<any[]>([]);

  // Prevent past dates logic
  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  useEffect(() => {
    if (formData.category && SERVICES[formData.category]) {
      setAvailableServices(SERVICES[formData.category].services);
      setFormData(prev => ({ ...prev, service: '' }));
    } else {
      setAvailableServices([]);
    }
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Integration with SheetDB
      const response = await fetch('https://sheetdb.io/api/v1/rh6rirv4r1pa0', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [{
            ...formData,
            timestamp: new Date().toLocaleString(),
            status: 'Pending'
          }]
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Failed to synchronize with reservation server.');
      }
    } catch (err) {
      console.error("Booking Error:", err);
      setError("We encountered a synchronization error. Please try again or contact us directly at +1 214 694 6407.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Complete = formData.name && formData.email && formData.phone;
  const isStep2Complete = formData.category && formData.service;

  if (isSuccess) {
    return (
      <div className="pt-48 pb-24 min-h-screen bg-brand-silk flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-24 text-center space-y-10 max-w-3xl rounded-[60px] md:rounded-[80px] border border-brand-onyx/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-terracotta"></div>
          <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-terracotta/10 rounded-full flex items-center justify-center mx-auto text-brand-terracotta">
            <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-onyx tracking-tighter italic">Request Logged.</h2>
            <div className="space-y-4 max-w-md mx-auto">
                <p className="text-brand-onyx/50 font-light leading-relaxed text-sm">
                  Confirmation Protocol: <span className="text-brand-onyx font-bold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </p>
                <p className="text-brand-onyx/60 font-light leading-relaxed text-sm md:text-base">
                  Thank you, <span className="text-brand-onyx font-medium">{formData.name}</span>. Your details have been securely synchronized with our master calendar. A specialist will finalize your appointment shortly.
                </p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/'} 
            className="btn-international bg-brand-onyx text-brand-silk px-12 md:px-16 rounded-full"
          >
            Return to Sanctuary
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-32 min-h-screen bg-brand-silk overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Editorial Header */}
        <div className="mb-16 md:mb-24 text-center space-y-6 md:space-y-8">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center space-x-3 text-brand-terracotta"
           >
              <div className="w-8 md:w-12 h-[1px] bg-current"></div>
              <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.4em] md:tracking-[0.5em]">The Reservation Dossier</span>
              <div className="w-8 md:w-12 h-[1px] bg-current"></div>
           </motion.div>
           <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif font-bold leading-none tracking-tighter text-brand-onyx italic">Book Service.</h1>
           <p className="text-brand-onyx/40 font-light text-base md:text-xl italic">Securing your session within the Sheri Shamsi protocols.</p>
        </div>

        {/* Dossier Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-brand-onyx/5 overflow-hidden"
        >
          {/* Progress Ribbon */}
          <div className="flex border-b border-brand-onyx/5 overflow-x-auto">
            {[
              { id: 1, label: 'Identity', icon: User },
              { id: 2, label: 'Protocol', icon: ClipboardList },
              { id: 3, label: 'Schedule', icon: Calendar }
            ].map((step) => (
              <div 
                key={step.id} 
                className={`flex-1 flex items-center justify-center space-x-2 md:space-x-3 py-6 md:py-8 transition-colors duration-700 min-w-[100px] ${activeStep === step.id ? 'bg-brand-onyx text-brand-silk' : 'text-brand-onyx/20'}`}
              >
                <step.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${activeStep === step.id ? 'text-brand-terracotta' : ''}`} />
                <span className="text-[8px] md:text-[10px] font-extrabold uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">{step.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-24 space-y-12 md:space-y-20">
            
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12 md:space-y-16"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 md:gap-y-12">
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Full Name</label>
                      <input 
                        required 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-xl md:text-2xl font-serif focus:outline-none focus:border-brand-terracotta transition-all placeholder:text-brand-onyx/10" 
                        placeholder="Ex: Alexander Reed"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Email Address</label>
                      <input 
                        required 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-xl md:text-2xl font-serif focus:outline-none focus:border-brand-terracotta transition-all placeholder:text-brand-onyx/10" 
                        placeholder="client@luxury.com"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Direct Phone</label>
                      <input 
                        required 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-xl md:text-2xl font-serif focus:outline-none focus:border-brand-terracotta transition-all placeholder:text-brand-onyx/10" 
                        placeholder="+1 (---) --- ----"
                      />
                    </div>
                  </div>
                  <button 
                    type="button"
                    disabled={!isStep1Complete}
                    onClick={() => setActiveStep(2)}
                    className="flex items-center space-x-4 text-brand-terracotta font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px] disabled:opacity-20 transition-all hover:translate-x-2"
                  >
                    <span>Analyze Service Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12 md:space-y-16"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 md:gap-y-12">
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Master Category</label>
                      <select 
                        required 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-xl md:text-2xl font-serif focus:outline-none focus:border-brand-terracotta appearance-none cursor-pointer"
                      >
                        <option value="">Choose Service Series</option>
                        <option value="hair">Hair Architecture</option>
                        <option value="eyelashes">Eyelash Design</option>
                        <option value="botox">Aesthetic Medicine</option>
                        <option value="pmu">Permanent Artistry</option>
                        <option value="skincare">Clinical Skincare</option>
                        <option value="threading">Threading Protocols</option>
                        <option value="waxing">Smooth Aesthetics</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Specific Service</label>
                      <select 
                        required 
                        name="service"
                        disabled={!formData.category}
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-xl md:text-2xl font-serif focus:outline-none focus:border-brand-terracotta appearance-none disabled:opacity-20 cursor-pointer"
                      >
                        <option value="">Choose Precise Service</option>
                        {availableServices.map(s => <option key={s.id} value={s.id}>{s.title} — {s.price}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button 
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-onyx/30 hover:text-brand-onyx transition-colors"
                    >
                      Refine Identity
                    </button>
                    <button 
                      type="button"
                      disabled={!isStep2Complete}
                      onClick={() => setActiveStep(3)}
                      className="flex items-center space-x-4 text-brand-terracotta font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px] disabled:opacity-20 transition-all hover:translate-x-2"
                    >
                      <span>Draft Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12 md:space-y-16"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 md:gap-y-12">
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Reserved Date</label>
                      <div className="relative">
                        <input 
                          required 
                          name="date"
                          type="date"
                          min={today}
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-xl md:text-2xl font-serif focus:outline-none focus:border-brand-terracotta" 
                        />
                        <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-onyx/10 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Preferred Time Window</label>
                      <div className="relative">
                        <input 
                          required 
                          name="time"
                          type="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-xl md:text-2xl font-serif focus:outline-none focus:border-brand-terracotta" 
                        />
                        <Clock className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-onyx/10 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-onyx/40">Clinical Notes / Requests</label>
                    <textarea 
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      className="w-full bg-transparent border-b border-brand-onyx/10 py-4 md:py-6 text-lg md:text-xl font-serif focus:outline-none focus:border-brand-terracotta transition-all placeholder:text-brand-onyx/10 resize-none" 
                      placeholder="Special skin conditions, allergies, or reference details..."
                    />
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-3 text-red-500 bg-red-50 p-4 rounded-2xl border border-red-100">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
                    </motion.div>
                  )}

                  <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 pt-8">
                     <button 
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-brand-onyx/30 hover:text-brand-onyx transition-colors"
                    >
                      Modify Service
                    </button>
                    
                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="btn-international bg-brand-onyx text-brand-silk w-full md:w-auto px-12 md:px-20 py-6 md:py-8 flex items-center justify-center space-x-6 group"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span>Finalize Dossier</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Verification Footer */}
          <div className="bg-brand-onyx/5 p-6 md:p-8 flex items-center justify-center space-x-4 border-t border-brand-onyx/5">
             <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-brand-terracotta" />
             <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-brand-onyx/40 text-center">Platinum Secure Reservation Link — SSL Encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
