import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api.js';
import OrderForm from '../components/OrderForm.jsx';
import { getUser } from '../utils/auth.js';
import { useState } from 'react';

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDish = location.state?.dish;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit({ items, total, customerName }) {
    setError('');
    setSuccess('');
    try {
      const user = getUser();
      const payload = {
        items,
        total,
        customerName,
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      };
      if (user) payload.customerId = user._id;
      const { data } = await api.post('/orders', payload);
      setSuccess('Order placed successfully');
      setTimeout(() => navigate('/'), 1200);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Place your order</h2>
      {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
      {success && <p className="text-emerald-700 mb-2 text-sm">{success}</p>}
      <OrderForm onSubmit={handleSubmit} initialDish={initialDish} />
    </div>
  );
}
