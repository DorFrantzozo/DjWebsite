import express from 'express';
import { createGig, getGigs, updateGig, deleteGig } from '../controllers/gigController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createGig);
router.get('/', getGigs); // Public route
router.put('/:id', protect, updateGig);
router.delete('/:id', protect, deleteGig);

export default router;
