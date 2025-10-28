import Order from '../models/Order.js';
import mongoose from 'mongoose';

export async function getAllOrders(req, res) {
  try {
    const { customerName, date } = req.query;
    const filter = {};

    if (customerName) {
      filter.customerName = { $regex: new RegExp(customerName, 'i') };
    }

    if (date) {
      const d = new Date(date);
      const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0));
      const end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59));
      filter.date = { $gte: start, $lte: end };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
}

export async function getMonthlySummary(req, res) {
  try {
    const { customerId } = req.params;
    const { year, month } = req.query; // month 1-12

    const now = new Date();
    const y = parseInt(year || now.getUTCFullYear(), 10);
    const m = parseInt(month || now.getUTCMonth() + 1, 10) - 1; // 0-based

    const start = new Date(Date.UTC(y, m, 1, 0, 0, 0));
    const end = new Date(Date.UTC(y, m + 1, 0, 23, 59, 59));

    const [result] = await Order.aggregate([
      { $match: { customerId: new mongoose.Types.ObjectId(customerId), date: { $gte: start, $lte: end } } },
      { $group: { _id: '$customerId', totalSpent: { $sum: '$total' }, count: { $sum: 1 } } },
    ]);

    return res.json({ customerId, month: m + 1, year: y, totalSpent: result?.totalSpent || 0, orders: result?.count || 0 });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to compute monthly summary', error: err.message });
  }
}
