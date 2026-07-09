import { useState } from "react";
import "./App.css";

// კალათის პროდუქტის ინტერფეისი
interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

function App() {
  // State ცვლადები
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false); // კალათის ფანჯრის სტატუსი (ღიაა/დახურულია)
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // კალათაში არსებული პროდუქტების სია
  const [quantity, setQuantity] = useState<number>(0); // პროდუქტის ასარჩევი რაოდენობა
  const [mainImageIndex, setMainImageIndex] = useState<number>(0); // მთავარი სურათის ინდექსი გალერეაში
  const [isLightBoxOpen, setIsLightBoxOpen] = useState<boolean>(false); // ლაითბოქსის (გადიდებული სურათის) სტატუსი

  // კალათაში პროდუქტის დამატების ფუნქცია
  const addCart = () => {
    // თუ რაოდენობა 0-ია, ფუნქცია წყვეტს მუშაობა
    if (quantity === 0) return;

    // ახალი პროდუქტის ობიექტის შექმნა
    const newItem: CartItem = {
      id: 1,
      productName: "Fall Limited Edition Sneakers",
      price: 125.0,
      quantity: quantity,
      thumbnail: "/thumb1.jpg",
    };

    // ვამოწმებთ, უკვე ხომ არ არის ეს პროდუქტი კალათაში
    const existingItem = cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      // თუ არსებობს, უბრალოდ ვუმატებთ ახალ რაოდენობას არსებულს
      setCartItems(
        cartItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      // თუ არ არსებობს, ვამატებთ ახალ პროდუქტს მასივში
      setCartItems([...cartItems, newItem]);
    }

    // დამატების შემდეგ ვანულებთ შერჩეულ რაოდენობას
    setQuantity(0);
  };

  // კალათიდან პროდუქტის წაშლის ფუნქცია აიდის მიხედვით
  const removeItemFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // სურათების და მინიატურების მასივები
  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];
  const thumbnails = [
    "/thumb1.jpg",
    "/thumb2.jpg",
    "/thumb3.jpg",
    "/thumb4.jpg",
  ];

  // შემდეგ სურათზე გადასვლის ლოგიკა
  const nextImage = () => {
    if (mainImageIndex === images.length - 1) {
      setMainImageIndex(0); // თუ ბოლო სურათია, ვბრუნდებით პირველზე[cite: 1]
    } else {
      setMainImageIndex(mainImageIndex + 1); // წინააღმდეგ შემთხვევაში გადავდივართ შემდეგზე[cite: 1]
    }
  };

  // წინა სურათზე დაბრუნების ლოგიკა
  const prevImage = () => {
    if (mainImageIndex === 0) {
      setMainImageIndex(images.length - 1); // თუ პირველი სურათია, გადავდივართ ბოლოზე[cite: 1]
    } else {
      setMainImageIndex(mainImageIndex - 1); // წინააღმდეგ შემთხვევაში ვბრუნდებით უკან[cite: 1]
    }
  };

  return (
    <div className="app-container">
      {/* ჰედერი და ნავიგაცია */}
      <header className="app-header">
        <h1 className="logo">Sneakers</h1>
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="collections" className="nav-link">
                Collections
              </a>
            </li>
            <li className="nav-item">
              <a href="men" className="nav-link">
                Men
              </a>
            </li>
            <li className="nav-item">
              <a href="women" className="nav-link">
                Women
              </a>
            </li>
            <li className="nav-item">
              <a href="about" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* კალათის ღილაკი */}
        <div className="cart-toggle-container">
          <button
            className="cart-toggle-btn"
            onClick={() => setIsCartOpened(!isCartOpened)}
          >
            <img src={"icon-cart.svg"} alt="icon-cart" />
          </button>
        </div>

        {/* კალათის ჩამოსაშლელი ფანჯარა */}
        {isCartOpened && (
          <div className="cart-dropdown">
            <h3 className="cart-title">Cart</h3>
            <hr className="cart-divider" />
            {cartItems.length === 0 ? (
              <p className="cart-empty-msg">Your cart is empty.</p>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      className="cart-item-img"
                      src={"/thumb1.jpg"}
                      alt={item.productName}
                    />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.productName}</p>
                      <p className="cart-item-price">
                        ${item.price.toFixed(2)} x {item.quantity}{" "}
                        <strong>
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </p>
                    </div>
                    <button
                      className="cart-item-delete-btn"
                      onClick={() => {
                        removeItemFromCart(item.id);
                      }}
                    >
                      <img src={"/icon-delete.svg"} alt="delete" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* მთავარი კონტენტი */}
      <main className="app-main">
        {/* მარცხენა მხარე: სურათების გალერეა */}
        <div className="product-gallery">
          <div className="main-image-container">
            <button
              className="open-lightbox-btn"
              onClick={() => setIsLightBoxOpen(true)}
            >
              <img
                src={images[mainImageIndex] || "/thumb1.jpg"} // default fallback
                alt="Product"
                className="main-product-img"
              />
            </button>
          </div>

          <div className="thumbnails-container">
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                className={`thumbnail-btn ${mainImageIndex === index ? "active" : ""}`}
                onClick={() => setMainImageIndex(index)}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-img"
                />
              </button>
            ))}
          </div>
        </div>

        {/* მარჯვენა მხარე: პროდუქტის ინფორმაცია */}
        <div className="product-info">
          <h4 className="company-name">SNEAKER COMPANY</h4>
          <h2 className="product-title">Fall Limited Edition Sneakers</h2>
          <p className="product-description">
            These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.
          </p>
          
          <div className="price-container">
            <div className="current-price-wrapper">
              <span className="current-price">$125.00</span>
              <span className="discount-badge">50%</span>
            </div>
            <span className="original-price">$250.00</span>
          </div>

          <div className="actions-container">
            <div className="quantity-controls">
              <button
                className="quantity-btn minus-btn"
                onClick={() => {
                  if (quantity > 0) setQuantity(quantity - 1);
                }}
              >
                <img src={"/icon-minus.svg"} alt="minus" />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-btn plus-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                <img src={"/icon-plus.svg"} alt="plus" />
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={addCart}>
              <img src={"/icon-cart.svg"} alt="cart" className="btn-icon" /> 
              Add to cart
            </button>
          </div>
        </div>

        {/* მოდალური ფანჯარა (Lightbox) */}
        <div className="lightbox-wrapper">
          {isLightBoxOpen && (
            <div className="lightbox-overlay">
              <div className="lightbox-content">
                <button
                  className="lightbox-close-btn"
                  onClick={() => setIsLightBoxOpen(false)}
                >
                 <img src={"/icon-close.svg"} alt="close" />
                </button>
                <button
                  className="lightbox-nav-btn prev-btn"
                  onClick={prevImage}
                >
                  <img src={"/icon-previous.svg"} alt="prev" />
                </button>
                <img
                  src={images[mainImageIndex] || "/thumb1.jpg"}
                  alt="Product Large"
                  className="lightbox-main-img"
                />
                <button
                  className="lightbox-nav-btn next-btn"
                  onClick={nextImage}
                >
                  <img src={"/icon-next.svg"} alt="next" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
