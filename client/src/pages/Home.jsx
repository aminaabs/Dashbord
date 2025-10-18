import { useMemo, useState } from 'react';
import DishCard from '../components/DishCard.jsx';
import OrderForm from '../components/OrderForm.jsx';
import api from '../services/api.js';

const SAMPLE_DISHES = [
  { id: 1, name: 'Couscous', description: 'Traditional steamed semolina with vegetables', price: 450 },
  { id: 2, name: 'Chakhchoukha', description: 'Flatbread torn into stew', price: 500 },
  { id: 3, name: 'Rechta', description: 'Homemade noodles with chicken and turnips', price: 520 },
  { id: 4, name: 'Mahjouba', description: 'Stuffed semolina crepe', price: 180 },
];

export default function Home() {
  const [cart, setCart] = useState([]);

  const dishes = useMemo(() => SAMPLE_DISHES, []);

  function addToCart(dish) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) => (i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  }

  async function placeOrder({ customerName, time }) {
    const items = cart.map(({ name, price, quantity }) => ({ name, price, quantity }));
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const payload = { customerName, items, total, time };
    try {
      const res = await api.post('/orders', payload);
      alert('Order placed! #' + res.data._id);
      setCart([]);
    } catch (e) {
      alert('Failed to place order');
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
        {dishes.map((d) => (
          <DishCard key={d.id} dish={d} onAdd={addToCart} />
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">Your Order</h2>
        {cart.length === 0 ? (
          <div className="text-sm text-gray-600">No items yet.</div>
        ) : (
          <>
            <ul className="mb-4 text-sm">
              {cart.map((i) => (
                <li key={i.id} className="flex justify-between py-1">
                  <span>
                    {i.name} x {i.quantity}
                  </span>
                  <span>{(i.price * i.quantity).toFixed(2)} DZD</span>
                </li>
              ))}
            </ul>
            <OrderForm items={cart} onSubmit={placeOrder} />
          </>
        )}
      </div>
    </div>
  );
}
