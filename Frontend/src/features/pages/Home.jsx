import useAuthUser from "../../auth/hooks/authUser";
import useProduct from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import "./Home.scss";
import Navbar from "../components/Navbar";

export default function Home() {
  const { loading } = useAuthUser();

  const { product } = useProduct();

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar />

      <div className="hero-section">
        <h2 className="hero-title">Explore Our Products</h2>

        <p className="hero-subtitle">
          Find the best products at the best prices.
        </p>
      </div>

      <div className="products-container">
        {Array.isArray(product) ? (
          product.map((item) => <ProductCard key={item._id} product={item} />)
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}
