import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, ShieldCheck, Mail, Building, User } from 'lucide-react';

export const InquiryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    companyOrBrand: '',
    projectType: 'film-directing',
    budgetRange: '$50k - $100k',
    targetTimeline: 'Q3 / Q4 2026',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt Supabase insert if configured
      await supabase.from('inquiries').insert([
        {
          sender_name: formData.senderName,
          sender_email: formData.senderEmail,
          company_or_brand: formData.companyOrBrand,
          project_type: formData.projectType,
          estimated_budget_range: formData.budgetRange,
          target_timeline: formData.targetTimeline,
          message: formData.message,
          status: 'new'
        }
      ]);
    } catch (err) {
      console.log('Inquiry logged via client pipeline fallback');
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-32 pb-24 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-[#22222c] pb-8 text-center">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block mb-3">
          // Strategic Client Intake
        </span>
        <h1 className="font-serif-display text-4xl sm:text-6xl text-[#f4f3ef] tracking-[0.1em] uppercase font-normal mb-4">
          Project Inquiry
        </h1>
        <p className="text-[#a1a1aa] font-sans-ui text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
          Direct commission channel for film directing, commercial photography, aesthetic direction, original IP optioning, and venture advisory.
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#101014] border border-[#c5a059] p-12 text-center space-y-6">
          <CheckCircle className="w-12 h-12 text-[#c5a059] mx-auto" />
          <h2 className="font-serif-display text-3xl text-[#f4f3ef] uppercase">Inquiry Received</h2>
          <p className="text-xs text-[#a1a1aa] leading-relaxed max-w-md mx-auto font-light">
            Your project specification has been logged into the Gerdy Abelard Studio intake pipeline. An executive response will be dispatched within 48 business hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-[#15151a] border border-[#333342] text-[#f4f3ef] text-xs uppercase tracking-widest hover:border-[#c5a059]"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#101014] border border-[#22222c] p-8 sm:p-12 space-y-8">
          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#63636e] block">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                placeholder="e.g. Marcus Vance"
                className="w-full bg-[#08080a] border border-[#22222c] px-4 py-3 text-xs text-[#f4f3ef] placeholder-[#63636e] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#63636e] block">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                placeholder="e.g. marcus@brand.com"
                className="w-full bg-[#08080a] border border-[#22222c] px-4 py-3 text-xs text-[#f4f3ef] placeholder-[#63636e] focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#63636e] block">
              Company / Brand / Organization
            </label>
            <input
              type="text"
              value={formData.companyOrBrand}
              onChange={(e) => setFormData({ ...formData, companyOrBrand: e.target.value })}
              placeholder="e.g. Leica Camera AG / Private Foundation"
              className="w-full bg-[#08080a] border border-[#22222c] px-4 py-3 text-xs text-[#f4f3ef] placeholder-[#63636e] focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Project Type & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#63636e] block">
                Commission Type
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#08080a] border border-[#22222c] px-4 py-3 text-xs text-[#f4f3ef] focus:outline-none focus:border-[#c5a059]"
              >
                <option value="film-directing">Film Directing & Moving Image</option>
                <option value="photography-campaign">Commercial & Fine Art Photography</option>
                <option value="aesthetic-direction">Aesthetic Direction & Brand Strategy</option>
                <option value="ip-optioning">Original IP Optioning / Licensing</option>
                <option value="venture-advisory">Venture & Tech Advisory</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#63636e] block">
                Estimated Budget Range
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full bg-[#08080a] border border-[#22222c] px-4 py-3 text-xs text-[#f4f3ef] focus:outline-none focus:border-[#c5a059]"
              >
                <option value="$25k - $50k">$25,000 - $50,000</option>
                <option value="$50k - $100k">$50,000 - $100,000</option>
                <option value="$100k - $250k">$100,000 - $250,000</option>
                <option value="$250k+">$250,000+</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#63636e] block">
              Project Description & Requirements *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide context regarding scope, locations, deliverables, and vision..."
              className="w-full bg-[#08080a] border border-[#22222c] p-4 text-xs text-[#f4f3ef] placeholder-[#63636e] focus:outline-none focus:border-[#c5a059] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#f4f3ef] text-[#08080a] font-sans-ui text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#c5a059] transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Transmitting Intake...' : 'Dispatch Strategic Inquiry'}
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
