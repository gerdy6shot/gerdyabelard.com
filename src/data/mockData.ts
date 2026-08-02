import { Project, IntellectualProperty, WritingProject, Venture, Client, Service } from '../types/database';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Unspoken Frame',
    slug: 'the-unspoken-frame',
    category: 'film',
    subtitle: 'A cinematic exploration of silence, shadow, and architectural isolation.',
    summary: 'A short film investigating the psychological space between memory and physical structures in high-density urban landscapes.',
    description: `Shot on 35mm anamorphic lenses across Tokyo and Mexico City, 'The Unspoken Frame' is a meditative narrative observing four individuals navigating moments of decisive solitude. Directed and visually orchestrated by Gerdy Abelard, the piece juxtaposes brutalist concrete forms with intimate human vulnerability.`,
    hero_image_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
    featured_video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    full_video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    release_year: 2025,
    roles: ['Director', 'Executive Producer', 'Director of Photography'],
    tags: ['35mm Film', 'Short Film', 'Narrative', 'Architectural Cinema'],
    is_published: true,
    is_featured: true,
    display_order: 1,
    created_at: '2025-01-15',
    credits_breakdown: {
      directed_by: 'GERDY ABELARD',
      written_by: 'GERDY ABELARD',
      treatment_by: 'GERDY ABELARD',
      produced_by: 'GERDY ABELARD & VALENTINA MORALES',
      creative_direction: 'GERDY ABELARD STUDIO',
      production_company: 'COMVIEWMEDIA CINEMA',
      cinematography: 'GERDY ABELARD & KENJI TAKAHASHI',
      lead_cast: ['Taro Yamamoto', 'Elena Rostova', 'Carlos Fuentes']
    },
    treatment: {
      concept: 'An architectural autopsy of solitude in hyper-metropolitan epicenters.',
      emotional_direction: 'Deep introspective stillness punctuated by high-contrast geometry and sound design.',
      visual_language: 'Monochromatic 35mm glass, deep blacks, high geometric precision, shadow-driven frames.',
      references: ['Andrei Tarkovsky - Stalker', 'Michelangelo Antonioni - L’Eclisse', 'Tadao Ando Brutalism'],
      themes: ['Architectural Isolation', 'Memory and Monolith', 'Urban Solitude'],
      characters: ['The Architect (Observer)', 'The Archivist (Memory Keeper)', 'The Wanderer'],
      environments: ['Nakagin Capsule Tower', 'Torre Insurgentes Subterranean Vaults', 'Rain-drenched Shinjuku Alleyways']
    },
    production_details: {
      locations: ['Tokyo, Japan', 'Mexico City, Mexico'],
      wardrobe: 'Custom wool tailoring, architectural silhouettes by Comme des Garçons & Yamamoto archive',
      cinematography_approach: 'Panavision C-Series Anamorphic Lenses paired with Kodak Eastman Double-X 5222 B&W stock',
      camera_specs: 'ARRIFLEX 435 35mm 4-Perf Motion Picture Camera'
    },
    behind_the_scenes: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        caption: 'Gerdy Abelard configuring the Panavision 35mm rig during night exterior shots in Shinjuku.'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        caption: 'Scouting brutalist concrete structures in Mexico City before dawn.'
      }
    ],
    gallery_stills: [
      {
        url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
        caption: 'Plate 01: The Monolith Window'
      },
      {
        url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
        caption: 'Plate 02: Shadow Corridor'
      }
    ],
    director_notes: [
      'We allowed every frame to rest for 12 seconds longer than conventional pacing permits.',
      'The architecture is not a background; it is the principal antagonist in the psychological arc.',
      'Silence was recorded on location as a distinct audio track, capturing room tones of brutalist concrete voids.'
    ]
  },
  {
    id: 'proj-2',
    title: 'Monolith & Light',
    slug: 'monolith-and-light',
    category: 'photography',
    subtitle: 'Medium format architectural photo essay on geometric minimalism.',
    summary: 'A 40-plate photographic series capturing light interaction across modern stone structures in high-contrast natural environments.',
    description: `Exhibited in Paris and Los Angeles, this series captures the stark interplay of midday zenith light against hand-chiseled obsidian and granite facades. Utilizing custom black-and-white emulsion processes, Abelard extracts the sculptural essence of contemporary architecture.`,
    hero_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    release_year: 2024,
    roles: ['Creative Director', 'Photographer'],
    tags: ['Medium Format', 'Architectural Photography', 'Black & White', 'Fine Art'],
    is_published: true,
    is_featured: true,
    display_order: 2,
    created_at: '2024-11-20',
    credits_breakdown: {
      directed_by: 'GERDY ABELARD',
      written_by: 'GERDY ABELARD',
      treatment_by: 'GERDY ABELARD',
      produced_by: 'GERDY ABELARD STUDIO',
      creative_direction: 'GERDY ABELARD',
      production_company: 'COMVIEWMEDIA ARCHIVE'
    },
    treatment: {
      concept: 'Extracting light as a physical chisel against raw monoliths.',
      emotional_direction: 'Reverent, sacred geometry, timeless permanence.',
      visual_language: 'High-contrast monochrome medium format silver gelatin prints.',
      references: ['Lucien Hervé', 'Ezra Stoller', 'Minimalist Sculpture of Richard Serra'],
      themes: ['Permeability of Light', 'Granite and Silence']
    },
    production_details: {
      locations: ['Reykjavik, Iceland', 'Oaxaca, Mexico'],
      wardrobe: 'N/A - Architectural Fine Art',
      cinematography_approach: 'Hasselblad 503CW 6x6 Film Camera with Carl Zeiss Distagon T* 40mm lens',
      camera_specs: 'Hasselblad Medium Format Film / Ilford HP5 Plus 400'
    },
    behind_the_scenes: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
        caption: 'Developing silver gelatin prints in darkroom laboratory.'
      }
    ],
    director_notes: [
      'Each plate was exposed precisely at zenith solar alignments to eradicate fill shadows.'
    ]
  },
  {
    id: 'proj-3',
    title: 'Aura & Concrete',
    slug: 'aura-and-concrete',
    category: 'creative-direction',
    subtitle: 'Global brand identity and visual campaign for haute couture house.',
    summary: 'Comprehensive aesthetic direction, runway scenography, and digital experience for an international luxury house.',
    description: `Gerdy Abelard served as Aesthetic Director for the autumn campaign, unifying physical runway staging in Milan with a digital campaign filmed on high-speed phantom cameras. The result was a 40% increase in brand engagement across international markets.`,
    hero_image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    featured_video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    release_year: 2025,
    roles: ['Aesthetic Director', 'Brand Strategist', 'Campaign Director'],
    tags: ['Haute Couture', 'Brand Strategy', 'Runway Direction', 'Digital Identity'],
    is_published: true,
    is_featured: true,
    display_order: 3,
    created_at: '2025-02-10',
    credits_breakdown: {
      directed_by: 'GERDY ABELARD',
      treatment_by: 'GERDY ABELARD',
      produced_by: 'GERDY ABELARD STUDIO & MAISON DE CREATION',
      creative_direction: 'GERDY ABELARD',
      production_company: 'COMVIEWMEDIA'
    },
    treatment: {
      concept: 'High-speed fluid mechanics colliding with razor-sharp silk silhouettes.',
      emotional_direction: 'Luxury dynamism, razor precision, ethereal fluidity.',
      visual_language: '1000fps high-definition Phantom camera captures with brutalist lighting.',
      references: ['Nick Knight', 'Alexander McQueen Runway Archives', 'Zaha Hadid Geometry'],
      themes: ['Haute Couture Mechanics', 'Fluid Scenography']
    },
    production_details: {
      locations: ['Milan, Italy', 'Paris, France'],
      wardrobe: 'Haute Couture Silk & Sculptured Leather',
      cinematography_approach: 'Phantom Flex 4K at 1,000 frames per second'
    }
  },
  {
    id: 'proj-4',
    title: 'Echoes of Freedom',
    slug: 'echoes-of-freedom',
    category: 'film',
    subtitle: 'Documentary exploration of cross-continental artistic movements.',
    summary: 'A feature-length documentary chronicling independent creative collectives bridging West Africa and Latin America.',
    description: `Spanning 18 months of filming across Accra, Dakar, and Mexico City, 'Echoes of Freedom' highlights the shared creative language between contemporary African artists and Afro-Mexican cultural pioneers.`,
    hero_image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
    release_year: 2024,
    roles: ['Director', 'Writer', 'Cinematographer'],
    tags: ['Documentary', 'International', 'Cultural Heritage', 'Feature'],
    is_published: true,
    is_featured: false,
    display_order: 4,
    created_at: '2024-08-05',
    credits_breakdown: {
      directed_by: 'GERDY ABELARD',
      written_by: 'GERDY ABELARD',
      treatment_by: 'GERDY ABELARD',
      produced_by: 'GERDY ABELARD & AMINATA DIOP',
      creative_direction: 'GERDY ABELARD STUDIO',
      production_company: 'COMVIEWMEDIA DOCUMENTARY'
    },
    treatment: {
      concept: 'Uncovering Atlantic rhythm lineages through visual dialogue.',
      emotional_direction: 'Kinetic, authentic, poetic, deeply rooted in oral traditions.',
      visual_language: 'Warm hand-held 16mm film mixed with digital cinema prime optics.',
      references: ['Djibril Diop Mambéty', 'Ousmane Sembène', 'Gabriel García Márquez Realism'],
      themes: ['Diasporic Threads', 'Rhythm and Resistance']
    }
  },
  {
    id: 'proj-5',
    title: 'Humanity & Form',
    slug: 'humanity-and-form',
    category: 'photography',
    subtitle: 'High-contrast portraiture study of visionaries and creators.',
    summary: 'Intimate portrait studies capturing the quiet moments of international directors, architects, and founders.',
    description: `Shot exclusively with ambient natural light, this ongoing portraiture project stripped away artificial studio setups to reveal raw emotional intensity and character.`,
    hero_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop',
    release_year: 2025,
    roles: ['Photographer', 'Art Director'],
    tags: ['Portraiture', 'Editorial', 'Natural Light', 'Monochrome'],
    is_published: true,
    is_featured: false,
    display_order: 5,
    created_at: '2025-03-01',
    credits_breakdown: {
      directed_by: 'GERDY ABELARD',
      creative_direction: 'GERDY ABELARD',
      produced_by: 'GERDY ABELARD STUDIO'
    },
    treatment: {
      concept: 'Stripping away celebrity performance to expose psychological presence.',
      emotional_direction: 'Uncompromising intimacy, vulnerability, quiet power.',
      visual_language: 'Monochrome natural window lighting, 85mm prime lens.',
      references: ['Irving Penn', 'Richard Avedon In the American West'],
      themes: ['Character Autopsy', 'Natural Light']
    }
  }
];

