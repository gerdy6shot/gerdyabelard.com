import React from 'react';
import { motion } from 'motion/react';
import { User, Building, Mail, Phone, MapPin, MessageSquare, Clock, DollarSign, Target, FileText } from 'lucide-react';

export interface ProjectDetailsData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  communicationMethod: 'email' | 'phone' | 'video' | 'in-person';
  projectTitle: string;
  projectDescription: string;
  goals: string;
  targetAudience: string;
  desiredDeliverables: string;
  timeline: 'ASAP' | 'Within 30 Days' | '1–3 Months' | '3–6 Months' | 'Flexible';
  budgetRange: 'Under $2,500' | '$2,500–$5,000' | '$5,000–$10,000' | '$10,000–$25,000' | '$25,000+' | "Let's discuss";
}

interface StepProjectDetailsProps {
  formData: ProjectDetailsData;
  onChange: (updated: Partial<ProjectDetailsData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const TIMELINE_OPTIONS: ProjectDetailsData['timeline'][] = [
  'ASAP',
  'Within 30 Days',
  '1–3 Months',
  '3–6 Months',
  'Flexible',
];

export const BUDGET_OPTIONS: ProjectDetailsData['budgetRange'][] = [
  'Under $2,500',
  '$2,500–$5,000',
  '$5,000–$10,000',
  '$10,000–$25,000',
  '$25,000+',
  "Let's discuss",
];

export const StepProjectDetails: React.FC<StepProjectDetailsProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
          // STEP 02 — TELL ME ABOUT YOUR PROJECT
        </span>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#f4f3ef] uppercase tracking-[0.08em]">
          Project Specifications
        </h2>
        <p className="text-xs font-mono text-[#8a8a8a] max-w-2xl leading-relaxed uppercase">
          Provide key contact information, operational scope, target timeline, and budget parameters.
        </p>
      </div>

      {/* 1. Identity & Contact Information */}
      <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#22222c] space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#22222c] text-xs font-mono text-[#c5a059] uppercase tracking-widest">
          <User className="w-4 h-4 text-[#c5a059]" />
          <span>I. Identity & Contact Information</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="Gerdy Abelard Client"
                className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none px-4 py-3 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Company / Brand (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.company}
                onChange={(e) => onChange({ company: e.target.value })}
                placeholder="Enterprise or House Name"
                className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none px-4 py-3 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder="executive@domain.com"
                className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none px-4 py-3 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Phone / Signal *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+1 (555) 019-2831"
                className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none px-4 py-3 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Primary Location *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => onChange({ location: e.target.value })}
                placeholder="New York, NY // Los Angeles, CA"
                className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none px-4 py-3 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Preferred Communication Method
            </label>
            <select
              value={formData.communicationMethod}
              onChange={(e) =>
                onChange({
                  communicationMethod: e.target.value as ProjectDetailsData['communicationMethod'],
                })
              }
              className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none px-4 py-3 text-xs font-mono text-[#f4f3ef] transition-colors uppercase"
            >
              <option value="email">Direct Email</option>
              <option value="phone">Direct Phone Call</option>
              <option value="video">Encrypted Video Conference</option>
              <option value="in-person">In-Person Studio Meeting</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Project Scope & Narrative Brief */}
      <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#22222c] space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#22222c] text-xs font-mono text-[#c5a059] uppercase tracking-widest">
          <FileText className="w-4 h-4 text-[#c5a059]" />
          <span>II. Project Scope & Narrative Brief</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Project Title / Working Name *
            </label>
            <input
              type="text"
              required
              value={formData.projectTitle}
              onChange={(e) => onChange({ projectTitle: e.target.value })}
              placeholder="e.g. 2026 Global Brand Campaign // Feature Narrative"
              className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none px-4 py-3 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Project Overview & Narrative Vision *
            </label>
            <textarea
              required
              rows={4}
              value={formData.projectDescription}
              onChange={(e) => onChange({ projectDescription: e.target.value })}
              placeholder="Describe the overarching creative concept, visual aesthetic goals, or strategic objectives..."
              className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none p-4 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                Primary Goals & Impact
              </label>
              <textarea
                rows={3}
                value={formData.goals}
                onChange={(e) => onChange({ goals: e.target.value })}
                placeholder="What key outcomes or emotional resonance should this engagement achieve?"
                className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none p-4 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                Target Audience & Deliverables
              </label>
              <textarea
                rows={3}
                value={formData.desiredDeliverables}
                onChange={(e) => onChange({ desiredDeliverables: e.target.value })}
                placeholder="Key deliverables (e.g. 60s Hero Film, 12 High-Res Stills, Strategic Playbook)..."
                className="w-full bg-[#14141c] border border-[#22222c] focus:border-[#c5a059] focus:outline-none p-4 text-xs font-mono text-[#f4f3ef] placeholder-[#444452] transition-colors leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Timeline & Budget Parameters */}
      <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#22222c] space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#22222c] text-xs font-mono text-[#c5a059] uppercase tracking-widest">
          <Clock className="w-4 h-4 text-[#c5a059]" />
          <span>III. Timeline & Capital Allocation</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Desired Production Timeline *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {TIMELINE_OPTIONS.map((timeOption) => {
                const active = formData.timeline === timeOption;
                return (
                  <button
                    key={timeOption}
                    type="button"
                    onClick={() => onChange({ timeline: timeOption })}
                    className={`px-3 py-3 border text-[10px] font-mono uppercase tracking-wider transition-all text-center ${
                      active
                        ? 'bg-[#c5a059] border-[#c5a059] text-[#08080a] font-semibold shadow-lg'
                        : 'bg-[#14141c] border-[#22222c] text-[#8a8a8a] hover:border-[#c5a059]/50 hover:text-[#f4f3ef]'
                    }`}
                  >
                    {timeOption}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
              Estimated Budget Allocation *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {BUDGET_OPTIONS.map((budgetOption) => {
                const active = formData.budgetRange === budgetOption;
                return (
                  <button
                    key={budgetOption}
                    type="button"
                    onClick={() => onChange({ budgetRange: budgetOption })}
                    className={`px-3 py-3 border text-[10px] font-mono uppercase tracking-wider transition-all text-center ${
                      active
                        ? 'bg-[#c5a059] border-[#c5a059] text-[#08080a] font-semibold shadow-lg'
                        : 'bg-[#14141c] border-[#22222c] text-[#8a8a8a] hover:border-[#c5a059]/50 hover:text-[#f4f3ef]'
                    }`}
                  >
                    {budgetOption}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-[#22222c]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-[#121216] border border-[#22222c] text-xs font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#f4f3ef] hover:border-[#8a8a8a] transition-all"
        >
          &larr; Back to Services
        </button>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-all shadow-xl"
        >
          Proceed to Schedule &rarr;
        </button>
      </div>
    </form>
  );
};
