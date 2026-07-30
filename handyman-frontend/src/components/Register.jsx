// src/components/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "client",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 რეგისტრაცია</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="სახელი *"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="პაროლი (მინ. 6)"
          value={form.password}
          onChange={handleChange}
          required
          minLength="6"
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="ტელეფონი *"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
        >
          <option value="client">კლიენტი</option>
          <option value="craftsman">ხელოსანი</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "იტვირთება..." : "რეგისტრაცია"}
        </button>
      </form>
      <p className="mt-4 text-center">
        უკვე გაქვთ ანგარიში?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          შესვლა
        </Link>
      </p>
    </div>
  );
}

export default Register;
