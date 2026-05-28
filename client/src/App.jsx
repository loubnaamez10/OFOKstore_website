import { Link, Outlet } from "react-router-dom";
import { useLang } from "./context/LangContext";
import { useCart } from "./context/CartContext";

export default function App() {
  const { lang, setLang, t } = useLang();
  const { cart } = useCart();

  return (
    <div>
      <nav
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 18 }}>OFOK</div>
        <div>
          <Link to="/" style={{ margin: "0 10px" }}>{t("home")}</Link>
          <Link to="/books" style={{ margin: "0 10px" }}>{t("shop")}</Link>
          <Link to="/cart" style={{ margin: "0 10px" }}>
            {t("cart")} ({cart.length})
          </Link>
          <Link to="/admin" style={{ margin: "0 10px" }}>{t("admin")}</Link>
        </div>
        <div>
          <button onClick={() => setLang("fr")}>FR</button>
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("ar")}>AR</button>
        </div>
      </nav>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
