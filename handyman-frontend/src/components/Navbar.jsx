// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          🛠️ Handyman
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm bg-indigo-500 px-3 py-1 rounded-full">
                {user.name} ({user.role})
              </span>
              <Link
                to="/post-job"
                className="bg-white text-indigo-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                + ახალი დავალება
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                გამოსვლა
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-indigo-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                შესვლა
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold transition"
              >
                რეგისტრაცია
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
