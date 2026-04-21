import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const featuredEvents = [
  {
    id: 1,
    titre: 'Festival de Musique 2024',
    categorie: 'Musique',
    lieu: 'Antananarivo',
    date: '15 Déc 2024',
    prix: '25 000 Ar',
    places: 150,
    image: '🎵',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 2,
    titre: 'Conférence Tech Madagascar',
    categorie: 'Technologie',
    lieu: 'Antananarivo',
    date: '20 Déc 2024',
    prix: '15 000 Ar',
    places: 200,
    image: '💻',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    titre: 'Exposition Art Contemporain',
    categorie: 'Art',
    lieu: 'Toamasina',
    date: '25 Déc 2024',
    prix: '10 000 Ar',
    places: 80,
    image: '🎨',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 4,
    titre: 'Marathon Tananarive 2024',
    categorie: 'Sport',
    lieu: 'Antananarivo',
    date: '30 Déc 2024',
    prix: '5 000 Ar',
    places: 500,
    image: '🏃',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    titre: 'Atelier Cuisine Malgache',
    categorie: 'Gastronomie',
    lieu: 'Fianarantsoa',
    date: '5 Jan 2025',
    prix: '20 000 Ar',
    places: 30,
    image: '🍽️',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 6,
    titre: 'Séminaire Business 2025',
    categorie: 'Business',
    lieu: 'Antananarivo',
    date: '10 Jan 2025',
    prix: '50 000 Ar',
    places: 100,
    image: '💼',
    color: 'from-slate-500 to-gray-600'
  },
];

const categories = [
  { nom: 'Musique', icone: '🎵', count: 12 },
  { nom: 'Technologie', icone: '💻', count: 8 },
  { nom: 'Sport', icone: '⚽', count: 15 },
  { nom: 'Art', icone: '🎨', count: 6 },
  { nom: 'Gastronomie', icone: '🍽️', count: 9 },
  { nom: 'Business', icone: '💼', count: 11 },
  { nom: 'Education', icone: '📚', count: 7 },
  { nom: 'Culture', icone: '🏛️', count: 5 },
];

const stats = [
  { label: 'Événements actifs', value: '250+', icon: '🎪' },
  { label: 'Utilisateurs inscrits', value: '5 000+', icon: '👥' },
  { label: 'Réservations effectuées', value: '12 000+', icon: '🎫' },
  { label: 'Villes couvertes', value: '15+', icon: '📍' },
];

