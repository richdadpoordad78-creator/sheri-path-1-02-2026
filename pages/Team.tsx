import React from 'react';
import { TEAM } from '../constants';
import { Instagram, Sparkle, Star, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  image: string;
  role: string;
  bio: string;
  social?: {
    instagram?: string;
  };
  expertise?: string[];
  yearsExperience?: number;
}

interface InstagramProfile {
  label: string;
  url: string;
}

const Team: React.FC = () => {
  // Instagram link configurations for each member
  const instagramProfiles: Record<string, InstagramProfile[]> = {
    sheri: [
      { label: "Aesthetic Injector", url: "https://www.instagram.com/aestheticsinjectorsheri/" },
      { label: "Salon & PMU", url: "https://www.instagram.com/sherisalon.pmu/" }
    ],
    neda: [
      { label: "Skincare", url: "https://www.instagram.com/aden.skincare/" }
    ]
  };

  return (
    <div className="pt-32 md:pt-40 pb-32 bg-gradient-to-b from-brand-silk via-white to-brand-silk/30 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24 md:mb-36 text-center relative">
        {/* Background decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-brand-terracotta/5 via-transparent to-brand-nude/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center space-x-3 mb-10"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-brand-terracotta/40 to-transparent" />
          <div className="flex items-center space-x-2">
            <Sparkle className="w-4 h-4 text-brand-terracotta animate-pulse" />
            <span className="text-brand-terracotta font-semibold tracking-[0.3em] text-xs uppercase">
              The Artisans
            </span>
            <Sparkle className="w-4 h-4 text-brand-terracotta animate-pulse delay-300" />
          </div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-brand-terracotta/40 to-transparent" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl sm:text-8xl md:text-[10rem] font-serif font-bold text-brand-onyx mb-10 leading-[0.85] relative"
        >
          <span className="relative inline-block">
            Masters of 
            <span className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-terracotta/30 to-transparent" />
          </span>
          <br />
          <span className="italic font-normal text-brand-terracotta bg-gradient-to-r from-brand-terracotta via-brand-terracotta/80 to-brand-terracotta bg-clip-text text-transparent">
            Art & Precision
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-brand-onyx/50 max-w-3xl mx-auto font-light leading-relaxed px-4"
        >
          Each member of our collective brings decades of expertise, merging technical mastery with artistic vision to create timeless beauty.
        </motion.p>
      </section>

      {/* Team Members Grid */}
      <div className="container mx-auto px-6 space-y-48 md:space-y-64">
        {(TEAM as TeamMember[]).map((member: TeamMember, idx: number) => {
          const isSheri = member.name.toLowerCase().includes('sheri');
          const isNeda = member.name.toLowerCase().includes('neda');
          const firstName = member.name.split(' ')[0];
          const lastName = member.name.split(' ').slice(1).join(' ');
          
          return (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Decorative background for each card */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-transparent to-brand-silk/20 rounded-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 md:gap-24 items-start`}>
                {/* Image Container */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group cursor-pointer">
                    {/* Gradient frame */}
                    <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-brand-terracotta/5 via-transparent to-brand-nude/10 rounded-[70px] md:rounded-[90px] transform rotate-2 group-hover:rotate-0 transition-transform duration-700" />
                    
                    {/* Main image */}
                    <div className="relative aspect-[3/4] rounded-[50px] md:rounded-[70px] overflow-hidden shadow-2xl shadow-brand-onyx/10">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Founder badge for Sheri */}
                    {isSheri && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full shadow-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-terracotta to-orange-400 flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-onyx">Founder</p>
                            <p className="text-[8px] tracking-wider text-brand-onyx/40">Visionary Leader</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-1/2 pt-8">
                  <div className="space-y-10 md:space-y-14">
                    {/* Name & Title */}
                    <div>
                      <div className="flex items-center mb-5">
                        <div className="w-10 h-px bg-brand-terracotta/30 mr-4" />
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <p className="text-xs font-medium tracking-[0.3em] uppercase text-brand-onyx/40">
                            Master Artisan
                          </p>
                        </div>
                      </div>
                      
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-onyx mb-5 leading-[0.95]">
                        {firstName}
                        <br />
                        <span className="text-brand-terracotta">{lastName}</span>
                      </h2>
                      
                      <div className="flex items-center space-x-4">
                        <p className="text-xl md:text-2xl text-brand-onyx/60 font-light italic">
                          {member.role}
                        </p>
                        {member.yearsExperience && (
                          <span className="text-sm font-medium text-brand-onyx/40 bg-white/80 px-3 py-1 rounded-full border border-brand-onyx/5">
                            {member.yearsExperience}+ years
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-terracotta/10 via-brand-terracotta/40 to-brand-terracotta/10 rounded-full" />
                      <p className="text-lg md:text-xl text-brand-onyx/60 leading-relaxed font-light">
                        {member.bio}
                      </p>
                    </div>

                    {/* Expertise Tags */}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="pt-4">
                        <div className="flex flex-wrap gap-3">
                          {member.expertise.map((skill: string, skillIdx: number) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * skillIdx }}
                              className="px-5 py-2.5 bg-white/90 border border-brand-onyx/5 rounded-full text-sm text-brand-onyx/70 hover:border-brand-terracotta/30 hover:text-brand-onyx transition-all cursor-default backdrop-blur-sm"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="pt-8">
                      <div className="flex items-center space-x-3 mb-7">
                        <Sparkles className="w-4 h-4 text-brand-terracotta/50" />
                        <p className="text-sm font-medium tracking-[0.2em] uppercase text-brand-onyx/30">
                          {`Explore ${isSheri ? "Sheri's" : isNeda ? "Neda's" : `${firstName}'s`} Work`}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Dynamic Instagram Links */}
                        {isSheri && instagramProfiles.sheri.map((profile: InstagramProfile, profileIdx: number) => (
                          <motion.a
                            key={profile.label}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -4 }}
                            className="group relative overflow-hidden bg-white border border-brand-onyx/5 rounded-2xl p-5 hover:border-brand-terracotta/20 transition-all shadow-sm hover:shadow-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-silk to-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                <Instagram className="w-5 h-5 text-brand-onyx/70 group-hover:text-brand-terracotta transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-brand-onyx truncate">{profile.label}</p>
                                <p className="text-xs text-brand-onyx/40 truncate mt-1">
                                  {profile.url.replace('https://www.instagram.com/', '@')}
                                </p>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-brand-onyx/30 group-hover:text-brand-terracotta transition-colors flex-shrink-0" />
                            </div>
                            {/* Hover effect background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                          </motion.a>
                        ))}

                        {isNeda && instagramProfiles.neda.map((profile: InstagramProfile, profileIdx: number) => (
                          <motion.a
                            key={profile.label}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -4 }}
                            className="group relative overflow-hidden bg-white border border-brand-onyx/5 rounded-2xl p-5 hover:border-brand-terracotta/20 transition-all shadow-sm hover:shadow-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-silk to-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                <Instagram className="w-5 h-5 text-brand-onyx/70 group-hover:text-brand-terracotta transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-brand-onyx truncate">{profile.label}</p>
                                <p className="text-xs text-brand-onyx/40 truncate mt-1">
                                  {profile.url.replace('https://www.instagram.com/', '@')}
                                </p>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-brand-onyx/30 group-hover:text-brand-terracotta transition-colors flex-shrink-0" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                          </motion.a>
                        ))}

                        {/* Main Instagram Profile */}
                        {member.social?.instagram && (
                          <motion.a
                            href={member.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -4 }}
                            className="group relative overflow-hidden bg-white border border-brand-onyx/5 rounded-2xl p-5 hover:border-brand-terracotta/20 transition-all shadow-sm hover:shadow-lg md:col-span-2"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-silk to-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                <Instagram className="w-5 h-5 text-brand-onyx/70 group-hover:text-brand-terracotta transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-brand-onyx truncate">
                                  {isSheri ? 'Main Portfolio' : 'Professional Profile'}
                                </p>
                                <p className="text-xs text-brand-onyx/40 truncate mt-1">
                                  {member.social.instagram.replace('https://www.instagram.com/', '@')}
                                </p>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-brand-onyx/30 group-hover:text-brand-terracotta transition-colors flex-shrink-0" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;