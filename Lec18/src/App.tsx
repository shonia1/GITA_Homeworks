import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import type { IUser } from "./IUser";
import "./index.css";
import SearchForm from "./components/SearchForm";
import ProfileCard from "./components/ProfileCard";

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
        `https://api.github.com/users/${username}`,
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
    const init = async () => {
      await fetchUser("shonia1");
    };

    void init();
  }, []);

  //სერჩ ბათონის გაჰენდვლა
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim().length <= 0) return; // თუ ველი ცარიელია, არაფერს ვაკეთებთ

    fetchUser(searchQuery); // ვიძახებთ ძებნის ფუნქციას ჩაწერილი ტექსტით
  };

  const profileCardData = userData
    ? {
        ...userData,
        name: userData.name ?? undefined,
        company: userData.company ?? undefined,
        location: userData.location ?? undefined,
        bio: userData.bio ?? undefined,
        twitter_username: userData.twitter_username ?? undefined,
        blog: userData.blog ?? undefined,
      }
    : null;

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

      <SearchForm
        handleSubmit={handleSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasError={hasError}
        setHasError={setHasError}
      />

      {profileCardData && (
        <ProfileCard userData={profileCardData} formatDate={formatDate} />
      )}
    </main>
  );
}
