import "../styles/searchBar.css";

// SearchBar კომპონენტს გადაეცემა საძიებო ტექსტი და მისი ცვლილების ფუნქცია
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <div className="search-container">
      {/* საძიებო ველი, რომლის მეშვეობით მომხმარებელი აკრეფს საძიებო სიტყვას */}
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
