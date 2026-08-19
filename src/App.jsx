import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return current;
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) =>
    setCart((current) => current.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="logo">TAIFA TECH <span>250</span></Link>
        <nav>
          <Link to="/">Shop</Link>
          <Link to="/cart">Cart 🛒 <b>{cartCount}</b></Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Shop addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
      </Routes>

      <footer>
        <h3>TAIFA TECH 250</h3>
        <p>Technology • Electronics • Innovation</p>
        <p>© 2026 TAIFA TECH 250</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;