import "../styles/searchBar.css"

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        className="search-bar"
        placeholder="ჩაწერეთ საძიებო სახელი ..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
