import {createBrowserRouter} from 'react-router-dom';

import Cart from './pages/Cart/Cart.jsx';
import Home from './pages/Home/Home.jsx';
import Error from './components/Error/Error.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/cart',
        element: <Cart />,
    },
    {
        path: '*',
        element: <Error />,
    },
    // Page erreur ?
]);

export default router;