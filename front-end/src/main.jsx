import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from './router.jsx';
import { CartContextProvider } from './utils/context/CartContext.jsx'
import { ThemeProvider } from './utils/context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <CartContextProvider>
        <ThemeProvider>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </CartContextProvider>
  // </React.StrictMode>,
)
