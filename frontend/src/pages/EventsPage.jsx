import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

// ============================================
// DONNÉES ÉVÉNEMENTS PUBLICS
// ============================================
const evenementsPublics = [
  {
    id_event: 1,
    titre: 'Festival de Musique 2024',
    description: 'Un festival incroyable réunissant les meilleurs artistes malgaches.',
    lieu: 'Antananarivo',
    date_debut: '2024-12-15',
    prix: 25000,
    capacite_max: 150,
    places_restantes: 45,
    image: '🎵',
    color: 'from-purple-500 to-indigo-600',
    categorie: 'Culturel',
    type: 'Concert',
    organisateur: 'EventPro Madagascar'
  },
  {
    id_event: 2,
    titre: 'Conférence Tech Madagascar',
    description: 'Les dernières innovations technologiques par des experts.',
    lieu: 'Antananarivo',
    date_debut: '2024-12-20',
    prix: 15000,
    capacite_max: 200,
    places_restantes: 120,
    image: '💻',
    color: 'from-blue-500 to-cyan-600',
    categorie: 'Professionnel',
    type: 'Conférence',
    organisateur: 'TechHub Madagascar'
  },
  {
    id_event: 3,
    titre: 'Marathon Tananarive 2024',
    description: 'Course annuelle à travers les rues d\'Antananarivo.',
    lieu: 'Antananarivo',
    date_debut: '2024-12-30',
    prix: 5000,
    capacite_max: 500,
    places_restantes: 250,
    image: '🏃',
    color: 'from-green-500 to-emerald-600',
    categorie: 'Sportif',
    type: 'Sport',
    organisateur: 'Sport Club Mada'
  },
  {
    id_event: 4,
    titre: 'Exposition Art Contemporain',
    description: 'Découvrez les œuvres des artistes contemporains malgaches.',
    lieu: 'Toamasina',
    date_debut: '2024-12-25',
    prix: 10000,
    capacite_max: 80,
    places_restantes: 10,
    image: '🎨',
    color: 'from-orange-500 to-red-600',
    categorie: 'Culturel',
    type: 'Exposition',
    organisateur: 'Galerie Art Mada'
  },
  {
    id_event: 5,
    titre: 'Séminaire Business 2025',
    description: 'Développez vos compétences entrepreneuriales.',
    lieu: 'Antananarivo',
    date_debut: '2025-01-10',
    prix: 50000,
    capacite_max: 100,
    places_restantes: 60,
    image: '💼',
    color: 'from-slate-500 to-gray-600',
    categorie: 'Professionnel',
    type: 'Séminaire',
    organisateur: 'Business Club Mada'
  },
  {
    id_event: 6,
    titre: 'Forum Education 2025',
    description: 'Échanges sur l\'avenir de l\'éducation à Madagascar.',
    lieu: 'Antananarivo',
    date_debut: '2025-01-20',
    prix: 0,
    capacite_max: 300,
    places_restantes: 180,
    image: '📚',
    color: 'from-teal-500 to-cyan-600',
    categorie: 'Educatif',
    type: 'Forum',
    organisateur: 'Ministère Education'
  },
];

