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
  const [isLightBoxOpen, setIsLightBoxOpen] = useState<boolean>(false);

  const addCart = () => {
    if (quantity === 0) return;

    const newItem: CartItem = {
      id: 1,
      productName: "Fall Limited Edition Sneakers",
      price: 125.0,
      quantity: quantity,
      thumbnail: "/thumb1.jpg",
    };

    const existingItem = cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, newItem]);
    }

    setQuantity(0);
  };

  const removeItemFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];
  const thumbnails = [
    "/thumb1.jpg",
    "/thumb2.jpg",
    "/thumb3.jpg",
    "/thumb4.jpg",
  ];

  const nextImage = () => {
    if (mainImageIndex === images.length - 1) {
      setMainImageIndex(0);
    } else {
      setMainImageIndex(mainImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (mainImageIndex === 0) {
      setMainImageIndex(images.length - 1);
    } else {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  return (
    <div className="app-container">
      {/* ჰედერი */}
      <header className="app-header">
        <h1 className="logo">sneakers</h1>
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#collections" className="nav-link">Collections</a></li>
            <li className="nav-item"><a href="#men" className="nav-link">Men</a></li>
            <li className="nav-item"><a href="#women" className="nav-link">Women</a></li>
            <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
            <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        <div className="header-right">
          <button
            className="cart-toggle-btn"
            onClick={() => setIsCartOpened(!isCartOpened)}
          >
            <img src={"icon-cart.svg"} alt="cart" />
            {cartItems.length > 0 && (
              <span className="cart-badge">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          <img src={"avatar.png"} alt="avatar" className="user-avatar" />
        </div>

        {/* კალათის ჩამოსაშლელი ფანჯარა */}
        {isCartOpened && (
          <div className="cart-dropdown">
            <h3 className="cart-title">Cart</h3>
            <hr className="cart-divider" />
            {cartItems.length === 0 ? (
              <div className="cart-empty-container">
                <p className="cart-empty-msg">Your cart is empty.</p>
              </div>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img className="cart-item-img" src={item.thumbnail} alt={item.productName} />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.productName}</p>
                      <p className="cart-item-price">
                        ${item.price.toFixed(2)} x {item.quantity}{" "}
                        <strong className="total-price-text">
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </p>
                    </div>
                    <button className="cart-item-delete-btn" onClick={() => removeItemFromCart(item.id)}>
                      <img src={"/icon-delete.svg"} alt="delete" />
                    </button>
                  </div>
                ))}
                <button className="checkout-btn">Checkout</button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* მთავარი კონტენტი */}
      <main className="app-main">
        {/* მარცხენა სექცია: გალერეა */}
        <div className="product-gallery-section">
          <div className="main-image-container">
            <button className="open-lightbox-btn" onClick={() => setIsLightBoxOpen(true)}>
              <img src={images[mainImageIndex]} alt="Product" className="main-product-img" />
            </button>
          </div>

          <div className="thumbnails-container">
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                className={`thumbnail-btn ${mainImageIndex === index ? "active" : ""}`}
                onClick={() => setMainImageIndex(index)}
              >
                <img src={thumb} alt={`Thumbnail ${index + 1}`} className="thumbnail-img" />
              </button>
            ))}
          </div>
        </div>

        {/* მარჯვენა სექცია: ინფორმაცია და აღწერა */}
        <div className="product-info-section">
          <span className="company-name">SNEAKER COMPANY</span>
          <h2 className="product-title">Fall Limited Edition Sneakers</h2>
          <p className="product-description">
            These low-profile sneakers are your perfect casual wear companion. Featuring a durable 
            rubber outer sole, they'll withstand everything the weather can offer.
          </p>

          {/* ფასების ბლოკი */}
          <div className="price-block">
            <div className="current-price-row">
              <span className="current-price">$125.00</span>
              <span className="discount-badge">50%</span>
            </div>
            <span className="original-price">$250.00</span>
          </div>

          {/* მოქმედებების ბლოკი (ღილაკები გვერდიგვერდ) */}
          <div className="purchase-actions-row">
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => { if (quantity > 0) setQuantity(quantity - 1); }}
              >
                <img src={"icon-minus.svg"} alt="minus" />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
                <img src={"icon-plus.svg"} alt="plus" />
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={addCart}>
              <img src={"icon-cart.svg"} alt="cart" className="btn-icon" /> 
              Add to cart
            </button>
          </div>
        </div>

        {/* ლაითბოქსი (მოდალი) */}
        {isLightBoxOpen && (
          <div className="lightbox-overlay">
            <div className="lightbox-content">
              <button className="lightbox-close-btn" onClick={() => setIsLightBoxOpen(false)}>
                <img src="/icon-close.svg" alt="close" />
              </button>

              <div className="lightbox-image-container">
                <button className="lightbox-nav-btn prev-btn" onClick={prevImage}>
                  <img src={"/icon-previous.svg"} alt="prev" />
                </button>
                <img src={images[mainImageIndex]} alt="Product Large" className="lightbox-main-img" />
                <button className="lightbox-nav-btn next-btn" onClick={nextImage}>
                  <img src={"/icon-next.svg"} alt="next" />
                </button>
              </div>

              <div className="lightbox-thumbnails">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    className={`lightbox-thumbnail-btn ${mainImageIndex === index ? "active" : ""}`}
                    onClick={() => setMainImageIndex(index)}
                  >
                    <img src={thumb} alt={`Lightbox Thumbnail ${index + 1}`} className="lightbox-thumbnail-img" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;