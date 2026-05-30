import "./BookCard.css";

export default function BookCard({ book, compact = false, showPrice = true }) {
  const coverImage = book?.imageUrl || book?.coverImage || book?.photo || book?.image || "";
  const priceValue = typeof book?.price === "number" ? `$${book.price.toFixed(2)}` : book?.price || "";
  const title = book?.title || "";
  const author = book?.author || book?.writer || "";

  return (
    <article className={`book-card${compact ? " book-card--compact" : ""}`}>
      <div className="book-card__cover-wrap">
        {coverImage ? (
          <img className="book-card__cover" src={coverImage} alt={title ? `${title} cover` : "Book cover"} />
        ) : (
          <div className="book-card__cover book-card__cover--placeholder" aria-hidden="true">
            <span className="book-card__cover-mark">BOOK</span>
          </div>
        )}
      </div>

      <div className="book-card__body">
        {title && <h3 className="book-card__title">{title}</h3>}
        {author && <p className="book-card__author">{author}</p>}
        {showPrice && priceValue && <div className="book-card__price">{priceValue}</div>}
        <div className="book-card__actions">
          <button type="button" className="book-card__cta">Add to Cart</button>
          <button type="button" className="book-card__fav" aria-label={`Save ${title || "book"}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 20.2l-1.35-1.2C5.1 14.2 2 11.4 2 8.05 2 5.35 4.05 3.2 6.65 3.2c1.48 0 2.9.7 3.82 1.82A5.05 5.05 0 0 1 14.3 3.2c2.6 0 4.65 2.15 4.65 4.85 0 3.35-3.1 6.15-8.65 10.95L12 20.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}