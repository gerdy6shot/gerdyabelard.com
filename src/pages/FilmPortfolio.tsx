import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MOCK_PROJECTS } from '../data/mockData';
import { Film, Play, Award, Camera, ArrowUpRight } from 'lucide-react';
import { CinematicSceneHero } from '../components/cinematic/CinematicSceneHero';

export const FilmPortfolio: React.FC = () => {
  const filmProjects = MOCK_PROJECTS.filter((p) => p.category === 'film');

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-24 px-6 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* STAGES 01-04: CINEMATIC PAUSED FRAME HERO */}
      <CinematicSceneHero
        imageUrl="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Cinematic Direction Widescreen Frame"
        categoryBadge="WORLD 004 // CINEMATIC DIRECTION"
        title="FILM"
        subtitle="Narrative motion pictures, commercial cinema, anamorphic composition, and moving-image directing by Gerdy Abelard."
        frameStyle="film"
        metadata={[
          { label: 'FORMATS', value: '35mm Anamorphic • Alexa 35' },
          { label: 'DIRECTOR', value: 'Gerdy Abelard' },
          { label: 'TITLES', value: `${filmProjects.length} Works` },
        ]}
      />

      {/* Director Statement & Video Reel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 bg-[#0d0d10] border border-[#22222c] p-6 sm:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[16/9] bg-[#08080a] border border-[#22222c] overflow-hidden group">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block">
              // Director Statement
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#f4f3ef] uppercase tracking-wide">
              The Architecture of the Frame
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-light font-sans-ui">
              "Film is the temporal manipulation of architectural space. Every camera placement is a psychological contract with the audience. I direct moving images that prioritize emotional resonance over frantic stimulation."
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#8a8a8a]">
              <span>Gears: ARRI Alexa 35, Panavision Anamorphic, Phantom Flex</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STAGE 05: DISCOVERY - Filmography Index */}
      <div className="space-y-12">
        <div className="flex items-center justify-between border-b border-[#22222c] pb-4">
          <h2 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wider">
            Directorial Filmography
          </h2>
          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
            {filmProjects.length} FEATURED ENTRIES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filmProjects.map((film, idx) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0d0d10] border border-[#22222c] overflow-hidden p-6 space-y-4 hover:border-[#c5a059] transition-all duration-500"
            >
              <div className="relative aspect-[16/9] bg-[#08080a] overflow-hidden border border-[#22222c]">
                <img
                  src={film.hero_image_url}
                  alt={film.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#8a8a8a]">
                  <span>{film.release_year}</span>
                  <span className="text-[#c5a059]">{film.roles.join(' • ')}</span>
                </div>
                <h3 className="font-serif-display text-2xl text-[#f4f3ef] uppercase tracking-wide">{film.title}</h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed font-light">{film.description}</p>
              </div>

              <div className="pt-4 border-t border-[#1c1c24] flex justify-between items-center">
                <Link
                  to={`/work/${film.slug}`}
                  className="text-xs font-mono uppercase tracking-wider text-[#c5a059] hover:underline flex items-center gap-1"
                >
                  <span>View Director Notes</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

