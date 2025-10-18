import { useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');

  const user = useMemo(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const params = new URLSearchParams();
        if (customerName) params.set('customerName', customerName);
        if (date) params.set('date', date);
        const res = await api.get(`/admin/orders?${params.toString()}`);
        setOrders(res.data);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, [customerName, date]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <input className="border rounded px-3 py-2" placeholder="Filter by customer" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <input className="border rounded px-3 py-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {user?.id && (
          <button
            className="bg-emerald-600 text-white rounded px-3 py-2"
            onClick={async () => {
              try {
                const res = await api.get(`/admin/monthly-summary/${user.id}`);
                alert(`Your monthly total: ${res.data.totalMonthlySpending || 0} DZD`);
              } catch (_) {}
            }}
          >
            My monthly summary
          </button>
        )}
      </div>
      <div className="bg-white rounded shadow divide-y">
        {orders.map((o) => (
          <div key={o._id} className="p-4 text-sm">
            <div className="flex justify-between">
              <div className="font-medium">{o.customerName}</div>
              <div className="font-semibold">{o.total.toFixed(2)} DZD</div>
            </div>
            <div className="text-gray-600">{new Date(o.date).toLocaleDateString()} {o.time}</div>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {o.items.map((it, idx) => (
                <li key={idx}>
                  {it.name} x {it.quantity} — {(it.price * it.quantity).toFixed(2)} DZD
                </li>
              ))}
            </ul>
          </div>
        ))}
        {orders.length === 0 && <div className="p-4 text-sm text-gray-600">No orders.</div>}
      </div>
    </div>
  );
}