export const MOCK_IP: IntellectualProperty[] = [
  {
    id: 'ip-1',
    title: 'THE SNAKE, PEARLS & PIGS',
    slug: 'the-snake-pearls-and-pigs',
    type: 'screenplay',
    tagline: 'Power, betrayal, and redemption in the shadowy corridors of global trade.',
    logline: 'When an enigmatic art conservator uncovers a forged provenance link in a multi-million dollar international auction, she is thrust into a high-stakes game of corporate intrigue spanning London, Mexico City, and Zurich.',
    synopsis: 'An original dramatic feature screenplay written by Gerdy Abelard. A gripping neo-noir thriller exploring themes of authenticity, luxury, greed, and high-level financial deception in the modern art market.',
    status: 'in-development',
    cover_image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    excerpt: `SCENE 12. INT. ZURICH FREEPORT - NIGHT.
A single halogen beam cuts through the gloom of Vault 408. 
MARA (30s) kneels beside an unlined wooden crate. Her gloved fingers trace the edge of a Renaissance panel painting.
MARA
(whispering to herself)
The canvas is four hundred years old. But the pigment... the pigment remembers last Tuesday.`,
    is_featured: true,
    created_at: '2024-06-12'
  },
  {
    id: 'ip-2',
    title: 'VISCOUS',
    slug: 'viscous',
    type: 'concept',
    tagline: 'When technological consciousness leaks into physical reality.',
    logline: 'A near-future speculative thriller series investigating the emergence of sentient biological computing networks hidden inside international subsea optical cables.',
    synopsis: 'Original TV drama series concept created and written by Gerdy Abelard. Mixing hard science fiction with atmospheric psychological suspense, VISCOUS challenges humanity\'s reliance on unseen digital infrastructure.',
    status: 'optioned',
    cover_image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
    excerpt: `EPISODE 1 LOGLINE:
When a routine fiber-optic repair vessel loses telemetry off the coast of Dakar, the engineer sent to inspect the deep-water junction box discovers a translucent, organic fluid pulsing in rhythm with the data traffic.`,
    is_featured: true,
    created_at: '2024-09-18'
  }
];

