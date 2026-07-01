import type { Dispatch, SetStateAction } from "react";

interface FilterProps {
  filterBar: string;
  setFilterBar: Dispatch<SetStateAction<string>>;
  filterCategory: string;
  setFilterCategory: Dispatch<SetStateAction<string>>;
}

export default function Filter({
  filterBar,
  setFilterBar,
  filterCategory,
  setFilterCategory,
}: FilterProps) {
  return (
    <div>
      {/* კატეგორიის არჩევის სელექტორი */}
      <select
        className="select-category"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">კატეგორია</option>
        <option value="electronics">ელექტრონიკა</option>
        <option value="jewelery">იუველირული ნაწარმი</option>
        <option value="men's clothing">მამაკაცის ტანსაცმელი</option>
        <option value="women's clothing">ქალის ტანსაცმელი</option>
      </select>

      {/* ტექსტური ველი პროდუქციის ძებნისთვის */}
      <input
        className="search-bar"
        type="text"
        value={filterBar}
        onChange={(e) => setFilterBar(e.target.value)}
      />
    </div>
  );
}
