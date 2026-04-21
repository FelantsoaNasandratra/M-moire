import { Paiement, Reservation } from '../models/index.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/helpers.js';

// Créer un paiement
export const createPaiement = asyncHandler(async (req, res, next) => {
  const { reservation_id, methode } = req.body;

  // Vérifier que la réservation existe
  const reservation = await Reservation.findByPk(reservation_id);
  if (!reservation) {
    return next(createError('Réservation introuvable', 404));
  }

  // Créer le paiement
  const paiement = await Paiement.create({
    reservation_id,
    montant: reservation.prix_total,
    methode,
    statut: 'confirme',
    transaction_id: `TXN-${Date.now()}`
  });

  // Confirmer la réservation
  await reservation.update({ statut_id: 2 });

  return successResponse(res, paiement, 'Paiement effectué !', 201);
});

// Détail d'un paiement
export const getPaiement = asyncHandler(async (req, res, next) => {
  const paiement = await Paiement.findByPk(req.params.id, {
    include: [Reservation]
  });
  if (!paiement) {
    return next(createError('Paiement introuvable', 404));
  }
  return successResponse(res, paiement, 'Paiement récupéré');
});

// Mes paiements
export const getMyPaiements = asyncHandler(async (req, res) => {
  const paiements = await Paiement.findAll({
    include: [{
      model: Reservation,
      where: { utilisateur_id: req.user.id }
    }],
    order: [['createdAt', 'DESC']]
  });
  return successResponse(res, paiements, 'Paiements récupérés');
});