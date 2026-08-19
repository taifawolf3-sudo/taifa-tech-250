import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) {
  const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 5000 : 0;
  const total = subtotal + delivery;

  if (!cart.length) return (
    <main className="cart-page empty-cart">
      <h1>Your Cart is Empty</h1>
      <p>Add products from TAIFA TECH 250 Shop.</p>
      <Link to="/" className="continue-button">Continue Shopping</Link>
    </main>
  );

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.price.toLocaleString()} RWF</p>
                <div className="quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
              <strong>{(item.price * item.quantity).toLocaleString()} RWF</strong>
            </div>
          ))}
        </section>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div><span>Subtotal</span><strong>{subtotal.toLocaleString()} RWF</strong></div>
          <div><span>Delivery</span><strong>{delivery.toLocaleString()} RWF</strong></div>
          <hr />
          <div className="total"><span>Total</span><strong>{total.toLocaleString()} RWF</strong></div>
          <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
        </aside>
      </div>
    </main>
  );
}