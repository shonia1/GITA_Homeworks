import axios from "axios";
import { useEffect, useState } from "react";
import type { IUser } from "./IUser";
import "./index.css";

export default function App() {
  //სთეითები
  const [userData, setUserData] = useState<IUser | null>(null); 
  const [searchQuery, setSearchQuery] = useState<string>(""); // ინახავს საძიებო ველში ჩაწერილ ტექსტს
  const [hasError, setHasError] = useState<boolean>(false); // აკონტროლებს "No results" ერორი
  const [darkMode, setDarkMode] = useState<boolean>(false); // აკონტროლებს Dark/Light რეჟიმებს

  //Dark/Light რეჟიმის გადამრთველი ეფექტ
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  //მომხმარებლის ძებნის ფუნქცია
  const fetchUser = async (username: string) => {
    try {
      const response = await axios.get<IUser>(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data); // წარმატების შემთხვევაში მონაცემებს ვინახავთ სთეითში
      setHasError(false); // და ერორს ვაქრობთ
    } catch (error) {
      console.error("Error fetching user data:", error);
      setHasError(true); // თუ 404 დაბრუნდა ვრთავთ ერორს
    }
  };

  //საწყისი ჩატვირთვa
  useEffect(() => {
    fetchUser("shonia1");
  }, []); 

  //სერჩ ბათონის გაჰენდვლა
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (searchQuery.trim().length <= 0) return; // თუ ველი ცარიელია, არაფერს ვაკეთებთ
    
    fetchUser(searchQuery); // ვიძახებთ ძებნის ფუნქციას ჩაწერილი ტექსტით
  };

  //თარიღის ფორმატირება
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="app">
      {/*ჰედერი*/}
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

      {/*ძებნის ფორმა*/}
      <form className="search-form" onSubmit={handleSubmit}>
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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // თუ ერორი ანთებულია, ბეჭდვის დაწყებისთანავე გაქრება
              if (hasError) setHasError(false); 
            }}
          />
        </div>

        {/* თუ მომხმარებელი ვერ მოიძებნა, გამოჩნდება ერორის ტექსტი */}
        {hasError && <span className="search-error">No results</span>}

        <button type="submit" className="search-form-button">
          Search
        </button>
      </form>

      {/*პროფილის ბარათი
          (რენდერდება მხოლოდ მაშინ, თუ მონაცემები წარმატებით ჩაიტვირთა) */}
      {userData && (
        <article className="profile-card">
          
          {/* მარცხენა მხარე: ავატარი */}
          <div className="profile-left">
            <img
              className="profile-card-photo"
              src={userData.avatar_url}
              alt={userData.login}
            />
          </div>

          {/* მარჯვენა მხარე: სრული ინფორმაცია */}
          <div className="profile-right">
            <div className="profile-card-header">
              <div className="profile-title-info">
                {/* თუ სახელი არ აქვს მითითებული, გამოჩნდება იუზერნეიმი */}
                <h2 className="profile-card-name">
                  {userData.name || userData.login}
                </h2>
                <a
                  href={`https://github.com/${userData.login}`}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-card-handle"
                >
                  @{userData.login}
                </a>
              </div>
              <p className="profile-card-joined">
                Joined {formatDate(userData.created_at)}
              </p>
            </div>

            {/* ბიოგრაფია - თუ არ აქვს, ვამატებთ no-bio კლასს, რომ ოდნავ გავაღიავოთ ტექსტი */}
            <p className={`profile-card-bio ${!userData.bio ? "no-bio" : ""}`}>
              {userData.bio || "This profile has no bio"}
            </p>

            {/* სტატისტიკის პანელი */}
            <ul className="profile-card-stats">
              <li className="stat-item">
                <span className="stat-label">Repos</span>
                <span className="stat-value">{userData.public_repos}</span>
              </li>
              <li className="stat-item">
                <span className="stat-label">Followers</span>
                <span className="stat-value">{userData.followers}</span>
              </li>
              <li className="stat-item">
                <span className="stat-label">Following</span>
                <span className="stat-value">{userData.following}</span>
              </li>
            </ul>

            {/* სოციალური და დამატებითი ბმულები */}
            <ul className="profile-card-links">
              {/* თუ ლოკაცია არაა მითითებული, ვამატებთ disabled კლასს */}
              <li className={`link-item ${!userData.location ? "disabled" : ""}`}>
                <img src="/location-icon.svg" alt="location" />
                <span>{userData.location || "Not Available"}</span>
              </li>

              <li className={`link-item ${!userData.twitter_username ? "disabled" : ""}`}>
                <img src="/twitter-icon.svg" alt="twitter" />
                {userData.twitter_username ? (
                  <a
                    href={`https://twitter.com/${userData.twitter_username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userData.twitter_username}
                  </a>
                ) : (
                  <span>Not Available</span>
                )}
              </li>

              <li className={`link-item ${!userData.blog ? "disabled" : ""}`}>
                <img src="/website-icon.svg" alt="website" />
                {userData.blog ? (
                  <a
                    href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userData.blog}
                  </a>
                ) : (
                  <span>Not Available</span>
                )}
              </li>

              <li className={`link-item ${!userData.company ? "disabled" : ""}`}>
                <img src="/company-icon.svg" alt="company" />
                <span>{userData.company || "Not Available"}</span>
              </li>
            </ul>
          </div>
        </article>
      )}
    </main>
  );
}