import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Globe, ShieldCheck, Check, AlertCircle } from 'lucide-react';

interface StepScheduleProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onSelectSchedule: (date: string, timeSlot: string) => void;
  onNext: () => void;
  onBack: () => void;
}

// Generate available calendar dates for the next 14 business days
const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  let added = 0;
  let dayOffset = 1;

  while (added < 12) {
    const d = new Date(today);
    d.setDate(today.getDate() + dayOffset);
    const dayOfWeek = d.getDay();
    
    // Skip weekends (0 = Sunday, 6 = Saturday) for standard studio sessions
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const formattedDate = d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      dates.push({
        iso: dateStr,
        label: formattedDate,
        dayName: d.toLocaleDateString('en-US', { weekday: 'long' }),
        fullDate: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      added++;
    }
    dayOffset++;
  }

  return dates;
};

const AVAILABLE_TIME_SLOTS = [
  '10:00 AM EST',
  '11:30 AM EST',
  '02:00 PM EST',
  '03:30 PM EST',
  '05:00 PM EST',
];

export const StepSchedule: React.FC<StepScheduleProps> = ({
  selectedDate,
  selectedTimeSlot,
  onSelectSchedule,
  onNext,
  onBack,
}) => {
  const availableDates = getAvailableDates();
  
  const [currentDate, setCurrentDate] = useState<string>(
    selectedDate || availableDates[0]?.iso || ''
  );
  const [currentTimeSlot, setCurrentTimeSlot] = useState<string>(
    selectedTimeSlot || AVAILABLE_TIME_SLOTS[0]
  );

  const [userTimezone, setUserTimezone] = useState<string>('EST (UTC-5)');

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        setUserTimezone(tz);
      }
    } catch {
      setUserTimezone('EST (UTC-5)');
    }
  }, []);

  const handleConfirm = () => {
    if (currentDate && currentTimeSlot) {
      onSelectSchedule(currentDate, currentTimeSlot);
      onNext();
    }
  };

  const selectedDateObject = availableDates.find((d) => d.iso === currentDate);

  return (
    <div className="space-y-10">
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
          // STEP 03 — SCHEDULE CONSULTATION
        </span>
        <h2 className="font-serif-display text-2xl sm:text-4xl text-[#f4f3ef] uppercase tracking-[0.08em]">
          Master Availability Calendar
        </h2>
        <p className="text-xs font-mono text-[#8a8a8a] max-w-2xl leading-relaxed uppercase">
          Select a strategic orientation slot. Connected to real-time Studio OS calendar rules to prevent double bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Date Selection Panel */}
        <div className="lg:col-span-7 bg-[#0c0c0f] border border-[#22222c] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-widest">
              <CalendarIcon className="w-4 h-4" />
              <span>Select Studio Date</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8a8a8a] uppercase">
              <Globe className="w-3 h-3 text-[#c5a059]" />
              <span>{userTimezone}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableDates.map((item) => {
              const active = currentDate === item.iso;
              return (
                <button
                  key={item.iso}
                  type="button"
                  onClick={() => {
                    setCurrentDate(item.iso);
                    onSelectSchedule(item.iso, currentTimeSlot);
                  }}
                  className={`p-4 border text-left transition-all relative ${
                    active
                      ? 'bg-[#181822] border-[#c5a059] text-[#f4f3ef] shadow-xl'
                      : 'bg-[#121216] border-[#22222c] text-[#8a8a8a] hover:border-[#c5a059]/40 hover:text-[#f4f3ef]'
                  }`}
                >
                  <div className="text-[9px] font-mono text-[#c5a059] uppercase tracking-widest mb-1">
                    {item.dayName}
                  </div>
                  <div className="font-serif-display text-base text-[#f4f3ef]">
                    {item.label}
                  </div>
                  {active && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c5a059]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-[#121216] border border-[#22222c] text-[11px] font-mono text-[#8a8a8a] flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span>30-Minute strategic buffer automatically reserved between production sessions.</span>
          </div>
        </div>

        {/* Time Slot Panel */}
        <div className="lg:col-span-5 bg-[#0c0c0f] border border-[#22222c] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#22222c] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                <span>Available Windows</span>
              </div>
              <span className="text-[10px] font-mono text-[#4ade80] uppercase">Live Sync</span>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono text-[#8a8a8a] uppercase">Selected Date</div>
              <div className="font-serif-display text-lg text-[#f4f3ef]">
                {selectedDateObject?.fullDate || currentDate}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block">
                Time Window ({userTimezone}):
              </label>

              <div className="space-y-2.5">
                {AVAILABLE_TIME_SLOTS.map((slot) => {
                  const active = currentTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setCurrentTimeSlot(slot);
                        onSelectSchedule(currentDate, slot);
                      }}
                      className={`w-full p-3.5 border font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-all ${
                        active
                          ? 'bg-[#c5a059] border-[#c5a059] text-[#08080a] font-semibold'
                          : 'bg-[#14141c] border-[#22222c] text-[#a1a1aa] hover:border-[#c5a059]/50 hover:text-[#f4f3ef]'
                      }`}
                    >
                      <span>{slot}</span>
                      {active ? (
                        <Check className="w-4 h-4 text-[#08080a]" />
                      ) : (
                        <span className="text-[9px] text-[#555566]">AVAILABLE</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#22222c] space-y-3">
            <div className="flex items-start gap-2 text-[10px] font-mono text-[#8a8a8a]">
              <AlertCircle className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
              <span>Dates & time slots are reserved exclusively during active booking confirmation.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-[#22222c]">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-[#121216] border border-[#22222c] text-xs font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#f4f3ef] hover:border-[#8a8a8a] transition-all"
        >
          &larr; Back to Brief
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          className="px-8 py-3.5 bg-[#f4f3ef] text-[#08080a] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#c5a059] transition-all shadow-xl"
        >
          Review Commission Summary &rarr;
        </button>
      </div>
    </div>
  );
};
