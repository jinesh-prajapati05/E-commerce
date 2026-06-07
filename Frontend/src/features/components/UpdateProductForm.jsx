import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useProduct from "../hooks/useProduct";
import { useContext } from "react";
import { ProductContext } from "../productContext";
import "./AddProduct.css";

export default function UpdateProductForm() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();
  const { handleUpdate, loading } = useProduct();
  const { product } = useContext(ProductContext);

  const selectedProduct = useMemo(() => {
    if (!id || !Array.isArray(product)) return null;
    return product.find((p) => String(p._id) === String(id)) || null;
  }, [id, product]);

  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState(selectedProduct?.productName || "");
  const [productPrice, setProductPrice] = useState(
    selectedProduct?.productPrice ?? ""
  );
  const [productDecsription, setProductDecsription] = useState(
    selectedProduct?.productDecsription ?? ""
  );
  const [category, setCategory] = useState(selectedProduct?.category || "");
  const [stock, setStock] = useState(selectedProduct?.stock ?? "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id) {
      alert("Product id not found");
      return;
    }

    // Backend update logic expects req.file (productImage).
    if (!productImage) {
      alert("Please select a product image");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDecsription", productDecsription);
    formData.append("category", category);
    formData.append("stock", stock);

    await handleUpdate({ id, formData });
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
        <h2 className="product-title">Update Product</h2>

        {selectedProduct?.productImage ? (
          <div className="form-group">
            <label className="form-label">Current Image</label>
            <img
              src={selectedProduct.productImage}
              alt={selectedProduct.productName}
              style={{ width: 160, height: 120, objectFit: "cover" }}
            />
          </div>
        ) : null}

        <div className="form-group">
          <label className="form-label">New Product Image</label>
          <input
            onChange={(e) => setProductImage(e.target.files[0])}
            type="file"
            name="productImage"
            className="form-input file-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            name="productName"
            value={productName}
            placeholder="Enter product name"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Price</label>
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            name="productPrice"
            value={productPrice}
            placeholder="Enter product price"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Description</label>
          <textarea
            onChange={(e) => setProductDecsription(e.target.value)}
            name="productDecsription"
            rows="4"
            value={productDecsription}
            placeholder="Enter product description"
            className="form-textarea"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
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

        <div className="form-group">
          <label className="form-label">Stock</label>
          <input
            onChange={(e) => setStock(e.target.value)}
            type="number"
            name="stock"
            value={stock}
            placeholder="Enter stock quantity"
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
  );
}

