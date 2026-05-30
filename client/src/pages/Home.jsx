import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import BookCard from "../components/BookCard";
import { getBestSellersBooks, getLatestBooks } from "../services/books";

const SOCIAL_CONTACTS = {
  instagramLabel: "@ofokstore",
  instagramUrl: "https://www.instagram.com/ofokstore/",
  whatsappLabel: "+213 000 000 000",
  whatsappUrl: "https://wa.me/213000000000",
};

const TRUST_ITEMS = {
  en: {
    intro: "Why OFOK ?",
    introSubtitle: "OFOK — Where every book opens a new horizon.",
    eyebrow: "Why shop with us",
    title: "Built for trust and support",
    cards: [
      {
        key: "payment",
        icon: "payment",
        title: "Secure Payment",
        subtitle: "100% secure checkout",
      },
      {
        key: "returns",
        icon: "returns",
        title: "Fast Delivery",
        subtitle: "Fast shipping across Algeria",
      },
      {
        key: "support",
        icon: "support",
        title: "Customer Support",
        subtitle: "We’re here to help",
      },
    ],
  },
  fr: {
    intro: "Pourquoi OFOK ?",
    introSubtitle: "OFOK — Là où chaque livre ouvre un nouvel horizon.",
    eyebrow: "Pourquoi nous choisir",
    title: "Pensé pour la confiance et l’accompagnement",
    cards: [
      {
        key: "payment",
        icon: "payment",
        title: "Paiement sécurisé",
        subtitle: "Paiement 100 % sécurisé",
      },
      {
        key: "returns",
        icon: "returns",
        title: "Livraison rapide",
        subtitle: "Expédition rapide partout en Algérie",
      },
      {
        key: "support",
        icon: "support",
        title: "Support client",
        subtitle: "Nous sommes là pour vous aider",
      },
    ],
  },
  ar: {
    intro: "لماذا أُفُق ؟",
    introSubtitle: "أُفُق — حيث يفتح كل كتاب أفقًا جديدًا.",
    eyebrow: "لماذا تتسوق معنا",
    title: "مصممة للثقة والدعم",
    cards: [
      {
        key: "payment",
        icon: "payment",
        title: "دفع آمن",
        subtitle: "دفع آمن بنسبة 100٪",
      },
      {
        key: "returns",
        icon: "returns",
        title: "توصيل سريع",
        subtitle: "شحن سريع في جميع أنحاء الجزائر",
      },
      {
        key: "support",
        icon: "support",
        title: "دعم العملاء",
        subtitle: "نحن هنا لمساعدتك",
      },
    ],
  },
};

const HERO_TEXT = {
  en: {
    eyebrow: "Delivery Available To 69 Provinces In Algeria 🇩🇿.",
    titleMain: "Inspire mind & heart!",
    line1: "Your Algerian library is here!",
    line2: "Discover a wide collection of English, Arabic & French titles, knowledge for every journey.",
    languagesTitle: "Find books in your favorite language",
    newArrivalsTitle: "New Arrivals",
    newArrivalsSubtitle: "Freshly added books from our collection.",
    bestSellersTitle: "Our Bestsellers",
    bestSellersSubtitle: "The books our readers keep coming back for.",
    bestSellersViewAll: "View all",
    viewAll: "View all",
    languageCards: [
      { key: "en", icon: "EN", label: "English" },
      { key: "ar", icon: "AR", label: "Arabic" },
      { key: "fr", icon: "FR", label: "French" },
    ],
    stats: [
      { num: "+35K", label: "Followers" },
      { num: "+2000", label: "Books" },
      { num: "69", label: "Provinces" },
      { num: "24h", label: "Delivery" },
    ],
  },
  fr: {
    eyebrow: "Livraison disponible dans 69 wilayas d'Algérie 🇩🇿.",
    titleMain: "Nourrir l’esprit, toucher le cœur!",
    line1: "Votre bibliothèque algérienne est ici !",
    line2: "Découvrez une large collection de titres en anglais, arabe et français, des savoirs pour chaque voyage.",
    languagesTitle: "Trouvez des livres dans votre langue préférée",
    newArrivalsTitle: "Nouveautés",
    newArrivalsSubtitle: "Les derniers livres ajoutés à notre collection.",
    bestSellersTitle: "Nos meilleures ventes",
    bestSellersSubtitle: "Les livres que nos lecteurs apprécient le plus.",
    bestSellersViewAll: "Voir tout",
    viewAll: "Voir tout",
    languageCards: [
      { key: "en", icon: "EN", label: "Anglais" },
      { key: "ar", icon: "AR", label: "Arabe" },
      { key: "fr", icon: "FR", label: "Français" },
    ],
    stats: [
      { num: "+35K", label: "Abonnés" },
      { num: "+2000", label: "Livres" },
      { num: "69", label: "Wilayas" },
      { num: "24h", label: "Livraison" },
    ],
  },
  ar: {
    eyebrow: "التوصيل متوفر في 69 ولاية في الجزائر 🇩🇿.",
    titleMain: "كتب تُلهم",
    titleBreak: "العقول والقلوب",
    line1: "مكتبتك الجزائرية هنا!",
    line2: "اكتشف مجموعة واسعة من العناوين بالإنجليزية والعربية والفرنسية، المعرفة لكل رحلة.",
    languagesTitle: "ابحث عن كتب بلغتك المفضلة",
    newArrivalsTitle: "وصل حديثاً",
    newArrivalsSubtitle: "أحدث الكتب المضافة إلى مجموعتنا.",
    bestSellersTitle: "الأكثر مبيعًا",
    bestSellersSubtitle: "الكتب التي يعود إليها قراؤنا باستمرار.",
    bestSellersViewAll: "عرض الكل",
    viewAll: "عرض الكل",
    languageCards: [
      { key: "en", icon: "EN", label: "الإنجليزية" },
      { key: "ar", icon: "AR", label: "العربية" },
      { key: "fr", icon: "FR", label: "الفرنسية" },
    ],
    stats: [
      { num: "+35K", label: "متابعون" },
      { num: "+2000", label: "كتاب" },
      { num: "69", label: "ولاية" },
      { num: "24سا", label: "التوصيل" },
    ],
  },
};

