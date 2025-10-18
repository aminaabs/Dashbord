const express = require('express');
const router = express.Router();
const { getAllOrders, getMonthlySummary } = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/orders', auth('admin'), getAllOrders);
router.get('/monthly-summary/:customerId', auth('admin'), getMonthlySummary);

module.exports = router;
