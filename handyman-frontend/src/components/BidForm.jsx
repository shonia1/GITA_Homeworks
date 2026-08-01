// src/components/BidForm.jsx
import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

function BidForm({ jobId, onBidAdded }) {
  const { user } = useAuth();

  // თუ მომხმარებელი არ არის craftsman, არაფერს ვაჩვენებთ
  if (!user || user.role !== 'craftsman') {
    return null;
  }

  const [form, setForm] = useState({
    craftsmanName: '',
    craftsmanPhone: '',
    offeredPrice: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const payload = { ...form, job: jobId, offeredPrice: Number(form.offeredPrice) };
      const response = await api.post('/bids', payload);
      onBidAdded(response.data.data);
      setForm({ craftsmanName: '', craftsmanPhone: '', offeredPrice: '', message: '' });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">💬 დატოვეთ შეთავაზება</h3>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg mb-4">✅ შეთავაზება წარმატებით გაიგზავნა!</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="craftsmanName"
            placeholder="თქვენი სახელი *"
            value={form.craftsmanName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <input
            type="text"
            name="craftsmanPhone"
            placeholder="ტელეფონი *"
            value={form.craftsmanPhone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>
        <input
          type="number"
          name="offeredPrice"
          placeholder="თქვენი ფასი (GEL) *"
          value={form.offeredPrice}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
        <textarea
          name="message"
          placeholder="დამატებითი ინფორმაცია..."
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          rows="3"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {submitting ? 'იგზავნება...' : '📤 შეთავაზების გაგზავნა'}
        </button>
      </form>
    </div>
  );
}

export default BidForm;