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
