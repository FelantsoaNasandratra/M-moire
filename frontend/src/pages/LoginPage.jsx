import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard/reservations');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 
                      w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">🎪</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-3">
            Connexion
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Accédez à votre compte EventPlatform
          </p>
        </div>

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 
                         rounded-lg px-4 py-3 text-sm mb-6">
            ❌ {error}
          </div>
        )}

        {/* Formulaire */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="votre@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         text-sm focus:outline-none focus:ring-2 
                         focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         text-sm focus:outline-none focus:ring-2 
                         focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl 
                       font-semibold hover:bg-indigo-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Connexion...' : '🔐 Se connecter'}
          </button>
        </div>

        {/* Lien inscription */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{' '}
          <Link to="/register"
            className="text-indigo-600 font-medium hover:underline">
            S'inscrire
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;