// ============================================
// DONNÉES OFFRES ORGANISATEURS
// ============================================
const offresOrganisateurs = [
  // RELIGIEUX
  {
    id: 1,
    titre: 'Package Mariage Complet',
    description: 'Organisation complète de votre mariage : décoration, traiteur, animation, photos et vidéos.',
    categorie: 'Religieux',
    type: 'Mariage',
    image: '💍',
    color: 'from-pink-500 to-rose-600',
    prix_min: 2000000,
    prix_max: 10000000,
    organisateur: 'Wedding Dreams Madagascar',
    note: 4.9,
    avis: 45,
    services: ['Décoration', 'Traiteur', 'Animation', 'Photos/Vidéos'],
    disponible: true
  },
  {
    id: 2,
    titre: 'Cérémonie de Baptême',
    description: 'Organisation de votre cérémonie de baptême avec décoration, traiteur et animation.',
    categorie: 'Religieux',
    type: 'Baptême',
    image: '🍼',
    color: 'from-sky-400 to-blue-500',
    prix_min: 500000,
    prix_max: 2000000,
    organisateur: 'Fête & Joie Madagascar',
    note: 4.7,
    avis: 32,
    services: ['Décoration', 'Traiteur', 'Animation enfants'],
    disponible: true
  },
  {
    id: 3,
    titre: 'Cérémonie de Communion',
    description: 'Organisation de votre première communion avec décoration religieuse et réception.',
    categorie: 'Religieux',
    type: 'Communion',
    image: '✝️',
    color: 'from-amber-400 to-yellow-500',
    prix_min: 400000,
    prix_max: 1500000,
    organisateur: 'Célébration Sacrée',
    note: 4.6,
    avis: 28,
    services: ['Décoration église', 'Réception', 'Photos'],
    disponible: true
  },
  {
    id: 4,
    titre: 'Messe de Funérailles',
    description: 'Organisation digne et respectueuse des funérailles avec tous les services nécessaires.',
    categorie: 'Religieux',
    type: 'Funérailles',
    image: '⚰️',
    color: 'from-gray-600 to-slate-700',
    prix_min: 300000,
    prix_max: 2000000,
    organisateur: 'Dignity Services',
    note: 4.8,
    avis: 15,
    services: ['Cérémonie', 'Fleurs', 'Transport', 'Réception'],
    disponible: true
  },
  // FAMILIAL
  {
    id: 5,
    titre: 'Anniversaire Enfant',
    description: 'Organisation d\'anniversaire magique pour vos enfants avec animations, gâteau et décoration.',
    categorie: 'Familial',
    type: 'Anniversaire',
    image: '🎂',
    color: 'from-yellow-400 to-orange-500',
    prix_min: 200000,
    prix_max: 800000,
    organisateur: 'Kids Party Mada',
    note: 4.8,
    avis: 67,
    services: ['Décoration', 'Gâteau', 'Animation', 'Jeux'],
    disponible: true
  },
  {
    id: 6,
    titre: 'Baby Shower',
    description: 'Célébrez l\'arrivée de votre bébé avec une fête inoubliable.',
    categorie: 'Familial',
    type: 'Baby Shower',
    image: '🍼',
    color: 'from-purple-400 to-pink-500',
    prix_min: 300000,
    prix_max: 1000000,
    organisateur: 'Sweet Baby Events',
    note: 4.7,
    avis: 23,
    services: ['Décoration', 'Buffet', 'Jeux', 'Photos'],
    disponible: true
  },
  {
    id: 7,
    titre: 'Fête Familiale',
    description: 'Organisation de vos réunions et fêtes familiales de toutes tailles.',
    categorie: 'Familial',
    type: 'Fête Privée',
    image: '🎉',
    color: 'from-green-400 to-teal-500',
    prix_min: 500000,
    prix_max: 3000000,
    organisateur: 'Family Events Pro',
    note: 4.5,
    avis: 41,
    services: ['Lieu', 'Traiteur', 'Décoration', 'Animation'],
    disponible: true
  },
  // PROFESSIONNEL
  {
    id: 8,
    titre: 'Soirée d\'Entreprise',
    description: 'Organisation de vos événements d\'entreprise, team building et soirées corporates.',
    categorie: 'Professionnel',
    type: 'Corporate',
    image: '🏢',
    color: 'from-blue-600 to-indigo-700',
    prix_min: 1000000,
    prix_max: 15000000,
    organisateur: 'Corporate Events Mada',
    note: 4.9,
    avis: 38,
    services: ['Lieu', 'Traiteur', 'Animation', 'Son/Lumière'],
    disponible: true
  },
  {
    id: 9,
    titre: 'Conférence & Séminaire',
    description: 'Organisation complète de vos conférences et séminaires professionnels.',
    categorie: 'Professionnel',
    type: 'Conférence',
    image: '🎙️',
    color: 'from-slate-500 to-gray-700',
    prix_min: 500000,
    prix_max: 5000000,
    organisateur: 'Pro Events Madagascar',
    note: 4.7,
    avis: 29,
    services: ['Salle', 'Équipement', 'Traiteur', 'Accueil'],
    disponible: true
  },
  // CULTUREL
  {
    id: 10,
    titre: 'Concert & Spectacle',
    description: 'Organisation de concerts, spectacles et événements culturels.',
    categorie: 'Culturel',
    type: 'Concert',
    image: '🎤',
    color: 'from-purple-600 to-indigo-700',
    prix_min: 1000000,
    prix_max: 20000000,
    organisateur: 'Show Business Mada',
    note: 4.8,
    avis: 52,
    services: ['Scène', 'Son/Lumière', 'Sécurité', 'Billetterie'],
    disponible: true
  },
  {
    id: 11,
    titre: 'Festival Culturel',
    description: 'Organisation de festivals et événements culturels traditionnels.',
    categorie: 'Culturel',
    type: 'Festival',
    image: '🎭',
    color: 'from-orange-500 to-red-600',
    prix_min: 2000000,
    prix_max: 50000000,
    organisateur: 'Culture & Heritage Mada',
    note: 4.6,
    avis: 18,
    services: ['Lieu', 'Scène', 'Animation', 'Sécurité'],
    disponible: true
  },
  // SPORTIF
  {
    id: 12,
    titre: 'Tournoi Sportif',
    description: 'Organisation de tournois et compétitions sportives.',
    categorie: 'Sportif',
    type: 'Tournoi',
    image: '🏆',
    color: 'from-green-500 to-emerald-600',
    prix_min: 500000,
    prix_max: 5000000,
    organisateur: 'Sport Events Mada',
    note: 4.7,
    avis: 34,
    services: ['Terrain', 'Arbitres', 'Trophées', 'Médias'],
    disponible: true
  },
];

