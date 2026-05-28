import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CartProvider } from "./context/CartContext";
import { LangProvider } from "./context/LangContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </LangProvider>
  </React.StrictMode>
);
