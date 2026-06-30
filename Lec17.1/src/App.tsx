import { useEffect, useState } from "react";
import axios from "axios";
import type { IProduct } from "./IProduct";
import "./App.css";

// მთავარი კომპონენტი, რომელიც პროდუქციის სიას აჩვენებს
export default function App() {
  // პროდუქციის მონაცემების შენახვა state-ში
  const [productData, setProductData] = useState<IProduct[]>([]);

  useEffect(() => {
    // ვაძლევთ გვერდის სათაურს
    document.title = "Product Catalog";
    const fetchProducts = async () => {
      // API-დან ვიღებთ პროდუქციის სიას
      const response = await axios.get("https://fakestoreapi.com/products");
      // მიღებულ მონაცემებს ვუშვებთ state-ში
      setProductData(response.data);
    };

    fetchProducts();
  }, []);

  // ძებნის ველის მნიშვნელობა
  const [filterBar, setFilterBar] = useState("");

  // კატეგორიის ფილტრის მნიშვნელობა
  const [filterCategory, setFilterCategory] = useState("");

  // ფილტრირებული პროდუქციების სია
  const filteredProducts = productData.filter(
    (product) =>
      product.title.toLowerCase().includes(filterBar.toLowerCase()) &&
      (filterCategory === "" || product.category === filterCategory),
  );

  return (
    <div>
      {/* ტექსტური ველი პროდუქციის ძებნისთვის */}
      <input
        type="text"
        value={filterBar}
        onChange={(e) => setFilterBar(e.target.value)}
      />
      {/* კატეგორიის არჩევის სელექტორი */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">ყველა</option>
        <option value="electronics">ელექტრონიკა</option>
        <option value="jewelery">იუველირული ნაწარმი</option>
      </select>
      {/* ფილტრირებული პროდუქციების ჩვენება */}
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.title} - {product.price}$</li>
      ))}
    </div>
  );
}
