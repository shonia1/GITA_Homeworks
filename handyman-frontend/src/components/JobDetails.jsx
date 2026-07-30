// src/components/JobDetails.jsx
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

  if (loading) return <div className="text-center py-10">იტვირთება...</div>;
  if (error) return <div className="text-red-500 text-center py-10">შეცდომა: {error}</div>;
  if (!job) return <div className="text-center py-10">დავალება არ მოიძებნა</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline">← უკან</Link>
      <div className="mt-4 border rounded-lg p-6 shadow">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-gray-600 mt-2">{job.category} • {job.district}</p>
        <p className="text-2xl text-green-600 font-bold mt-2">{job.budget} GEL</p>
        <p className="text-gray-700 mt-4">{job.description}</p>
        <p className="text-sm text-gray-400 mt-4">
          კლიენტი: {job.clientName} • 📞 {job.clientPhone}
        </p>
        <p className="text-sm text-gray-400">
          სტატუსი: {job.status}
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8">შეთავაზებები</h2>
      {bids.length === 0 ? (
        <p className="text-gray-500 mt-2">ჯერ არ არის შეთავაზებები</p>
      ) : (
        <div className="space-y-2 mt-2">
          {bids.map((bid) => (
            <div key={bid._id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">{bid.craftsmanName}</p>
              <p className="text-green-600">{bid.offeredPrice} GEL</p>
              <p className="text-gray-600">{bid.message}</p>
              <p className="text-sm text-gray-400">სტატუსი: {bid.status}</p>
            </div>
          ))}
        </div>
      )}

      <BidForm jobId={id} onBidAdded={(newBid) => setBids([...bids, newBid])} />
    </div>
  );
}

export default JobDetails;