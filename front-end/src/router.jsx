import {createBrowserRouter} from 'react-router-dom';

import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/cart',
        element: <Cart />,
    }
]);

export default router;