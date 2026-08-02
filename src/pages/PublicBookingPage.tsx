import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepEngagement, ENGAGEMENT_OPTIONS, EngagementOption } from '../components/booking/StepEngagement';
import { StepProjectDetails, ProjectDetailsData } from '../components/booking/StepProjectDetails';
import { StepSchedule } from '../components/booking/StepSchedule';
import { StepReview } from '../components/booking/StepReview';
import { StepConfirmation } from '../components/booking/StepConfirmation';
import { ArrowLeft, Check, Shield, Sparkles, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicBookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedEngagement, setSelectedEngagement] = useState<EngagementOption>(ENGAGEMENT_OPTIONS[0]);
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    communicationMethod: 'email',
    projectTitle: '',
    projectDescription: '',
    goals: '',
    targetAudience: '',
    desiredDeliverables: '',
    timeline: 'Within 30 Days',
    budgetRange: '$10,000–$25,000',
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:30 AM EST');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  const handleSelectEngagement = (option: EngagementOption) => {
    setSelectedEngagement(option);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProjectDetails = (updated: Partial<ProjectDetailsData>) => {
    setProjectDetails((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectSchedule = (date: string, timeSlot: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
  };

  const handleGoToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmissionSuccess = (bookingId: string) => {
    setConfirmedBookingId(bookingId);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsHeader = [
    { number: 1, label: 'Engagement' },
    { number: 2, label: 'Brief' },
    { number: 3, label: 'Schedule' },
    { number: 4, label: 'Review' },
    { number: 5, label: 'Confirmation' },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f3ef] pt-28 pb-32 px-4 sm:px-6 lg:px-8 relative selection:bg-[#c5a059] selection:text-[#08080a]">
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14141d_1px,transparent_1px),linear-gradient(to_bottom,#14141d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#22222c]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">
                // CREATIVE COMMISSION PORTAL
              </span>
              <span className="px-2 py-0.5 bg-[#14141c] border border-[#22222c] text-[9px] font-mono text-[#c5a059] uppercase flex items-center gap-1.5">
                <Radio className="w-2.5 h-2.5 text-[#c5a059] animate-pulse" />
                <span>DIRECT ADVISORY & COMMISSIONS</span>
              </span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl text-[#f4f3ef] uppercase tracking-[0.08em] font-normal leading-none">
              Client Commission & Booking
            </h1>

            <p className="text-xs sm:text-sm font-sans-ui text-[#a1a1aa] max-w-2xl leading-relaxed font-light">
              Direct entry portal for film directing, high-fashion commercial photography, brand architecture, original IP optioning, and executive advisory.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8a8a8a] hover:text-[#f4f3ef] uppercase tracking-widest transition-colors py-2 px-3 bg-[#101014] border border-[#22222c] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Step Indicator Bar */}
        {currentStep <= 4 && (
          <div className="p-4 sm:p-6 bg-[#0c0c0f] border border-[#22222c] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8a8a8a]">
              <span>Step {currentStep} of 4</span>
              <span className="text-[#c5a059]">{stepsHeader[currentStep - 1]?.label}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((stepNum) => {
                const isActive = currentStep === stepNum;
                const isComplete = currentStep > stepNum;

                return (
                  <button
                    key={stepNum}
                    type="button"
                    disabled={stepNum > currentStep}
                    onClick={() => handleGoToStep(stepNum)}
                    className={`h-2 transition-all relative ${
                      isComplete
                        ? 'bg-[#c5a059]'
                        : isActive
                        ? 'bg-[#f4f3ef]'
                        : 'bg-[#1a1a24]'
                    }`}
                  >
                    <span className="sr-only">Step {stepNum}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:grid grid-cols-4 gap-2 text-[10px] font-mono text-[#8a8a8a] uppercase text-center pt-1">
              {stepsHeader.slice(0, 4).map((s) => (
                <span
                  key={s.number}
                  className={currentStep === s.number ? 'text-[#c5a059] font-bold' : ''}
                >
                  {s.number}. {s.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step Content Stage with Cinematic Motion Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentStep === 1 && (
              <StepEngagement
                selectedId={selectedEngagement.id}
                onSelect={handleSelectEngagement}
              />
            )}

            {currentStep === 2 && (
              <StepProjectDetails
                formData={projectDetails}
                onChange={handleUpdateProjectDetails}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <StepSchedule
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onSelectSchedule={handleSelectSchedule}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <StepReview
                engagement={selectedEngagement}
                projectDetails={projectDetails}
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onGoToStep={handleGoToStep}
                onSubmitSuccess={handleSubmissionSuccess}
                onBack={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 5 && (
              <StepConfirmation
                bookingId={confirmedBookingId}
                engagement={selectedEngagement}
                projectDetails={projectDetails}
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footnote Assurance */}
        <div className="pt-12 border-t border-[#1c1c26] text-center space-y-2 text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">
          <p>GERDY ABELARD // PRIVATE COMMISSION PORTAL</p>
          <p className="text-[#555566]">ALL RIGHTS RESERVED — COMVIEWMEDIA INC</p>
        </div>
      </div>
    </div>
  );
};
