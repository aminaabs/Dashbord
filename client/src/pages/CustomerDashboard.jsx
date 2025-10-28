import { useEffect, useState } from 'react';
import api from '../api.js';
import { getUser } from '../utils/auth.js';

export default function CustomerDashboard() {
  const user = getUser();
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ totalSpent: 0, month: 0, year: 0, orders: 0 });

  useEffect(() => {
    async function load() {
      const [ordersRes, summaryRes] = await Promise.all([
        api.get(`/orders/${user._id}`),
        api.get(`/admin/monthly-summary/${user._id}`),
      ]);
      setOrders(ordersRes.data);
      setSummary(summaryRes.data);
    }
    load().catch(() => {});
  }, [user._id]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      <div className="mb-4 text-gray-700">
        This month: <span className="font-semibold text-emerald-700">{summary.totalSpent} DZD</span> across {summary.orders} orders
      </div>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o._id} className="bg-white border border-gray-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{o.customerName}</div>
              <div className="text-sm text-gray-600">{new Date(o.date).toLocaleDateString()} {o.time}</div>
              <div className="text-sm text-gray-600">{o.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</div>
            </div>
            <div className="font-semibold text-emerald-700">{o.total} DZD</div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-gray-600">No orders yet.</div>
        )}
      </div>
    </div>
  );
}
