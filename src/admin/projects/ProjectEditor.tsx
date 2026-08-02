import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Save, ArrowLeft, CheckCircle, Sparkles, Layers, FileText, Image, Users } from 'lucide-react';
import {
  DbArchiveProject,
  DbArchiveProjectRole,
  DbArchiveProjectMedia,
  DbArchiveProjectDocument,
  ArchiveCategory,
  ArchiveStatus,
} from '../../types/database';
import { ProjectCreditsManager } from './ProjectCreditsManager';
import { ProjectMediaManager } from './ProjectMediaManager';

interface ProjectEditorProps {
  project?: DbArchiveProject | null;
  roles?: DbArchiveProjectRole[];
  media?: DbArchiveProjectMedia[];
  documents?: DbArchiveProjectDocument[];
  onSave: (data: {
    project: Partial<DbArchiveProject>;
    roles: Partial<DbArchiveProjectRole>[];
    media: Partial<DbArchiveProjectMedia>[];
  }) => Promise<void>;
  onClose: () => void;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({
  project,
  roles: initialRoles = [],
  media: initialMedia = [],
  onSave,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'master' | 'credits' | 'media' | 'treatment'>('master');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<DbArchiveProject>>({
    title: '',
    slug: '',
    category: 'Film',
    year: new Date().getFullYear(),
    client: '',
    short_description: '',
    featured: false,
    cover_image: '',
    hero_image: '',
    status: 'published',
  });

  const [roles, setRoles] = useState<Partial<DbArchiveProjectRole>[]>([]);
  const [media, setMedia] = useState<Partial<DbArchiveProjectMedia>[]>([]);

  // Treatment State (embedded in short_description / notes if needed)
  const [treatmentConcept, setTreatmentConcept] = useState('');
  const [directorNotes, setDirectorNotes] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        category: project.category || 'Film',
        year: project.year || new Date().getFullYear(),
        client: project.client || '',
        short_description: project.short_description || '',
        featured: project.featured || false,
        cover_image: project.cover_image || '',
        hero_image: project.hero_image || '',
        status: project.status || 'published',
      });
      setRoles(initialRoles.length > 0 ? initialRoles : [
        { role_name: 'Directed by', person_name: 'GERDY ABELARD' },
        { role_name: 'Creative Direction', person_name: 'GERDY ABELARD STUDIO' },
      ]);
      setMedia(initialMedia);
    } else {
      // Default New Project State
      setRoles([
        { role_name: 'Directed by', person_name: 'GERDY ABELARD' },
        { role_name: 'Treatment by', person_name: 'GERDY ABELARD' },
        { role_name: 'Produced by', person_name: 'GERDY ABELARD STUDIO' },
      ]);
    }
  }, [project, initialRoles, initialMedia]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug && project ? prev.slug : generatedSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    setIsSubmitting(true);
    try {
      await onSave({
        project: formData,
        roles,
        media,
      });
      setSuccessMsg('Project saved successfully to Director Archive.');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: ArchiveCategory[] = [
    'Film',
    'Music Video',
    'Commercial',
    'Documentary',
    'Photography',
    'Original IP',
    'Creative Direction',
  ];

  return (
    <div className="fixed inset-0 z-[1100] bg-[#000000]/80 backdrop-blur-md flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl bg-[#08080a] h-full border-l border-[#22222c] shadow-2xl flex flex-col justify-between select-none overflow-hidden"
      >
        {/* Slide-Over Header */}
        <div className="p-6 bg-[#0d0d10] border-b border-[#22222c] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">
                STUDIO OS • PROJECT EDITOR
              </span>
            </div>
            <h2 className="font-serif-display text-2xl text-[#f5f5f5] uppercase tracking-wide">
              {project ? `Edit: ${project.title}` : 'Initialize New Archive Masterwork'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors rounded-full hover:bg-[#181820]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-[#0d0d10] border-b border-[#22222c] px-6 flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-[#8a8a8a]">
          <button
            type="button"
            onClick={() => setActiveTab('master')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'master'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent hover:text-[#f5f5f5]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Master Specs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('credits')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'credits'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent hover:text-[#f5f5f5]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Authorship ({roles.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'media'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent hover:text-[#f5f5f5]'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Stills & Assets ({media.length})</span>
          </button>
        </div>

        {/* Form Body */}
        <form id="project-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {successMsg && (
            <div className="p-4 bg-[#102015] border border-[#1e4627] text-[#4ade80] text-xs font-mono flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: MASTER SPECS */}
          {activeTab === 'master' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={handleTitleChange}
                    placeholder="e.g. THE UNSPOKEN FRAME"
                    className="w-full bg-[#101014] border border-[#22222c] px-4 py-2.5 text-sm text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                    URL SLUG *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="the-unspoken-frame"
                    className="w-full bg-[#101014] border border-[#22222c] px-4 py-2.5 text-xs text-[#c5a059] font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                    CATEGORY *
                  </label>
                  <select
                    value={formData.category || 'Film'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ArchiveCategory })}
                    className="w-full bg-[#101014] border border-[#22222c] px-4 py-2.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                    RELEASE YEAR
                  </label>
                  <input
                    type="number"
                    value={formData.year || new Date().getFullYear()}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                    className="w-full bg-[#101014] border border-[#22222c] px-4 py-2.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                    CLIENT / PRODUCTION HOUSE
                  </label>
                  <input
                    type="text"
                    value={formData.client || ''}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. GERDY ABELARD STUDIO"
                    className="w-full bg-[#101014] border border-[#22222c] px-4 py-2.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                  HERO & COVER IMAGE URL
                </label>
                <input
                  type="url"
                  value={formData.hero_image || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, hero_image: e.target.value, cover_image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-[#101014] border border-[#22222c] px-4 py-2.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                  LOGLINE & ARCHIVE SUMMARY
                </label>
                <textarea
                  rows={4}
                  value={formData.short_description || ''}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Detailed synopsis of the creative vision, architectural approach, and narrative themes..."
                  className="w-full bg-[#101014] border border-[#22222c] p-4 text-xs text-[#f5f5f5] font-sans-ui focus:border-[#c5a059] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-[#101014] border border-[#22222c]">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                    PUBLICATION STATUS
                  </label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ArchiveStatus })}
                    className="w-full bg-[#181820] border border-[#22222c] px-3 py-2 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="published">Published (Live Archive)</option>
                    <option value="draft">Draft (Private Vault)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="featured-toggle"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#c5a059]"
                  />
                  <label htmlFor="featured-toggle" className="text-xs font-mono text-[#f5f5f5] uppercase tracking-wider">
                    FEATURE ON ARCHIVE HOME
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREDITS */}
          {activeTab === 'credits' && (
            <ProjectCreditsManager roles={roles} onChange={(updated) => setRoles(updated)} />
          )}

          {/* TAB 3: MEDIA */}
          {activeTab === 'media' && (
            <ProjectMediaManager media={media} onChange={(updated) => setMedia(updated)} />
          )}
        </form>

        {/* Footer Actions */}
        <div className="p-6 bg-[#0d0d10] border-t border-[#22222c] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-[#22222c] text-xs font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#f5f5f5] hover:border-[#8a8a8a] transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="project-form"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#c5a059] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold flex items-center gap-2 hover:bg-[#d5b069] transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : 'Commit to Archive'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