const temoignages = [
  {
    nom: 'Rakoto Jean',
    role: 'Organisateur',
    commentaire: 'Plateforme excellente pour gérer mes événements. Simple et efficace !',
    avatar: '👨'
  },
  {
    nom: 'Rasoa Marie',
    role: 'Participante',
    commentaire: 'Les recommandations sont très pertinentes. J\'ai découvert des événements incroyables !',
    avatar: '👩'
  },
  {
    nom: 'Andry Paul',
    role: 'Participant',
    commentaire: 'Interface intuitive et réservation rapide. Je recommande vivement !',
    avatar: '👨'
  },
];

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('Tous');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const handleReserver = (eventId) => {
    if (!user) {
      navigate('/register');
    } else {
      navigate(`/events/${eventId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ============ NAVBAR ============ */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🎪</span>
              <span className="text-xl font-bold text-indigo-600 hidden sm:block">
                EventPlatform
              </span>
            </Link>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/"
                className="text-gray-600 hover:text-indigo-600 
                           font-medium transition-colors text-sm">
                Accueil
              </Link>
              <Link to="/events"
                className="text-gray-600 hover:text-indigo-600 
                           font-medium transition-colors text-sm">
                Événements
              </Link>

              {/* ✅ Visible seulement si connecté */}
              {user && (
                <>
                  <Link to="/dashboard/reservations"
                    className="text-gray-600 hover:text-indigo-600 
                               font-medium transition-colors text-sm">
                    Mes Réservations
                  </Link>
                  <Link to="/dashboard/recommandations"
                    className="text-gray-600 hover:text-indigo-600 
                               font-medium transition-colors text-sm">
                    Recommandations
                  </Link>
                  {/* Admin seulement */}
                  {user.role_id === 1 && (
                    <Link to="/dashboard/admin"
                      className="text-gray-600 hover:text-indigo-600 
                                 font-medium transition-colors text-sm">
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Boutons Auth desktop */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                // ✅ Connecté
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 
                                 px-3 py-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 
                                   flex items-center justify-center 
                                   text-white text-sm font-bold">
                      {user.nom?.charAt(0).toUpperCase() || 
                       user.nom_complet?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.nom || user.nom_complet || 'Utilisateur'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg 
                               text-sm font-medium hover:bg-red-100 
                               transition-colors border border-red-200">
                    Déconnexion
                  </button>
                </div>
              ) : (
                // ❌ Non connecté
                <>
                  <Link to="/login"
                    className="text-gray-600 hover:text-indigo-600 px-4 py-2 
                               rounded-lg text-sm font-medium transition-colors">
                    Connexion
                  </Link>
                  <Link to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg 
                               text-sm font-medium hover:bg-indigo-700 
                               transition-colors">
                    S'inscrire
                  </Link>
                </>
              )}
            </div>

            {/* Menu mobile burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 
                         hover:bg-gray-100 transition-colors">
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Menu mobile ouvert */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
              <Link to="/" onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 
                           rounded-lg text-sm">
                🏠 Accueil
              </Link>
              <Link to="/events" onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 
                           rounded-lg text-sm">
                🎪 Événements
              </Link>

              {/* ✅ Mobile — visible si connecté */}
              {user ? (
                <>
                  <Link to="/dashboard/reservations"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 
                               rounded-lg text-sm">
                    🎫 Mes Réservations
                  </Link>
                  <Link to="/dashboard/recommandations"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 
                               rounded-lg text-sm">
                    🤖 Recommandations
                  </Link>
                  {user.role_id === 1 && (
                    <Link to="/dashboard/admin"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50 
                                 rounded-lg text-sm">
                      ⚙️ Administration
                    </Link>
                  )}
                  <div className="px-4 pt-2">
                    <div className="flex items-center gap-2 mb-3 
                                   bg-gray-50 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 
                                     flex items-center justify-center 
                                     text-white text-sm font-bold">
                        {user.nom?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user.nom || user.nom_complet || 'Utilisateur'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-50 text-red-600 py-2 
                                 rounded-lg text-sm font-medium 
                                 hover:bg-red-100 transition-colors">
                      Déconnexion
                    </button>
                  </div>
                </>
              ) : (
                // ❌ Mobile — non connecté
                <div className="flex gap-2 px-4 pt-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center border border-gray-300 
                               text-gray-600 py-2 rounded-lg text-sm 
                               hover:bg-gray-50">
                    Connexion
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center bg-indigo-600 text-white 
                               py-2 rounded-lg text-sm hover:bg-indigo-700">
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="bg-gradient-to-br from-indigo-900 
                          via-indigo-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                       py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="bg-indigo-700 text-indigo-200 text-xs sm:text-sm 
                           font-medium px-4 py-1.5 rounded-full mb-6 
                           inline-block">
              🎪 Plateforme de réservation d'événements
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold 
                          mb-6 leading-tight">
              Découvrez et Réservez les
              <span className="text-indigo-300"> Meilleurs Événements</span>
            </h1>
            <p className="text-indigo-200 text-base sm:text-lg mb-8 
                         leading-relaxed px-4 sm:px-0">
              Trouvez des événements qui correspondent à vos intérêts grâce à 
              notre moteur de recommandation intelligent.
            </p>

            {/* Barre de recherche */}
            <div className="bg-white rounded-2xl p-2 flex gap-2 
                           max-w-2xl mx-auto shadow-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un événement, une ville..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 
                           text-sm focus:outline-none rounded-xl min-w-0"
              />
              <button className="bg-indigo-600 text-white px-4 sm:px-6 
                               py-2 sm:py-3 rounded-xl font-semibold 
                               text-sm hover:bg-indigo-700 transition-colors 
                               whitespace-nowrap">
                🔍 Rechercher
              </button>
            </div>

            {/* Tags */}
            <div className="flex items-center justify-center gap-2 
                           mt-4 flex-wrap">
              <span className="text-indigo-300 text-sm">Populaire :</span>
              {['Musique', 'Tech', 'Sport', 'Art'].map(tag => (
                <button key={tag}
                  className="bg-indigo-700/50 text-indigo-200 text-xs 
                             px-3 py-1 rounded-full hover:bg-indigo-600 
                             transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <div key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 
                         p-4 sm:p-5 text-center hover:shadow-md 
                         transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs sm:text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Parcourir par catégorie
            </h2>
            <p className="text-gray-500 text-sm mt-1 hidden sm:block">
              Trouvez l'événement qui vous correspond
            </p>
          </div>
          <Link to="/events"
            className="text-indigo-600 text-sm font-medium hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <button key={i}
              onClick={() => setSelectedCategorie(cat.nom)}
              className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 
                         rounded-xl border-2 transition-all hover:shadow-md 
                         text-left w-full
                         ${selectedCategorie === cat.nom
                           ? 'border-indigo-500 bg-indigo-50'
                           : 'border-gray-200 bg-white hover:border-indigo-300'
                         }`}
            >
              <span className="text-xl sm:text-2xl">{cat.icone}</span>
              <div className="min-w-0">
                <div className="font-semibold text-gray-800 text-xs sm:text-sm 
                               truncate">
                  {cat.nom}
                </div>
                <div className="text-gray-400 text-xs">
                  {cat.count} événements
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ============ EVENEMENTS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Événements à la une
            </h2>
            <p className="text-gray-500 text-sm mt-1 hidden sm:block">
              Les événements les plus populaires du moment
            </p>
          </div>
          <Link to="/events"
            className="bg-indigo-600 text-white px-3 sm:px-4 py-2 
                       rounded-lg text-xs sm:text-sm font-medium 
                       hover:bg-indigo-700 transition-colors">
            Voir tous →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                       gap-4 sm:gap-5">
          {featuredEvents.map(event => (
            <div key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 
                         overflow-hidden hover:shadow-md transition-all 
                         hover:-translate-y-1 group">
              <div className={`bg-gradient-to-br ${event.color} h-36 sm:h-40 
                             flex items-center justify-center relative`}>
                <span className="text-5xl sm:text-6xl">{event.image}</span>
                <span className="absolute top-3 right-3 bg-white/20 
                               backdrop-blur text-white text-xs px-2 py-1 
                               rounded-full font-medium">
                  {event.categorie}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 
                             text-sm sm:text-base group-hover:text-indigo-600 
                             transition-colors line-clamp-2">
                  {event.titre}
                </h3>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-gray-500 
                                 text-xs sm:text-sm">
                    <span>📅</span><span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 
                                 text-xs sm:text-sm">
                    <span>📍</span><span>{event.lieu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 
                                 text-xs sm:text-sm">
                    <span>💺</span><span>{event.places} places</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-bold 
                                 text-sm sm:text-base">
                    {event.prix}
                  </span>
                  <button
                    onClick={() => handleReserver(event.id)}
                    className="bg-indigo-600 text-white px-3 sm:px-4 
                               py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm 
                               font-medium hover:bg-indigo-700 transition-colors">
                    {user ? 'Réserver' : '🔐 Réserver'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION IA ============ */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 
                          py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 
                         items-center">
            <div className="text-white text-center md:text-left">
              <span className="bg-white/20 text-white text-xs sm:text-sm 
                             px-3 py-1 rounded-full mb-4 inline-block">
                🤖 Intelligence Artificielle
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Des recommandations personnalisées pour vous
              </h2>
              <p className="text-indigo-200 mb-6 leading-relaxed 
                           text-sm sm:text-base">
                Notre moteur de recommandation analyse vos préférences pour vous 
                suggérer les événements qui vous correspondent le mieux !
              </p>
              <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                {user ? (
                  <Link to="/dashboard/recommandations"
                    className="bg-white text-indigo-600 px-5 sm:px-6 
                               py-2.5 sm:py-3 rounded-xl font-semibold 
                               hover:bg-indigo-50 transition-colors 
                               text-sm sm:text-base">
                    Voir mes recommandations 🤖
                  </Link>
                ) : (
                  <Link to="/register"
                    className="bg-white text-indigo-600 px-5 sm:px-6 
                               py-2.5 sm:py-3 rounded-xl font-semibold 
                               hover:bg-indigo-50 transition-colors 
                               text-sm sm:text-base">
                    Commencer gratuitement
                  </Link>
                )}
                <Link to="/events"
                  className="border border-white/50 text-white px-5 sm:px-6 
                             py-2.5 sm:py-3 rounded-xl font-semibold 
                             hover:bg-white/10 transition-colors 
                             text-sm sm:text-base">
                  Explorer
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🎯', title: 'Personnalisé', desc: 'Basé sur vos goûts' },
                { icon: '⚡', title: 'Instantané', desc: 'Résultats en temps réel' },
                { icon: '🔄', title: 'Adaptatif', desc: 'S\'améliore avec le temps' },
                { icon: '🔒', title: 'Sécurisé', desc: 'Données protégées' },
              ].map((item, i) => (
                <div key={i}
                  className="bg-white/10 backdrop-blur rounded-xl p-3 sm:p-4 
                             border border-white/20">
                  <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
                  <div className="text-white font-semibold text-xs sm:text-sm">
                    {item.title}
                  </div>
                  <div className="text-indigo-200 text-xs mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TEMOIGNAGES ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                         py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Plus de 5 000 utilisateurs satisfaits
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                       gap-4 sm:gap-6">
          {temoignages.map((t, i) => (
            <div key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 
                         p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 
                               rounded-full flex items-center justify-center 
                               text-xl sm:text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 
                                 text-sm sm:text-base">
                    {t.nom}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {t.role}
                  </div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm 
                           leading-relaxed italic">
                "{t.commentaire}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Prêt à découvrir des événements extraordinaires ?
          </h2>
          <p className="text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto 
                       text-sm sm:text-base">
            Rejoignez notre communauté et ne manquez plus aucun événement !
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 
                         flex-wrap">
            {user ? (
              <Link to="/dashboard/reservations"
                className="bg-indigo-600 text-white px-6 sm:px-8 
                           py-3 sm:py-4 rounded-xl font-semibold 
                           hover:bg-indigo-700 transition-colors 
                           text-sm sm:text-base">
                Mes Réservations 🎫
              </Link>
            ) : (
              <Link to="/register"
                className="bg-indigo-600 text-white px-6 sm:px-8 
                           py-3 sm:py-4 rounded-xl font-semibold 
                           hover:bg-indigo-700 transition-colors 
                           text-sm sm:text-base">
                S'inscrire gratuitement
              </Link>
            )}
            <Link to="/events"
              className="border border-gray-600 text-gray-300 px-6 sm:px-8 
                         py-3 sm:py-4 rounded-xl font-semibold 
                         hover:border-gray-400 transition-colors 
                         text-sm sm:text-base">
              Explorer les événements
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;