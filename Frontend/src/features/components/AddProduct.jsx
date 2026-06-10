import { useState } from "react";
import "./style/AddProduct.css";
import { useNavigate } from "react-router";
import useProduct from "../hooks/useProduct";

export default function AddProduct() {
  const [productImage, setProductImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDecsription, setProductDecsription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const { handleProduct, loading } = useProduct();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDecsription", productDecsription);
    formData.append("category", category);
    formData.append("stock", stock);

    await handleProduct(formData);
    navigate("/");
  };

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="product-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2 className="product-title">Add Product</h2>

        {/* Product Image */}
        <div className="form-group">
          <label className="form-label">Product Image</label>
          <input
            onChange={(e) => {
              setProductImage(e.target.files[0]);
            }}
            type="file"
            name="productImage"
            className="form-input file-input"
            required
          />
        </div>

        {/* Product Name */}
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            type="text"
            name="productName"
            placeholder="Enter product name"
            className="form-input"
            required
          />
        </div>

        {/* Product Price */}
        <div className="form-group">
          <label className="form-label">Product Price</label>
          <input
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            type="number"
            name="productPrice"
            placeholder="Enter product price"
            className="form-input"
            required
          />
        </div>

        {/* Product Description */}
        <div className="form-group">
          <label className="form-label">Product Description</label>
            <textarea
            onChange={(e) => {
              setProductDecsription(e.target.value);
            }}
            name="productDecsription"
            rows="4"
            placeholder="Enter product description"
            className="form-textarea"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label">Category</label>

          <select
            name="category"
            className="form-select"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
            <option value="books">Books</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        {/* Stock */}
        <div className="form-group">
          <label className="form-label">Stock</label>
          <input
            onChange={(e) => {
              setStock(e.target.value);
            }}
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

