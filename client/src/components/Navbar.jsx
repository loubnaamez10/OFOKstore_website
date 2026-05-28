import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLang } from "../context/LangContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/image.png";
import "./Navbar.css";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { cart } = useCart();
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [booksOpen, setBooksOpen] = useState(false);

  const bookLabels = {
    fr: {
      english: "Livres en anglais",
      arabic: "Livres en arabe",
      french: "Livres en français",
      button: "Livres",
    },
    en: {
      english: "Books in English",
      arabic: "Books in Arabic",
      french: "Books in French",
      button: "Books",
    },
    ar: {
      english: "كتب باللغة الإنجليزية",
      arabic: "كتب باللغة العربية",
      french: "كتب باللغة الفرنسية",
      button: "الكتب",
    },
  };

  function changeLang(code) {
    setLang(code);
    setLangOpen(false);
  }

  function goToBooks(language) {
    navigate(`/books?lang=${encodeURIComponent(language)}`);
    setBooksOpen(false);
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

        <div
          className="books-dropdown"
          tabIndex={0}
          onBlur={() => setBooksOpen(false)}
        >
          <button
            className="books-toggle"
            onClick={() => setBooksOpen((s) => !s)}
            aria-haspopup="menu"
            aria-expanded={booksOpen}
            aria-label={lang === "fr" ? "Livres" : lang === "ar" ? "الكتب" : "Books"}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 4.5h10.5A2.5 2.5 0 0 1 19 7v12.5c0 .28-.22.5-.5.5H7A3 3 0 0 1 4 17V6.5A2.5 2.5 0 0 1 6.5 4H6v.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M7 7h8M7 10h8M7 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          {booksOpen && (
            <div className="books-menu" role="menu">
              <button type="button" onMouseDown={() => goToBooks("en")}>{bookLabels[lang].english}</button>
              <button type="button" onMouseDown={() => goToBooks("ar")}>{bookLabels[lang].arabic}</button>
              <button type="button" onMouseDown={() => goToBooks("fr")}>{bookLabels[lang].french}</button>
            </div>
          )}
        </div>

        
      </div>
    </nav>
  );
}
