import axios from 'axios';
import Interaction from '../models/Interaction.js';
import Event from '../models/Event.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/helpers.js';

// Obtenir les recommandations personnalisées
export const getRecommendations = asyncHandler(async (req, res, next) => {
  try {
    // Appel au moteur Flask
    const response = await axios.get(
      `${process.env.FLASK_URL}/recommend/${req.user.id}`
    );
    return successResponse(res, response.data, 'Recommandations récupérées');

  } catch (error) {
    // Si Flask ne répond pas → recommandations par défaut
    const events = await Event.findAll({
      where: { statut_id: 1 },
      limit: 10,
      order: [['date_debut', 'ASC']]
    });
    return successResponse(res, events, 'Recommandations par défaut');
  }
});

// Événements similaires
export const getSimilarEvents = asyncHandler(async (req, res, next) => {
  try {
    const response = await axios.get(
      `${process.env.FLASK_URL}/similar/${req.params.id}`
    );
    return successResponse(res, response.data, 'Événements similaires récupérés');

  } catch (error) {
    return next(createError('Moteur de recommandation indisponible', 503));
  }
});

// Enregistrer une interaction utilisateur
export const trackInteraction = asyncHandler(async (req, res, next) => {
  const { evenement_id, type_interaction_id } = req.body;

  if (!evenement_id || !type_interaction_id) {
    return next(createError('Données manquantes', 400));
  }

  // Vérifier que l'événement existe
  const event = await Event.findByPk(evenement_id);
  if (!event) return next(createError('Événement introuvable', 404));

  // Enregistrer l'interaction
  const interaction = await Interaction.create({
    utilisateur_id: req.user.id,
    evenement_id,
    type_interaction_id
  });

  // Notifier Flask pour mise à jour du modèle
  try {
    await axios.post(`${process.env.FLASK_URL}/interactions`, {
      utilisateur_id: req.user.id,
      evenement_id,
      type_interaction_id
    });
  } catch (error) {
    console.log('⚠️ Flask non disponible — interaction sauvegardée localement');
  }

  return successResponse(res, interaction, 'Interaction enregistrée', 201);
});

// Historique des interactions d'un utilisateur
export const getMyInteractions = asyncHandler(async (req, res) => {
  const interactions = await Interaction.findAll({
    where: { utilisateur_id: req.user.id },
    order: [['createdAt', 'DESC']]
  });
  return successResponse(res, interactions, 'Interactions récupérées');
});