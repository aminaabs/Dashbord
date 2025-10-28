import { useEffect, useState } from 'react';
import api from '../api.js';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ customerName: '', date: '' });

  async function load() {
    const params = new URLSearchParams();
    if (filters.customerName) params.set('customerName', filters.customerName);
    if (filters.date) params.set('date', filters.date);
    const { data } = await api.get(`/admin/orders?${params.toString()}`);
    setOrders(data);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Admin Orders</h2>
      <div className="bg-white border border-gray-100 rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Filter by customer name"
          value={filters.customerName}
          onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
        />
        <input
          className="border border-gray-300 rounded px-3 py-2"
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700" onClick={load}>Apply</button>
          <button className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={() => { setFilters({ customerName: '', date: '' }); setTimeout(load, 0); }}>Reset</button>
        </div>
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
          <div className="text-gray-600">No orders found.</div>
        )}
      </div>
    </div>
  );
}
