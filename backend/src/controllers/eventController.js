import Event from '../models/Event.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { successResponse, paginateResults } from '../utils/helpers.js';

// GET ALL
export const getEvents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { limit: lim, offset } = paginateResults(page, limit);

  const { count, rows } = await Event.findAndCountAll({
    limit: lim,
    offset,
    order: [['date_debut', 'ASC']]
  });

  return successResponse(res, {
    events: rows,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / lim)
  }, 'Événements récupérés');
});

// GET ONE
export const getEventById = asyncHandler(async (req, res, next) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return next(createError('Événement introuvable', 404));
  return successResponse(res, event, 'Événement récupéré');
});

// CREATE
export const createEvent = asyncHandler(async (req, res) => {
  const image_url = req.file
    ? `/uploads/${req.file.filename}`
    : null;
  let tags = req.body.tags;
  if (typeof tags === "string") {
    try {
      tags = JSON.parse(tags);
    } catch {
      tags = tags.split(",").map(t => t.trim()).filter(Boolean);
    }
  }

  const event = await Event.create({
    ...req.body,
    tags,
    organisateur_id: req.user.id,
    image_url
  });

  return successResponse(res, event, 'Événement créé !', 201);
});

// UPDATE
export const updateEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return next(createError('Événement introuvable', 404));

  const image_url = req.file
    ? `/uploads/${req.file.filename}`
    : event.image_url;

  let tags = req.body.tags;
  if (typeof tags === "string") {
    try {
      tags = JSON.parse(tags);
    } catch {
      tags = tags.split(",").map(t => t.trim()).filter(Boolean);
    }
  }

  await event.update({
    ...req.body,
    tags,
    image_url
  });

  return successResponse(res, event, 'Événement modifié !');
});

// DELETE
export const deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return next(createError('Événement introuvable', 404));

  await event.destroy();

  return successResponse(res, null, 'Événement supprimé !');
});