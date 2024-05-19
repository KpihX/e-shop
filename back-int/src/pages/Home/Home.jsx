import React from "react";
// import Login from "../../components/Login/Login";
import Navbar from "../../components/Navbar/Navbar";
import "aos/dist/aos.css";
import Footer from "../../components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import Login from '../../components/Login/Login';
import { useGestionnaireContext } from '../../utils/context/GestionnaireContext';
import Commande from "../../components/Commande/Commande";
import ProductsFacture from "../../components/productfacture/ProductsFacture";


const Home = () => {
  const { token } = useGestionnaireContext();
  
  return (
    <div className="bg-white dark:bg-gray-900 duration-200 justify-between">

        <Outlet />
        {!token && <Login />}
    </div>
  );
};

export default Home;
