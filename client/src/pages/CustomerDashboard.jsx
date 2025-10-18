import { useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const user = useMemo(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }, []);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const res = await api.get(`/orders/${user.id}`);
        setOrders(res.data);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, [user]);

  const now = new Date();
  const totalMonthly = orders
    .filter((o) => {
      const d = new Date(o.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Welcome {user?.name || 'Guest'}</h1>
      <div className="mb-4 font-medium">This month total: {totalMonthly.toFixed(2)} DZD</div>
      <div className="bg-white rounded shadow divide-y">
        {orders.map((o) => (
          <div key={o._id} className="p-4 text-sm flex justify-between">
            <div>
              <div className="font-medium">{o.customerName}</div>
              <div className="text-gray-600">{new Date(o.date).toLocaleDateString()} {o.time}</div>
            </div>
            <div className="font-semibold">{o.total.toFixed(2)} DZD</div>
          </div>
        ))}
        {orders.length === 0 && <div className="p-4 text-sm text-gray-600">No orders yet.</div>}
      </div>
    </div>
  );
}
