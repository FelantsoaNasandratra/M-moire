import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import PrivateRoute from './components/auth/PrivateRoute.jsx';

// Pages publiques
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';

// Dashboards privés
import ReservationDashboard from './pages/dashboards/ReservationDashboard.jsx';
import RecommandationDashboard from './pages/dashboards/RecommandationDashboard.jsx';
import AdminDashboard from './pages/dashboards/AdminDashboard.jsx';

// Route publique — redirige si déjà connecté
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Routes>
      {/* ===== ROUTES PUBLIQUES ===== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />

      {/* ===== ROUTES AUTH (redirige si connecté) ===== */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />

      {/* ===== ROUTES PRIVÉES (connexion requise) ===== */}
      <Route path="/dashboard/reservations" element={
        <PrivateRoute>
          <ReservationDashboard />
        </PrivateRoute>
      } />
      <Route path="/dashboard/recommandations" element={
        <PrivateRoute>
          <RecommandationDashboard />
        </PrivateRoute>
      } />

      {/* ===== ROUTE ADMIN (role_id = 1) ===== */}
      <Route path="/dashboard/admin" element={
        <PrivateRoute adminOnly={true}>
          <AdminDashboard />
        </PrivateRoute>
      } />

      {/* ===== ROUTE 404 ===== */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center 
                       bg-gray-50">
          <div className="text-center">
            <div className="text-8xl mb-4">😕</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Page introuvable
            </h1>
            <p className="text-gray-500 mb-6">
              La page que vous cherchez n'existe pas
            </p>
            <a href="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl 
                         font-semibold hover:bg-indigo-700 transition-colors">
              Retour à l'accueil
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;