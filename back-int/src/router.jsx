// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Commands from './pages/Commands/Commands.jsx';
import Bills from './pages/Bills/Bills.jsx';
import Error from './components/Error/Error.jsx';
import Stock from './pages/modifStock/Stock/Stock.jsx';
import AppLayout from './AppLayout.jsx';
import Gestionnaires from './pages/Gestionnaires/Gestionnaires.jsx';
import GestionnaireForm from './pages/Gestionnaires/GestionnaireForm.jsx';
import ListeFacrure from './pages/ListeFacture/ListeFacture.jsx'
import DefaultLayout from './DefaultLayout.jsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: <Bills />,
          },
          {
            path: 'bills',
            element: <Bills />,
          },
          {
            path: 'factures',
            element: <ListeFacrure />,
          },
          {
            path: 'commands',
            element: <Commands />,
          },
          {
            path: 'stock',
            element: <Stock />,
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
      
    ]
  }
]);

export default router;