export const MOCK_WRITING: WritingProject[] = [
  {
    id: 'w-1',
    title: 'The Architecture of Attention',
    slug: 'the-architecture-of-attention',
    format: 'monograph',
    publication_date: '2025-02-01',
    summary: 'A treatise on visual hierarchy, spatial rhythm, and narrative stillness in contemporary cinema and digital ecosystems.',
    content_markdown: `### The Premise
In an age characterized by hyper-fragmented media consumption, true luxury is not speed—it is sustained focus.

When a director composes a frame, or an architect plans an entryway, they are not merely arranging matter; they are governing time. They are dictating the exact velocity at which a human mind absorbs light, shadow, and scale.

### The Controlled Pause
Fast cuts induce stimulation without depth. The cinematic long take, conversely, forces the viewer to confront the frame as an environment rather than a transaction.`,
    is_published: true
  },
  {
    id: 'w-2',
    title: 'On Aesthetic Command',
    slug: 'on-aesthetic-command',
    format: 'essay',
    publication_date: '2024-10-15',
    summary: 'An exploration of how unified creative vision transcends siloed artistic disciplines.',
    content_markdown: `To separate photography from film, or strategy from architectural direction, is to misapprehend the nature of vision. The tool—whether an Arri Alexa 35, a Hasselblad medium format camera, or a line of code—is merely an acoustic transmitter. The sound originates in the mind's ear.`,
    is_published: true
  }
];

