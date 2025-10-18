import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Algerian Food</Link>
        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <Link to="/customer" className="hover:text-emerald-600">My Orders</Link>
          <Link to="/admin" className="hover:text-emerald-600">Admin</Link>
          <Link to="/login" className="hover:text-emerald-600">Login</Link>
          <Link to="/register" className="hover:text-emerald-600">Register</Link>
        </div>
      </div>
    </nav>
  );
}
