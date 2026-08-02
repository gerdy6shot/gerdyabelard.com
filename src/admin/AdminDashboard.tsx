import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { MetricPanel, DashboardMetricsData } from '../components/dashboard/MetricPanel';
import { UpcomingBookings, BookingItem } from '../components/dashboard/UpcomingBookings';
import { VentureMap } from '../components/dashboard/VentureMap';
import { ClientIntelligence, ClientProfileItem } from '../components/dashboard/ClientIntelligence';
import { PipelinePanel } from '../components/dashboard/PipelinePanel';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetricsData | null>(null);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [clients, setClients] = useState<ClientProfileItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      setIsLoading(true);

      try {
        if (!isSupabaseConfigured) {
          // Fallback initial state if Supabase environment variables are missing
          if (isMounted) {
            setMetrics({
              totalClients: 0,
              totalBookings: 0,
              pendingRequests: 0,
              confirmedSessions: 0,
              upcomingAppointments: 0,
            });
            setBookings([]);
            setClients([]);
            setLastSyncedAt(new Date());
            setIsLoading(false);
          }
          return;
        }

        // 1. Try querying summary metrics via RPC or table counts
        let metricsData: DashboardMetricsData = {
          totalClients: 0,
          totalBookings: 0,
          pendingRequests: 0,
          confirmedSessions: 0,
          upcomingAppointments: 0,
        };

        const { data: rpcData, error: rpcError } = await supabase.rpc('admin_dashboard_summary');

        if (!rpcError && rpcData) {
          metricsData = {
            totalClients: rpcData.total_clients || 0,
            totalBookings: rpcData.total_bookings || 0,
            pendingRequests: rpcData.pending_requests || 0,
            confirmedSessions: rpcData.confirmed_sessions || 0,
            upcomingAppointments: rpcData.upcoming_appointments || 0,
          };
        } else {
          // Fallback direct count queries on tables
          const [clientsCount, bookingsCount, pendingCount, confirmedCount] = await Promise.all([
            supabase.from('clients').select('id', { count: 'exact', head: true }),
            supabase.from('bookings').select('id', { count: 'exact', head: true }),
            supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
            supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'confirmed'),
          ]);

          metricsData = {
            totalClients: clientsCount.count || 0,
            totalBookings: bookingsCount.count || 0,
            pendingRequests: pendingCount.count || 0,
            confirmedSessions: confirmedCount.count || 0,
            upcomingAppointments: confirmedCount.count || 0,
          };
        }

        // 2. Fetch upcoming bookings view or direct bookings table
        let fetchedBookings: BookingItem[] = [];
        const { data: upcomingData, error: upcomingErr } = await supabase
          .from('admin_upcoming_bookings')
          .select('*')
          .limit(5);

        if (!upcomingErr && upcomingData && upcomingData.length > 0) {
          fetchedBookings = upcomingData.map((b: any) => ({
            id: b.id || b.booking_id,
            client_name: b.client_name || b.client_full_name || 'Anonymous Client',
            service_title: b.service_title || b.service_name || 'Creative Session',
            booking_date: b.booking_date || b.date,
            start_time: b.start_time || '09:00 AM',
            end_time: b.end_time,
            status: b.status || 'confirmed',
            location: b.location,
          }));
        } else {
          // Query direct bookings table with joins if view isn't initialized yet
          const { data: directBookings } = await supabase
            .from('bookings')
            .select(`
              id,
              booking_date,
              start_time,
              status,
              service_title,
              client_name
            `)
            .order('booking_date', { ascending: true })
            .limit(5);

          if (directBookings) {
            fetchedBookings = directBookings.map((b: any) => ({
              id: b.id,
              client_name: b.client_name || 'Studio Client',
              service_title: b.service_title || 'Consultation',
              booking_date: b.booking_date,
              start_time: b.start_time || '10:00 AM',
              status: b.status || 'confirmed',
            }));
          }
        }

        // 3. Fetch client history
        let fetchedClients: ClientProfileItem[] = [];
        const { data: clientHistoryData, error: clientErr } = await supabase
          .from('admin_client_history')
          .select('*')
          .limit(4);

        if (!clientErr && clientHistoryData && clientHistoryData.length > 0) {
          fetchedClients = clientHistoryData.map((c: any) => ({
            id: c.id || c.client_id,
            full_name: c.full_name || c.name || 'Client',
            email: c.email || 'client@studio.com',
            company: c.company,
            total_engagements: c.total_engagements || c.bookings_count || 1,
            created_at: c.created_at || new Date().toISOString(),
          }));
        } else {
          const { data: directClients } = await supabase
            .from('clients')
            .select('*')
            .limit(4);

          if (directClients) {
            fetchedClients = directClients.map((c: any) => ({
              id: c.id,
              full_name: c.full_name || c.name,
              email: c.email,
              company: c.company,
              created_at: c.created_at,
            }));
          }
        }

        if (isMounted) {
          setMetrics(metricsData);
          setBookings(fetchedBookings);
          setClients(fetchedClients);
          setLastSyncedAt(new Date());
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Dashboard data sync notice:', err);
        if (isMounted) {
          setMetrics({
            totalClients: 0,
            totalBookings: 0,
            pendingRequests: 0,
            confirmedSessions: 0,
            upcomingAppointments: 0,
          });
          setBookings([]);
          setClients([]);
          setLastSyncedAt(new Date());
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-10 pb-16"
    >
      {/* 1. System Header */}
      <DashboardHeader lastSyncedAt={lastSyncedAt} />

      {/* 2. Overview Metrics */}
      <MetricPanel metrics={metrics} isLoading={isLoading} />

      {/* 3. Live Production & Booking Timeline */}
      <UpcomingBookings bookings={bookings} isLoading={isLoading} />

      {/* 4. Strategic Business Venture Ecosystem */}
      <VentureMap />

      {/* 5. Client Intelligence & Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ClientIntelligence clients={clients} isLoading={isLoading} />
        <PipelinePanel />
      </div>
    </motion.div>
  );
};
