import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎪</span>
            <span className="text-xl font-bold text-primary-600">
              EventPlatform
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/"
              className="text-gray-600 hover:text-primary-600 
                         font-medium transition-colors">
              Accueil
            </Link>
            <Link to="/events"
              className="text-gray-600 hover:text-primary-600 
                         font-medium transition-colors">
              Événements
            </Link>
            {user && (
              <Link to="/dashboard/reservations"
                className="text-gray-600 hover:text-primary-600 
                           font-medium transition-colors">
                Mes Réservations
              </Link>
            )}
            {user?.role_id === 2 && (
              <Link to="/dashboard/admin"
                className="text-gray-600 hover:text-primary-600 
                           font-medium transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500 
                                  flex items-center justify-center text-white text-sm font-bold">
                    {user.nom_complet?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {user.nom_complet}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg 
                             text-sm font-medium hover:bg-red-100 transition-colors">
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"
                  className="text-gray-600 hover:text-primary-600 
                             px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Connexion
                </Link>
                <Link to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg 
                             text-sm font-medium hover:bg-primary-700 transition-colors">
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;