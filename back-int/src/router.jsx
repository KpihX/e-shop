// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Error from './components/Error/Error.jsx';
import AppLayout from './AppLayout.jsx';
import Gestionnaires from './pages/Gestionnaires/Gestionnaires.jsx';
import GestionnaireForm from './pages/Gestionnaires/GestionnaireForm.jsx';
import ProductsFacture from './components/productfacture/ProductsFacture.jsx';
import Commande from './components/Commande/Commande.jsx';
import Home from './pages/Home/Home.jsx';
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
          path:'/facture',
          element:<ProductsFacture />
      },
      {
        path: '/commande',
        element: <Commande />,
      },
      {
        path: '/gestionnaires',
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