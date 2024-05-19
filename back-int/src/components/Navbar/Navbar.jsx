import React from 'react';
import axiosClient from '../../axiosClient'
import Logo from "../../assets/logo.png";
import { FaUser, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom'
import DarkMode from "./DarkMode";
import defaultTheme from 'tailwindcss/defaultTheme';
import SmallScrren from './SmallScreen';
import { useGestionnaireContext } from "../../utils/context/GestionnaireContext";

const Pages = [
  {
    id: 1,
    name: "COMMANDES",
    link: "/commande",
  },
  {
    id: 2,
    name: "FACTURATION",
    link: "/facture",
  },
  {
    id: 3,
    name: "STOCK",
    link: "/#",
  },
  {
    id: 4,
    name: "PERSONNEL",
    link: "/gestionnaires",
  },
];


const Navbar = () => {
  // console.log(selectedCategory)
  const {gestionnaire, setGestionnaire, setToken} = useGestionnaireContext();
  const [selectedCategory, setSelectedCategory] = React.useState(-1)
  const [isLoading, setLoading] = React.useState(true)
  const menuRef = React.useRef();
  const smBreakpoint = parseInt(defaultTheme.screens.sm);
  const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth <= smBreakpoint);
  

  const onLogout =  (ev) =>{
    ev.preventDefault();
    axiosClient.get('/logout')
    .then(({}) => {
       goHome()
       setSelectedCategory(-1)
       setGestionnaire(null)
       setToken(null)
       localStorage.removeItem('ACCESS_TOKEN');
       console.log("Test")
      //  window.location.reload(true)
    })
    }

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < smBreakpoint);
    };

    window.addEventListener('resize', checkScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);


  // Event handler to close the menu if clicked outside

  // React.useEffect(() => {
  //   // Add event listener when the component is mounted
  //   document.addEventListener('mousedown', handleClickOutside);
    
  //   // Remove event listener when the component is unmounted
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // console.log("cat: ", categories)
  // console.log("selCat: ", selectedCategory)
  
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      { !isSmallScreen ?
        <div className="bg-primary/40 py-2">
          <div className="container flex justify-between items-center">
            <div>
                <img src={Logo} alt="Logo" className="w-10" />
                E-SHOP DASHBOARD
            </div>

            {/* search bar */}
            <div className="flex justify-between items-center gap-4">
              
              {/* <select
                  onChange={(e) => setSearchType(e.target.value)}
                  className="border shadow-md border-gray-300 bg-white text-gray-500 px-4 py-1.5 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800 rounded-full"
                >
                  <option className="px-4 hover:text-primary duration-200" value="name">Nom</option>
                  <option className="px-4 hover:text-primary duration-200" value="id">Id</option>
              </select> */}

              {/* order button */}
              { gestionnaire && gestionnaire.typeGest == 0 &&
                <Link
                  to="/gestionnaires"
                  onClick={() => setSelectedCategory(-2)}
                  className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
                >
                  <span className="group-hover:block hidden transition-all duration-200">
                    Gestionnaires
                  </span>
                  <FaUsers className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </Link>
              }
              <div>
              {/* <FaUserCircle className="account-icon" style={{ color: 'blue' }} /> */}
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                {gestionnaire && <span className='text-base'>{gestionnaire.nomGest}</span>}
                <span className="text-base group-hover:block hidden transition-all duration-200"> Déconnexion </span> 
              </button>

              </div>
              {/* Darkmode Switch */}
              <div>
                <DarkMode />
              </div>
            </div>
          </div>
        </div>
      : <SmallScrren 
          currentSearchValue={currentSearchValue}
          setCurrentSearchValue={setCurrentSearchValue}
          setSearchValue={setSearchValue}
          setSearchType={setSearchType}
          options={options}
        /> 
      }
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Pages.map((data) => (
            <li key={data.id}>
              <Link
                to={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
