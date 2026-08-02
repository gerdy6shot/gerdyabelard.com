import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Film, Camera, Layers, BookOpen, Mail, Sparkles, Compass } from 'lucide-react';
import { CinematicGallery } from '../components/cinematic/CinematicGallery';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const StudioPage: React.FC = () => {
  const portalRooms = [
    {
      title: 'FILM & MOTION',
      subtitle: 'Moving Image, Narrative Cinema & Commercial Films',
      category: '001 // CINEMA PRODUCTION',
      link: '/film',
      icon: Film,
      bgUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'PHOTOGRAPHY & STILLS',
      subtitle: 'Medium Format & Commercial Photography',
      category: '002 // IMAGE PRODUCTION',
      link: '/photography',
      icon: Camera,
      bgUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'CREATIVE DIRECTION',
      subtitle: 'Aesthetic Direction, Treatments & Brand Campaigns',
      category: '003 // AESTHETIC DIRECTION',
      link: '/creative-direction',
      icon: Layers,
      bgUrl: 'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'THE ARCHIVE',
      subtitle: 'Curated Vault & Selected Commissions',
      category: '004 // CURATED VAULT',
      link: '/archive',
      icon: Compass,
      bgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'CLIENT COMMISSIONS',
      subtitle: 'Case Studies, Production Capabilities & Client Records',
      category: '005 // COMMISSIONS',
      link: '/clients',
      icon: BookOpen,
      bgUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'PRODUCTION INQUIRIES',
      subtitle: 'Directorial Commissions & Project Intake',
      category: '006 // INTAKE',
      link: '/inquire',
      icon: Mail,
      bgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f5f5f5] selection:bg-[#c5a059] selection:text-[#08080a] pt-28 pb-20 max-w-7xl mx-auto px-6">
      {/* COMVIEWMEDIA HERO */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop"
        imageAlt="COMVIEWMEDIA Production House"
        categoryBadge="THE HOUSE // COMVIEWMEDIA"
        title="COMVIEWMEDIA"
        subtitle="The independent production house and creative studio. Dedicated to high-end film production, medium format stills, aesthetic direction, and bespoke campaign execution."
        frameStyle="gallery"
        metadata={[
          { label: 'HOUSE', value: 'COMVIEWMEDIA' },
          { label: 'DISCIPLINES', value: 'AESTHETIC DIRECTION • FILM • IMAGE • PRODUCTION' },
          { label: 'LOCATIONS', value: 'LOS ANGELES • NEW YORK • MILAN' },
        ]}
      />

      {/* Primary Cinematic Atmosphere Display */}
      <CinematicGallery />

      {/* COMVIEWMEDIA Production Chambers */}
      <div className="py-20 border-t border-[#22222c]">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.3em] block mb-2">
              COMVIEWMEDIA // PRODUCTION CHAMBERS
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#f5f5f5] uppercase tracking-wider font-normal">
              DEPARTMENTS OF EXECUTION
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#8a8a8a]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>SELECT PRODUCTION CHAMBER</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalRooms.map((room, idx) => {
            const IconComp = room.icon;
            return (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <Link
                  to={room.link}
                  className="group relative block bg-[#0d0d10] border border-[#22222c] overflow-hidden p-8 hover:border-[#c5a059] transition-all duration-500 h-full flex flex-col justify-between"
                >
                  <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-30 transition-opacity duration-700">
                    <img
                      src={room.bgUrl}
                      alt={room.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/80 to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#c5a059] uppercase tracking-widest">
                      <span>{room.category}</span>
                      <IconComp className="w-4 h-4 text-[#c5a059]" />
                    </div>

                    <h3 className="font-serif-display text-2xl sm:text-3xl text-[#f5f5f5] group-hover:text-[#c5a059] transition-colors uppercase tracking-wide">
                      {room.title}
                    </h3>

                    <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed">
                      {room.subtitle}
                    </p>
                  </div>

                  <div className="relative z-10 pt-6 mt-6 border-t border-[#1c1c24] flex items-center justify-between font-mono text-xs text-[#8a8a8a] group-hover:text-[#f5f5f5] transition-colors">
                    <span>ENTER ROOM</span>
                    <ArrowUpRight className="w-4 h-4 text-[#c5a059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



