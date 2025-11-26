import express from 'express';
import { getStockChartData } from '../controllers/stockController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All stock routes are protected
router.use(protect);

router.get('/chart/:symbol', getStockChartData);

export default router;