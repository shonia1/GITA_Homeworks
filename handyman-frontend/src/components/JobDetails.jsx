// src/components/JobDetails.jsx
// Displays a single job with all details, its bids, and allows status update.

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import BidForm from './BidForm';

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // ── 1. Fetch job + bids ──────────────────────
  useEffect(() => {
    const fetchJobAndBids = async () => {
      try {
        const jobRes = await api.get(`/jobs/${id}`);
        setJob(jobRes.data.data);

        const bidsRes = await api.get(`/bids/job/${id}`);
        setBids(bidsRes.data.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJobAndBids();
  }, [id]);

  // ── 2. Toggle job status ──────────────────────
  const handleStatusToggle = async () => {
    // Determine new status
    const newStatus = job.status === 'open' ? 'completed' : 'open';
    const action = newStatus === 'completed' ? 'დახურვა' : 'გახსნა';

    if (!window.confirm(`დარწმუნებული ხართ, რომ გსურთ დავალების "${action}"?`)) {
      return;
    }

    setUpdating(true);
    try {
      const response = await api.patch(`/jobs/${id}`, { status: newStatus });
      setJob(response.data.data); // update UI
    } catch (err) {
      alert('❌ შეცდომა: ' + (err.response?.data?.error || err.message));
    } finally {
      setUpdating(false);
    }
  };

  // ── 3. Loading / Error states ──────────────────
  if (loading) {
    return <div className="flex justify-center items-center h-64 text-gray-500">იტვირთება...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">შეცდომა: {error}</div>;
  }

  if (!job) {
    return <div className="text-center py-10 text-gray-500">დავალება არ მოიძებნა</div>;
  }

  // ── 4. Render ──────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
        ← უკან დაბრუნება
      </Link>

      {/* ─── JOB CARD ─── */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
        {/* Header: Title + Status + Action button */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Status badge */}
            <span
              className={`text-sm font-semibold px-4 py-1.5 rounded-full ${
                job.status === 'open'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {job.status === 'open' ? '🟢 ღია' : '🔒 დასრულებული'}
            </span>

            {/* Toggle button – only for open/completed */}
            {(job.status === 'open' || job.status === 'completed') && (
              <button
                onClick={handleStatusToggle}
                disabled={updating}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition disabled:opacity-50 ${
                  job.status === 'open'
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {updating
                  ? '...'
                  : job.status === 'open'
                  ? '🔒 დახურვა'
                  : '🔓 გახსნა'}
              </button>
            )}
          </div>
        </div>

        {/* Category + District */}
        <div className="flex flex-wrap gap-3 mt-3">
          <span className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full">
            {job.category}
          </span>
          <span className="bg-gray-50 text-gray-600 text-sm px-3 py-1 rounded-full">
            📍 {job.district}
          </span>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Budget highlight */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
          <span className="text-gray-600">💰 შეთავაზებული ბიუჯეტი</span>
          <span className="text-3xl font-bold text-green-700">{job.budget} GEL</span>
        </div>

        {/* Client info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-6">
          <div>
            <span className="text-gray-500">კლიენტი</span>
            <p className="font-semibold">{job.clientName}</p>
          </div>
          <div>
            <span className="text-gray-500">ტელეფონი</span>
            <p className="font-semibold">{job.clientPhone}</p>
          </div>
          <div>
            <span className="text-gray-500">გამოქვეყნდა</span>
            <p className="font-semibold">{new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* ─── BIDS SECTION ─── */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📩 შეთავაზებები <span className="text-sm font-normal text-gray-500">({bids.length})</span>
        </h2>

        {bids.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-400 mt-4">
            ჯერ არ არის შეთავაზებები
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{bid.craftsmanName}</p>
                    <p className="text-sm text-gray-500">{bid.craftsmanPhone}</p>
                    <p className="text-gray-600 mt-2">{bid.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">{bid.offeredPrice} GEL</p>
                    <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mt-1">
                      {bid.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── BID FORM ─── */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <BidForm
            jobId={id}
            onBidAdded={(newBid) => setBids([...bids, newBid])}
          />
        </div>
      </div>
    </div>
  );
}

export default JobDetails;