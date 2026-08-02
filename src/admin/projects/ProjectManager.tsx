import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Search,
  Filter,
  Film,
  Edit2,
  Trash2,
  Eye,
  Star,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { MOCK_PROJECTS } from '../../data/mockData';
import {
  DbArchiveProject,
  DbArchiveProjectRole,
  DbArchiveProjectMedia,
  ArchiveCategory,
} from '../../types/database';
import { ProjectEditor } from './ProjectEditor';

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<DbArchiveProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Editor Modal Control
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<DbArchiveProject | null>(null);
  const [editingRoles, setEditingRoles] = useState<DbArchiveProjectRole[]>([]);
  const [editingMedia, setEditingMedia] = useState<DbArchiveProjectMedia[]>([]);

  // Fetch Projects from Supabase or Fallback
  const fetchProjects = async () => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', { ascending: false });

        if (!error && data && data.length > 0) {
          setProjects(data as DbArchiveProject[]);
          setLoading(false);
          return;
        }
      }

      // Local fallback using mock data structured for database schema
      const fallbackProjects: DbArchiveProject[] = MOCK_PROJECTS.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: (p.category as ArchiveCategory) || 'Film',
        year: p.release_year,
        client: p.client_id || 'GERDY ABELARD STUDIO',
        short_description: p.description,
        featured: p.is_featured,
        cover_image: p.hero_image_url,
        hero_image: p.hero_image_url,
        status: 'published',
        created_at: p.created_at,
        updated_at: p.created_at,
      }));

      setProjects(fallbackProjects);
    } catch (err) {
      console.error('Error fetching archive projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateNew = () => {
    setEditingProject(null);
    setEditingRoles([
      { id: '', project_id: '', role_name: 'Directed by', person_name: 'GERDY ABELARD', display_order: 1, created_at: '' },
      { id: '', project_id: '', role_name: 'Creative Direction', person_name: 'GERDY ABELARD STUDIO', display_order: 2, created_at: '' },
    ]);
    setEditingMedia([]);
    setEditorOpen(true);
  };

  const handleEditProject = async (proj: DbArchiveProject) => {
    setEditingProject(proj);
    
    if (supabase) {
      const [rolesRes, mediaRes] = await Promise.all([
        supabase.from('project_roles').select('*').eq('project_id', proj.id),
        supabase.from('project_media').select('*').eq('project_id', proj.id),
      ]);
      if (rolesRes.data) setEditingRoles(rolesRes.data as DbArchiveProjectRole[]);
      if (mediaRes.data) setEditingMedia(mediaRes.data as DbArchiveProjectMedia[]);
    } else {
      setEditingRoles([
        { id: '1', project_id: proj.id, role_name: 'Directed by', person_name: 'GERDY ABELARD', display_order: 1, created_at: '' },
        { id: '2', project_id: proj.id, role_name: 'Produced by', person_name: 'GERDY ABELARD STUDIO', display_order: 2, created_at: '' },
      ]);
      setEditingMedia([]);
    }

    setEditorOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this project from the Director Archive?')) return;

    try {
      if (supabase) {
        await supabase.from('projects').delete().eq('id', id);
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleSaveProject = async (payload: {
    project: Partial<DbArchiveProject>;
    roles: Partial<DbArchiveProjectRole>[];
    media: Partial<DbArchiveProjectMedia>[];
  }) => {
    const projData = payload.project;
    const targetId = editingProject?.id || `proj-${Date.now()}`;

    const updatedProject: DbArchiveProject = {
      id: targetId,
      title: projData.title || 'Untitled Archive Piece',
      slug: projData.slug || 'untitled-piece',
      category: projData.category || 'Film',
      year: projData.year || new Date().getFullYear(),
      client: projData.client || 'GERDY ABELARD STUDIO',
      short_description: projData.short_description || '',
      featured: projData.featured || false,
      cover_image: projData.cover_image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
      hero_image: projData.hero_image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
      status: projData.status || 'published',
      created_at: editingProject?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      // Upsert project in Supabase
      const { data: savedProj, error } = await supabase
        .from('projects')
        .upsert([updatedProject])
        .select()
        .single();

      if (!error && savedProj) {
        // Clear and insert child roles
        if (payload.roles.length > 0) {
          await supabase.from('project_roles').delete().eq('project_id', savedProj.id);
          const rolesToInsert = payload.roles.map((r, idx) => ({
            project_id: savedProj.id,
            role_name: r.role_name || 'Contributor',
            person_name: r.person_name || 'GERDY ABELARD',
            display_order: idx + 1,
          }));
          await supabase.from('project_roles').insert(rolesToInsert);
        }

        // Clear and insert child media
        if (payload.media.length > 0) {
          await supabase.from('project_media').delete().eq('project_id', savedProj.id);
          const mediaToInsert = payload.media.map((m, idx) => ({
            project_id: savedProj.id,
            media_type: m.media_type || 'still',
            media_url: m.media_url || '',
            caption: m.caption || '',
            display_order: idx + 1,
          }));
          await supabase.from('project_media').insert(mediaToInsert);
        }
      }
    }

    // Update local state for immediate feedback
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === targetId);
      if (exists) {
        return prev.map((p) => (p.id === targetId ? updatedProject : p));
      }
      return [updatedProject, ...prev];
    });
  };

  const handleToggleFeatured = async (proj: DbArchiveProject) => {
    const updated = { ...proj, featured: !proj.featured };
    if (supabase) {
      await supabase.from('projects').update({ featured: !proj.featured }).eq('id', proj.id);
    }
    setProjects((prev) => prev.map((p) => (p.id === proj.id ? updated : p)));
  };

  // Filtered List
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['ALL', 'Film', 'Music Video', 'Commercial', 'Documentary', 'Photography', 'Original IP', 'Creative Direction'];

  return (
    <div className="space-y-8 select-none">
      {/* Studio Header & Action Hub */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#22222c] pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">
              STUDIO OS • ARCHIVE MANAGEMENT
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-5xl text-[#f5f5f5] uppercase tracking-wide">
            Director's Vault Matrix
          </h1>
          <p className="text-xs text-[#8a8a8a] max-w-xl font-mono">
            Orchestrate cinematic masterworks, treatments, authorship credits, and film stills.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-[#c5a059] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-[#d5b069] transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Archive Masterwork</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-[#0d0d10] border border-[#22222c]">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#8a8a8a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search title, category, or client..."
            className="w-full bg-[#121218] border border-[#22222c] pl-10 pr-4 py-2 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#121218] border border-[#22222c] px-3 py-2 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                CATEGORY: {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#121218] border border-[#22222c] px-3 py-2 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
          >
            <option value="ALL">STATUS: ALL</option>
            <option value="published">STATUS: PUBLISHED</option>
            <option value="draft">STATUS: DRAFT</option>
            <option value="archived">STATUS: ARCHIVED</option>
          </select>
        </div>
      </div>

      {/* Projects Table / Grid */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-[#8a8a8a] space-y-3">
          <div className="w-6 h-6 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto" />
          <div>INITIALIZING DIRECTOR VAULT DATA...</div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#22222c] bg-[#0d0d10] font-mono text-xs text-[#8a8a8a] space-y-2">
          <Layers className="w-8 h-8 text-[#555562] mx-auto" />
          <div>NO ARCHIVE MATCHES FOUND.</div>
          <button
            onClick={handleCreateNew}
            className="text-[#c5a059] underline hover:text-[#f5f5f5] transition-colors"
          >
            Create first entry now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-2 font-mono text-[10px] text-[#8a8a8a] uppercase tracking-widest border-b border-[#22222c]">
            <div className="col-span-5">MASTERWORK & CLIENT</div>
            <div className="col-span-2">CATEGORY</div>
            <div className="col-span-1">YEAR</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2 text-right">ACTIONS</div>
          </div>

          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 sm:p-6 bg-[#0d0d10] border border-[#22222c] hover:border-[#c5a059]/40 transition-colors group"
              >
                {/* Title & Preview Image */}
                <div className="lg:col-span-5 flex items-center gap-4">
                  <div className="w-16 h-12 bg-[#121218] border border-[#22222c] overflow-hidden flex-shrink-0">
                    <img
                      src={project.hero_image || project.cover_image || ''}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif-display text-lg text-[#f5f5f5] uppercase truncate group-hover:text-[#c5a059] transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <Star className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" title="Featured Masterwork" />
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider truncate">
                      CLIENT: {project.client || 'GERDY ABELARD STUDIO'}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="lg:col-span-2 font-mono text-xs text-[#c5a059] uppercase tracking-wider">
                  {project.category}
                </div>

                {/* Year */}
                <div className="lg:col-span-1 font-mono text-xs text-[#f5f5f5]">
                  {project.year}
                </div>

                {/* Status Badge */}
                <div className="lg:col-span-2">
                  <span
                    className={`inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border ${
                      project.status === 'published'
                        ? 'bg-[#102015] border-[#1e4627] text-[#4ade80]'
                        : 'bg-[#201810] border-[#46301e] text-[#fb923c]'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleFeatured(project)}
                    className={`p-2 border transition-colors ${
                      project.featured
                        ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10'
                        : 'border-[#22222c] text-[#8a8a8a] hover:text-[#f5f5f5]'
                    }`}
                    title={project.featured ? 'Unmark Featured' : 'Mark Featured'}
                  >
                    <Star className="w-4 h-4" />
                  </button>

                  <a
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 border border-[#22222c] text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors"
                    title="View Live Frame"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 border border-[#22222c] text-[#8a8a8a] hover:text-[#c5a059] hover:border-[#c5a059] transition-colors"
                    title="Edit Specs"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 border border-[#22222c] text-[#8a8a8a] hover:text-[#ef4444] hover:border-[#ef4444] transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide-over Project Editor */}
      <AnimatePresence>
        {editorOpen && (
          <ProjectEditor
            project={editingProject}
            roles={editingRoles}
            media={editingMedia}
            onSave={handleSaveProject}
            onClose={() => setEditorOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
