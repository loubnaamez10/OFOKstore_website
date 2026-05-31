import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getBooksByLanguage } from "../services/books";
import "./Books.css";

const PAGE_COPY = {
  en: {
    eyebrow: "English collection",
    title: "English Books",
    subtitle: "Welcome to our collection. Whatever you are looking for, you will find all the options.",
    badgeSuffix: "titles",
    categoryLabel: "Category",
    languageLabel: "Language",
    cartReadyLabel: "Ready for cart",
    booksShownLabel: "books shown",
    addToCart: "Add to cart",
    viewMore: "View more about",
    categoriesAriaLabel: "Books categories",
    loading: "Loading English books...",
    empty: "Add English books to your database and they will appear here.",
  },
  fr: {
    eyebrow: "Collection de livres français",
    title: "Livres en français",
    subtitle: "Bienvenue dans notre collection. Peu importe ce que vous cherchez, vous trouverez toutes les options.",
    badgeSuffix: "titres",
    categoryLabel: "Categorie",
    languageLabel: "Langue",
    cartReadyLabel: "Pret au panier",
    booksShownLabel: "livres affiches",
    addToCart: "Ajouter au panier",
    viewMore: "Voir plus",
    categoriesAriaLabel: "Categories des livres",
    loading: "Chargement des livres en français...",
    empty: "Ajoutez des livres en français dans la base pour les voir ici.",
  },
  ar: {
    eyebrow: "مجموعة الكتب العربية",
    title: "الكتب العربية",
    subtitle: "مرحبًا بكم في مجموعتنا. مهما كنتم تبحثون عنه، ستجدون جميع الخيارات.",
    badgeSuffix: "عنوان",
    categoryLabel: "الفئة",
    languageLabel: "اللغة",
    cartReadyLabel: "جاهزة للسلة",
    booksShownLabel: "كتاب معروض",
    addToCart: "أضف إلى السلة",
    viewMore: "عرض المزيد",
    categoriesAriaLabel: "فئات الكتب",
    loading: "جاري تحميل الكتب العربية...",
    empty: "أضف الكتب العربية في قاعدة البيانات لتظهر هنا.",
  },
};

const BOOKS_TITLES = {
  en: "English Books",
  fr: "Livres en français",
  ar: "الكتب العربية",
};

const CATEGORY_TITLES = {
  quran: "Quran & Tafsir",
  children: "Children's Books",
  "self-development": "Self Development",
  history: "History & Biography",
  "school-supplies": "School Supplies",
};

const CATEGORY_KEYS = ["all", "romance", "personal-development", "business", "educational", "science"];

const BUBBLE_CATEGORIES_BY_LANG = {
  en: [
    { key: "all", label: "All categories" },
    { key: "romance", label: "Romance" },
    { key: "personal-development", label: "Personal Development" },
    { key: "business", label: "Business" },
    { key: "educational", label: "Educational Books" },
    { key: "science", label: "Science" },
  ],
  ar: [
    { key: "all", label: "كل الفئات" },
    { key: "romance", label: "روايات" },
    { key: "personal-development", label: "تطوير الذات" },
    { key: "business", label: "الأعمال" },
    { key: "educational", label: "كتب تعليمية" },
    { key: "science", label: "علوم" },
  ],
  fr: [
    { key: "all", label: "Toutes les categories" },
    { key: "romance", label: "Romance" },
    { key: "personal-development", label: "Developpement personnel" },
    { key: "business", label: "Business" },
    { key: "educational", label: "Livres educatifs" },
    { key: "science", label: "Science" },
  ],
};

const CATEGORY_KEY_SET = new Set(CATEGORY_KEYS);

const CATEGORY_MATCHERS = {
  romance: ["romance", "romantic", "love story", "رومانسي", "رومانسية", "حب", "قصة حب"],
  "personal-development": [
    "personal-development",
    "self-development",
    "self help",
    "personal development",
    "تطوير الذات",
    "تنمية بشرية",
    "تطوير شخصي",
  ],
  business: ["business", "entrepreneur", "management", "finance", "أعمال", "ريادة", "إدارة", "تمويل"],
  educational: ["educational", "education", "academic", "learning", "study", "school", "تعليمي", "تعليم", "دراسة", "مدرسة", "أكاديمي"],
  science: ["science", "scientific", "biology", "chemistry", "physics", "math", "علوم", "علمي", "أحياء", "كيمياء", "فيزياء", "رياضيات"],
};

function getBookId(book, fallbackIndex) {
  return book?.id || book?._id || book?.slug || `book-${fallbackIndex}`;
}

function getBookTitle(book) {
  return book?.title || book?.name || book?.bookTitle || "Untitled book";
}

function getBookCover(book) {
  return book?.imageUrl || book?.coverImage || book?.photo || book?.image || "";
}

