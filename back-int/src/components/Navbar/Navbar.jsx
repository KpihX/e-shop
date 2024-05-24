import React, { useEffect } from 'react';
import axiosClient from '../../axiosClient'
import Logo from "../../assets/logo.png";
import { Link } from 'react-router-dom'
import DarkMode from "./DarkMode";
import { useGestionnaireContext } from "../../utils/context/GestionnaireContext";
import { FaUsers, FaUser } from 'react-icons/fa';
import pages from "../../pages";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const {token, gestionnaire, setGestionnaire, setToken} = useGestionnaireContext();
  const [selectedPage, setSelectedPage] = React.useState(pages[0])
  const location = useLocation()
  
  useEffect(() => {
    const currentPage = location.pathname
    if (pages.filter(page => page.link === currentPage).length == 0) {
      setSelectedPage(null)
    }
  }, [location])

  const onLogout =  (ev) =>{
    ev.preventDefault();
    axiosClient.get('/logout')
    .then(() => {
       setGestionnaire(null)
       setToken(null)
      //  navigate()
       localStorage.removeItem('ACCESS_TOKEN');
    })
  }
  
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
        <div className="bg-primary/40 py-2">
          <div className="container flex justify-between items-center">
            <div>
              <Link to='/' className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                e-shop
              </Link>
            </div>

            {/* search bar */}
            <div className="flex justify-between items-center gap-4">
              { gestionnaire && gestionnaire.typeGest == 0 &&
                <Link
                  to="/gestionnaires"
                  onClick={() => setSelectedPage(null)}
                  className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
                >
                  <span className="group-hover:block hidden transition-all duration-200">
                    Gestionnaires
                  </span>
                  <FaUsers className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </Link>
              }
              <div>
              {token &&
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                {gestionnaire && <span className='text-base'>{gestionnaire.nomGest}</span>}
                <span className="text-base group-hover:block hidden transition-all duration-200"> Déconnexion </span> 
              </button>
              }

              </div>
              {/* Darkmode Switch */}
              <div>
                <DarkMode />
              </div>
            </div>
          </div>
        </div>
      {/* lower Navbar */}
      <div className="flex justify-center">
        <div className="group relative cursor-pointer py-2">
          {/* Menu button for smaller screens */}
          <ul className={`sm:flex sm:items-center`}>
            {pages.map((page) => (
              <li 
                className="px-4 hover:bg-primary/20 duration-200" 
                key={page.name} 
                onClick={() => setSelectedPage(page)}
              >
                {selectedPage === page ? (
        
                  <Link   
                    className="group-hover:block transition-all duration-100 text-primary"
                    to={page.link}>
                    {page.name}
                  </Link>
                  ) : (
                  <Link   
                    className="group-hover:block transition-all duration-100"
                    to={page.link}>
                    {page.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
