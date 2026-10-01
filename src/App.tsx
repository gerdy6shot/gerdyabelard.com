import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
  isBlackAndWhite?: boolean;
  wordmark?: string;
}

type InquiryKind = "mello" | "ophionoir";

const portfolioData: ProjectItem[] = [
  {
    id: "01",
    title: "COMVIEWMEDIA",
    subtitle: "Commercial Film & Visual Direction",
    role: "FOUNDED & DIRECTED BY GERDY ABELARD",
    description:
      "Motion picture directing, high-contrast cinema optics, and visual narrative systems for commercial and editorial productions.",
    image: "/images/ventures/comviewmedia-logo.png",
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
    image: "/images/ventures/overhaultrain-logo.png",
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
    image: "/images/ventures/ophionoir-icon.png",
    link: "#",
    linkText: "PRIVATE DEVELOPMENT",
  },
  {
    id: "05",
    title: "ROCE DE LIBERTAD",
    subtitle: "Botanical Spirits & Cultural Origins",
    role: "BRAND ARCHITECTURE",
    description:
      "Heritage-driven botanical spirits, cultural storytelling, and origin-focused distillation identity.",
    image: "/images/ventures/roce-de-libertad.jpeg",
    wordmark: "✦  ROCE DE LIBERTAD",
    link: "https://rocedelibertad.com",
    linkText: "VISIT ROCE DE LIBERTAD.COM →",
  },
  {
    id: "06",
    title: "CINEMA OPTICS & RESEARCH",
    subtitle: "35mm Field Studies & Micro-Contrast",
    role: "RESEARCH & DIRECTION",
    description:
      "Field studies on vintage lens rendering, optical micro-contrast, 3D character, and cinema color palettes.",
    image: "/images/comviewmedia/11C1F314-7D4D-4397-B885-7322031B62A2.JPEG",
    link: "#",
    linkText: "VIEW FIELD NOTES",
  },
  {
    id: "07",
    title: "KEN THE PHOTOGRAPHER",
    subtitle: "Archival Museum & Photography Legacy",
    role: "DIGITAL ARCHIVE / WEBSITE DEVELOPMENT",
    description:
      "A digital archival museum preserving Kenneth Harris's photography, legacy, and more than five decades of cultural documentation.",
    image: "",
    wordmark: "KEN THE PHOTOGRAPHER",
    link: "https://kenthephotographer.com",
    linkText: "VISIT KENTHEPHOTOGRAPHER.COM →",
  },
];

