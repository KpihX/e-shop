import { useGestionnaireContext } from './utils/context/GestionnaireContext';
import { Outlet } from 'react-router-dom';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function AppLayout() {
  const { token } = useGestionnaireContext();

  return (
    <>
      <Navbar />
      <Outlet />
      {!token && <Login />}
      <Footer />
    </>
  );
}

export default AppLayout;