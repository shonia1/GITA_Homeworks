// src/components/BidForm.jsx
import { useState } from "react";
import api from "../api/axios";

function BidForm({ jobId, onBidAdded }) {
  const [form, setForm] = useState({
    craftsmanName: "",
    craftsmanPhone: "",
    offeredPrice: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...form,
        job: jobId,
        offeredPrice: Number(form.offeredPrice),
      };
      const response = await api.post("/bids", payload);
      onBidAdded(response.data.data);
      setForm({
        craftsmanName: "",
        craftsmanPhone: "",
        offeredPrice: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-bold">დატოვეთ შეთავაზება</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <input
          type="text"
          name="craftsmanName"
          placeholder="თქვენი სახელი"
          value={form.craftsmanName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="craftsmanPhone"
          placeholder="ტელეფონი"
          value={form.craftsmanPhone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="offeredPrice"
          placeholder="თქვენი ფასი (GEL)"
          value={form.offeredPrice}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="დამატებითი ინფორმაცია (არასავალდებულო)"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="3"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? "იგზავნება..." : "გაგზავნა"}
        </button>
      </form>
    </div>
  );
}

export default BidForm;
