const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  try {
    const { customerName, date } = req.query;

    const filter = {};
    if (customerName) {
      filter.customerName = { $regex: new RegExp(customerName, 'i') };
    }
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

exports.getMonthlySummary = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Determine current month timeframe
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const pipeline = [
      { $match: { customerId: customerId ? require('mongoose').Types.ObjectId.createFromHexString(customerId) : null, date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: '$customerId', totalMonthlySpending: { $sum: '$total' }, orderCount: { $sum: 1 } } },
    ];

    const result = await Order.aggregate(pipeline);
    const summary = result[0] || { _id: customerId, totalMonthlySpending: 0, orderCount: 0 };
    return res.json(summary);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to compute monthly summary', error: err.message });
  }
};
