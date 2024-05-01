import {createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import Commands from './pages/Commands.jsx';
import Bills from './pages/Bills.jsx';

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
    {
        path: '/commands',
        element: <Commands />,
    },
    {
        path: '/bills',
        element: <Bills />,
    },
]);

export default router;