export const MOCK_VENTURES: Venture[] = [
  {
    id: 'v-1',
    name: 'COMVIEWMEDIA',
    slug: 'comviewmedia',
    headline: 'Creative Media, Film Production & Strategic Visual House',
    description: 'Founded and led by Gerdy Abelard, COMVIEWMEDIA is an independent production and creative media studio crafting original feature films, commercial campaigns, and elevated digital brand systems.',
    role: 'Founder & Aesthetic Director',
    url: 'https://comviewmedia.com',
    hero_image_url: 'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=1600&auto=format&fit=crop',
    status: 'active',
    highlights: [
      'Multi-disciplinary production house serving global luxury brands',
      'End-to-end film production, post-production, and color grading',
      'Original IP development and co-production incubator'
    ],
    display_order: 1
  },
  {
    id: 'v-2',
    name: 'OVERHAULTRAIN.COM',
    slug: 'overhaultrain',
    headline: 'AI-Powered Fitness & Wellness Technology Platform',
    description: 'Created and built by Gerdy Abelard, OVERHAULTRAIN.COM bridges cutting-edge artificial intelligence with hyper-personalized physical transformation and longevity protocols.',
    role: 'Creator, Founder & Lead Builder',
    url: 'https://overhaultrain.com',
    hero_image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
    status: 'active',
    highlights: [
      'Proprietary AI algorithm analyzing movement kinematics and metabolic health',
      'Comprehensive wellness tech platform serving athletes and executives',
      'Designed, architected, and engineered from the ground up by Gerdy Abelard'
    ],
    display_order: 2
  },
  {
    id: 'v-3',
    name: 'OPHIONIOR',
    slug: 'ophionior',
    headline: 'Haute Horlogerie, Leather Goods & High Fashion Atelier',
    description: 'An uncompromising luxury house exploring sculptural minimalism, bespoke leather craftsmanship, and high-fashion sartorial silhouettes.',
    role: 'Founder & Creative Director',
    url: 'https://ophionior.com',
    hero_image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    status: 'active',
    highlights: [
      'Architectural silhouettes and bespoke artisanal leather goods',
      'Limited-run haute couture releases engineered with surgical precision',
      'Exhibited in Paris, Milan, and Zurich showrooms'
    ],
    display_order: 3
  },
  {
    id: 'v-4',
    name: 'MELLO MINIS',
    slug: 'mello-minis',
    headline: 'Architectural Scale Models & Creative Collectibles Studio',
    description: 'A specialized design studio producing precision scale miniatures, tactile architectural dioramas, and limited-edition design objects.',
    role: 'Creator & Lead Designer',
    url: 'https://mellominis.com',
    hero_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    status: 'active',
    highlights: [
      'Micro-architectural craftsmanship and precision scale models',
      'Limited edition physical design objects for collectors and architects',
      'Tactile physical manifestation of cinematic spatial concepts'
    ],
    display_order: 4
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c-1',
    company_name: 'Leica Camera AG',
    contact_name: 'Global Communications',
    email: 'contact@leica.com',
    industry: 'Photography & Optics',
    status: 'active',
    notes: 'Commercial photography campaigns and lens evaluation commissions.',
    created_at: '2026-01-01'
  },
  {
    id: 'c-2',
    company_name: 'Architectural Digest',
    contact_name: 'Editorial Board',
    email: 'editors@archdigest.com',
    industry: 'Publishing & Architecture',
    status: 'active',
    notes: 'Editorial cover stories and architectural photo essays.',
    created_at: '2026-01-01'
  },
  {
    id: 'c-3',
    company_name: 'Vogue International',
    contact_name: 'Creative Features',
    email: 'features@vogue.com',
    industry: 'Haute Couture & Fashion',
    status: 'active',
    notes: 'Short film direction and digital runway art direction.',
    created_at: '2026-01-01'
  },
  {
    id: 'c-4',
    company_name: 'Overhaul Train Technologies',
    contact_name: 'Executive Board',
    email: 'exec@overhaultrain.com',
    industry: 'Wellness Tech & AI',
    status: 'active',
    notes: 'Product architecture and visual identity leadership.',
    created_at: '2026-01-01'
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Film Directing & Commercial Cinematography',
    code: 'FILM-DIR',
    category: 'direction',
    description: 'End-to-end directorial supervision for feature film, narrative shorts, documentary, and high-end brand cinema.',
    rate_structure: 'project-based',
    deliverables: ['Director Treatment', 'Pre-visualization & Casting', 'On-Set Direction', 'Post-Production Supervision'],
    is_active: true
  },
  {
    id: 'srv-2',
    title: 'Aesthetic Direction & Brand Strategy',
    code: 'AESTH-DIR',
    category: 'consulting',
    description: 'Comprehensive visual governance, runway staging, digital identity overhaul, and spatial experience design.',
    rate_structure: 'retainer',
    deliverables: ['Brand Manifesto', 'Visual Identity Guidelines', 'Campaign Art Direction', 'Digital Experience Blueprint'],
    is_active: true
  },
  {
    id: 'srv-3',
    title: 'Commercial & Fine Art Photography',
    code: 'PHOTO-COMM',
    category: 'photography',
    description: 'Medium format analog and digital photography for luxury campaigns, architectural projects, and editorial portraiture.',
    rate_structure: 'day-rate',
    deliverables: ['On-Location Shooting', 'Custom Master Retouching', 'High-Res Print Licensing', 'Archival Stills Package'],
    is_active: true
  }
];