const categoriesPubliques = ['Tous', 'Culturel', 'Professionnel', 
                             'Sportif', 'Educatif', 'Religieux'];

const categoriesPrivees = ['Tous', 'Religieux', 'Familial', 
                           'Professionnel', 'Culturel', 'Sportif'];

const villes = ['Toutes', 'Antananarivo', 'Toamasina', 
                'Fianarantsoa', 'Mahajanga'];

const EventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('publics');
  const [selectedCategorie, setSelectedCategorie] = useState('Tous');
  const [selectedVille, setSelectedVille] = useState('Toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('Tous');

  // Filtrage événements publics
  const filteredPublics = evenementsPublics.filter(event => {
    const matchCat = selectedCategorie === 'Tous' || 
                     event.categorie === selectedCategorie;
    const matchVille = selectedVille === 'Toutes' || 
                       event.lieu === selectedVille;
    const matchSearch = event.titre.toLowerCase()
                       .includes(searchQuery.toLowerCase());
    return matchCat && matchVille && matchSearch;
  });

  // Filtrage offres organisateurs
  const filteredOffres = offresOrganisateurs.filter(offre => {
    const matchCat = selectedCategorie === 'Tous' || 
                     offre.categorie === selectedCategorie;
    const matchSearch = offre.titre.toLowerCase()
                       .includes(searchQuery.toLowerCase()) ||
                       offre.type.toLowerCase()
                       .includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleReserver = (id) => {
    if (!user) navigate('/register');
    else navigate(`/events/${id}`);
  };

  const getPlacesBadge = (places) => {
    if (places === 0) 
      return { text: 'Complet', color: 'bg-red-100 text-red-600' };
    if (places <= 10) 
      return { text: `${places} places`, color: 'bg-orange-100 text-orange-600' };
    return { text: `${places} places`, color: 'bg-green-100 text-green-600' };
  };

  // Reset filtres quand on change d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategorie('Tous');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ============ HEADER ============ */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 
                      text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              🎪 Événements & Offres
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base mb-6">
              Trouvez l'événement parfait ou organisez votre fête privée
            </p>

            {/* Barre de recherche */}
            <div className="bg-white rounded-xl p-2 flex gap-2 
                           max-w-2xl mx-auto shadow-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'publics' 
                  ? "Rechercher un événement..." 
                  : "Rechercher mariage, baptême..."}
                className="flex-1 px-3 sm:px-4 py-2 text-gray-700 
                           text-sm focus:outline-none rounded-lg min-w-0"
              />
              <button className="bg-indigo-600 text-white px-4 sm:px-5 
                               py-2 rounded-lg font-medium text-sm 
                               hover:bg-indigo-700 transition-colors 
                               whitespace-nowrap">
                🔍 Rechercher
              </button>
            </div>

            {/* 2 ONGLETS */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => handleTabChange('publics')}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm 
                           transition-all
                           ${activeTab === 'publics'
                             ? 'bg-white text-indigo-700 shadow-lg'
                             : 'bg-indigo-700/50 text-indigo-200 hover:bg-indigo-700'
                           }`}
              >
                🎪 Événements Publics
              </button>
              <button
                onClick={() => handleTabChange('offres')}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm 
                           transition-all
                           ${activeTab === 'offres'
                             ? 'bg-white text-indigo-700 shadow-lg'
                             : 'bg-indigo-700/50 text-indigo-200 hover:bg-indigo-700'
                           }`}
              >
                🎊 Offres Organisateurs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ============ SIDEBAR FILTRES ============ */}
          <div className="lg:w-64 shrink-0 space-y-4">

            {/* Catégories */}
            <div className="bg-white rounded-xl border border-gray-200 
                           shadow-sm overflow-hidden">
              <div className="bg-indigo-600 px-4 py-3">
                <h3 className="text-white font-semibold text-sm">
                  📂 Catégories
                </h3>
              </div>
              <div className="p-3 space-y-1">
                {(activeTab === 'publics' 
                  ? categoriesPubliques 
                  : categoriesPrivees).map(cat => (
                  <button key={cat}
                    onClick={() => setSelectedCategorie(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg 
                               text-sm transition-all
                               ${selectedCategorie === cat
                                 ? 'bg-indigo-50 text-indigo-700 font-medium'
                                 : 'text-gray-600 hover:bg-gray-50'
                               }`}
                  >
                    {selectedCategorie === cat ? '✓ ' : ''}{cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Villes — seulement pour événements publics */}
            {activeTab === 'publics' && (
              <div className="bg-white rounded-xl border border-gray-200 
                             shadow-sm overflow-hidden">
                <div className="bg-purple-600 px-4 py-3">
                  <h3 className="text-white font-semibold text-sm">
                    📍 Villes
                  </h3>
                </div>
                <div className="p-3 space-y-1">
                  {villes.map(ville => (
                    <button key={ville}
                      onClick={() => setSelectedVille(ville)}
                      className={`w-full text-left px-3 py-2 rounded-lg 
                                 text-sm transition-all
                                 ${selectedVille === ville
                                   ? 'bg-purple-50 text-purple-700 font-medium'
                                   : 'text-gray-600 hover:bg-gray-50'
                                 }`}
                    >
                      {selectedVille === ville ? '✓ ' : ''}{ville}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reset */}
            <button
              onClick={() => {
                setSelectedCategorie('Tous');
                setSelectedVille('Toutes');
                setPriceRange('Tous');
                setSearchQuery('');
              }}
              className="w-full bg-gray-100 text-gray-600 py-2 rounded-xl 
                         text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              🔄 Réinitialiser
            </button>

            {/* Message inscription */}
            {!user && (
              <div className="bg-indigo-50 border border-indigo-200 
                             rounded-xl p-4">
                <p className="text-indigo-700 text-xs font-bold mb-2">
                  🔐 Pour réserver ou contacter
                </p>
                <p className="text-indigo-600 text-xs mb-3">
                  Créez un compte gratuit pour accéder à toutes les fonctionnalités
                </p>
                <Link to="/register"
                  className="block w-full text-center bg-indigo-600 
                             text-white py-2 rounded-lg text-xs 
                             font-medium hover:bg-indigo-700 transition-colors">
                  S'inscrire gratuitement
                </Link>
                <Link to="/login"
                  className="block w-full text-center text-indigo-600 
                             py-2 text-xs font-medium hover:underline mt-1">
                  Déjà un compte ? Connexion
                </Link>
              </div>
            )}

          </div>

          {/* ============ CONTENU PRINCIPAL ============ */}
          <div className="flex-1">

            {/* ===== ONGLET 1 — ÉVÉNEMENTS PUBLICS ===== */}
            {activeTab === 'publics' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-indigo-600">
                      {filteredPublics.length}
                    </span> événement(s) trouvé(s)
                  </p>
                </div>

                {filteredPublics.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-xl 
                                 border border-gray-200">
                    <div className="text-5xl mb-4">😕</div>
                    <h3 className="text-gray-700 font-semibold mb-2">
                      Aucun événement trouvé
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Essayez de modifier vos filtres
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 
                                 xl:grid-cols-3 gap-4">
                    {filteredPublics.map(event => {
                      const badge = getPlacesBadge(event.places_restantes);
                      return (
                        <div key={event.id_event}
                          className="bg-white rounded-xl shadow-sm border 
                                     border-gray-200 overflow-hidden 
                                     hover:shadow-md transition-all 
                                     hover:-translate-y-1 group">
                          <div className={`bg-gradient-to-br ${event.color} 
                                         h-36 flex items-center justify-center 
                                         relative`}>
                            <span className="text-5xl">{event.image}</span>
                            <div className="absolute top-3 left-3">
                              <span className="bg-white/20 backdrop-blur 
                                             text-white text-xs px-2 py-1 
                                             rounded-full">
                                {event.categorie}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className={`text-xs px-2 py-1 rounded-full 
                                             font-medium ${badge.color}`}>
                                {badge.text}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-gray-100 text-gray-600 
                                             text-xs px-2 py-0.5 rounded-full">
                                {event.type}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm 
                                         mb-1 group-hover:text-indigo-600 
                                         transition-colors line-clamp-2">
                              {event.titre}
                            </h3>
                            <p className="text-gray-500 text-xs mb-3 
                                         line-clamp-2">
                              {event.description}
                            </p>
                            <div className="space-y-1 mb-3">
                              <div className="flex items-center gap-2 
                                             text-gray-500 text-xs">
                                <span>📅</span>
                                <span>{new Date(event.date_debut)
                                  .toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 
                                             text-gray-500 text-xs">
                                <span>📍</span>
                                <span>{event.lieu}</span>
                              </div>
                              <div className="flex items-center gap-2 
                                             text-gray-500 text-xs">
                                <span>👤</span>
                                <span>{event.organisateur}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between 
                                           pt-3 border-t border-gray-100">
                              <span className="text-indigo-600 font-bold text-sm">
                                {event.prix === 0 ? 'Gratuit' : 
                                 `${event.prix.toLocaleString()} Ar`}
                              </span>
                              <div className="flex gap-2">
                                <Link
                                  to={user 
                                    ? `/events/${event.id_event}` 
                                    : '/register'}
                                  className="text-xs text-indigo-600 border 
                                             border-indigo-200 px-3 py-1.5 
                                             rounded-lg hover:bg-indigo-50 
                                             transition-colors"
                                >
                                  Détails
                                </Link>
                                <button
                                  onClick={() => handleReserver(event.id_event)}
                                  disabled={event.places_restantes === 0}
                                  className="text-xs bg-indigo-600 text-white 
                                             px-3 py-1.5 rounded-lg 
                                             hover:bg-indigo-700 transition-colors
                                             disabled:opacity-50 
                                             disabled:cursor-not-allowed"
                                >
                                  {event.places_restantes === 0
                                    ? 'Complet'
                                    : user ? 'Réserver' : '🔐 Réserver'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ===== ONGLET 2 — OFFRES ORGANISATEURS ===== */}
            {activeTab === 'offres' && (
              <div>
                {/* Info banner */}
                <div className="bg-amber-50 border border-amber-200 
                               rounded-xl p-4 mb-4 flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-amber-800 font-semibold text-sm">
                      Comment ça marche ?
                    </p>
                    <p className="text-amber-700 text-xs mt-1">
                      Parcourez les offres des organisateurs, choisissez votre 
                      package et demandez un devis personnalisé. 
                      L'organisateur vous contactera sous 24h !
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-indigo-600">
                      {filteredOffres.length}
                    </span> offre(s) disponible(s)
                  </p>
                </div>

                {filteredOffres.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-xl 
                                 border border-gray-200">
                    <div className="text-5xl mb-4">😕</div>
                    <h3 className="text-gray-700 font-semibold mb-2">
                      Aucune offre trouvée
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Essayez de modifier vos filtres
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredOffres.map(offre => (
                      <div key={offre.id}
                        className="bg-white rounded-xl shadow-sm border 
                                   border-gray-200 overflow-hidden 
                                   hover:shadow-md transition-all group">

                        {/* Header coloré */}
                        <div className={`bg-gradient-to-br ${offre.color} 
                                       h-28 flex items-center justify-center 
                                       relative`}>
                          <span className="text-5xl">{offre.image}</span>
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/20 backdrop-blur 
                                           text-white text-xs px-2 py-1 
                                           rounded-full font-medium">
                              {offre.categorie}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-white/20 backdrop-blur 
                                           text-white text-xs px-2 py-1 
                                           rounded-full">
                              {offre.type}
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 mb-1 
                                       group-hover:text-indigo-600 
                                       transition-colors text-sm sm:text-base">
                            {offre.titre}
                          </h3>

                          <p className="text-gray-500 text-xs mb-3 
                                       line-clamp-2">
                            {offre.description}
                          </p>

                          {/* Services inclus */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {offre.services.map((service, i) => (
                              <span key={i}
                                className="bg-indigo-50 text-indigo-600 
                                           text-xs px-2 py-0.5 rounded-full">
                                ✓ {service}
                              </span>
                            ))}
                          </div>

                          {/* Note */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}
                                  className={`text-xs ${
                                    i < Math.floor(offre.note)
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}>
                                  ⭐
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              {offre.note} ({offre.avis} avis)
                            </span>
                          </div>

                          {/* Organisateur */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-gray-500">👤</span>
                            <span className="text-xs text-gray-600 font-medium">
                              {offre.organisateur}
                            </span>
                          </div>

                          {/* Prix + Bouton */}
                          <div className="flex items-center justify-between 
                                         pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-400">
                                À partir de
                              </p>
                              <p className="text-indigo-600 font-bold text-sm">
                                {offre.prix_min.toLocaleString()} Ar
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                if (!user) navigate('/register');
                              }}
                              className="bg-indigo-600 text-white px-4 py-2 
                                         rounded-lg text-xs font-medium 
                                         hover:bg-indigo-700 transition-colors"
                            >
                              {user ? '📩 Demander devis' : '🔐 Demander devis'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;