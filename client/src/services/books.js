const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function readBooks(path) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) {
      return [];
    }

    const payload = await response.json();

    if (Array.isArray(payload)) {
      return payload;
    }

    if (Array.isArray(payload?.items)) {
      return payload.items;
    }

    if (Array.isArray(payload?.books)) {
      return payload.books;
    }

    return [];
  } catch {
    return [];
  }
}

function normalizeLanguageCode(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (!normalized) {
    return "";
  }

  if (normalized.startsWith("en") || normalized.includes("english") || normalized === "anglais") {
    return "en";
  }

  if (normalized.startsWith("fr") || normalized.includes("french") || normalized.includes("franc")) {
    return "fr";
  }

  if (normalized.startsWith("ar") || normalized.includes("arab")) {
    return "ar";
  }

  return normalized;
}

function pickBookLanguage(book) {
  if (!book || typeof book !== "object") {
    return "";
  }

  const languageSources = [
    book.lang,
    book.language,
    book.languageCode,
    book.bookLanguage,
    book.locale,
  ];

  const match = languageSources.find((value) => typeof value === "string" && value.trim());
  return normalizeLanguageCode(match);
}

export async function getBooksByLanguage(language = "en", limit = 40) {
  const normalizedLanguage = normalizeLanguageCode(language) || "en";
  const books = await readBooks(`/api/books?limit=${limit}&sort=addedAt:desc`);

  const filtered = books.filter((book) => pickBookLanguage(book) === normalizedLanguage);
  return filtered.slice(0, limit);
}

export async function getLatestBooks(limit = 20) {
  const books = await readBooks(`/api/books?limit=${limit}&sort=addedAt:desc`);
  return books.slice(0, limit);
}

export async function getBestSellersBooks(limit = 20) {
  const books = await readBooks(`/api/books?limit=${limit}&sort=soldCount:desc`);

  if (books.length > 0) {
    return books.slice(0, limit);
  }

  return getLatestBooks(limit);
}

export async function getSchoolSuppliesBooks(limit = 20) {
  const books = await readBooks(`/api/books?limit=${limit}&category=school-supplies&sort=soldCount:desc`);

  if (books.length > 0) {
    return books.slice(0, limit);
  }

  return getBestSellersBooks(limit);
}

export async function getKidsBooks(limit = 20) {
  const books = await readBooks(`/api/books?limit=${limit}&category=children&sort=soldCount:desc`);

  if (books.length > 0) {
    return books.slice(0, limit);
  }

  return getSchoolSuppliesBooks(limit);
}
