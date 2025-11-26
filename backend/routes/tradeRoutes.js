import express from 'express';
import {
  getTrades,
  createTrade,
  updateTrade,
  deleteTrade,
  getTradeSummary,
} from '../controllers/tradeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All trade routes are protected
router.use(protect);

router.route('/')
  .get(getTrades)
  .post(createTrade);

router.route('/summary')
  .get(getTradeSummary);

router.route('/:id')
  .put(updateTrade)
  .delete(deleteTrade);

export default router;