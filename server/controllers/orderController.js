import Order from '../models/Order.js';

export async function createOrder(req, res) {
  try {
    const { customerId, customerName, items, total, date, time } = req.body;

    if (!customerName || !Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const order = await Order.create({
      customerId: customerId || (req.user ? req.user._id : undefined),
      customerName,
      items,
      total,
      date: date ? new Date(date) : new Date(),
      time: time || new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    });

    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
}

export async function getOrdersByCustomer(req, res) {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
}
