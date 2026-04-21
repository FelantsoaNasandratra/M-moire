import express from 'express';
import {
  createPaiement,
  getPaiement,
  getMyPaiements
} from '../controllers/paiementController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createPaiement);
router.get('/my', protect, getMyPaiements);
router.get('/:id', protect, getPaiement);

export default router;