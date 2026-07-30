// src/components/JobList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const limit = 6;

  // ── Fetch jobs inside useEffect ────────────────
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await api.get('/jobs', {
          params: {
            page,
            limit,
            search: search.trim(),
            category,
          },
        });
        setJobs(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setTotalJobs(response.data.pagination.total);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, search, category]); // <-- dependencies

  // ── Handlers ────────────────────────────────────
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setPage(1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // ── Loading / Error ─────────────────────────────
  if (loading) {
    return <div className="flex justify-center items-center h-64 text-gray-500">იტვირთება...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">შეცდომა: {error}</div>;
  }

  const categories = [...new Set(jobs.map((job) => job.category))];

  // ── Render ──────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 დავალებები</h1>
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
          {totalJobs} ცალი
        </span>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <input
          type="text"
          placeholder="🔎 მოძებნეთ სათაურით..."
          value={search}
          onChange={handleSearchChange}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border border-gray-300 px-4 py-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition min-w-[150px]"
        >
          <option value="">ყველა კატეგორია</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {(search || category) && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-red-500 transition px-3 py-1"
          >
            ✕ გასუფთავება
          </button>
        )}
      </div>

      {/* Job Cards */}
      {jobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
          <p className="text-gray-400 text-xl">
            {search || category ? '☝️ ვერაფერი მოიძებნა ფილტრების მიხედვით' : '🤷‍♂️ ჯერ არ არის დავალებები'}
          </p>
          <Link to="/post-job" className="text-indigo-600 hover:underline mt-2 inline-block">
            {search || category ? 'ყველა დავალების ნახვა' : 'შექმენით პირველი!'}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link key={job._id} to={`/jobs/${job._id}`} className="block transform transition hover:scale-[1.02] duration-200">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden h-full flex flex-col">
                <div className="px-5 pt-4 pb-2 flex justify-between items-start">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status === 'open' ? '🟢 ღია' : '🔒 დახურული'}
                  </span>
                </div>
                <div className="px-5 py-2 flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{job.title}</h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{job.description}</p>
                </div>
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span>📍 {job.district}</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {job.budget} <span className="text-sm font-normal text-gray-500">GEL</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← წინა
          </button>
          <span className="text-gray-700 text-sm font-medium">
            გვერდი {page} / {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            შემდეგი →
          </button>
        </div>
      )}
    </div>
  );
}

export default JobList;