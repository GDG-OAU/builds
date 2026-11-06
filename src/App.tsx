import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Toast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { GalleryPage } from './pages/GalleryPage';
import { SubmitPage } from './pages/SubmitPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AdminPage } from './pages/AdminPage';

function ToastWrapper() {
  const { toast, dismissToast } = useApp();
  return <Toast toast={toast} onDismiss={dismissToast} />;
}

function AdminProtectedRoute() {
  const { isAdmin, user } = useApp();
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <AdminPage />;
}

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
          <ToastWrapper />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/admin" element={<AdminProtectedRoute />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
