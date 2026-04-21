import express from 'express';
import {
  createReservation,
  getMyReservations,
  cancelReservation
} from '../controllers/reservationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 */
router.post('/', protect, createReservation);

/**
 * @swagger
 * /api/reservations/my:
 *   get:
 *     summary: Mes réservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/my', protect, getMyReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Annuler réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', protect, cancelReservation);
export default router;