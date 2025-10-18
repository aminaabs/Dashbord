import { useEffect, useMemo, useState } from 'react';
import dishes from '../data/dishes.js';

export default function OrderForm({ onSubmit, initialDish }) {
  const [selected, setSelected] = useState(initialDish?.id || dishes[0].id);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (initialDish) setSelected(initialDish.id);
  }, [initialDish]);

  const dish = useMemo(() => dishes.find((d) => d.id === selected), [selected]);
  const total = useMemo(() => (dish ? dish.price * quantity : 0), [dish, quantity]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!dish) return;
    onSubmit({
      items: [{ dishId: dish.id, name: dish.name, price: dish.price, quantity }],
      total,
      customerName: name,
      delivery: { address, phone },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Dish</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {dishes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.price} DZD
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Quantity</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value || '1', 10))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Your name</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Delivery address</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="text-gray-700">
          Total: <span className="font-semibold text-emerald-700">{total} DZD</span>
        </div>
        <button className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700">Place order</button>
      </div>
    </form>
  );
}
