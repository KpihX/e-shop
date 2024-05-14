import { useGestionnaireContext } from './utils/context/GestionnaireContext';
import { Outlet } from 'react-router-dom';
import Login from './components/Login/Login';

function AppLayout() {
  const { token } = useGestionnaireContext();

  return (
    <>
      <Outlet />
      {!token && <Login />}
    </>
  );
}

export default AppLayout;