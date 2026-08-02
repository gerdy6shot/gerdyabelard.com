import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Calendar, Sparkles, ArrowRight, CheckCircle2, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EngagementOption } from './StepEngagement';
import { ProjectDetailsData } from './StepProjectDetails';

interface StepConfirmationProps {
  bookingId: string;
  engagement: EngagementOption;
  projectDetails: ProjectDetailsData;
  selectedDate: string;
  selectedTimeSlot: string;
}

export const StepConfirmation: React.FC<StepConfirmationProps> = ({
  bookingId,
  engagement,
  projectDetails,
  selectedDate,
  selectedTimeSlot,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12 max-w-3xl mx-auto text-center"
    >
      {/* Header Badge */}
      <div className="space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#181822] border border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow-2xl shadow-[#c5a059]/20">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
          // TRANSMISSION CONFIRMED — {bookingId}
        </span>

        <h1 className="font-serif-display text-3xl sm:text-5xl text-[#f4f3ef] uppercase tracking-[0.08em] leading-tight">
          Your inquiry has been received.
        </h1>
      </div>

      {/* Editorial Thank You Manifesto */}
      <div className="p-8 bg-[#0c0c0f] border border-[#22222c] space-y-6 text-left relative overflow-hidden">
        <div className="space-y-4 text-sm sm:text-base text-[#d4d4d8] font-sans-ui font-light leading-relaxed">
          <p className="font-serif-display text-xl text-[#f4f3ef]">
            Thank you for considering a creative partnership.
          </p>
          <p>
            Your project brief has been logged into Studio OS. Your proposal will be reviewed personally by Gerdy Abelard, and an executive representative will reach out to discuss timeline alignment and production logistics.
          </p>
        </div>

        <div className="pt-6 border-t border-[#1f1f28] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[9px] text-[#8a8a8a] uppercase block">Direct Notification Target</span>
            <span className="text-[#c5a059] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>book@gerdyabelard.com</span>
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3.5 py-2 bg-[#161620] border border-[#22222c] hover:border-[#c5a059] text-[10px] text-[#a1a1aa] hover:text-[#f4f3ef] flex items-center gap-2 transition-all uppercase"
          >
            <Copy className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{copied ? 'Code Copied' : `Copy Code: ${bookingId}`}</span>
          </button>
        </div>

        <div className="absolute top-0 right-0 w-2 h-full bg-[#c5a059]" />
      </div>

      {/* Confirmation Summary Card */}
      <div className="p-6 bg-[#0c0c0f] border border-[#22222c] text-left font-mono text-xs space-y-4">
        <div className="text-[10px] text-[#c5a059] uppercase tracking-widest pb-3 border-b border-[#22222c] flex items-center justify-between">
          <span>Commission Record Details</span>
          <span className="text-[#8a8a8a]">{selectedDate}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#a1a1aa]">
          <div>
            <span className="text-[9px] text-[#8a8a8a] uppercase block">Domain</span>
            <span className="text-[#f4f3ef] font-bold">{engagement.title}</span>
          </div>

          <div>
            <span className="text-[9px] text-[#8a8a8a] uppercase block">Client</span>
            <span className="text-[#f4f3ef]">{projectDetails.fullName} ({projectDetails.email})</span>
          </div>

          <div>
            <span className="text-[9px] text-[#8a8a8a] uppercase block">Project Title</span>
            <span className="text-[#f4f3ef]">{projectDetails.projectTitle}</span>
          </div>

          <div>
            <span className="text-[9px] text-[#8a8a8a] uppercase block">Scheduled Orientation</span>
            <span className="text-[#c5a059] font-bold">{selectedDate} @ {selectedTimeSlot}</span>
          </div>
        </div>
      </div>

      {/* Return Actions */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-all flex items-center justify-center gap-2"
        >
          <span>Return to Studio Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/work"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#121216] border border-[#22222c] text-[#a1a1aa] hover:text-[#f4f3ef] hover:border-[#c5a059] text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
        >
          <span>Explore Work Archive</span>
        </Link>
      </div>
    </motion.div>
  );
};
