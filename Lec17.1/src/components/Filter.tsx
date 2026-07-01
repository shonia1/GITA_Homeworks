import type { Dispatch, SetStateAction } from "react";
import type { IProduct } from "../IProduct";

// ფილტრის კომპონენტის props-ების ტიპი
interface FilterProps {
  productData: IProduct[];
  filterBar: string;
  setFilterBar: Dispatch<SetStateAction<string>>;
  filterCategory: string;
  setFilterCategory: Dispatch<SetStateAction<string>>;
}

export default function Filter({
  productData,
  filterBar,
  setFilterBar,
  filterCategory,
  setFilterCategory,
}: FilterProps) {
  // უნიკალური კატეგორიების მასივი პროდუქციიდან
  const uniqueCattegoryList = new Set(
    productData.map((product) => product.category),
  );

  const cattegoryArray = [...uniqueCattegoryList];

  return (
    <div className="filter-panel">
      {/* კატეგორიის არჩევის სელექტორი */}
      <select
        className="select-category"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">Cattegory</option>
        {cattegoryArray.map((cattegory) => (
          <option key={cattegory} value={cattegory}>
            {cattegory}
          </option>
        ))}
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
