import React, { useEffect, useRef, useState } from "react";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
}

const portfolioData: ProjectItem[] = [
  {
    id: "01",
    title: "COMVIEWMEDIA",
    subtitle: "Commercial Film & Visual Direction",
    role: "FOUNDED & DIRECTED BY GERDY ABELARD",
    description:
      "Motion picture directing, high-contrast cinema optics, and visual narrative systems for commercial and editorial productions.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1800&auto=format&fit=crop",
    link: "https://comviewmedia.com",
    linkText: "VISIT COMVIEWMEDIA.COM →",
  },
  {
    id: "02",
    title: "OVERHAULTRAIN",
    subtitle: "Fitness Architecture & Performance Systems",
    role: "FOUNDED & ARCHITECTED BY GERDY ABELARD",
    description:
      "Physical training architecture, nutritional precision, and performance tracking systems engineered for daily execution and consistency.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop",
    link: "https://overhaultrain.com",
    linkText: "VISIT OVERHAULTRAIN.COM →",
  },
  {
    id: "03",
    title: "OPHIONOIR",
    subtitle: "Artisanal Agave & Luxury Vessel Design",
    role: "BRAND ARCHITECTURE & DEVELOPMENT",
    description:
      "Ultra-premium agave distillation study, luxury bottle geometry, tactile materials, and disciplined visual prestige.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1800&auto=format&fit=crop",
    link: "#",
    linkText: "PRIVATE ARCHIVE",
  },
  {
    id: "04",
    title: "MELLO MINIS",
    subtitle: "Agave Infrastructure & Scaled Goods",
    role: "PRODUCT ARCHITECTURE",
    description:
      "Scalable consumer goods infrastructure, bespoke label design, and logistics packaging systems.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1800&auto=format&fit=crop",
    link: "#",
    linkText: "IN DEVELOPMENT",
  },
  {
    id: "05",
    title: "ROCE DE LIBERTAD",
    subtitle: "Botanical Spirits & Cultural Origins",
    role: "BRAND ARCHITECTURE",
    description:
      "Heritage-driven botanical spirits, cultural storytelling, and origin-focused distillation identity.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1800&auto=format&fit=crop",
    link: "#",
    linkText: "IN DEVELOPMENT",
  },
  {
    id: "06",
    title: "CINEMA OPTICS & RESEARCH",
    subtitle: "35mm Field Studies & Micro-Contrast",
    role: "RESEARCH & DIRECTION",
    description:
      "Field studies on vintage lens rendering, optical micro-contrast, 3D character, and cinema color palettes.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1800&auto=format&fit=crop",
    link: "#",
    linkText: "VIEW FIELD NOTES",
  },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [activeTiles, setActiveTiles] = useState<Set<string>>(new Set());

  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const openProject = (
    project: ProjectItem,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    lastFocusedElement.current = event.currentTarget;
    setActiveProject(project);
  };

  const toggleActiveTile = (id: string) => {
    setActiveTiles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const closeProject = () => {
    setActiveProject(null);

    window.setTimeout(() => {
      lastFocusedElement.current?.focus();
    }, 0);
  };

  const openContact = (event: React.MouseEvent<HTMLButtonElement>) => {
    lastFocusedElement.current = event.currentTarget;
    setShowContact(true);
  };

  const closeContact = () => {
    setShowContact(false);

    window.setTimeout(() => {
      lastFocusedElement.current?.focus();
    }, 0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (activeProject) {
        closeProject();
      }

      if (showContact) {
        closeContact();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, showContact]);

  useEffect(() => {
    const isOverlayOpen = activeProject !== null || showContact;

    document.body.style.overflow = isOverlayOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, showContact]);

  const enterSite = () => {
    setEntered(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f0f0f0] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#8b1e1e] selection:text-white relative overflow-x-hidden">
      {/* 35mm Subtle Film Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Pure Black Editorial Intro Screen */}
      <button
        type="button"
        onClick={enterSite}
        aria-label="Enter Gerdy Abelard portfolio"
        aria-hidden={entered}
        tabIndex={entered ? -1 : 0}
        className={`fixed inset-0 z-[60] w-full h-full bg-[#000000] flex justify-center items-center focus:outline-none transition-all duration-1000 ease-out ${
          entered
            ? "opacity-0 scale-110 pointer-events-none"
            : "opacity-100 scale-100 cursor-pointer"
        }`}
      >
        <span className="wordmark-wrapper hover:opacity-75 transition-opacity duration-700">
          <span className="word-gerdy">GERDY</span>
          <span className="word-abelard">ABELARD</span>
        </span>
      </button>

      {/* Main Exhibition Experience */}
      <div
        className={`transition-opacity duration-1000 ${
          entered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Permanent Fixed Navigation Header */}
        <header className="fixed top-0 left-0 w-full z-1000 pointer-events-none box-border px-6 md:px-10 py-5 md:py-6 flex flex-row justify-between items-center gap-4 bg-black">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="pointer-events-auto font-title-signature text-sm sm:text-base md:text-lg uppercase tracking-[0.25em] font-semibold text-white cursor-pointer select-none text-left hover:text-white/75 transition-colors focus:outline-none"
            aria-label="Return to top"
          >
            GERDY ABELARD
          </button>

          <nav
            className="pointer-events-auto flex items-center gap-2 sm:gap-3 font-title-signature text-[10px] sm:text-xs tracking-[0.15em] uppercase text-white/70 select-none"
            aria-label="Main navigation"
          >
            <button
              type="button"
              onClick={scrollToWork}
              className="hover:text-white cursor-pointer transition-colors focus:outline-none"
            >
              FILM
            </button>

            <span className="text-white/30 font-light" aria-hidden="true">
              |
            </span>

            <button
              type="button"
              onClick={scrollToWork}
              className="hover:text-white cursor-pointer transition-colors focus:outline-none"
            >
              VENTURES
            </button>

            <span className="text-white/30 font-light" aria-hidden="true">
              |
            </span>

            <span className="lowercase italic font-normal tracking-normal text-white/50">
              {"{archive}"}
            </span>

            <span className="text-white/30 font-light" aria-hidden="true">
              |
            </span>

            <button
              type="button"
              onClick={openContact}
              className="text-white hover:text-[#8b1e1e] cursor-pointer transition-colors uppercase ml-1 focus:outline-none"
            >
              Contact
            </button>
          </nav>
        </header>

        {/* 2-Column Borderless Grid with Center Hover Reveals */}
        <main
          id="work"
          className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#000000] pt-19 md:pt-23"
        >
          {portfolioData.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={(event) => {
                toggleActiveTile(item.id);
                openProject(item, event);
              }}
              className={`grid-tile relative aspect-[16/9] w-full overflow-hidden cursor-pointer group bg-[#080809] block text-left select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-inset ${
                activeTiles.has(item.id) ? "is-active" : ""
              }`}
              aria-label={`View ${item.title} project details`}
            >
              <img
                src={item.image}
                alt={`${item.title} — ${item.subtitle}`}
                loading={item.id === "01" ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={item.id === "01" ? "high" : "auto"}
                className="grid-tile-image w-full h-full object-cover"
              />

              {/* Deep shadow falloff — cinematic vignette */}
              <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]"
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-400 ease-out">
                <h2 className="font-['GFS_Didot',serif] text-2xl sm:text-3xl md:text-4xl text-white font-normal uppercase tracking-wide leading-tight drop-shadow-lg">
                  {item.title}
                </h2>

                <p className="mt-3 font-['GFS_Didot',serif] italic text-sm sm:text-base text-white/80 max-w-md font-light">
                  {item.subtitle}
                </p>
              </div>
            </button>
          ))}
        </main>

        {/* Footer */}
        <footer className="px-6 md:px-12 py-12 flex justify-between items-center text-[10px] uppercase tracking-[0.25em] font-light text-white/30 border-t border-white/5">
          <span>© Gerdy Abelard</span>
          <span>I build things for the real world</span>
        </footer>
      </div>

      {/* Cinematic Modal Window */}
      {activeProject && (
        <div
          className="fixed inset-0 z-1100 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-4 sm:p-8 md:p-14"
          onClick={closeProject}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <button
            type="button"
            onClick={closeProject}
            aria-label="Close project details"
            className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/70 hover:text-white font-['GFS_Didot',serif] text-2xl sm:text-3xl font-light leading-none transition-colors z-20 cursor-pointer focus:outline-none"
          >
            ×
          </button>

          <div
            className="relative w-full max-w-5xl bg-[#080809] border border-white/10 shadow-2xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w-full aspect-[16/9] bg-black relative overflow-hidden">
              <img
                src={activeProject.image}
                alt={`${activeProject.title} project`}
                className="w-full h-full object-cover grayscale contrast-115 brightness-95"
              />
              <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]"
                aria-hidden="true"
              />
            </div>

            <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#080809]">
              <div className="max-w-2xl">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b1e1e] font-light mb-2">
                  {activeProject.role}
                </p>

                <h3
                  id="project-title"
                  className="font-['GFS_Didot',serif] text-2xl sm:text-3xl uppercase text-white tracking-wide mb-3"
                >
                  {activeProject.title}
                </h3>

                <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {activeProject.link && activeProject.link !== "#" ? (
                <div className="flex-shrink-0">
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] uppercase tracking-[0.25em] text-white hover:text-[#8b1e1e] font-light border-b border-white/20 hover:border-[#8b1e1e] pb-1 transition-all"
                  >
                    {activeProject.linkText}
                  </a>
                </div>
              ) : (
                <p className="flex-shrink-0 text-[10px] uppercase tracking-[0.25em] text-white/35">
                  {activeProject.linkText}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Contact Overlay */}
      {showContact && (
        <div
          className="fixed inset-0 z-1110 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center p-6 text-center"
          onClick={closeContact}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          <button
            type="button"
            onClick={closeContact}
            aria-label="Close contact panel"
            className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/70 hover:text-white font-['GFS_Didot',serif] text-2xl sm:text-3xl font-light leading-none transition-colors cursor-pointer focus:outline-none"
          >
            ×
          </button>

          <div
            className="max-w-2xl w-full flex flex-col items-center gap-8 text-white font-['GFS_Didot',serif]"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <p
                id="contact-title"
                className="text-sm uppercase tracking-[0.1em] text-white/50 mb-2 font-normal"
              >
                (e) Direct Inquiries
              </p>

              <a
                href="mailto:contact@gerdyabelard.com"
                className="text-2xl sm:text-3xl md:text-4xl text-white hover:text-[#8b1e1e] transition-colors lowercase tracking-normal"
              >
                contact@gerdyabelard.com
              </a>
            </div>

            <div className="w-12 h-px bg-white/20 my-2" aria-hidden="true" />

            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/60 mb-2">
                FOR COMMERCIAL & DIRECTING INQUIRIES:
              </p>

              <p className="text-base sm:text-lg text-white/90">
                COMVIEWMEDIA STUDIO
              </p>

              <a
                href="mailto:contact@comviewmedia.com"
                className="text-sm sm:text-base text-white/70 hover:text-white transition-colors lowercase italic"
              >
                contact@comviewmedia.com
              </a>
            </div>

            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/60 mb-2">
                VENTURE ARCHITECTURE & PARTNERSHIPS:
              </p>

              <a
                href="mailto:contact@gerdyabelard.com"
                className="text-sm sm:text-base text-white/70 hover:text-white transition-colors lowercase italic"
              >
                contact@gerdyabelard.com
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}