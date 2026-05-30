import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Books from "../pages/Books";
import NewArrivals from "../pages/NewArrivals";
import OurBestsellers from "../pages/OurBestsellers";
import BookDetails from "../pages/BookDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/admin/Dashboard";
import BooksAdmin from "../pages/admin/BooksAdmin";
import OrdersAdmin from "../pages/admin/OrdersAdmin";
import CategoriesAdmin from "../pages/admin/CategoriesAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "new-arrivals", element: <NewArrivals /> },
      { path: "our-bestsellers", element: <OurBestsellers /> },
      { path: "books/:id", element: <BookDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "admin/login", element: <AdminLogin /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/books", element: <BooksAdmin /> },
      { path: "admin/orders", element: <OrdersAdmin /> },
      { path: "admin/categories", element: <CategoriesAdmin /> },
    ],
  },
]);
