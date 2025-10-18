import { useState } from 'react';

export default function OrderForm({ items, onSubmit }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('12:00');

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ customerName: name, address, time });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
      <div className="grid gap-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Delivery time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div className="font-semibold">Total: {total.toFixed(2)} DZD</div>
        <button className="bg-emerald-600 text-white rounded px-3 py-2 hover:bg-emerald-700">Place Order</button>
      </div>
    </form>
  );
}
