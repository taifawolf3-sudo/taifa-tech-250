import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("MTN MoMo");
  const [form, setForm] = useState({ name:"", phone:"", email:"", district:"", address:"" });

  const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 5000 : 0;
  const total = subtotal + delivery;

  const change = (e) => setForm({...form, [e.target.name]: e.target.value});

  const submit = (e) => {
    e.preventDefault();
    alert(`Order received!\\nPayment: ${payment}\\nTotal: ${total.toLocaleString()} RWF`);
    clearCart();
    navigate("/");
  };

  if (!cart.length) return (
    <main className="checkout-page">
      <h1>No items to checkout</h1>
      <Link to="/" className="back-shop">Go to Shop</Link>
    </main>
  );

  return (
    <main className="checkout-page">
      <h1>TAIFA TECH 250 Checkout</h1>
      <form onSubmit={submit}>
        <div className="checkout-layout">
          <section className="customer-form">
            <h2>Customer Information</h2>
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={change} required placeholder="Enter your full name" />
            <label>Phone Number</label>
            <input name="phone" value={form.phone} onChange={change} required placeholder="07XXXXXXXX" />
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={change} placeholder="example@email.com" />
            <label>District</label>
            <input name="district" value={form.district} onChange={change} required placeholder="Kigali / Kayonza / ..." />
            <label>Delivery Address</label>
            <textarea name="address" value={form.address} onChange={change} required placeholder="Enter delivery address" />

            <h2>Payment Method</h2>
            <label className="payment-option">
              <input type="radio" name="payment" value="MTN MoMo" checked={payment === "MTN MoMo"} onChange={(e)=>setPayment(e.target.value)} />
              <span>🟡 MTN MoMo</span>
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" value="Airtel Money" checked={payment === "Airtel Money"} onChange={(e)=>setPayment(e.target.value)} />
              <span>🔴 Airtel Money</span>
            </label>
          </section>

          <aside className="checkout-summary">
            <h2>Your Order</h2>
            {cart.map(item => (
              <div className="order-item" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>{(item.price * item.quantity).toLocaleString()} RWF</strong>
              </div>
            ))}
            <hr />
            <div><span>Subtotal</span><strong>{subtotal.toLocaleString()} RWF</strong></div>
            <div><span>Delivery</span><strong>{delivery.toLocaleString()} RWF</strong></div>
            <div className="checkout-total"><span>Total</span><strong>{total.toLocaleString()} RWF</strong></div>
            <button type="submit" className="place-order">Place Order</button>
          </aside>
        </div>
      </form>
    </main>
  );
}