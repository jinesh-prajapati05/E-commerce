import { useContext } from "react";
import useAuthUser from "../../auth/hooks/authUser";
import useProduct from "../hooks/useProduct";
import "./ProductCard.css";
import { ProductContext } from "../productContext";
import { Link } from "react-router";
// import { useNavigate } from "react-router";

const readCart = () => {
  try {
    const raw = localStorage.getItem("cart");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function ProductCard({ product }) {
  const { user } = useAuthUser();
  const { handleDelete, getProduct } = useProduct();
  const { setCartCount, } = useContext(ProductContext);
//   const navigate = useNavigate()

  const deleteP = async (id) => {
    await handleDelete(id);
    getProduct()
  };

  const addedProduct = () => {
    const currentCart = readCart();
    const updateCart = [...currentCart, product];
    localStorage.setItem("cart", JSON.stringify(updateCart));
    setCartCount(updateCart.length);
    alert("Added successfully");
  };

  const description = product.productDecsription ?? product.productDescription ?? "";

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.productImage}
          alt={product.productName}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <div className="product-header">
          <h3 className="product-name">{product.productName}</h3>
          <span className="product-category">{product.category}</span>
        </div>

        <p className="product-description">{description}</p>

        <div className="product-footer">
          <div className="product-price-section">
            <span className="price-label">Price</span>
            <h4 className="product-price">₹{product.productPrice}</h4>
          </div>

          <div className="stock-section">
            <span className="stock-label">Stock</span>
            <span className="stock-count">{product.stock}</span>
          </div>
        </div>

        <div className="product-actions">
          <button className="cart-btn" onClick={addedProduct}>
            Add To Cart
          </button>
          {user?.role === "admin" ? (
            <>
              <button className="edit-btn">
                <Link to={`/update?id=${product._id}`}>Edit</Link>
              </button>
              <button className="delete-btn" onClick={() => deleteP(product._id)}>
                Delete
              </button>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
