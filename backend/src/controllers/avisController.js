import { Avis, Event, User } from '../models/index.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/helpers.js';

// Avis d'un événement
export const getAvisByEvent = asyncHandler(async (req, res) => {
  const avis = await Avis.findAll({
    where: { evenement_id: req.params.eventId },
    include: [{ model: User, attributes: ['nom_complet', 'avatar_url'] }],
    order: [['createdAt', 'DESC']]
  });
  return successResponse(res, avis, 'Avis récupérés');
});

// Créer un avis
export const createAvis = asyncHandler(async (req, res, next) => {
  const { evenement_id, note, commentaire } = req.body;

  // Vérifier que l'événement existe
  const event = await Event.findByPk(evenement_id);
  if (!event) return next(createError('Événement introuvable', 404));

  // Vérifier si l'utilisateur a déjà donné un avis
  const existingAvis = await Avis.findOne({
    where: {
      utilisateur_id: req.user.id,
      evenement_id
    }
  });
  if (existingAvis) return next(createError('Vous avez déjà donné un avis', 400));

  const avis = await Avis.create({
    utilisateur_id: req.user.id,
    evenement_id,
    note,
    commentaire
  });

  return successResponse(res, avis, 'Avis ajouté !', 201);
});

// Supprimer un avis
export const deleteAvis = asyncHandler(async (req, res, next) => {
  const avis = await Avis.findByPk(req.params.id);
  if (!avis) return next(createError('Avis introuvable', 404));
  if (avis.utilisateur_id !== req.user.id) {
    return next(createError('Non autorisé', 403));
  }
  await avis.destroy();
  return successResponse(res, null, 'Avis supprimé !');
});