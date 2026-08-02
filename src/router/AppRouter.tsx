import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CinematicShell } from '../components/layout/CinematicShell';
import { ArchitectureBlueprint } from '../components/common/ArchitectureBlueprint';

// Auth & Protected Admin Imports
import { AuthProvider } from '../auth/AuthProvider';
import { AdminLogin } from '../admin/AdminLogin';
import { AdminProtectedRoute } from '../admin/AdminProtectedRoute';
import { AdminLayout } from '../admin/AdminLayout';
import { AdminDashboard } from '../admin/AdminDashboard';
import { ProjectManager } from '../admin/projects/ProjectManager';
import { AdminCalendar } from '../admin/pages/AdminCalendar';
import { AdminBookings } from '../admin/pages/AdminBookings';
import { AdminClients } from '../admin/pages/AdminClients';
import { AdminServices } from '../admin/pages/AdminServices';
import { AdminAvailability } from '../admin/pages/AdminAvailability';
import { AdminSettings } from '../admin/pages/AdminSettings';

// Core Website Pages
import { Home } from '../pages/Home';
import { WorkArchive } from '../pages/WorkArchive';
import { ProjectDetail } from '../pages/ProjectDetail';
import { FilmPortfolio } from '../pages/FilmPortfolio';
import { PhotographyPortfolio } from '../pages/PhotographyPortfolio';
import { CreativeDirectionPage } from '../pages/CreativeDirectionPage';
import { ClientArchive } from '../pages/ClientArchive';
import { OriginalIPPage } from '../pages/OriginalIPPage';
import { WritingAndBooksPage } from '../pages/WritingAndBooksPage';
import { VentureEcosystemPage } from '../pages/VentureEcosystemPage';
import { AboutPage } from '../pages/AboutPage';
import { InquiryPage } from '../pages/InquiryPage';
import { PublicBookingPage } from '../pages/PublicBookingPage';
import { StudioPage } from '../pages/StudioPage';

export const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Cinematic Layout Shell */}
          <Route element={<CinematicShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/comviewmedia" element={<StudioPage />} />
            <Route path="/archive" element={<WorkArchive />} />
            <Route path="/projects" element={<WorkArchive />} />
            <Route path="/projects/:slug/*" element={<ProjectDetail />} />
            <Route path="/work" element={<WorkArchive />} />
            <Route path="/work/:slug/*" element={<ProjectDetail />} />
            <Route path="/film" element={<FilmPortfolio />} />
            <Route path="/photography" element={<PhotographyPortfolio />} />
            <Route path="/creative-direction" element={<CreativeDirectionPage />} />
            <Route path="/clients" element={<ClientArchive />} />
            <Route path="/ip" element={<OriginalIPPage />} />
            <Route path="/writing" element={<WritingAndBooksPage />} />
            <Route path="/ventures" element={<VentureEcosystemPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/inquire" element={<InquiryPage />} />
            <Route path="/blueprint" element={<ArchitectureBlueprint />} />
            <Route path="/book" element={<PublicBookingPage />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Dedicated Protected Studio OS Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <ProjectManager />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/calendar"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminCalendar />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminBookings />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/clients"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminClients />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminServices />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/availability"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminAvailability />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
