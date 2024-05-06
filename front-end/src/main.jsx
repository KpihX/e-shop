// import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx';
import { CartContextProvider } from './utils/context/CartContext.jsx'
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CategoryContextProvider } from "./utils/context/CategoryContext.jsx";
import { PageContextProvider } from "./utils/context/PageContext.jsx";
import { ClientContextProvider } from "./utils/context/ClientContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ClientContextProvider>
    <CategoryContextProvider>
      <PageContextProvider>
        <CartContextProvider>
          <RouterProvider router={router}/>
        </CartContextProvider>
      </PageContextProvider>
    </CategoryContextProvider>
  </ClientContextProvider>
  // </React.StrictMode>
);
