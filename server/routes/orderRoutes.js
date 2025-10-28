import { Router } from 'express';
import { createOrder, getOrdersByCustomer } from '../controllers/orderController.js';
import { authenticateOptional, authenticate } from '../middleware/auth.js';

const router = Router();

// Guest or authenticated users can create orders
router.post('/', authenticateOptional, createOrder);

// Get all orders for one customer (customerId param)
router.get('/:customerId', authenticate, getOrdersByCustomer);

export default router;