export default function Home() {
  const { lang } = useLang();
  const location = useLocation();
  const t = HERO_TEXT[lang] || HERO_TEXT.en;
  const trust = TRUST_ITEMS[lang] || TRUST_ITEMS.en;
  const [latestBooks, setLatestBooks] = useState([]);
  const [bestSellerBooks, setBestSellerBooks] = useState([]);

  useEffect(() => {
    let active = true;

    getLatestBooks(6).then((books) => {
      if (active) {
        setLatestBooks(books);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const target = document.querySelector(location.hash);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  useEffect(() => {
    let active = true;

    getBestSellersBooks(6).then((books) => {
      if (active) {
        setBestSellerBooks(books);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section id="home-top" className="home-hero" aria-labelledby="home-hero-title" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="home-hero__content">
          <div className="home-hero__copy">
            <p className="home-hero__eyebrow">{t.eyebrow}</p>
            <h1 id="home-hero-title">
              {t.titleMain} <span className="home-hero__title-break">{t.titleBreak}</span>
            </h1>
            <p className="home-hero__subtitle">
              {t.line1}
              <span className="home-hero__subtitle-break">{t.line2}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="home-stats" aria-hidden dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="home-stats__inner">
          {t.stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat__num">{s.num}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-categories" aria-labelledby="home-categories-title">
        <div className="home-categories__inner">
          <h2 id="home-categories-title" className="home-categories__title">
            {t.languagesTitle}
          </h2>

          <div className="home-categories__grid home-categories__grid--languages">
            {t.languageCards.map((card) => (
              <Link
                key={card.key}
                className="home-categories__card"
                to={`/books?lang=${encodeURIComponent(card.key)}`}
              >
                <span className="home-categories__icon" aria-hidden="true">
                  {card.icon}
                </span>
                <span className="home-categories__label">{card.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="home-new-arrivals" className="home-new-arrivals" aria-labelledby="home-new-arrivals-title" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="home-new-arrivals__inner">
          <div className="home-new-arrivals__header">
            <div className="home-new-arrivals__copy">
              <h2 id="home-new-arrivals-title" className="home-new-arrivals__title">
                {t.newArrivalsTitle}
              </h2>
              <p className="home-new-arrivals__subtitle">{t.newArrivalsSubtitle}</p>
            </div>

            <Link className="home-new-arrivals__view-all" to="/new-arrivals">
              {t.viewAll}
            </Link>
          </div>

          <div className="home-new-arrivals__row" aria-label={t.newArrivalsTitle}>
            {latestBooks.length > 0 ? (
              latestBooks.map((book) => <BookCard key={book.id} book={book} compact />)
            ) : (
              <div className="home-new-arrivals__empty">
                Add your books in the database and they will appear here.
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="home-bestsellers" className="home-bestsellers" aria-labelledby="home-bestsellers-title" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="home-bestsellers__inner">
          <div className="home-bestsellers__header">
            <div className="home-bestsellers__copy">
              <h2 id="home-bestsellers-title" className="home-bestsellers__title">
                {t.bestSellersTitle}
              </h2>
              <p className="home-bestsellers__subtitle">{t.bestSellersSubtitle}</p>
            </div>

            <Link className="home-bestsellers__view-all" to="/books">
              {t.bestSellersViewAll}
            </Link>
          </div>

          <div className="home-bestsellers__row" aria-label={t.bestSellersTitle}>
            {bestSellerBooks.length > 0 ? (
              bestSellerBooks.map((book) => <BookCard key={book.id} book={book} compact />)
            ) : (
              <div className="home-bestsellers__empty">
                Add your books in the database and the bestsellers will appear here.
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="about-us" className="home-trust" aria-labelledby="home-trust-title" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="home-trust__inner">
          <div className="home-trust__intro">
            <p className="home-trust__intro-title">{trust.intro}</p>
            <p className="home-trust__intro-subtitle">{trust.introSubtitle}</p>
          </div>

          <div className="home-trust__bar" aria-labelledby="home-trust-title">
            <h2 id="home-trust-title" className="home-trust__sr-only">
              {trust.title}
            </h2>

            {trust.cards.map((card) =>
              <article key={card.key} className="home-trust__item">
                <span className="home-trust__icon" aria-hidden="true">
                  <TrustIcon type={card.icon} />
                </span>
                <div className="home-trust__card-copy">
                  <h3 className="home-trust__card-title">{card.title}</h3>
                  <p className="home-trust__card-subtitle">{card.subtitle}</p>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

    </>
  );
}

function TrustIcon({ type }) {
  if (type === "payment") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 17.25V6.75Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.5 9.75h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.25 15.75h2.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "returns") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 8.25h8.25c2.071 0 3.75 1.679 3.75 3.75s-1.679 3.75-3.75 3.75h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.75 13.5 7.5 15.75 9.75 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 15.75H8.25c-2.071 0-3.75-1.679-3.75-3.75s1.679-3.75 3.75-3.75h6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.25 10.5 16.5 8.25 14.25 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5c0 1.79-.63 3.43-1.69 4.72l.74 2.78-2.84-.76A7.48 7.48 0 0 1 12 19.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.15 10.5c.18-.42.45-.6.78-.6.48 0 .75.3 1.05.93.3.63.57 1.12 1.08 1.12.42 0 .8-.25 1.2-.74" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
