import { useState } from "react";

import ProductCard from "./Components/ProductCard";
import products from "./Products";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const handleAddCart = () => {
    setCartCount((prevCart) => prevCart + 1);
  };

  return (
    <div className="app-container">
      <header className="cart-header">
        <p>
          🛒 Cart: <strong>{cartCount}</strong> items
        </p>
      </header>
      <ul className="products-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addCart={handleAddCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
