import "../App.css";
//import { useState } from "react";

export default function ProductCard({ product, addCart }) {
  const isSmartphone = product.category === "smartphone";
  /* const isConsole = products.category === "gaming console";
  const isTv = products.category === "tv";
  const isLaptop = products.category === "laptop"; */
  return (
    <>
      <li 
        className={`product-card ${isSmartphone ? "smartphone-card" : ""}`}
        key={product.id}
      >
        <img src={product.photo} alt={product.title} />
        <h3>{product.title}</h3>
        <strong>{product.price}</strong>
        <button className="add-btn" onClick={addCart}>
          Add to Cart
        </button>
      </li>
    </>
  );
}
