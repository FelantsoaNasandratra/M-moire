import express from 'express';
import {
  getCategories,
  createCategorie,
  updateCategorie,
  deleteCategorie
} from '../controllers/categorieController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, adminOnly, createCategorie);
router.put('/:id', protect, adminOnly, updateCategorie);
router.delete('/:id', protect, adminOnly, deleteCategorie);


/**
 * @swagger
 * tags:
 *   name: Categories
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Liste des catégories
 *     tags: [Categories]
 */
router.get('/', getCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Créer une catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 */
router.post('/', protect, adminOnly, createCategorie);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Modifier catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', protect, adminOnly, updateCategorie);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Supprimer catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', protect, adminOnly, deleteCategorie);

export default router;