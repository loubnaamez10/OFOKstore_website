import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";
import BookCard from "../components/BookCard";
import { getLatestBooks } from "../services/books";
import "./NewArrivals.css";

const COPY = {
  en: {
    eyebrow: "Latest additions",
    title: "New Arrivals",
    subtitle: "The 20 newest books added to our collection.",
    back: "Back to home",
  },
  fr: {
    eyebrow: "Derniers ajouts",
    title: "Nouveautés",
    subtitle: "Les derniers livres ajoutés à notre collection.",
    back: "Retour à l'accueil",
  },
  ar: {
    eyebrow: "أحدث الإضافات",
    title: "وصل حديثاً",
    subtitle: "أحدث 20 كتاباً تمت إضافتها إلى مجموعتنا.",
    back: "العودة إلى الصفحة الرئيسية",
  },
};

export default function NewArrivals() {
  const { lang } = useLang();
  const t = COPY[lang] || COPY.en;
  const [latestBooks, setLatestBooks] = useState([]);

  useEffect(() => {
    let active = true;

    getLatestBooks(20).then((books) => {
      if (active) {
        setLatestBooks(books);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="new-arrivals" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="new-arrivals__header">
        <div>
          <h1 className="new-arrivals__title">{t.title}</h1>
          <p className="new-arrivals__subtitle">{t.subtitle}</p>
        </div>
        <Link className="new-arrivals__back" to="/">
          {t.back}
        </Link>
      </div>

      <div className="new-arrivals__grid" aria-label={t.title}>
        {latestBooks.length > 0 ? (
          latestBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <div className="new-arrivals__empty">
            Add your books in the database and the 20 latest ones will appear here.
          </div>
        )}
      </div>
    </section>
  );
}