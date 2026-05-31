import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";
import BookCard from "../components/BookCard";
import { getSchoolSuppliesBooks } from "../services/books";
import "./NewArrivals.css";

const COPY = {
  en: {
    eyebrow: "Study essentials",
    title: "School Supplies",
    subtitle: "Essential picks for study, notes, and organization.",
    empty: "Add your school supplies books in the database and they will appear here.",
  },
  fr: {
    eyebrow: "Essentiels d'etude",
    title: "Fournitures scolaires",
    subtitle: "Les indispensables pour etudier, prendre des notes et s'organiser.",
    empty: "Ajoutez vos livres de fournitures scolaires dans la base et ils apparaitront ici.",
  },
  ar: {
    eyebrow: "أساسيات الدراسة",
    title: "اللوازم المدرسية",
    subtitle: "اختيارات أساسية للدراسة والملاحظات والتنظيم.",
    empty: "أضف كتب اللوازم المدرسية في قاعدة البيانات وستظهر هنا.",
  },
};

export default function SchoolSupplies() {
  const { lang } = useLang();
  const t = COPY[lang] || COPY.en;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let active = true;

    getSchoolSuppliesBooks(20).then((results) => {
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