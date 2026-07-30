// src/components/JobForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function JobForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    district: "",
    budget: "",
    clientName: "",
    clientPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form, budget: Number(form.budget) };
      await api.post("/jobs", payload);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">ახალი დავალების დამატება</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="სათაური"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="აღწერა"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          rows="4"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Painting">Painting</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Gardening">Gardening</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="district"
          placeholder="რაიონი"
          value={form.district}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="budget"
          placeholder="ბიუჯეტი (GEL)"
          value={form.budget}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="clientName"
          placeholder="თქვენი სახელი"
          value={form.clientName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="clientPhone"
          placeholder="ტელეფონი"
          value={form.clientPhone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "იტვირთება..." : "დამატება"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
