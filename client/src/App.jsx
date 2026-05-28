import { Outlet } from "react-router-dom";
import { useLang } from "./context/LangContext";
import { useCart } from "./context/CartContext";
import Navbar from "./components/Navbar";

export default function App() {
  const { setLang, t } = useLang();
  const { cart } = useCart();

  return (
    <div>
      <Navbar />

      <main style={{ padding: "20px", paddingTop: "80px" }}>
        <Outlet />
      </main>
    </div>
  );
}