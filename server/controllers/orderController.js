const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    const { customerId, customerName, items, total, date, time } = req.body;
    if (!customerName || !Array.isArray(items) || items.length === 0 || !total || !time) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    // If regular customer, trust JWT user data when available
    let resolvedCustomerId = customerId;
    let resolvedCustomerName = customerName;

    if (req.user && req.user.id) {
      resolvedCustomerId = req.user.id;
      resolvedCustomerName = req.user.name;
    } else if (customerId) {
      const user = await User.findById(customerId).select('name');
      if (user) resolvedCustomerName = user.name;
    }

    const order = await Order.create({
      customerId: resolvedCustomerId || undefined,
      customerName: resolvedCustomerName,
      items,
      total,
      date: date ? new Date(date) : new Date(),
      time,
    });

    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

exports.getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Only allow access if requester is the same user or an admin
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const isSelf = req.user.id === customerId;
    const isAdmin = req.user.role === 'admin';
    if (!isSelf && !isAdmin) return res.status(403).json({ message: 'Forbidden' });

    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};