function toNumberPrice(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/,/g, ".").replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function formatPrice(value) {
  const numeric = toNumberPrice(value);

  if (numeric === null) {
    return "Price on request";
  }

  return `${numeric.toFixed(2)} DA`;
}

function matchCategory(book, selectedCategory) {
  if (!selectedCategory || selectedCategory === "all") {
    return true;
  }

  const normalized = selectedCategory.trim().toLowerCase();
  const acceptedValues = CATEGORY_MATCHERS[normalized] || [normalized];

  const searchableCategory = [
    book?.category,
    book?.categorySlug,
    book?.categoryName,
    book?.genre,
    book?.subject,
    ...(Array.isArray(book?.tags) ? book.tags : []),
    ...(Array.isArray(book?.categories) ? book.categories : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return acceptedValues.some((value) => searchableCategory.includes(value));
}

function matchSearch(book, query) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const searchable = [book?.title, book?.name, book?.author, book?.writer]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchable.includes(normalizedQuery);
}

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const lang = searchParams.get("lang") || "en";
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const copy = PAGE_COPY[lang] || PAGE_COPY.en;
  const bubbles = BUBBLE_CATEGORIES_BY_LANG[lang] || BUBBLE_CATEGORIES_BY_LANG.en;
  const bubbleCategory = CATEGORY_KEY_SET.has((category || "").toLowerCase()) ? (category || "").toLowerCase() : "all";
  const selectedBubble = bubbles.find((item) => item.key === bubbleCategory) || bubbles[0];
  const categoryTitle = category ? CATEGORY_TITLES[category] || selectedBubble.label : null;
  const pageTitle = categoryTitle || BOOKS_TITLES[lang] || BOOKS_TITLES.en;

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    getBooksByLanguage(lang, 80)
      .then((results) => {
        if (active) {
          setBooks(Array.isArray(results) ? results : []);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [lang]);

  const visibleBooks = useMemo(() => {
    return books.filter((book) => matchCategory(book, bubbleCategory) && matchSearch(book, searchQuery));
  }, [books, bubbleCategory, searchQuery]);

  function onCategorySelect(nextCategory) {
    const nextParams = new URLSearchParams(searchParams);

    if (!nextCategory || nextCategory === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", nextCategory);
    }

    setSearchParams(nextParams);
  }

  const direction = lang === "ar" ? "rtl" : "ltr";

  return (
    <section className="books-page" dir={direction}>
      <header className="books-page__hero">
        <div className="books-page__hero-copy">
          <p className="books-page__eyebrow">{copy.eyebrow}</p>
          <h1 className="books-page__title">{pageTitle}</h1>
          <p className="books-page__subtitle">{copy.subtitle}</p>
        </div>

        {visibleBooks.length > 0 ? (
          <p className="books-page__hero-badge">{`${visibleBooks.length} ${copy.badgeSuffix}`}</p>
        ) : null}

      </header>

      <div className="books-page__toolbar">
        <div className="books-page__categories" role="tablist" aria-label={copy.categoriesAriaLabel}>
          {bubbles.map((item) => {
            const isActive = bubbleCategory === item.key;

            return (
              <button
                key={item.key}
                type="button"
                className={`books-page__category-pill${isActive ? " is-active" : ""}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategorySelect(item.key)}
              >
                <span className="books-page__category-pill-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9.2 12.3l1.8 1.8 3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <p className="books-page__toolbar-copy">{`${visibleBooks.length} ${copy.booksShownLabel}`}</p>
      </div>

      <div className="books-page__grid" aria-label={pageTitle}>
        {isLoading ? (
          <div className="books-page__empty">{copy.loading}</div>
        ) : visibleBooks.length === 0 ? (
          <div className="books-page__empty">{copy.empty}</div>
        ) : (
          visibleBooks.map((book, index) => {
            const id = getBookId(book, index);
            const title = getBookTitle(book);
            const cover = getBookCover(book);
            const price = formatPrice(book?.price);

            return (
              <article key={id} className="books-page__card">
                <div className="books-page__cover-wrap">
                  {cover ? (
                    <img className="books-page__cover" src={cover} alt={`${title} cover`} loading="lazy" />
                  ) : (
                    <div className="books-page__cover books-page__cover--placeholder" aria-hidden="true">
                      <span className="books-page__cover-mark">BOOK</span>
                    </div>
                  )}
                </div>

                <div className="books-page__body">
                  <div className="books-page__text">
                    <h2 className="books-page__book-title">{title}</h2>
                    <p className="books-page__price">{price}</p>
                  </div>

                  <div className="books-page__actions">
                    <Link className="books-page__view-more" to={`/books/${encodeURIComponent(id)}`}>
                      {copy.viewMore}
                    </Link>
                    <button
                      type="button"
                      className="books-page__add-to-cart"
                      onClick={() =>
                        addToCart({
                          id,
                          title,
                          price: toNumberPrice(book?.price) || 0,
                          imageUrl: cover,
                        })
                      }
                    >
                      {copy.addToCart}
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
