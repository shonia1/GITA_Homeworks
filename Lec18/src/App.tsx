import axios from "axios";
import { useEffect, useState } from "react";
import type { IUser } from "./IUser";
import "./index.css";

export default function App() {
  const [userData, setUserData] = useState<IUser[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Dark/Light რეჟიმის გადამრთველი ეფექტი
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // მონაცემების მიღება
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          "https://api.github.com/users/shonia1"
        );
        setUserData([response.data]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // თარიღის ფორმატირება (მაგ: Joined 25 Jan 2011)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {userData.map((user) => (
        <main key={user.id} className="app">
          {/* ჰედერი */}
          <header className="app-header">
            <h1 className="app-title">devfinder</h1>
            <button 
              type="button" 
              className="app-theme-button"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <>
                  LIGHT <img src="/sun-icon.svg" alt="sun-icon" />
                </>
              ) : (
                <>
                  DARK <img src="/moon-icon.svg" alt="moon-icon" />
                </>
              )}
            </button>
          </header>

          {/* ძებნის ინფუთი */}
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <div className="search-input-container">
              <img
                className="search-icon"
                src="/search-icon.svg"
                alt="search-icon"
              />
              <input
                id="github-search"
                className="search-form-input"
                placeholder="Search GitHub username..."
              />
            </div>
            <button type="submit" className="search-form-button">
              Search
            </button>
          </form>

          {/* პროფილის ბარათი */}
          <article className="profile-card">
            {/* მარცხენა მხარე: ავატარი */}
            <div className="profile-left">
              <img
                className="profile-card-photo"
                src={user.avatar_url}
                alt={user.login}
              />
            </div>

            {/* მარჯვენა მხარე: სრული ინფორმაცია */}
            <div className="profile-right">
              <div className="profile-card-header">
                <div className="profile-title-info">
                  <h2 className="profile-card-name">{user.name || user.login}</h2>
                  <a 
                    href={`https://github.com/${user.login}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="profile-card-handle"
                  >
                    @{user.login}
                  </a>
                </div>
                <p className="profile-card-joined">
                  Joined {formatDate(user.created_at)}
                </p>
              </div>

              <p className={`profile-card-bio ${!user.bio ? "no-bio" : ""}`}>
                {user.bio || "This profile has no bio"}
              </p>

              {/* სტატისტიკა */}
              <ul className="profile-card-stats">
                <li className="stat-item">
                  <span className="stat-label">Repos</span>
                  <span className="stat-value">{user.public_repos}</span>
                </li>
                <li className="stat-item">
                  <span className="stat-label">Followers</span>
                  <span className="stat-value">{user.followers}</span>
                </li>
                <li className="stat-item">
                  <span className="stat-label">Following</span>
                  <span className="stat-value">{user.following}</span>
                </li>
              </ul>

              {/* სოციალური ბმულები */}
              <ul className="profile-card-links">
                <li className={`link-item ${!user.location ? "disabled" : ""}`}>
                  <img src="/location-icon.svg" alt="location" />
                  <span>{user.location || "Not Available"}</span>
                </li>
                
                <li className={`link-item ${!user.twitter_username ? "disabled" : ""}`}>
                  <img src="/twitter-icon.svg" alt="twitter" />
                  {user.twitter_username ? (
                    <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noreferrer">
                      {user.twitter_username}
                    </a>
                  ) : (
                    <span>Not Available</span>
                  )}
                </li>

                <li className={`link-item ${!user.blog ? "disabled" : ""}`}>
                  <img src="/website-icon.svg" alt="website" />
                  {user.blog ? (
                    <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer">
                      {user.blog}
                    </a>
                  ) : (
                    <span>Not Available</span>
                  )}
                </li>

                <li className={`link-item ${!user.company ? "disabled" : ""}`}>
                  <img src="/company-icon.svg" alt="company" />
                  <span>{user.company || "Not Available"}</span>
                </li>
              </ul>
            </div>
          </article>
        </main>
      ))}
    </>
  );
}