import { useEffect, useState } from "react";
import axios from "axios";
import type { IProduct } from "./IProduct";
import "./App.css";
import Filter from "./components/filter";

// მთავარი კომპონენტი, რომელიც პროდუქციის სიას აჩვენებს
export default function App() {
  // პროდუქციის მონაცემების შენახვა state-ში
  const [productData, setProductData] = useState<IProduct[]>([]);

  useEffect(() => {
    // ვაძლევთ გვერდის სათაურს
    document.title = "Product Catalog";
    const fetchProducts = async () => {
      // API-დან ვიღებთ პროდუქციის სიას
      const response = await axios.get<IProduct[]>(
        "https://fakestoreapi.com/products",
      );
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
      <Filter
        filterBar={filterBar}
        setFilterBar={setFilterBar}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      {/* ფილტრირებული პროდუქციების ჩვენება */}
      {filteredProducts.map((product) => (
        <li key={product.id}>
          {product.title} - {product.price}$
        </li>
      ))}
    </div>
  );
}
