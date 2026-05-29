import "./Home.css";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

const HERO_TEXT = {
  en: {
    eyebrow: "Delivery Available To 69 Provinces In Algeria 🇩🇿.",
    titleMain: "Inspire mind & heart!",
    line1: "Your Algerian library is here!",
    line2: "Discover a wide collection of English, Arabic & French titles, knowledge for every journey.",
    languagesTitle: "Find books in your favorite language",
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
  const t = HERO_TEXT[lang] || HERO_TEXT.en;

  return (
    <>
      <section className="home-hero" aria-labelledby="home-hero-title" dir={lang === "ar" ? "rtl" : "ltr"}>
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
    </>
  );
}
