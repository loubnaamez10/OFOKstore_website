import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LangContext";
import "./Cart.css";

const PAGE_COPY = {
  fr: {
    steps: ["Panier", "VALIDATION", "Payer", "CONFIRMATION"],
    emptyTitle: "VOTRE PANIER EST VIDE",
    emptyBody: "Parcourez notre collection et trouvez quelque chose qui vous plaira.",
    buyNow: "ACHETER MAINTENANT",
    summaryEyebrow: "Votre panier",
    summaryTitle: "Récapitulatif de commande",
    total: "Total",
    quantity: "Quantité :",
  },
  en: {
    steps: ["Cart", "CHECKOUT", "Pay", "CONFIRMATION"],
    emptyTitle: "YOUR CART IS EMPTY",
    emptyBody: "Browse our collection and find something you'll love.",
    buyNow: "SHOP NOW",
    summaryEyebrow: "Your cart",
    summaryTitle: "Order summary",
    total: "Total",
    quantity: "Quantity:",
  },
  ar: {
    steps: ["السلة", "المراجعة", "الدفع", "التأكيد"],
    emptyTitle: "سلة التسوق فارغة",
    emptyBody: "تصفح مجموعتنا واعثر على ما يعجبك.",
    buyNow: "تسوق الآن",
    summaryEyebrow: "سلة التسوق",
    summaryTitle: "ملخص الطلب",
    total: "المجموع",
    quantity: "الكمية:",
  },
};

export default function Cart() {
  const { cart, cartTotal } = useCart();
  const { lang } = useLang();

  const isEmpty = cart.length === 0;
  const copy = PAGE_COPY[lang] || PAGE_COPY.en;
  const direction = lang === "ar" ? "rtl" : "ltr";

  return (
    <section className="cart-page" dir={direction} aria-labelledby="cart-title">
      <div className="cart-page__shell">
        <nav className="cart-steps" aria-label="Progression de commande">
          {copy.steps.map((step, index) => (
            <span
              key={step}
              className={`cart-steps__item${index === 0 ? " is-active" : ""}`}
            >
              {step}
            </span>
          ))}
        </nav>

        {isEmpty ? (
          <article className="cart-empty">
            <svg
              className="cart-empty__illustration"
              viewBox="0 0 180 150"
              role="img"
              aria-labelledby="cart-empty-title"
            >
              <title id="cart-empty-title">{copy.emptyTitle}</title>
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M74 55h64l-7 46H82Z" strokeWidth="2.5" />
                <path d="M59 43h11l4 22" strokeWidth="2.5" />
                <path d="M58 109h98" strokeWidth="2.5" />
                <circle cx="88" cy="110" r="4.5" strokeWidth="2.5" />
                <circle cx="125" cy="110" r="4.5" strokeWidth="2.5" />
                <path d="M70 32l-3.5-3.5M98 28v-5M122 42l3.5-3.5M147 31h5" strokeWidth="1.8" opacity="0.7" />
              </g>
            </svg>

            <h1 id="cart-title">{copy.emptyTitle}</h1>
            <p>{copy.emptyBody}</p>

            <div className="cart-empty__actions">
              <Link to="/" className="cart-empty__button cart-empty__button--outline">
                {copy.buyNow}
              </Link>
            </div>
          </article>
        ) : (
          <article className="cart-summary">
            <header className="cart-summary__header">
              <div>
                <p className="cart-summary__eyebrow">{copy.summaryEyebrow}</p>
                <h1 id="cart-title">{copy.summaryTitle}</h1>
              </div>
              <div className="cart-summary__total" aria-label="Total du panier">
                <span>{copy.total}</span>
                <strong>{cartTotal.toFixed(2)} Da</strong>
              </div>
            </header>

            <div className="cart-summary__list">
              {cart.map((item) => (
                <div className="cart-summary__item" key={item.id}>
                  <div>
                    <h2>{item.title}</h2>
                    <p>
                      {copy.quantity} {item.quantity}
                    </p>
                  </div>
                  <strong>{(item.price * item.quantity).toFixed(2)} Da</strong>
                </div>
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
