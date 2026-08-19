import { useState } from "react";
import products from "../data/products";
import "./Shop.css";

const categories = ["All Products","Computers","Phones","Phone Accessories","Electronics","Electrical Tools","Arduino & Sensors","Smart Home"];

export default function Shop({ addToCart }) {
  const [category, setCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  let filtered = products.filter((p) =>
    (category === "All Products" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "low") filtered.sort((a,b) => a.price - b.price);
  if (sort === "high") filtered.sort((a,b) => b.price - a.price);

  return (
    <main className="shop">
      <section className="hero">
        <h1>Welcome to TAIFA TECH 250</h1>
        <p>Computers, Phones, Electronics and Technology Accessories.</p>
      </section>

      <section className="controls">
        <input placeholder="🔎 Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort Products</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </section>

      <section className="categories">
        {categories.map((item) => (
          <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </section>

      <section className="product-grid">
        {filtered.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              {product.stock <= 5 && <span className="stock-label">Only {product.stock} left</span>}
            </div>
            <div className="product-content">
              <small>{product.category}</small>
              <h3>{product.name}</h3>
              <strong>{product.price.toLocaleString()} RWF</strong>
              <p className="in-stock">✓ In Stock: {product.stock}</p>
              <button className="add-button" onClick={() => addToCart(product)}>🛒 Add to Cart</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}