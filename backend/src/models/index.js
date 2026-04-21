import sequelize from '../config/database.js';

// ============================================
// IMPORT TOUS LES MODELS
// ============================================
import User from './User.js';
import Role from './Role.js';
import Event from './Event.js';
import Categorie from './Categorie.js';
import TypeEvenement from './TypeEvenement.js';
import StatutEvenement from './StatutEvenement.js';
import Reservation from './Reservation.js';
import StatutReservation from './StatutReservation.js';
import Paiement from './Paiement.js';
import Avis from './Avis.js';
import Interaction from './Interaction.js';
import TypeInteraction from './TypeInteraction.js';
import Preference from './Preference.js';
import Recommandation from './Recommandation.js'; 

// ============================================
// ASSOCIATIONS
// ============================================

// User → Role
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

// Event → Categorie, TypeEvenement, StatutEvenement, User
Event.belongsTo(Categorie, { foreignKey: 'categorie_id' });
Event.belongsTo(TypeEvenement, { foreignKey: 'type_evenement_id' });
Event.belongsTo(StatutEvenement, { foreignKey: 'statut_id' });
Event.belongsTo(User, { foreignKey: 'organisateur_id', as: 'organisateur' });
Categorie.hasMany(Event, { foreignKey: 'categorie_id' });

// Reservation → User, Event, StatutReservation
Reservation.belongsTo(User, { foreignKey: 'utilisateur_id' });
Reservation.belongsTo(Event, { foreignKey: 'evenement_id' });
Reservation.belongsTo(StatutReservation, { foreignKey: 'statut_id' });
User.hasMany(Reservation, { foreignKey: 'utilisateur_id' });
Event.hasMany(Reservation, { foreignKey: 'evenement_id' });

// Paiement → Reservation
Paiement.belongsTo(Reservation, { foreignKey: 'reservation_id' });
Reservation.hasOne(Paiement, { foreignKey: 'reservation_id' });

// Avis → User, Event
Avis.belongsTo(User, { foreignKey: 'utilisateur_id' });
Avis.belongsTo(Event, { foreignKey: 'evenement_id' });
User.hasMany(Avis, { foreignKey: 'utilisateur_id' });
Event.hasMany(Avis, { foreignKey: 'evenement_id' });

// Interaction → User, Event, TypeInteraction
Interaction.belongsTo(User, { foreignKey: 'utilisateur_id' });
Interaction.belongsTo(Event, { foreignKey: 'evenement_id' });
Interaction.belongsTo(TypeInteraction, { foreignKey: 'type_interaction_id' });
User.hasMany(Interaction, { foreignKey: 'utilisateur_id' });
Event.hasMany(Interaction, { foreignKey: 'evenement_id' });

// Preference → User, Categorie
Preference.belongsTo(User, { foreignKey: 'utilisateur_id' });
Preference.belongsTo(Categorie, { foreignKey: 'categorie_id' });
User.hasMany(Preference, { foreignKey: 'utilisateur_id' });

// Recommandation → User, Event
Recommandation.belongsTo(User, { foreignKey: 'utilisateur_id' });
Recommandation.belongsTo(Event, { foreignKey: 'evenement_id' });
User.hasMany(Recommandation, { foreignKey: 'utilisateur_id' });

// ============================================
// EXPORT TOUS LES MODELS
// ============================================
export {
  sequelize,
  User,
  Role,
  Event,
  Categorie,
  TypeEvenement,
  StatutEvenement,
  Reservation,
  StatutReservation,
  Paiement,
  Avis,
  Interaction,
  TypeInteraction,
  Preference,
  Recommandation
};