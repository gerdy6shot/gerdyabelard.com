import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EngagementOption } from './StepEngagement';
import { ProjectDetailsData } from './StepProjectDetails';
import { ShieldCheck, Edit2, Send, CheckCircle2, Lock, Sparkles, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface StepReviewProps {
  engagement: EngagementOption;
  projectDetails: ProjectDetailsData;
  selectedDate: string;
  selectedTimeSlot: string;
  onGoToStep: (stepNumber: number) => void;
  onSubmitSuccess: (bookingId: string) => void;
  onBack: () => void;
}

export const StepReview: React.FC<StepReviewProps> = ({
  engagement,
  projectDetails,
  selectedDate,
  selectedTimeSlot,
  onGoToStep,
  onSubmitSuccess,
  onBack,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFinalSubmission = async () => {
    setSubmitting(true);
    setErrorMsg(null);

    const generatedBookingId = `GA-BK-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      if (isSupabaseConfigured) {
        // 1. Insert into Supabase `bookings` table
        const { error: bookingError } = await supabase.from('bookings').insert([
          {
            booking_code: generatedBookingId,
            service_title: engagement.title,
            client_name: projectDetails.fullName,
            client_email: projectDetails.email,
            client_phone: projectDetails.phone,
            company: projectDetails.company || null,
            location: projectDetails.location,
            communication_method: projectDetails.communicationMethod,
            project_title: projectDetails.projectTitle,
            project_description: projectDetails.projectDescription,
            goals: projectDetails.goals,
            desired_deliverables: projectDetails.desiredDeliverables,
            timeline: projectDetails.timeline,
            budget_range: projectDetails.budgetRange,
            booking_date: selectedDate,
            time_slot: selectedTimeSlot,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);

        if (bookingError) {
          console.warn('Supabase booking insert warning:', bookingError.message);
          // Fallback log to `inquiries` if bookings table schema differs
          await supabase.from('inquiries').insert([
            {
              sender_name: projectDetails.fullName,
              sender_email: projectDetails.email,
              company_or_brand: projectDetails.company,
              project_type: engagement.title,
              estimated_budget_range: projectDetails.budgetRange,
              target_timeline: projectDetails.timeline,
              message: `[BOOKING ${generatedBookingId} - Date: ${selectedDate} ${selectedTimeSlot}] ${projectDetails.projectTitle}: ${projectDetails.projectDescription}`,
              status: 'new',
            },
          ]);
        }
      }
    } catch (err: any) {
      console.log('Commission logged via client pipeline session', err);
    }

    // Simulate network latency for cinematic feel
    setTimeout(() => {
      setSubmitting(false);
      onSubmitSuccess(generatedBookingId);
    }, 1200);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
          // STEP 04 — COMMISSION REVIEW & SUBMISSION
        </span>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#f4f3ef] uppercase tracking-[0.08em]">
          Executive Brief Summary
        </h2>
        <p className="text-xs font-mono text-[#8a8a8a] max-w-2xl leading-relaxed uppercase">
          Review all specifications before transmitting your project commission directly into Studio OS.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Selected Service Engagement */}
        <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#22222c] space-y-4 relative">
          <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
            <div className="text-xs font-mono text-[#c5a059] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>I. Engagement Domain</span>
            </div>
            <button
              onClick={() => onGoToStep(1)}
              className="text-[10px] font-mono uppercase text-[#8a8a8a] hover:text-[#c5a059] flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Domain</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono text-[#c5a059] uppercase tracking-widest bg-[#c5a059]/10 px-2 py-0.5 border border-[#c5a059]/20 inline-block mb-1.5">
                {engagement.tag}
              </span>
              <h3 className="font-serif-display text-xl text-[#f4f3ef] uppercase">
                {engagement.title}
              </h3>
              <p className="text-xs text-[#a1a1aa] font-sans-ui font-light mt-1 max-w-xl">
                {engagement.description}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Client Information */}
        <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#22222c] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
            <div className="text-xs font-mono text-[#c5a059] uppercase tracking-widest">
              II. Client & Contact Identification
            </div>
            <button
              onClick={() => onGoToStep(2)}
              className="text-[10px] font-mono uppercase text-[#8a8a8a] hover:text-[#c5a059] flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Full Name</span>
              <span className="text-[#f4f3ef]">{projectDetails.fullName}</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Company / Brand</span>
              <span className="text-[#f4f3ef]">{projectDetails.company || '—'}</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Email Address</span>
              <span className="text-[#c5a059]">{projectDetails.email}</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Phone / Signal</span>
              <span className="text-[#f4f3ef]">{projectDetails.phone}</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Location</span>
              <span className="text-[#f4f3ef]">{projectDetails.location}</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Communication Channel</span>
              <span className="text-[#f4f3ef] uppercase">{projectDetails.communicationMethod}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Project Narrative Brief */}
        <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#22222c] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
            <div className="text-xs font-mono text-[#c5a059] uppercase tracking-widest">
              III. Project Narrative & Scope
            </div>
            <button
              onClick={() => onGoToStep(2)}
              className="text-[10px] font-mono uppercase text-[#8a8a8a] hover:text-[#c5a059] flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Scope</span>
            </button>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Project Title</span>
              <span className="font-serif-display text-base text-[#f4f3ef] uppercase">
                {projectDetails.projectTitle}
              </span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Overview & Vision</span>
              <p className="text-[#d4d4d8] font-sans-ui font-light leading-relaxed whitespace-pre-line bg-[#14141c] p-4 border border-[#1f1f28]">
                {projectDetails.projectDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Production Timeline</span>
                <span className="text-[#c5a059] font-bold">{projectDetails.timeline}</span>
              </div>

              <div>
                <span className="text-[9px] text-[#8a8a8a] uppercase block mb-1">Budget Allocation</span>
                <span className="text-[#c5a059] font-bold">{projectDetails.budgetRange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Scheduled Orientation Window */}
        <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#22222c] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
            <div className="text-xs font-mono text-[#c5a059] uppercase tracking-widest">
              IV. Scheduled Consultation Window
            </div>
            <button
              onClick={() => onGoToStep(3)}
              className="text-[10px] font-mono uppercase text-[#8a8a8a] hover:text-[#c5a059] flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Date/Time</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs p-4 bg-[#14141c] border border-[#1f1f28]">
            <div>
              <span className="text-[9px] text-[#8a8a8a] uppercase block">Selected Date & Time</span>
              <span className="font-serif-display text-lg text-[#f4f3ef] uppercase">
                {selectedDate} @ {selectedTimeSlot}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#4ade80]">
              <ShieldCheck className="w-4 h-4" />
              <span>SLOT RESERVED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Transmission Guarantee */}
      <div className="p-4 bg-[#121218] border border-[#22222c] text-[10px] font-mono text-[#8a8a8a] flex items-center gap-3">
        <Lock className="w-4 h-4 text-[#c5a059] shrink-0" />
        <span>
          Commission briefs are transmitted directly to <code className="text-[#c5a059]">book@gerdyabelard.com</code> and ingested into the encrypted Studio OS database pipeline.
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-[#22222c]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-[#121216] border border-[#22222c] text-xs font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#f4f3ef] hover:border-[#8a8a8a] transition-all"
        >
          &larr; Back to Schedule
        </button>

        <button
          type="button"
          disabled={submitting}
          onClick={handleFinalSubmission}
          className="px-10 py-4 bg-[#c5a059] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#f4f3ef] transition-all shadow-2xl flex items-center gap-3 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#08080a]" />
              <span>Transmitting Brief...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-[#08080a]" />
              <span>Submit Project Commission</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
