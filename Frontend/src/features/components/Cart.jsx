
import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import Navbar from "./Navbar";
import { ProductContext } from "../productContext";

const readCart = () => {
  try {
    const raw = localStorage.getItem("cart");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function Cart() {
  const { setCartCount } = useContext(ProductContext);
  const [cart, setCart] = useState(() => readCart());

  useEffect(() => {
    setCartCount(cart.length);
  }, []);

  const handleRemove = (idx) => {
    const nextCart = cart.filter((_, i) => i !== idx);
    setCart(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
    setCartCount(nextCart.length);
  };

  return (
    <div className="cart-container">
      <Navbar />

      <h1 className="cart-title">My Cart</h1>

      <h2 className="cart-total">
        Total: ₹{cart.reduce((sum, pro) => sum + (Number(pro.productPrice) || 0), 0)}
      </h2>

      <div className="cart-products">
        {cart.map((pro, idx) => {
          const description = pro.productDecsription ?? pro.productDescription ?? "";
          return (
            <div className="cart-card" key={idx}>
              <div className="cart-image-wrapper">
                <img
                  src={pro.productImage}
                  alt={pro.productName}
                  className="cart-image"
                />
              </div>

              <div className="cart-content">
                <h2 className="cart-product-name">{pro.productName}</h2>

                <p className="cart-description">{description}</p>

                <div className="cart-details">
                  <span className="cart-category">{pro.category}</span>
                  <span className="cart-stock">Stock: {pro.stock}</span>
                </div>

                <h3 className="cart-price">₹{pro.productPrice}</h3>

                <button className="remove-btn" onClick={() => handleRemove(idx)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
