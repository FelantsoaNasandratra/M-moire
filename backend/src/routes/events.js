import express from 'express';
import { upload } from '../middleware/upload.js';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gestion des événements
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Liste des événements
 *     tags: [Events]
 */
router.get('/', getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Détail d'un événement
 *     tags: [Events]
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Créer un événement avec image
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *             properties:
 *               titre:
 *                 type: string
 *               date_debut:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Événement créé
 */
router.post('/', protect, adminOnly, upload.single('image'), createEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Modifier un événement (image optionnelle)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 */
router.put('/:id', protect, adminOnly, upload.single('image'), updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', protect, adminOnly, deleteEvent);

export default router;