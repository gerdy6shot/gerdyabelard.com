import React from 'react';
import { Plus, Trash2, UserCheck } from 'lucide-react';
import { DbArchiveProjectRole } from '../../types/database';

interface ProjectCreditsManagerProps {
  roles: Partial<DbArchiveProjectRole>[];
  onChange: (roles: Partial<DbArchiveProjectRole>[]) => void;
}

export const ProjectCreditsManager: React.FC<ProjectCreditsManagerProps> = ({ roles, onChange }) => {
  const handleAddRole = () => {
    const newRole: Partial<DbArchiveProjectRole> = {
      role_name: 'Directed by',
      person_name: 'GERDY ABELARD',
      display_order: roles.length + 1,
    };
    onChange([...roles, newRole]);
  };

  const handleRemoveRole = (index: number) => {
    const updated = roles.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleUpdateRole = (index: number, field: keyof DbArchiveProjectRole, value: string) => {
    const updated = [...roles];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const presetRoles = [
    'Directed by',
    'Written by',
    'Treatment by',
    'Produced by',
    'Creative Direction',
    'Production Company',
    'Cinematography',
    'Executive Producer',
    'Lead Cast',
  ];

  return (
    <div className="space-y-4 bg-[#101014] p-6 border border-[#22222c]">
      <div className="flex items-center justify-between border-b border-[#22222c] pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
            AUTHORSHIP & CREDITS BREAKDOWN
          </span>
          <p className="text-xs text-[#8a8a8a]">Assign key creative, directorial, and production responsibilities.</p>
        </div>
        <button
          type="button"
          onClick={handleAddRole}
          className="px-3 py-1.5 bg-[#181820] hover:bg-[#22222c] border border-[#22222c] text-[#f5f5f5] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Add Credit</span>
        </button>
      </div>

      {roles.length === 0 ? (
        <div className="py-8 text-center border border-dashed border-[#22222c] font-mono text-xs text-[#8a8a8a]">
          NO CREDITS ASSIGNED YET. CLICK "ADD CREDIT" TO INITIALIZE AUTHORSHIP ROLES.
        </div>
      ) : (
        <div className="space-y-3">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 bg-[#08080a] border border-[#22222c] group"
            >
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-wider block">ROLE TITLE</label>
                <div className="relative">
                  <input
                    type="text"
                    list={`role-presets-${idx}`}
                    value={role.role_name || ''}
                    onChange={(e) => handleUpdateRole(idx, 'role_name', e.target.value)}
                    placeholder="e.g. Directed by"
                    className="w-full bg-[#121218] border border-[#22222c] px-3 py-1.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                  <datalist id={`role-presets-${idx}`}>
                    {presetRoles.map((preset) => (
                      <option key={preset} value={preset} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="sm:col-span-6 space-y-1">
                <label className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-wider block">CREDITED ENTITY / PERSON</label>
                <input
                  type="text"
                  value={role.person_name || ''}
                  onChange={(e) => handleUpdateRole(idx, 'person_name', e.target.value)}
                  placeholder="e.g. GERDY ABELARD"
                  className="w-full bg-[#121218] border border-[#22222c] px-3 py-1.5 text-xs text-[#f5f5f5] font-mono focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end sm:pt-4">
                <button
                  type="button"
                  onClick={() => handleRemoveRole(idx)}
                  className="p-2 text-[#8a8a8a] hover:text-[#ef4444] transition-colors"
                  title="Remove Credit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
