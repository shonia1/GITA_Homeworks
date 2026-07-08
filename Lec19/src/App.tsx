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

  const addCart = () => {
    if(quantity === 0) return;

    const newItem: CartItem = {
      id: 1,
      productName: "Fall Limited Edition Sneakers",
      price: 125.00,
      quantity: quantity,
      thumbnail: ""
    }

    const existingItem = cartItems.find((item) => item.id === newItem.id)

    if (existingItem) {
      setCartItems(cartItems.map((item) => (
        item.id === newItem.id
        ? {...item, quantity : item.quantity + quantity}
        : item
      )))
    } else {
      setCartItems([...cartItems, newItem])
    }

    setQuantity(0)
  }
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
            {cartItems.length === 0 ? "Your cart is empty." : []}
          </div>
        )}
      </header>

      <main>
        <button onClick={() => {
          if(quantity > 0)setQuantity(quantity - 1)
        }}>-</button>
        {quantity}
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </main>
    </>
  );
}

export default App;
