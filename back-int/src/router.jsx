// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart/Cart.jsx';
import Home from './pages/Home/Home.jsx';
import Error from './components/Error/Error.jsx';
import AppLayout from './AppLayout.jsx';
import Gestionnaires from './pages/Gestionnaires/Gestionnaires.jsx';
import GestionnaireForm from './pages/Gestionnaires/GestionnaireForm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'gestionnaires',
        element: <Gestionnaires />,
        children: [
          {
            path: 'new',
            element: <GestionnaireForm key="gestionnaireCreate"/>
          },
          {
            path: ':id/edit',
            element: <GestionnaireForm key="gestionnaireUpdate"/>
          }
        ]
      }
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

export default router;