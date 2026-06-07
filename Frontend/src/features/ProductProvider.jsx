import { useState } from "react";
import { ProductContext } from "./productContext";

export default function ProductProvider({ children }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("cart"))?.length || 0,
  );
  const [id, setId] = useState("")

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        loading,
        setLoading,
        cartCount,
        setCartCount,
        id, setId
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
