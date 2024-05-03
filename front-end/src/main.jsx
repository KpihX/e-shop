// import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx';
import { CartContextProvider } from './utils/context/CartContext.jsx'
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <CartContextProvider>
    <RouterProvider router={router}/>
  </CartContextProvider>
  // </React.StrictMode>
);
