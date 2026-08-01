// src/components/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { CITIES } from "../constants/cities"; // 🔥 იმპორტი

const PROFESSIONS = ["Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning", "Gardening", "Other"];

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "client",
    profession: [],
    cities: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleProfessionToggle = (prof) => {
    setForm(prev => {
      const current = prev.profession || [];
      if (current.includes(prof)) {
        return { ...prev, profession: current.filter(p => p !== prof) };
      } else {
        return { ...prev, profession: [...current, prof] };
      }
    });
  };

  const handleCityToggle = (city) => {
    setForm(prev => {
      const current = prev.cities || [];
      if (current.includes(city)) {
        return { ...prev, cities: current.filter(c => c !== city) };
      } else {
        return { ...prev, cities: [...current, city] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (form.role === "craftsman") {
      if (form.profession.length === 0) {
        setError("გთხოვთ, აირჩიეთ მინიმუმ ერთი პროფესია");
        setLoading(false);
        return;
      }
      if (form.cities.length === 0) {
        setError("გთხოვთ, აირჩიეთ მინიმუმ ერთი ქალაქი");
        setLoading(false);
        return;
      }
    }

    try {
      const payload = { ...form };
      if (form.role === "client") {
        payload.profession = [];
        payload.cities = [];
      }
      const response = await register(payload);
      setRegisteredUser(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  // If registration successful and user is craftsman, show Telegram link
  if (registeredUser && registeredUser.role === "craftsman") {
    const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || "YourBotUsername";
    const link = `https://t.me/${botUsername}?start=userId=${registeredUser.id}`;
    
    return (
      <div className="container mx-auto max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ რეგისტრაცია წარმატებულია!</h1>
        <p className="text-gray-700 mb-6">
          თქვენ დარეგისტრირდით როგორც <strong>ხელოსანი</strong>.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 mb-2">
            📱 <strong>Telegram-თან დასაკავშირებლად</strong> დააჭირეთ ქვემოთ მოცემულ ღილაკს:
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            🔗 Telegram-თან დაკავშირება
          </a>
          <p className="text-xs text-gray-400 mt-2">
            (დააჭირეთ "Start" ბოტში)
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
        >
          დაშზე გადასვლა
        </button>
      </div>
    );
  }

  if (registeredUser && registeredUser.role === "client") {
    navigate("/");
    return null;
  }

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

        {form.role === "craftsman" && (
          <>
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="font-semibold text-gray-700 mb-3">აირჩიეთ პროფესიები *</p>
              <div className="grid grid-cols-2 gap-2">
                {PROFESSIONS.map((prof) => (
                  <label key={prof} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(form.profession || []).includes(prof)}
                      onChange={() => handleProfessionToggle(prof)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm">{prof}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {form.profession.length > 0 ? `არჩეულია: ${form.profession.join(", ")}` : "აირჩიეთ მინიმუმ ერთი"}
              </p>
            </div>

            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="font-semibold text-gray-700 mb-3">აირჩიეთ ქალაქები *</p>
              <div className="grid grid-cols-2 gap-2">
                {CITIES.map((city) => (
                  <label key={city} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(form.cities || []).includes(city)}
                      onChange={() => handleCityToggle(city)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {form.cities.length > 0 ? `არჩეულია: ${form.cities.join(", ")}` : "აირჩიეთ მინიმუმ ერთი"}
              </p>
            </div>
          </>
        )}

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