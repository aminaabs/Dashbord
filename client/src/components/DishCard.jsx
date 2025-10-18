import { useNavigate } from 'react-router-dom';

export default function DishCard({ dish }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {dish.image && (
        <img src={dish.image} alt={dish.name} className="h-40 w-full object-cover" />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{dish.name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-1">{dish.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-emerald-600">{dish.price} DZD</span>
          <button
            className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => navigate('/order', { state: { dish } })}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
