import { useState } from 'react';
import Navbar from '../../components/common/Navbar.jsx';

// Données fictives pour le template
const categories = [
  { id: 1, nom: 'Musique', icone: '🎵', count: 12 },
  { id: 2, nom: 'Sport', icone: '⚽', count: 8 },
  { id: 3, nom: 'Technologie', icone: '💻', count: 15 },
  { id: 4, nom: 'Art', icone: '🎨', count: 6 },
  { id: 5, nom: 'Gastronomie', icone: '🍽️', count: 9 },
];

const typesEvenement = [
  { id: 1, nom: 'Concert', icone: '🎤' },
  { id: 2, nom: 'Conférence', icone: '🎙️' },
  { id: 3, nom: 'Atelier', icone: '🛠️' },
  { id: 4, nom: 'Exposition', icone: '🖼️' },
  { id: 5, nom: 'Festival', icone: '🎉' },
];

const eventDetails = {
  titre: 'Festival de Musique 2024',
  date: '15 Décembre 2024',
  lieu: 'Antananarivo, Madagascar',
  prix: '25 000 Ar',
  places: 150,
  description: 'Un festival incroyable réunissant les meilleurs artistes malgaches et internationaux pour une nuit inoubliable.',
  organisateur: 'EventPro Madagascar',
  image: '🎪',
  tags: ['Musique', 'Festival', 'Live'],
};

const reservations = [
  { id: 1, event: 'Festival de Musique', date: '15 Déc 2024', statut: 'confirmé', places: 2, prix: '50 000 Ar' },
  { id: 2, event: 'Conférence Tech', date: '20 Déc 2024', statut: 'en_attente', places: 1, prix: '15 000 Ar' },
  { id: 3, event: 'Atelier Cuisine', date: '25 Déc 2024', statut: 'annulé', places: 3, prix: '45 000 Ar' },
];

const statutColors = {
  confirmé: 'bg-green-100 text-green-700',
  en_attente: 'bg-yellow-100 text-yellow-700',
  annulé: 'bg-red-100 text-red-700',
};

const ReservationDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              🎫 Dashboard Réservations
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Gérez vos réservations d'événements
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-primary-50 text-primary-600 px-3 py-1 
                           rounded-full text-sm font-medium">
              3 réservations actives
            </span>
            <button className="bg-indigo-600 text-white px-4 py-2 
                             rounded-lg text-sm font-medium 
                             hover:bg-indigo-700 transition-colors">
              + Nouvelle réservation
            </button>
          </div>
        </div>
      </div>

      {/* Layout 3 colonnes */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">

          {/* ============ COLONNE GAUCHE ============ */}
          <div className="col-span-3 space-y-4">

            {/* Types d'événements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-indigo-600 px-4 py-3">
                <h2 className="text-white font-semibold text-sm">
                  🏷️ Types d'événements
                </h2>
              </div>
              <div className="p-3 space-y-1">
                {typesEvenement.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(
                      selectedType === type.id ? null : type.id
                    )}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 
                               rounded-lg text-sm font-medium transition-all
                               ${selectedType === type.id
                                 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                 : 'text-gray-600 hover:bg-gray-50'
                               }`}
                  >
                    <span className="text-lg">{type.icone}</span>
                    <span>{type.nom}</span>
                    {selectedType === type.id && (
                      <span className="ml-auto text-indigo-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Catégories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-purple-600 px-4 py-3">
                <h2 className="text-white font-semibold text-sm">
                  📂 Catégories
                </h2>
              </div>
              <div className="p-3 space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(
                      selectedCategory === cat.id ? null : cat.id
                    )}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 
                               rounded-lg text-sm transition-all
                               ${selectedCategory === cat.id
                                 ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                 : 'text-gray-600 hover:bg-gray-50'
                               }`}
                  >
                    <span className="text-lg">{cat.icone}</span>
                    <span className="flex-1 text-left">{cat.nom}</span>
                    <span className="bg-gray-100 text-gray-500 text-xs 
                                   px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ============ COLONNE CENTRE ============ */}
          <div className="col-span-6 space-y-4">

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                {['details', 'reservations'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-medium transition-colors
                               ${activeTab === tab
                                 ? 'text-indigo-600 border-b-2 border-indigo-600'
                                 : 'text-gray-500 hover:text-gray-700'
                               }`}
                  >
                    {tab === 'details' ? '📋 Détails événement' : '🎫 Mes réservations'}
                  </button>
                ))}
              </div>

              {/* Tab Details */}
              {activeTab === 'details' && (
                <div className="p-5">
                  {/* Image/Banner */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 
                                 rounded-xl h-40 flex items-center justify-center mb-4">
                    <span className="text-6xl">{eventDetails.image}</span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {eventDetails.titre}
                  </h3>

                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    {eventDetails.tags.map(tag => (
                      <span key={tag}
                        className="bg-indigo-50 text-indigo-600 text-xs 
                                   px-2 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Infos grille */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { icon: '📅', label: 'Date', value: eventDetails.date },
                      { icon: '📍', label: 'Lieu', value: eventDetails.lieu },
                      { icon: '💰', label: 'Prix', value: eventDetails.prix },
                      { icon: '💺', label: 'Places', value: `${eventDetails.places} disponibles` },
                    ].map((item, i) => (
                      <div key={i}
                        className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-xs text-gray-400">{item.label}</p>
                          <p className="text-sm font-medium text-gray-700">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {eventDetails.description}
                  </p>

                  {/* Bouton réserver */}
                  <button className="w-full bg-indigo-600 text-white py-3 
                                   rounded-xl font-semibold hover:bg-indigo-700 
                                   transition-colors">
                    🎫 Réserver maintenant
                  </button>
                </div>
              )}

              {/* Tab Réservations */}
              {activeTab === 'reservations' && (
                <div className="p-5 space-y-3">
                  {reservations.map(res => (
                    <div key={res.id}
                      className="border border-gray-200 rounded-xl p-4 
                                 hover:border-indigo-300 transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {res.event}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            📅 {res.date} • 💺 {res.places} place(s)
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full 
                                         font-medium ${statutColors[res.statut]}`}>
                            {res.statut}
                          </span>
                          <span className="text-sm font-bold text-gray-700">
                            {res.prix}
                          </span>
                        </div>
                      </div>
                      {res.statut !== 'annulé' && (
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 text-xs bg-gray-50 
                                           text-gray-600 py-2 rounded-lg 
                                           hover:bg-gray-100 transition-colors">
                            Voir détails
                          </button>
                          <button className="flex-1 text-xs bg-red-50 
                                           text-red-600 py-2 rounded-lg 
                                           hover:bg-red-100 transition-colors">
                            Annuler
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ============ COLONNE DROITE ============ */}
          <div className="col-span-3 space-y-4">

            {/* Statistiques */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-emerald-600 px-4 py-3">
                <h2 className="text-white font-semibold text-sm">
                  📊 Mes statistiques
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: 'Total réservations', value: '12', icon: '🎫', color: 'text-indigo-600' },
                  { label: 'Événements à venir', value: '3', icon: '📅', color: 'text-green-600' },
                  { label: 'Événements passés', value: '9', icon: '✅', color: 'text-gray-600' },
                  { label: 'Total dépensé', value: '180 000 Ar', icon: '💰', color: 'text-purple-600' },
                ].map((stat, i) => (
                  <div key={i}
                    className="flex items-center justify-between 
                               bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-xs text-gray-500">{stat.label}</span>
                    </div>
                    <span className={`font-bold text-sm ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prochain événement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-orange-500 px-4 py-3">
                <h2 className="text-white font-semibold text-sm">
                  ⏰ Prochain événement
                </h2>
              </div>
              <div className="p-4">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 
                               rounded-xl p-4 border border-orange-100">
                  <p className="font-semibold text-gray-800 text-sm">
                    Festival de Musique 2024
                  </p>
                  <p className="text-orange-600 text-xs mt-1 font-medium">
                    Dans 5 jours
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">📍 Antananarivo</span>
                  </div>
                  <button className="w-full mt-3 bg-orange-500 text-white 
                                   text-xs py-2 rounded-lg hover:bg-orange-600 
                                   transition-colors font-medium">
                    Voir le billet
                  </button>
                </div>
              </div>
            </div>

            {/* Informations utiles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 px-4 py-3">
                <h2 className="text-white font-semibold text-sm">
                  💡 Informations utiles
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { icon: '🔔', text: 'Rappel 24h avant chaque événement' },
                  { icon: '↩️', text: 'Annulation gratuite jusqu\'à 48h avant' },
                  { icon: '📱', text: 'Billet disponible sur mobile' },
                  { icon: '🎁', text: '10% de réduction sur votre 5ème réservation' },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg shrink-0">{info.icon}</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {info.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ReservationDashboard;