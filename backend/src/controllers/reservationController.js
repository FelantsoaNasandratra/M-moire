import Reservation from '../models/Reservation.js';
import Event from '../models/Event.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/helpers.js';

// Créer une réservation
export const createReservation = asyncHandler(async (req, res, next) => {
  const { evenement_id, quantite = 1 } = req.body;

  const event = await Event.findByPk(evenement_id);
  if (!event) return next(createError('Événement introuvable', 404));

  if (event.places_disponibles < quantite) {
    return next(createError('Places insuffisantes', 400));
  }

  const prix_total = event.prix * quantite;
  const reservation = await Reservation.create({
    utilisateur_id: req.user.id,
    evenement_id,
    quantite,
    prix_total
  });

  // Réduire les places disponibles
  await event.update({
    places_disponibles: event.places_disponibles - quantite
  });

  return successResponse(res, reservation, 'Réservation créée !', 201);
});

// Mes réservations
export const getMyReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.findAll({
    where: { utilisateur_id: req.user.id },
    order: [['createdAt', 'DESC']]
  });
  return successResponse(res, reservations, 'Réservations récupérées');
});

// Annuler une réservation
export const cancelReservation = asyncHandler(async (req, res, next) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return next(createError('Réservation introuvable', 404));
  await reservation.update({ statut_id: 3 });
  return successResponse(res, reservation, 'Réservation annulée');
});