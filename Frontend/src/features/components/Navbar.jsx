import { Link, useNavigate } from "react-router";
import useAuthUser from "../../auth/hooks/authUser";
import { useContext } from "react";
import { ProductContext } from "../productContext";
import "../pages/Home.scss";
import ProfileIcon from "./ProfileIcon";
// import { AuthContext } from "../../auth/authContext";

export default function Navbar() {
  const { handleLogout, user } = useAuthUser();
  const navigate = useNavigate();
  const { cartCount } = useContext(ProductContext);

  const handleSubmitLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  console.log(user)


  return (
    <div className="home-navbar">
      <h1 className="home-logo"><Link to={'/'} className="Home">Product Store</Link></h1>

      <div className="home-actions">
        {user?.role === "admin" ? (
          <Link to="/add" className="add-product-btn">
            Add Product
          </Link>
        ) : (
          <p></p>
        )}


        <Link to="/cart" className="add-product-btn">
          Cart <span className="cart-count">{cartCount}</span>
        </Link>

        <button onClick={handleSubmitLogout} className="logout-btn">
          Logout
        </button>
        <ProfileIcon user={user} />
      </div>
    </div>
  );
}


// import { Link, useNavigate } from "react-router";
// import useAuthUser from "../../auth/hooks/authUser";
// import { useContext, useEffect, useRef, useState } from "react";
// import { ProductContext } from "../productContext";
// import "../pages/Home.scss";
// import "./navbar.scss"

// export default function Navbar({ onCartOpen, onSearch }) {
//   const { handleLogout, user } = useAuthUser();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchVal, setSearchVal] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const searchRef = useRef(null);

//   const { cartCount } = useContext(ProductContext);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (searchOpen && searchRef.current) searchRef.current.focus();
//   }, [searchOpen]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (onSearch) onSearch(searchVal);
//     setSearchOpen(false);
//   };

//    const handleSubmitLogout = async () => {
//     await handleLogout();
//     navigate("/login");
//   };

//   return (
//     <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
//       <div className="navbar__inner">
//         {/* Logo */}
//         <Link to="/" className="navbar__logo">
//           <span className="navbar__logo-icon">⚡</span>
//           <span className="navbar__logo-text">
//             Luxe<span>Shop</span>
//           </span>
//         </Link>

//         {/* Center Nav Links */}
//         <nav className="navbar__links">
//           <Link to="/" className="navbar__link">Home</Link>
//           <Link to="/shop" className="navbar__link">Shop</Link>
//           <Link to="/categories" className="navbar__link">Categories</Link>
//           <Link to="/deals" className="navbar__link navbar__link--hot">
//             Deals <span className="navbar__badge">HOT</span>
//           </Link>
//         </nav>

//         {/* Right Actions */}
//         <div className="navbar__actions">
//           {/* Search */}
//           <div className={`navbar__search${searchOpen ? " navbar__search--open" : ""}`}>
//             <form onSubmit={handleSearch} className="navbar__search-form">
//               <input
//                 ref={searchRef}
//                 value={searchVal}
//                 onChange={(e) => setSearchVal(e.target.value)}
//                 placeholder="Search products…"
//                 className="navbar__search-input"
//               />
//               <button type="submit" className="navbar__search-submit">→</button>
//             </form>
//             <button
//               className="navbar__icon-btn"
//               onClick={() => setSearchOpen(!searchOpen)}
//               aria-label="Search"
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//             </button>
//           </div>

//           {/* Cart */}
//           <button className="navbar__icon-btn navbar__cart-btn" onClick={onCartOpen} aria-label="Cart">
//             <Link to={"/cart"}>
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
//             </svg></Link>
//             {cartCount > 0 && (
//               <span className="navbar__cart-count">{cartCount}</span>
//             )}
//           </button>

//           {/* User Menu */}
//           <div className="navbar__user" onClick={() => setMenuOpen(!menuOpen)}>
//             <div className="navbar__avatar">
//               {user?.username?.[0]?.toUpperCase() || "U"}
//             </div>
//             {menuOpen && (
//               <div className="navbar__dropdown">
//                 <div className="navbar__dropdown-header">
//                   <p className="navbar__dropdown-name">{user?.username || "User"}</p>
//                   <p className="navbar__dropdown-email">{user?.email || ""}</p>
//                 </div>
//                 <div className="navbar__dropdown-divider" />
//                 <Link to="/profile" className="navbar__dropdown-item">
//                   <span>👤</span> My Profile
//                 </Link>
//                 <Link to="/orders" className="navbar__dropdown-item">
//                   <span>📦</span> My Orders
//                 </Link>
//                 <Link to="/wishlist" className="navbar__dropdown-item">
//                   <span>❤️</span> Wishlist
//                 </Link>
//                 <div className="navbar__dropdown-divider" />
//                 <button className="navbar__dropdown-item navbar__dropdown-logout" onClick={handleSubmitLogout}>
//                   <span>🚪</span> Logout
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//             <span /><span /><span />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }