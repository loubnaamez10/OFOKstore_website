import { useSearchParams } from "react-router-dom";

const BOOKS_TITLES = {
  en: "English books",
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

export default function Books() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const category = searchParams.get("category");
  const categoryTitle = category ? CATEGORY_TITLES[category] : null;
  const title = BOOKS_TITLES[lang] || BOOKS_TITLES.en;

  return <h1>{categoryTitle || title}</h1>;
}
