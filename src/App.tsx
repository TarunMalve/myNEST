import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { SocietyPage } from './pages/SocietyPage';
import { BookingsPage } from './pages/BookingsPage';
import { CommunityPage } from './pages/CommunityPage';
import { InsightsPage } from './pages/InsightsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes (AppShell handles auth guard) */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/society" element={<SocietyPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
