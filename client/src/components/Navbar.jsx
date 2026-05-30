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
  const [booksOpen, setBooksOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const booksRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();

  const navText = {
    home: lang === "fr" ? "Accueil" : lang === "ar" ? "الرئيسية" : "Home",
    books: lang === "fr" ? "Livres" : lang === "ar" ? "الكتب" : "Books",
    newArrivals: lang === "fr" ? "Nouveautés" : lang === "ar" ? "أحدث المنتجات" : "New Arrivals",
    bestsellers: lang === "fr" ? "Nos meilleures ventes" : lang === "ar" ? "الأكثر مبيعًا" : "Our Bestsellers",
    schoolSupplies: lang === "fr" ? "Fournitures scolaires" : lang === "ar" ? "اللوازم المدرسية" : "School Supplies",
    kidsBooks: lang === "fr" ? "Livres pour enfants" : lang === "ar" ? "كتب الأطفال" : "Kids' Books",
  };

  const booksMenuText = {
    en: { english: "English", arabic: "Arabic", french: "French" },
    fr: { english: "Anglais", arabic: "Arabe", french: "Français" },
    ar: { english: "الإنجليزية", arabic: "العربية", french: "الفرنسية" },
  }[lang] || { english: "English", arabic: "Arabic", french: "French" };

  const contactText = {
    en: {
      contact: "Contact",
      instagram: "Instagram",
      facebook: "Facebook",
      whatsapp: "WhatsApp",
      instagramInfo: "ofok.store",
      facebookInfo: "Ofok Ofok",
      whatsappInfo: "+213667822379",
    },
    fr: {
      contact: "Contact",
      instagram: "Instagram",
      facebook: "Facebook",
      whatsapp: "WhatsApp",
      instagramInfo: "Instagram: ofok.store",
      facebookInfo: "Page Facebook: Ofok Ofok",
      whatsappInfo: "Numéro WhatsApp: +213667822379",
    },
    ar: {
      contact: "اتصل بنا",
      instagram: "إنستغرام",
      facebook: "فيسبوك",
      whatsapp: "واتساب",
      instagramInfo: "إنستغرام: ofok.store",
      facebookInfo: "صفحة فيسبوك: Ofok Ofok",
      whatsappInfo: "رقم واتساب: \u200E+213667822379",
    },
  }[lang] || {
    contact: "Contact",
    instagram: "Instagram",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    instagramInfo: "Instagram: ofok.store",
    facebookInfo: "Facebook: Ofok Ofok",
    whatsappInfo: "WhatsApp: +213667822379",
  };

  function changeLang(code) {
    setLang(code);
    setLangOpen(false);
  }

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (booksRef.current && !booksRef.current.contains(event.target)) {
        setBooksOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setContactOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

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

      <div
        className="nav-links"
        aria-label="Primary navigation"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Link className={location.pathname === "/" ? "nav-link nav-link--active" : "nav-link"} to="/#home-top">
          {navText.home}
        </Link>

        <div className="books-dropdown" ref={booksRef}>
          <button
            type="button"
            className="nav-link nav-link--button books-toggle"
            aria-haspopup="menu"
            aria-expanded={booksOpen}
            onClick={() => setBooksOpen((open) => !open)}
          >
            {navText.books} <span aria-hidden="true" className="nav-link__chevron">▾</span>
          </button>

          {booksOpen && (
            <div className="books-menu" role="menu" aria-label={navText.books}>
              <Link className="books-menu__item" role="menuitem" to="/books?lang=en" onClick={() => setBooksOpen(false)}>
                {booksMenuText.english}
              </Link>
              <Link className="books-menu__item" role="menuitem" to="/books?lang=ar" onClick={() => setBooksOpen(false)}>
                {booksMenuText.arabic}
              </Link>
              <Link className="books-menu__item" role="menuitem" to="/books?lang=fr" onClick={() => setBooksOpen(false)}>
                {booksMenuText.french}
              </Link>
            </div>
          )}
        </div>

        <Link className="nav-link" to="/#home-new-arrivals">
          {navText.newArrivals}
        </Link>
        <Link className="nav-link" to="/#home-bestsellers">
          {navText.bestsellers}
        </Link>
        <Link className="nav-link" to="/#home-school-supplies">
          {navText.schoolSupplies}
        </Link>
        <Link className="nav-link" to="/#home-kids-books">
          {navText.kidsBooks}
        </Link>

        <div className="books-dropdown contact-dropdown" ref={contactRef}>
          <button
            type="button"
            className="nav-link nav-link--button books-toggle"
            aria-haspopup="menu"
            aria-expanded={contactOpen}
            onClick={() => setContactOpen((open) => !open)}
          >
            {contactText.contact} <span aria-hidden="true" className="nav-link__chevron">▾</span>
          </button>

          {contactOpen && (
            <div className="books-menu contact-menu" role="menu" aria-label={contactText.contact}>
              <a
                className="books-menu__item contact-menu__item"
                role="menuitem"
                href="https://www.instagram.com/ofokstore/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-menu__label">{contactText.instagram}</span>
                <span className="contact-menu__info">{contactText.instagramInfo}</span>
              </a>
              <a
                className="books-menu__item contact-menu__item"
                role="menuitem"
                href="https://www.facebook.com/ofokstore"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-menu__label">{contactText.facebook}</span>
                <span className="contact-menu__info">{contactText.facebookInfo}</span>
              </a>
              <a
                className="books-menu__item contact-menu__item"
                role="menuitem"
                href="https://wa.me/213000000000"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-menu__label">{contactText.whatsapp}</span>
                <span className="contact-menu__info">{contactText.whatsappInfo}</span>
              </a>
            </div>
          )}
        </div>
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
