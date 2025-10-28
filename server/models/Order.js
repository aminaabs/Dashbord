import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    dishId: { type: String },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
    time: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