/* Persistent header — rendered on every page, every link performs real navigation */
function Header() {
  const location = useLocation();

  const goHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-1000 pointer-events-none box-border px-6 md:px-10 py-5 md:py-6 flex flex-row justify-between items-center gap-4 bg-black">
      <Link
        to="/"
        onClick={goHome}
        className="pointer-events-auto font-title-signature text-sm sm:text-base md:text-lg uppercase tracking-[0.25em] font-semibold text-white cursor-pointer select-none text-left hover:text-white/75 transition-colors focus:outline-none"
        aria-label="Return home"
      >
        GERDY ABELARD
      </Link>

      <nav
        className="pointer-events-auto flex items-center gap-1 sm:gap-3 font-title-signature text-[10px] sm:text-xs tracking-[0.15em] uppercase text-white/70 select-none overflow-x-auto max-w-[62vw] sm:max-w-none flex-nowrap"
        aria-label="Main navigation"
      >
        <Link
          to="/work"
          className="hover:text-white cursor-pointer transition-colors focus:outline-none"
        >
          WORK
        </Link>

        <span className="text-white/30 font-light" aria-hidden="true">
          |
        </span>

        <Link
          to="/archive"
          className="hover:text-white cursor-pointer transition-colors focus:outline-none"
        >
          ART WORLD
        </Link>

        <span className="text-white/30 font-light" aria-hidden="true">
          |
        </span>

        <Link
          to="/ventures"
          className="hover:text-white cursor-pointer transition-colors focus:outline-none"
        >
          VENTURES
        </Link>

        <span className="text-white/30 font-light" aria-hidden="true">
          |
        </span>

        <Link
          to="/about"
          className="hover:text-white cursor-pointer transition-colors focus:outline-none"
        >
          ABOUT
        </Link>

        <span className="text-white/30 font-light" aria-hidden="true">
          |
        </span>

        <Link
          to="/contact"
          className="text-white hover:text-[#8b1e1e] cursor-pointer transition-colors uppercase ml-1 focus:outline-none"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

/* Home — the project grid, footer, and the project detail modal */
function HomePage() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeInquiry, setActiveInquiry] = useState<InquiryKind | null>(null);
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [activeTiles, setActiveTiles] = useState<Set<string>>(new Set());
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const openProject = (
    project: ProjectItem,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    lastFocusedElement.current = event.currentTarget;
    setActiveProject(project);
  };

  const lockActiveTile = (id: string) => {
    setActiveTiles((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const closeProject = () => {
    setActiveProject(null);
    setActiveInquiry(null);
    setInquiryEmail("");
    setInquiryMessage("");

    window.setTimeout(() => {
      lastFocusedElement.current?.focus();
    }, 0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (activeProject || activeInquiry) {
        closeProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, activeInquiry]);

  useEffect(() => {
    document.body.style.overflow =
      activeProject !== null || activeInquiry !== null ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, activeInquiry]);

  return (
    <>
      <section className="grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-8 bg-black px-6 pb-12 pt-28 sm:px-10 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-12 md:px-16 md:pb-16 md:pt-32 lg:px-24">
        <div className="flex h-full min-h-[28rem] items-center justify-center md:min-h-[38rem]">
          <img
            src="/images/gerdy-home-portrait.png"
            alt="Gerdy Abelard seated in a white cardigan"
            className="max-h-[72vh] w-full object-contain object-center grayscale contrast-105"
            fetchPriority="high"
          />
        </div>
        <div className="border-t border-white/20 pt-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <h1 className="font-title-signature text-[clamp(2rem,5vw,4.5rem)] uppercase leading-none tracking-[0.12em] text-white">
            Gerdy Abelard
          </h1>
          <p className="mt-5 font-['GFS_Didot',serif] text-base italic tracking-[0.08em] text-white/65 sm:text-lg">
            Director · Photographer · Founder
          </p>
          <div className="mt-7 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-8 font-title-signature text-[10px] uppercase tracking-[0.15em] text-white/70 sm:text-xs">
            <a
              href="https://comviewmedia.com/motion"
              className="inline-flex min-h-11 items-center hover:text-white transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
            >
              WATCH LATEST FILM
            </a>
            <a
              href="https://comviewmedia.com/stills"
              className="inline-flex min-h-11 items-center hover:text-white transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
            >
              SELECTED WORK
            </a>
          </div>
        </div>
      </section>
      {/* Homepage intentionally keeps venture/project imagery off this route. */}

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 flex justify-between items-center text-[10px] uppercase tracking-[0.25em] font-light text-white/30 border-t border-white/5">
        <span>© Gerdy Abelard</span>
        <span>I build things for the real world</span>
      </footer>

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
      {activeInquiry && (
        <div
          className="fixed inset-0 z-1100 bg-black/95 flex items-center justify-center p-5 sm:p-8"
          onClick={closeProject}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-title"
        >
          <button
            type="button"
            onClick={closeProject}
            aria-label="Close inquiry"
            className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/70 hover:text-white font-['GFS_Didot',serif] text-2xl sm:text-3xl font-light leading-none transition-colors focus:outline-none"
          >
            ×
          </button>
          <div
            className="w-full max-w-xl border border-white/20 bg-black p-7 sm:p-12"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/45">
              Venture inquiry
            </p>
            <h2
              id="inquiry-title"
              className="font-['GFS_Didot',serif] text-3xl sm:text-4xl uppercase tracking-wide text-white"
            >
              {activeInquiry === "mello" ? "Mello Minis" : "Ophionoir"}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              {activeInquiry === "mello"
                ? "In development."
                : "Private development / early access."}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/65">
              Enter your email for updates or inquiries.
            </p>
            <form
              className="mt-8"
              onSubmit={(event) => {
                event.preventDefault();
                setInquiryMessage(
                  "Online submission is not configured. Please email contact@gerdyabelard.com."
                );
              }}
            >
              <label htmlFor="inquiry-email" className="sr-only">
                Email address
              </label>
              <input
                id="inquiry-email"
                type="email"
                required
                value={inquiryEmail}
                onChange={(event) => setInquiryEmail(event.target.value)}
                placeholder="EMAIL ADDRESS"
                className="w-full border-b border-white/35 bg-transparent px-0 py-3 text-sm tracking-[0.12em] text-white placeholder:text-white/35 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="mt-7 border border-white/35 px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:border-white focus:outline-none"
              >
                Submit
              </button>
              {inquiryMessage && (
                <p className="mt-5 text-xs leading-relaxed text-white/60">
                  {inquiryMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* About — its own page at /about */
function AboutPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Portrait — large environmental layer emerging from the black background */}
      <div
        className="hidden md:block absolute inset-y-0 right-0 w-[48%] max-w-220 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/images/gerdy-about-portrait.png"
          alt="Gerdy Abelard reclining in a brown suit and turtleneck"
          className="w-full h-full object-contain object-right grayscale contrast-95 brightness-95"
        />
        {/* Wide soft fade — left edge blends into black */}
        <div
          className="absolute inset-y-0 left-0 w-[42%] bg-linear-to-r from-black via-black/75 to-transparent"
          aria-hidden="true"
        />
        {/* Soft fade — top edge */}
        <div
          className="absolute inset-x-0 top-0 h-[10%] bg-linear-to-b from-black to-transparent"
          aria-hidden="true"
        />
        {/* Soft fade — bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-[10%] bg-linear-to-t from-black to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full md:w-[54%] md:max-w-155 px-6 sm:px-10 md:pl-16 lg:pl-24 md:pr-6 pt-32 pb-20 md:pt-36 md:pb-24 text-left">
        <p className="font-title-signature text-[0.85rem] tracking-[0.2em] uppercase text-[#8b1e1e] mb-2">
          About
        </p>

        <h2 className="font-title-signature text-[clamp(1.8rem,3.5vw,2.5rem)] tracking-widest uppercase text-white mb-8">
          Gerdy Abelard
        </h2>

        <div className="font-['Plus_Jakarta_Sans',sans-serif] text-[0.95rem] leading-[1.8] text-[#b0b0b0] font-light space-y-5">
          <p>
            Gerdy Abelard is a director, photographer, and aesthetic director whose work moves between cinema, photography, design, technology, and culture.
          </p>
          <p>
            He builds visual worlds for people, brands, and ideas—developing not only the image, but the atmosphere, narrative, and underlying system that make it resonate. His practice spans commercial and editorial photography, film and motion, campaign development, creative direction, digital experiences, and independent ventures.
          </p>
          <p>
            Working across disciplines gives Gerdy a wider creative vocabulary: the precision of photography, the emotional rhythm of film, the structure of design, and the long-term thinking of product building. The result is work that is visually distinct, strategically coherent, and made to live beyond a single format.
          </p>
          <p>
            Based in Los Angeles, with an active practice in New York and internationally.
          </p>
        </div>

        {/* Portrait — mobile only, inline below the text */}
        <img
          src="/images/gerdy-about-portrait.png"
          alt="Gerdy Abelard portrait"
          className="md:hidden mt-10 w-full h-auto object-contain grayscale contrast-95 brightness-95"
        />
      </div>
    </div>
  );
}

/* Contact — its own page at /contact */
function ContactPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 md:pt-24 text-center">
      <div className="max-w-2xl w-full flex flex-col items-center gap-8 text-white font-['GFS_Didot',serif]">
        <div>
          <p className="text-sm uppercase tracking-widest text-white/50 mb-2 font-normal">
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
            COMMERCIAL & DIRECTING
          </p>

          <p className="text-base sm:text-lg text-white/90">
            COMVIEWMEDIA STUDIO
          </p>

          <a
            href="mailto:studio@comviewmedia.com"
            className="text-sm sm:text-base text-white/70 hover:text-white transition-colors lowercase italic"
          >
            studio@comviewmedia.com
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
  );
}

function WorkPage() {
  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-32 sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <h1 className="mb-12 font-title-signature text-[clamp(2rem,5vw,4.5rem)] uppercase tracking-[0.12em] text-white sm:mb-16">
          SELECTED WORK
        </h1>
        <div className="border-t border-white/20 font-title-signature uppercase tracking-[0.15em] text-white">
          <a href="https://comviewmedia.com/motion" className="group grid gap-6 border-b border-white/20 py-8 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white md:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1fr)] md:gap-10 md:py-12">
            <span className="flex items-start justify-between text-xl group-hover:text-white/65 sm:text-2xl">
              MOTION <span aria-hidden="true">→</span>
            </span>
            <img
              src="/images/work-motion.jpg"
              alt="Masked performer in a cinematic outdoor scene"
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
          </a>
          <a href="https://comviewmedia.com/stills" className="group grid gap-6 border-b border-white/20 py-8 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white md:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1fr)] md:gap-10 md:py-12">
            <span className="flex items-start justify-between text-xl group-hover:text-white/65 sm:text-2xl">
              STILLS <span aria-hidden="true">→</span>
            </span>
            <img
              src="/images/work-stills.jpeg"
              alt="Editorial portrait of a man seated in a burgundy classic car"
              loading="lazy"
              className="w-full max-w-[30rem] justify-self-end object-contain"
            />
          </a>
        </div>
      </div>
    </main>
  );
}

function FilmPage() {
  const filmEntries = [
    {
      title: "COMVIEWMEDIA",
      subtitle: "Commercial film / visual direction",
      image: "/images/comviewmedia/8FEF212A-77FA-4B76-9B1F-BD3BE330A743.JPEG",
    },
    {
      title: "CINEMA OPTICS & RESEARCH",
      subtitle: "35mm field studies / micro-contrast",
      image: "/images/comviewmedia/3F93AE2E-9D14-434B-996D-AA69150AB018.JPEG",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-32 sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-3 font-title-signature text-[10px] uppercase tracking-[0.28em] text-white/45">
            Direction / moving image
          </p>
          <h1 className="font-title-signature text-[clamp(2rem,5vw,4.5rem)] uppercase tracking-[0.12em] text-white">
            Film
          </h1>
        </header>
        <div className="grid gap-2 md:grid-cols-2">
          {filmEntries.map((entry) => (
            <figure key={entry.title} className="group relative aspect-[16/10] overflow-hidden bg-[#111113]">
              <img
                src={entry.image}
                alt={entry.title}
                className="h-full w-full object-cover grayscale contrast-110 brightness-85 transition duration-700 group-hover:scale-[1.025] group-hover:brightness-100"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-20">
                <h2 className="font-title-signature text-lg uppercase tracking-[0.12em] text-white sm:text-xl">
                  {entry.title}
                </h2>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
                  {entry.subtitle}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}

function VenturesPage() {
  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-32 sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-12 border-b border-white/15 pb-6 sm:mb-16">
          <p className="mb-3 font-title-signature text-[10px] uppercase tracking-[0.28em] text-white/45">
            Builds / systems / worlds
          </p>
          <h1 className="font-title-signature text-[clamp(2rem,5vw,4.5rem)] uppercase tracking-[0.12em] text-white">
            Ventures
          </h1>
        </header>

        <section
          aria-label="Gerdy Abelard ventures"
          className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {portfolioData.map((item) => {
            const content = (
              <>
                <div className="flex min-h-[220px] items-center justify-center bg-black p-8 sm:min-h-[250px] sm:p-10">
                  {item.wordmark ? (
                    <div className="max-w-[90%] text-center font-title-signature text-[clamp(1.35rem,3vw,2.5rem)] uppercase tracking-[0.16em] text-white">
                      {item.wordmark}
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[150px] w-auto max-w-[82%] object-contain"
                    />
                  )}
                </div>

                <div className="border-t border-white/10 bg-[#050505] p-5 sm:p-6">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-white/35">
                    {item.role}
                  </p>
                  <h2 className="font-title-signature text-lg uppercase tracking-[0.1em] text-white sm:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/50">
                    {item.subtitle}
                  </p>
                </div>
              </>
            );

            return item.link && item.link !== "#" ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-black transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
                aria-label={`Visit ${item.title}`}
              >
                {content}
              </a>
            ) : (
              <article key={item.id} className="bg-black">
                {content}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

const archiveData = [
  ["367A1A36-DBEA-4479-A208-4733243D3885.JPEG", "01", "Portrait / Study"],
  ["3F93AE2E-9D14-434B-996D-AA69150AB018.JPEG", "02", "Portrait / Study"],
  ["4B9CC685-E658-4686-9C80-F1C8A1F8F34B.JPEG", "03", "Portrait / Study"],
  ["5B2D6299-114F-4212-ABDA-0FD0D1AFF831.JPEG", "04", "Portrait / Study"],
  ["792E844E-6A6A-470F-8348-DB6A06BA552D.JPEG", "05", "Portrait / Study"],
  ["9175A487-405C-443F-8C0B-3B9CBF023507.JPEG", "06", "Portrait / Study"],
  ["A4132CDF-1A6E-4FFF-B92A-273F0F5C56D0.JPEG", "07", "Portrait / Study"],
  ["E71D62CE-25D4-4437-9915-85F2DE7F1DAC.JPEG", "08", "Portrait / Study"],
] as const;

function ArchiveTile({
  image,
  index,
  label,
  className,
}: {
  image: string;
  index: string;
  label: string;
  className: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-[#111113] ${className}`}>
      <img
        src={`/images/comviewmedia/${image}`}
        alt={`Comviewmedia archive image ${index}`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover grayscale contrast-110 brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.035] group-hover:brightness-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70" />
      <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:p-5">
        <span>{label}</span>
        <span className="text-white/40">{index}</span>
      </figcaption>
    </figure>
  );
}

function ArchivePage() {
  return (
    <main className="w-full min-h-screen bg-[#000000] px-5 pb-24 pt-32 sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-white/15 pb-5 sm:mb-16">
          <div>
            <p className="mb-3 font-title-signature text-[10px] uppercase tracking-[0.28em] text-white/45">
              Visual archive
            </p>
            <h1 className="font-title-signature text-[clamp(2rem,5vw,4.5rem)] uppercase tracking-[0.12em] text-white">
              Art World
            </h1>
          </div>
          <p className="hidden max-w-[180px] text-right text-[10px] uppercase leading-[1.7] tracking-[0.18em] text-white/45 sm:block">
            Fifteen frames
            <br />
            One visual language
          </p>
        </div>

        <section aria-label="Comviewmedia visual archive" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12">
          {archiveData.map(([image, index, label], itemIndex) => (
            <ArchiveTile
              key={image}
              image={image}
              index={index}
              label={label}
              className={
                itemIndex === 0 || itemIndex === 7
                  ? "aspect-[4/5] sm:col-span-2 lg:col-span-5 lg:row-span-2"
                  : itemIndex === 1 || itemIndex === 8 || itemIndex === 13
                    ? "aspect-[4/5] lg:col-span-3"
                    : itemIndex === 4 || itemIndex === 10 || itemIndex === 14
                      ? "aspect-[5/4] lg:col-span-4"
                      : "aspect-[4/5] lg:col-span-3"
              }
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const location = useLocation();

  // Reset scroll position on every real page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const enterSite = () => {
    setEntered(true);
    window.scrollTo({ top: 0, behavior: "instant" });
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

      {/* Main Exhibition Experience — header persists across every route */}
      <div
        className={`transition-opacity duration-1000 ${
          entered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/film" element={<FilmPage />} />
          <Route path="/ventures" element={<VenturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
}
