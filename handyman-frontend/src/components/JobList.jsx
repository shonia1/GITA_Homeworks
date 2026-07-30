// src/components/JobList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-10">იტვირთება...</div>;
  if (error) return <div className="text-red-500 text-center py-10">შეცდომა: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">დავალებები</h1>
      <Link
        to="/post-job"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-6 hover:bg-blue-700"
      >
        + ახალი დავალება
      </Link>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link key={job._id} to={`/jobs/${job._id}`} className="block">
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600 mt-1">{job.category}</p>
              <p className="text-gray-500">📍 {job.district}</p>
              <p className="text-green-600 font-bold mt-2">{job.budget} GEL</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JobList;