import type { FormEvent, Dispatch, SetStateAction } from "react";

interface SearchFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
}

export default function SearchForm({
  handleSubmit,
  searchQuery,
  setSearchQuery,
  hasError,
  setHasError,
}: SearchFormProps) {
  return (
    <>
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
    </>
  );
}
