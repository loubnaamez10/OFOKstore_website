import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";
import BookCard from "../components/BookCard";
import { getKidsBooks } from "../services/books";
import "./NewArrivals.css";

const COPY = {
  en: {
    eyebrow: "Young readers",
    title: "Kids' Books",
    subtitle: "Fun, friendly reads for young readers.",
    empty: "Add your children's books in the database and they will appear here.",
  },
  fr: {
    eyebrow: "Jeunes lecteurs",
    title: "Livres pour enfants",
    subtitle: "Des lectures amusantes et adaptees aux jeunes lecteurs.",
    empty: "Ajoutez vos livres pour enfants dans la base et ils apparaitront ici.",
  },
  ar: {
    eyebrow: "القراء الصغار",
    title: "كتب الأطفال",
    subtitle: "قراءات ممتعة ومناسبة للقراء الصغار.",
    empty: "أضف كتب الأطفال في قاعدة البيانات وستظهر هنا.",
  },
};

export default function KidsBooks() {
  const { lang } = useLang();
  const t = COPY[lang] || COPY.en;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let active = true;

    getKidsBooks(20).then((results) => {
      if (active) {
        setBooks(results);
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
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <div className="new-arrivals__empty">{t.empty}</div>
        )}
      </div>
    </section>
  );
}