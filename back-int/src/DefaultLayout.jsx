import { useGestionnaireContext } from './utils/context/GestionnaireContext';
import Login from './components/Login/Login';
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
  const { token } = useGestionnaireContext();

  return (
    <>
      <Outlet />
      {!token && <Login />}
    </>
  );
}

export default DefaultLayout;