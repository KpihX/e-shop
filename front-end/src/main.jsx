import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { UserProvider } from './utils/context/UserContext.jsx'
import { CartContextProvider } from './utils/context/CartContext.jsx'
import { ThemeProvider } from './utils/context/ThemeContext.jsx'
import './index.css'
import router from './router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <UserProvider>
      <CartContextProvider>
        <ThemeProvider>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </CartContextProvider>
    </UserProvider>
  // </React.StrictMode>,
)
