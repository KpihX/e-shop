import {createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
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
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;