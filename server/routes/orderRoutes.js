const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByCustomer } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

// Create order: allow guest and regular; if token provided, will be used
router.post('/', optionalAuth, createOrder);

// Get all orders for one customer (regular, self or admin may use)
router.get('/:customerId', auth(), getOrdersByCustomer);

module.exports = router;
