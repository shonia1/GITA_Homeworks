import { useState } from "react";
import "./App.css";

interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

function App() {
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  return (
    <>
      <header>
        <h1>Sneakers</h1>
        <nav>
          <ul>
            <li>
              <a href="collections">Collections</a>
            </li>
            <li>
              <a href="men">Men</a>
            </li>
            <li>
              <a href="women">Women</a>
            </li>
            <li>
              <a href="about">About</a>
            </li>
            <li>
              <a href="contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div>
          <button onClick={() => setIsCartOpened(!isCartOpened)}>Cart</button>
          <img src="" alt="cart-icon" />
        </div>
        {isCartOpened && (
          <div>
            <h3>Cart</h3>
            <hr />
          </div>
        )}
      </header>
    </>
  );
}

export default App;
