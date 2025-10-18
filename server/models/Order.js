const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    items: { type: [itemSchema], required: true, default: [] },
    total: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, default: () => new Date() },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
