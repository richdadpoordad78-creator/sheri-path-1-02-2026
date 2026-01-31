
import React from 'react';
import { Instagram, Facebook, Sparkle, ArrowRight, ArrowUp, Send, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_DATA } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-onyx text-brand-silk pt-32 pb-12 relative overflow-hidden border-t border-brand-silk/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-terracotta/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Brand & Newsletter Block */}
          <div className="md:col-span-5 space-y-16">
            <div className="space-y-8">
              <Link to="/" className="flex items-center space-x-5 group">
                <div className="w-14 h-14 rounded-full bg-brand-terracotta flex items-center justify-center transition-transform group-hover:rotate-180 duration-1000">
                  <Sparkle className="text-brand-silk w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold tracking-tighter uppercase leading-none">Sheri Salon</span>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-terracotta mt-1">Est. 2004</span>
                </div>
              </Link>
              <p className="text-brand-silk/40 text-lg leading-relaxed max-w-sm font-light italic">
                A sanctuary where clinical precision meets anatomical artistry. Redefining the platinum standard of beauty for two decades.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h4 className="text-[10px] font-extrabold uppercase tracking-[0.5em] text-brand-terracotta">Service Updates</h4>
              <div className="relative group max-w-sm">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full bg-transparent border-b border-brand-silk/10 py-4 focus:outline-none focus:border-brand-terracotta transition-all text-sm placeholder:text-brand-silk/20"
                />
                <button className="absolute right-0 bottom-4 text-brand-silk/40 hover:text-brand-terracotta transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-brand-silk/20 uppercase tracking-widest leading-loose">
                Subscribe to receive seasonal curation notes and exclusive residency invitations.
              </p>
            </div>
          </div>

          {/* Quick Access Matrix */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.5em] mb-12 text-brand-terracotta">The Portfolio</h4>
            <ul className="space-y-6">
              {[
                { name: 'Service Menu', path: '/services' },
                { name: 'The Studio', path: '/about' },
                { name: 'The Collective', path: '/team' },
                { name: 'Reservations', path: '/booking', accent: true },
                { name: 'Client Voices', path: '/feedback' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:text-brand-terracotta flex items-center group ${link.accent ? 'text-brand-terracotta' : 'text-brand-silk/60 hover:translate-x-2'}`}
                  >
                    <span>{link.name}</span>
                    {link.accent && <ArrowRight className="w-3 h-3 ml-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge & Location */}
          <div className="md:col-span-4 space-y-16">
            <div>
              <h4 className="text-[10px] font-extrabold uppercase tracking-[0.5em] mb-12 text-brand-terracotta">Location HQ</h4>
              <div className="space-y-4">
                <p className="text-2xl font-serif italic text-brand-silk/80">{CONTACT_DATA.address.street}</p>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-silk/30">{CONTACT_DATA.address.city}, {CONTACT_DATA.address.state} {CONTACT_DATA.address.zip}</p>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-extrabold uppercase tracking-[0.5em] mb-8 text-brand-terracotta">Social Matrix</h4>
              <div className="flex space-x-6">
                <a href={CONTACT_DATA.socialLinks.instagram} target="_blank" className="w-14 h-14 rounded-full border border-brand-silk/5 flex items-center justify-center text-brand-silk/40 hover:bg-brand-silk hover:text-brand-onyx hover:border-brand-silk transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={CONTACT_DATA.socialLinks.facebook} target="_blank" className="w-14 h-14 rounded-full border border-brand-silk/5 flex items-center justify-center text-brand-silk/40 hover:bg-brand-silk hover:text-brand-onyx hover:border-brand-silk transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Utility Foot */}
        <div className="pt-12 border-t border-brand-silk/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-4 md:space-y-0 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-silk/20">
            <p>{CONTACT_DATA.footer.copyright}</p>
            <div className="flex space-x-8">
              <Link to="/privacy" className="hover:text-brand-silk transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-brand-silk transition-colors">Terms</Link>
            </div>
            <a 
              href="https://realamericantechnologies.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-brand-terracotta/40 hover:text-brand-terracotta transition-colors"
            >
              <span>Digital Architecture by <span className="text-brand-terracotta">Real American Technologies</span></span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.5em] text-brand-silk/30 hover:text-brand-silk transition-colors"
          >
            <span>Back to Top</span>
            <div className="w-10 h-10 rounded-full border border-brand-silk/10 flex items-center justify-center group-hover:border-brand-terracotta group-hover:text-brand-terracotta transition-all">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
