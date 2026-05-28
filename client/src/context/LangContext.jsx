import React, { createContext, useState, useContext } from "react";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("fr");

  const translations = {
    fr: {
      home: "Accueil",
      shop: "Boutique",
      cart: "Panier",
      login: "Connexion",
      admin: "Admin",
      checkout: "Commander",
      "add-to-cart": "Ajouter au panier",
    },
    en: {
      home: "Home",
      shop: "Shop",
      cart: "Cart",
      login: "Login",
      admin: "Admin",
      checkout: "Checkout",
      "add-to-cart": "Add to cart",
    },
    ar: {
      home: "الرئيسية",
      shop: "المتجر",
      cart: "سلة التسوق",
      login: "تسجيل الدخول",
      admin: "الإدارة",
      checkout: "إتمام الطلب",
      "add-to-cart": "أضف إلى السلة",
    },
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
