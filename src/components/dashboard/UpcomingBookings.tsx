import React from 'react';
import { GlassPanel } from '../GlassPanel';
import { BookmarkCheck, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BookingItem {
  id: string;
  client_name: string;
  service_title: string;
  booking_date: string;
  start_time: string;
  end_time?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  location?: string;
}

interface UpcomingBookingsProps {
  bookings: BookingItem[];
  isLoading: boolean;
}

export const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ bookings, isLoading }) => {
  return (
    <GlassPanel className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase block">
            // LIVE TIMELINE
          </span>
          <h2 className="font-serif-display text-xl text-[#f4f3ef] uppercase tracking-[0.1em] flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-[#c5a059]" />
            Upcoming Production Sessions
          </h2>
        </div>

        <Link
          to="/admin/bookings"
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#c5a059] transition-colors flex items-center gap-2"
        >
          <span>View All Bookings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 bg-[#181820] animate-pulse border border-[#22222c]" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="p-10 bg-[#0a0a0d] border border-[#1f1f28] text-center space-y-3">
          <Calendar className="w-8 h-8 text-[#444452] mx-auto" />
          <div className="space-y-1">
            <p className="text-xs font-mono text-[#f4f3ef] uppercase tracking-widest">
              Awaiting Production Intelligence
            </p>
            <p className="text-[10px] font-mono text-[#777785] max-w-md mx-auto">
              No confirmed shoot days or strategy sessions queued in system calendar feed.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 bg-[#0d0d11] border border-[#22222c] hover:border-[#c5a059]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#15151c] border border-[#22222c] text-[#c5a059] mt-0.5">
                  <User className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-serif-display text-[#f4f3ef] uppercase tracking-wider">
                    {booking.client_name}
                  </div>
                  <div className="text-[11px] font-mono text-[#c5a059] uppercase">
                    {booking.service_title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono text-[#8a8a8a]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{booking.booking_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{booking.start_time}</span>
                </div>
                <span
                  className={`px-2 py-0.5 text-[9px] uppercase tracking-widest border ${
                    booking.status === 'confirmed'
                      ? 'bg-[#102010] border-[#1e451e] text-[#4ade80]'
                      : 'bg-[#201810] border-[#422e18] text-[#fbbf24]'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  );
};
