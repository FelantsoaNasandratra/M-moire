import express from 'express';
import {
  getAvisByEvent,
  createAvis,
  deleteAvis
} from '../controllers/avisController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Avis
 *   description: Gestion des avis utilisateurs
 */

/**
 * @swagger
 * /api/avis/event/{eventId}:
 *   get:
 *     summary: Obtenir les avis d’un événement
 *     tags: [Avis]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/event/:eventId', getAvisByEvent);

/**
 * @swagger
 * /api/avis:
 *   post:
 *     summary: Ajouter un avis
 *     tags: [Avis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *                 example: 5
 */
router.post('/', protect, createAvis);

/**
 * @swagger
 * /api/avis/{id}:
 *   delete:
 *     summary: Supprimer un avis
 *     tags: [Avis]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', protect, deleteAvis);

export default router;