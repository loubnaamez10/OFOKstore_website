import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/image.png";
import "./Navbar.css";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { cart } = useCart();
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const navText = {
    home: lang === "fr" ? "Accueil" : lang === "ar" ? "الرئيسية" : "Home",
    newArrivals: lang === "fr" ? "Nouveautés" : lang === "ar" ? "وصل حديثاً" : "New Arrivals",
    bestsellers: lang === "fr" ? "Nos meilleures ventes" : lang === "ar" ? "الأكثر مبيعًا" : "Our Bestsellers",
  };

  function changeLang(code) {
    setLang(code);
    setLangOpen(false);
  }

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  function onSearchSubmit(e) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/books?search=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <nav className="navbar">
      <div className="brand">
        <img src={logo} alt="OFOK logo" className="brand-logo" />
        <span className="brand-text">OFOK</span>
      </div>

      <div className="nav-links" aria-label="Primary navigation">
        <Link className={location.pathname === "/" ? "nav-link nav-link--active" : "nav-link"} to="/">
          {navText.home}
        </Link>

        <Link className="nav-link" to="/#home-new-arrivals">
          {navText.newArrivals}
        </Link>
        <Link className="nav-link" to="/#home-bestsellers">
          {navText.bestsellers}
        </Link>
      </div>

      <div className="actions">
        <button
          type="button"
          className="search-icon"
          aria-label="Search"
          onClick={() => setSearchOpen((s) => !s)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
        </button>

        {searchOpen && (
          <form className="search-form" onSubmit={onSearchSubmit}>
            <input
              ref={searchRef}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "fr" ? "Rechercher..." : lang === "ar" ? "بحث..." : "Search..."}
              aria-label="Search"
            />
          </form>
        )}

        <Link to="/cart" className="cart-icon" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="20" r="1.6" fill="currentColor"/>
            <circle cx="18" cy="20" r="1.6" fill="currentColor"/>
          </svg>
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>

        <div
          className="lang-dropdown"
          tabIndex={0}
          onBlur={() => setLangOpen(false)}
        >
          <button
            className="lang-toggle"
            onClick={() => setLangOpen((s) => !s)}
            aria-haspopup="menu"
            aria-expanded={langOpen}
          >
            {lang === "fr" ? "Langue" : lang === "ar" ? "اللغة" : "Language"} ▾
          </button>

          {langOpen && (
            <div className="lang-menu" role="menu">
              <button type="button" onMouseDown={() => changeLang("fr")}>FR</button>
              <button type="button" onMouseDown={() => changeLang("en")}>EN</button>
              <button type="button" onMouseDown={() => changeLang("ar")}>AR</button>
            </div>
          )}
        </div>
    
      </div>
    </nav>
  );
}
