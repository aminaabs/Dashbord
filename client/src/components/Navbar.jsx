import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearAuth, getUser } from '../utils/auth.js';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  function handleLogout() {
    clearAuth();
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-emerald-600">Algerian Food</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-emerald-600">Home</Link>
          <Link to="/order" className="text-gray-700 hover:text-emerald-600">Order</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-emerald-600">Dashboard</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-emerald-600">Admin</Link>
              )}
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-emerald-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-emerald-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
