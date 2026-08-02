import React from 'react';
import { Plus, Trash2, Image, Film, Camera } from 'lucide-react';
import { DbArchiveProjectMedia, ArchiveMediaType } from '../../types/database';

interface ProjectMediaManagerProps {
  media: Partial<DbArchiveProjectMedia>[];
  onChange: (media: Partial<DbArchiveProjectMedia>[]) => void;
}

export const ProjectMediaManager: React.FC<ProjectMediaManagerProps> = ({ media, onChange }) => {
  const handleAddMedia = (type: ArchiveMediaType = 'still') => {
    const newMedia: Partial<DbArchiveProjectMedia> = {
      media_type: type,
      media_url: '',
      caption: '',
      display_order: media.length + 1,
    };
    onChange([...media, newMedia]);
  };

  const handleRemoveMedia = (index: number) => {
    const updated = media.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleUpdateMedia = (index: number, field: keyof DbArchiveProjectMedia, value: any) => {
    const updated = [...media];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4 bg-[#101014] p-6 border border-[#22222c]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#22222c] pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
            CINEMATIC MEDIA ASSETS & STILLS
          </span>
          <p className="text-xs text-[#8a8a8a]">Manage key frames, behind-the-scenes imagery, and video stream URLs.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleAddMedia('still')}
            className="px-2.5 py-1.5 bg-[#181820] hover:bg-[#22222c] border border-[#22222c] text-[#f5f5f5] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <Image className="w-3 h-3 text-[#c5a059]" />
            <span>+ Still</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddMedia('behind_the_scenes')}
            className="px-2.5 py-1.5 bg-[#181820] hover:bg-[#22222c] border border-[#22222c] text-[#f5f5f5] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <Camera className="w-3 h-3 text-[#c5a059]" />
            <span>+ BTS</span>
          </button>
          <button
            type="button"
            onClick={() => handleAddMedia('video')}
            className="px-2.5 py-1.5 bg-[#181820] hover:bg-[#22222c] border border-[#22222c] text-[#f5f5f5] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <Film className="w-3 h-3 text-[#c5a059]" />
            <span>+ Video</span>
          </button>
        </div>
      </div>

      {media.length === 0 ? (
        <div className="py-8 text-center border border-dashed border-[#22222c] font-mono text-xs text-[#8a8a8a]">
          NO MEDIA ASSETS ADDED YET. USE THE BUTTONS ABOVE TO ATTACH STILLS, BTS, OR VIDEO PRINTS.
        </div>
      ) : (
        <div className="space-y-4">
          {media.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#08080a] border border-[#22222c] space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-3 space-y-1">
                  <label className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-wider block">MEDIA TYPE</label>
                  <select
                    value={item.media_type || 'still'}
                    onChange={(e) => handleUpdateMedia(idx, 'media_type', e.target.value as ArchiveMediaType)}
                    className="w-full bg-[#121218] border border-[#22222c] px-3 py-1.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="hero">Hero Frame</option>
                    <option value="still">Archival Still</option>
                    <option value="behind_the_scenes">Behind The Scenes</option>
                    <option value="video">Film Video Print</option>
                    <option value="poster">Teaser Poster</option>
                  </select>
                </div>

                <div className="md:col-span-8 space-y-1">
                  <label className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-wider block">IMAGE / VIDEO URL</label>
                  <input
                    type="url"
                    value={item.media_url || ''}
                    onChange={(e) => handleUpdateMedia(idx, 'media_url', e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#121218] border border-[#22222c] px-3 py-1.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-1 flex justify-end md:pt-4">
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(idx)}
                    className="p-2 text-[#8a8a8a] hover:text-[#ef4444] transition-colors"
                    title="Remove Media Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-wider block">CAPTION / CONTEXT NOTE</label>
                <input
                  type="text"
                  value={item.caption || ''}
                  onChange={(e) => handleUpdateMedia(idx, 'caption', e.target.value)}
                  placeholder="e.g. Plate 01: 35mm Anamorphic setup during night exterior in Shinjuku."
                  className="w-full bg-[#121218] border border-[#22222c] px-3 py-1.5 text-xs text-[#d1d5db] font-mono focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              {/* Quick Image Preview */}
              {item.media_url && (
                <div className="pt-2">
                  <div className="relative h-24 w-36 bg-[#121218] border border-[#22222c] overflow-hidden">
                    <img
                      src={item.media_url}
                      alt={item.caption || 'Preview'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
