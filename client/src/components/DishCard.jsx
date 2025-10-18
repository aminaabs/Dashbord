export default function DishCard({ dish, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="font-semibold text-lg">{dish.name}</div>
      <div className="text-sm text-gray-600 mt-1">{dish.description}</div>
      <div className="mt-2 font-medium">{dish.price.toFixed(2)} DZD</div>
      <button
        className="mt-3 bg-emerald-600 text-white rounded px-3 py-2 hover:bg-emerald-700"
        onClick={() => onAdd(dish)}
      >
        Add
      </button>
    </div>
  );
}
