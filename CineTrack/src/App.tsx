import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import axios from "axios";
import type { IMovie } from "./IMovies";

// მთავარი აპლიკაციის კომპონენტი
function App() {
  // ძებნის შესანახი state (input-ის ტექსტი)
  const [searchQuery, setSearchQuery] = useState("");

  // დატვირთვის ინდიკატორი
  const [loading, setLoading] = useState(false);

  // მიღებული ფილმების სია API-დან
  const [moviesData, setMoviesData] = useState<IMovie[]>([]);

  // ფილმების გამორკვევა: თუ query ცარიელია, ვიღებთ ტრენდინგ ფილმებს, სხვა შემთხვევაში - ძებნა
  const fetchMovies = async (query: string) => {
    const url = !query
      ? "https://api.themoviedb.org/3/trending/movie/week?api_key=662f38bcc130692e7689fe96ae5b3efd"
      : `https://api.themoviedb.org/3/search/movie?api_key=662f38bcc130692e7689fe96ae5b3efd&query=${query}`;

    const response = await axios.get(url);
    // API-დან მიღებული შედეგები ინახება state-ში
    setMoviesData(response.data.results);
  };

  // კომპონენტის mount-ზე ინიციალური ფილმების ასინქრონულად ჩატვირთვა
  useEffect(() => {
    const init = async () => {
      await fetchMovies("");
    };

    void init();
  }, []);

  // ძებნის ფორმის ჰენდლერი: გადააცემა query და შედეგების დატვირთვა
  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // თუ ძებნის ველი ცარიელია, არაფერს ვაკეთებთ
    if (searchQuery.trim().length === 0) return;

    setLoading(true);
    await fetchMovies(searchQuery);
    setLoading(false);
  };

  return (
    <main>
      {/* ძებნის ფორმა */}
      <form onSubmit={handleSearch} className="search-form">
        {/* ტექსტური ველი სადაც მომხმარებელი შეიყვანს მოძებნად ტექსტს */}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          placeholder="Search movies..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {/* ფილმების სია */}
      <div className="app-container">
        {moviesData.map((movie) => (
          <div key={movie.id} className="movie-card">
            {/* პოსტერის გამოსახულება */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            {/* სათაური */}
            <h1 className="movie-title">{movie.title}</h1>
            {/* რეიტინგი (ერთი ტკილი) */}
            <p className="movie-rating">{movie.vote_average.toFixed(1)}</p>
            {/* გამოსვლის თარიღი */}
            <p className="movie-release">{movie.release_date}</p>
            <button className="watchlist-button">+ Add to Watchlist</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
