import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";
import BookCard from "../components/BookCard";
import { getBestSellersBooks } from "../services/books";
import "./NewArrivals.css";

const COPY = {
  en: {
    eyebrow: "Reader favorites",
    title: "Our Bestsellers",
    subtitle: "The books our readers keep coming back for.",
  },
  fr: {
    eyebrow: "Les favoris des lecteurs",
    title: "Nos meilleures ventes",
    subtitle: "Les livres que nos lecteurs apprécient le plus.",
  },
  ar: {
    eyebrow: "مفضلات القرّاء",
    title: "الأكثر مبيعًا",
    subtitle: "الكتب التي يعود إليها قراؤنا باستمرار.",
  },
};

export default function OurBestsellers() {
  const { lang } = useLang();
  const t = COPY[lang] || COPY.en;
  const [bestSellerBooks, setBestSellerBooks] = useState([]);

  useEffect(() => {
    let active = true;

    getBestSellersBooks(20).then((books) => {
      if (active) {
        setBestSellerBooks(books);
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
          <p className="new-arrivals__eyebrow">{t.eyebrow}</p>
          <h1 className="new-arrivals__title">{t.title}</h1>
          <p className="new-arrivals__subtitle">{t.subtitle}</p>
        </div>
      </div>

      <div className="new-arrivals__grid" aria-label={t.title}>
        {bestSellerBooks.length > 0 ? (
          bestSellerBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <div className="new-arrivals__empty">
            Add your books in the database and the bestsellers will appear here.
          </div>
        )}
      </div>
    </section>
  );
}