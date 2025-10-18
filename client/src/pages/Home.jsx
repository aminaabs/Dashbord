import dishes from '../data/dishes.js';
import DishCard from '../components/DishCard.jsx';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Traditional Algerian Dishes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dishes.map((d) => (
          <DishCard key={d.id} dish={d} />
        ))}
      </div>
    </div>
  );
}
