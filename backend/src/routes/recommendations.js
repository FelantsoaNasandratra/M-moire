import express from 'express';
import {
  getRecommendations,
  getSimilarEvents,
  trackInteraction,
  getMyInteractions
} from '../controllers/recommendationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Système de recommandations personnalisées
 */

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Obtenir les recommandations personnalisées
 *     description: Retourne une liste d'événements recommandés pour l'utilisateur connecté, basée sur ses interactions passées.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre de recommandations à retourner
 *     responses:
 *       200:
 *         description: Liste de recommandations récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       titre:
 *                         type: string
 *                         example: Concert de Jazz
 *                       description:
 *                         type: string
 *                         example: Un concert incroyable
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       score:
 *                         type: number
 *                         example: 0.95
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/', protect, getRecommendations);

/**
 * @swagger
 * /api/recommendations/similar/{id}:
 *   get:
 *     summary: Obtenir des événements similaires
 *     description: Retourne une liste d'événements similaires à l'événement spécifié.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement de référence
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Nombre d'événements similaires à retourner
 *     responses:
 *       200:
 *         description: Événements similaires récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       titre:
 *                         type: string
 *                         example: Festival de Musique
 *                       categorie:
 *                         type: string
 *                         example: Musique
 *                       similarityScore:
 *                         type: number
 *                         example: 0.87
 *       404:
 *         description: Événement non trouvé
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/similar/:id', protect, getSimilarEvents);

/**
 * @swagger
 * /api/recommendations/interact:
 *   post:
 *     summary: Enregistrer une interaction utilisateur
 *     description: Enregistre une interaction de l'utilisateur avec un événement (vue, like, réservation, etc.) pour améliorer les recommandations.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - type
 *             properties:
 *               eventId:
 *                 type: integer
 *                 description: ID de l'événement concerné
 *                 example: 1
 *               type:
 *                 type: string
 *                 enum: [vue, like, reservation, partage]
 *                 description: Type d'interaction
 *                 example: vue
 *     responses:
 *       201:
 *         description: Interaction enregistrée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Interaction enregistrée
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/interact', protect, trackInteraction);

/**
 * @swagger
 * /api/recommendations/my-interactions:
 *   get:
 *     summary: Obtenir mes interactions
 *     description: Retourne l'historique complet des interactions de l'utilisateur connecté avec les événements.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [vue, like, reservation, partage]
 *         description: Filtrer par type d'interaction
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Nombre d'interactions par page
 *     responses:
 *       200:
 *         description: Historique des interactions récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       eventId:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
 *                         example: vue
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 45
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/my-interactions', protect, getMyInteractions);

export default router;