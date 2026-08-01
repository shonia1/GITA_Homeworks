// src/components/JobList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import TelegramBanner from './TelegramBanner';

function JobList() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [showArchived, setShowArchived] = useState(false);
  const [filterByCity, setFilterByCity] = useState(true);
  const limit = 6; // 🔥 limit ცვლადი

  const getCityParam = () => {
    if (user && user.role === "craftsman" && filterByCity) {
      return user.cities && user.cities.length > 0 ? user.cities[0] : "";
    }
    return "";
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit,
          search: search.trim(),
          category,
          showArchived,
        };
        const city = getCityParam();
        if (city) params.city = city;

        if (user && user.role === 'client') {
          params.myJobs = true;
        }

        const response = await api.get('/jobs', { params });
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
  }, [page, search, category, user, showArchived, filterByCity]);

  // ── Handlers ──────────────────────────────────
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

  // ── Loading / Error ──────────────────────────
  if (loading) {
    return <div className="flex justify-center items-center h-64 text-gray-500">იტვირთება...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">შეცდომა: {error}</div>;
  }

  // ── Render ────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <TelegramBanner />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {user && user.role === 'client' ? '📋 ჩემი დავალებები' : '📋 დავალებები'}
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
            {totalJobs} ცალი
          </span>
          
          {user && user.role === "craftsman" && user.cities && user.cities.length > 0 && (
            <button
              onClick={() => setFilterByCity(!filterByCity)}
              className={`text-sm px-3 py-1 rounded-lg transition ${
                filterByCity
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filterByCity ? '📍 ჩემი ქალაქები' : '📍 ყველა ქალაქი'}
            </button>
          )}

          {user && user.role === 'client' && (
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`text-sm px-3 py-1 rounded-lg transition ${
                showArchived
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showArchived ? '📂 არქივი' : '📂 აჩვენე არქივი'}
            </button>
          )}
        </div>
      </div>

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
          {[...new Set(jobs.map((job) => job.category))].map((cat) => (
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

      {jobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
          <p className="text-gray-400 text-xl">
            {user && user.role === 'client'
              ? showArchived
                ? '📭 არქივში არ არის დავალებები'
                : '📭 თქვენ ჯერ არ გაგივრცელებიათ დავალება'
              : (search || category ? '☝️ ვერაფერი მოიძებნა ფილტრების მიხედვით' : '🤷‍♂️ ჯერ არ არის დავალებები')}
          </p>
          {user && user.role === 'client' && !showArchived && (
            <Link to="/post-job" className="text-indigo-600 hover:underline mt-2 inline-block">
              + დაამატეთ პირველი დავალება
            </Link>
          )}
          {!user && (
            <Link to="/login" className="text-indigo-600 hover:underline mt-2 inline-block">
              გაიარეთ ავტორიზაცია ყველა დავალების სანახავად
            </Link>
          )}
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
                    job.status === 'open' ? 'bg-green-100 text-green-800' : 
                    job.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {job.status === 'open' ? '🟢 ღია' : 
                     job.status === 'assigned' ? '🔄 მიმდინარე' :
                     job.status === 'completed' ? '🔒 დასრულებული' : '❌ გაუქმებული'}
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