import { Router } from 'express';
import { getAllOrders, getMonthlySummary } from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/orders', authenticate, requireAdmin, getAllOrders);
router.get('/monthly-summary/:customerId', authenticate, requireAdmin, getMonthlySummary);

export default router;
