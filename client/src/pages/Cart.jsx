import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, cartTotal } = useCart();
  return (
    <div>
      <h1>Votre panier</h1>
      <p>Nombre d'articles : {cart.length}</p>
      <p>Total : {cartTotal.toFixed(2)} €</p>
    </div>
  );
}
