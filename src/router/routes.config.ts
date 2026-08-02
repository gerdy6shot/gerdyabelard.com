export interface RouteDefinition {
  path: string;
  label: string;
  category: 'core' | 'portfolio' | 'intellectual-property' | 'business' | 'admin';
  description: string;
  isProtected?: boolean;
  phase: number;
}

export const PUBLIC_ROUTES: RouteDefinition[] = [
  {
    path: '/',
    label: 'Home',
    category: 'core',
    description: 'Cinematic flagship portal & overarching manifesto',
    phase: 2
  },
  {
    path: '/work',
    label: 'Work Archive',
    category: 'portfolio',
    description: 'Comprehensive cross-disciplinary index of all creative works',
    phase: 3
  },
  {
    path: '/work/:slug',
    label: 'Individual Project',
    category: 'portfolio',
    description: 'Deep-dive case study with high-res media gallery and credits',
    phase: 3
  },
  {
    path: '/film',
    label: 'Film Portfolio',
    category: 'portfolio',
    description: 'Cinematic directing, moving image projects, and visual shorts',
    phase: 3
  },
  {
    path: '/photography',
    label: 'Photography',
    category: 'portfolio',
    description: 'Commercial, editorial, and fine-art photographic archives',
    phase: 3
  },
  {
    path: '/creative-direction',
    label: 'Creative Direction',
    category: 'portfolio',
    description: 'Brand strategy, aesthetic orchestration, and visual identity systems',
    phase: 3
  },
  {
    path: '/clients',
    label: 'Client Archive',
    category: 'business',
    description: 'Curated roster of strategic clients and collaborative brands',
    phase: 4
  },
  {
    path: '/ip',
    label: 'Original IP',
    category: 'intellectual-property',
    description: 'Original film scripts, books, formats (The Snake, Pearls & Pigs, Viscous)',
    phase: 4
  },
  {
    path: '/writing',
    label: 'Writing & Books',
    category: 'intellectual-property',
    description: 'Literary works, essays, monographs, and publications',
    phase: 4
  },
  {
    path: '/ventures',
    label: 'Venture Ecosystem',
    category: 'business',
    description: 'COMVIEWMEDIA, OVERHAULTRAIN.COM, ROCE DE LIBERTAD, and global business',
    phase: 4
  },
  {
    path: '/about',
    label: 'About',
    category: 'core',
    description: 'Philosophy, biography, methodology, and aesthetic statement',
    phase: 2
  },
  {
    path: '/inquire',
    label: 'Project Inquiry',
    category: 'business',
    description: 'Direct strategic intake form for creative commissions',
    phase: 5
  },
  {
    path: '/book',
    label: 'Booking System',
    category: 'business',
    description: 'Interactive service selection, calendar availability, and direct booking',
    phase: 5
  }
];

export const ADMIN_ROUTES: RouteDefinition[] = [
  {
    path: '/admin',
    label: 'Dashboard',
    category: 'admin',
    description: 'High-level operational overview, recent inquiries, and quick stats',
    isProtected: true,
    phase: 8
  },
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    category: 'admin',
    description: 'High-level operational overview, recent inquiries, and quick stats',
    isProtected: true,
    phase: 8
  },
  {
    path: '/admin/calendar',
    label: 'Calendar',
    category: 'admin',
    description: 'Master availability schedule and synced client engagements',
    isProtected: true,
    phase: 8
  },
  {
    path: '/admin/bookings',
    label: 'Bookings',
    category: 'admin',
    description: 'Active client bookings, deposit tracking, and project status',
    isProtected: true,
    phase: 8
  },
  {
    path: '/admin/clients',
    label: 'Clients',
    category: 'admin',
    description: 'CRM database of brands, key contacts, and project history',
    isProtected: true,
    phase: 8
  },
  {
    path: '/admin/services',
    label: 'Services',
    category: 'admin',
    description: 'Studio service catalog, pricing tiers, and direct booking options',
    isProtected: true,
    phase: 8
  },
  {
    path: '/admin/availability',
    label: 'Availability',
    category: 'admin',
    description: 'Manage time blocks, travel dates, and location override exceptions',
    isProtected: true,
    phase: 8
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    category: 'admin',
    description: 'System configuration, API keys, Supabase security rules, and profile',
    isProtected: true,
    phase: 8
  }
];
