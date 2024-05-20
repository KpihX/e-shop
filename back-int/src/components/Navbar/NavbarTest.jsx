import React from 'react';
import axiosClient from '../../axiosClient'
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown, FaUser, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom'
import DarkMode from "./DarkMode";
import defaultTheme from 'tailwindcss/defaultTheme';
import SmallScrren from './SmallScreen';
import Dropdown from '../Dropdown/Dropdown';
import { CategoryContext } from '../../utils/context/CategoryContext';
import { useGestionnaireContext } from "../../utils/context/GestionnaireContext";

// const DropdownLinks = [
//   {
//     id: 1,
//     name: "Trending Products",
//     link: "/#",
//   },
//   {
//     id: 2,
//     name: "Best Selling",
//     link: "/#",
//   },
//   {
//     id: 3,
//     name: "Top Rated",
//     link: "/#",
//   },
// ];

const Navbar = ({selectedCategory, setSelectedCategory, setCurrentPage, setSearchValue, currentSearchValue, setCurrentSearchValue, setSearchType, options }) => {
  // console.log(selectedCategory)
  const {gestionnaire, setGestionnaire, setToken} = useGestionnaireContext();
  const { categories, setCategories } = React.useContext(CategoryContext)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const menuRef = React.useRef();
  const smBreakpoint = parseInt(defaultTheme.screens.sm);
  const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth <= smBreakpoint);
  
  const goHome = () => {
    setCurrentPage(0)
    setCurrentSearchValue("")
  }

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

  React.useEffect(() => {
    setLoading(true)
    axiosClient.get('/shop/categories')
      .then(({data}) => {
        setCategories(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories: ", error);
        setLoading(false)
      })
  }, [])

  // Event handler to close the menu if clicked outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // console.log("cat: ", categories)
  // console.log("selCat: ", selectedCategory)
  
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      { !isSmallScreen ?
        <div className="bg-primary/40 py-2">
          <div className="container flex justify-between items-center">
            <div>
              <Link onClick={() => {goHome(); setSelectedCategory(-1)}} to='/' className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                e-shop
              </Link>
            </div>

            {/* search bar */}
            <div className="flex justify-between items-center gap-4">
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Recherchez vos produits"
                  value={currentSearchValue}
                  onChange={(e) => setCurrentSearchValue(e.target.value)}
                  className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
                />
                <IoMdSearch 
                  className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" 
                  onClick={() => setSearchValue(currentSearchValue)}
                />
                
              </div>
              <Dropdown 
                options={options}
                onSelect={setSearchType}
              />
              {/* <select
                  onChange={(e) => setSearchType(e.target.value)}
                  className="border shadow-md border-gray-300 bg-white text-gray-500 px-4 py-1.5 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800 rounded-full"
                >
                  <option className="px-4 hover:text-primary duration-200" value="name">Nom</option>
                  <option className="px-4 hover:text-primary duration-200" value="id">Id</option>
              </select> */}

              {/* order button */}
              <Link
                to="/cart"
                onClick={() => setSelectedCategory(-2)}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <span className="group-hover:block hidden transition-all duration-200">
                  Commander
                </span>
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </Link>
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
        <h1
          className="inline-block px-4 hover:text-primary duration-100 gap-[2px] py-2" 
          key={-1} 
        >
          {selectedCategory === -1 ? (
            <Link   
              onClick={() => {goHome(); setSelectedCategory(-1)}}
              className="group-hover:block transition-all duration-100 text-primary"
              to="/">
              Accueil
            </Link>
            ) : (
            <Link   
              onClick={() => {goHome(); setSelectedCategory(-1)}}
              className="group-hover:block transition-all duration-100"
              to="/">
              Accueil
            </Link>
          )}
        </h1>
        <div className="group relative cursor-pointer py-2">
          {/* Menu button for smaller screens */}
          <button className="sm:hidden flex items-center gap-[2px] " onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {selectedCategory === -1 || selectedCategory === -2 ? <p>Categories</p> : 
              <p className="text-primary block transition-all duration-200">
                {categories.find(({ idCat }) => idCat === selectedCategory).nomCat}
              </p>
            }
            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
          </button>
          <ul ref={menuRef} className={`sm:flex sm:items-center ${isMenuOpen ? 'absolute z-[9999] group-hover:block rounded-md bg-white text-black shadow-md bg-white dark:bg-gray-900 dark:text-white' : 'hidden'}`}>
            {isLoading ? <p>Catégories...</p> : categories.map(({ idCat, nomCat }) => (
              <li 
                className="px-4 hover:bg-primary/20 duration-200" 
                key={idCat} 
                onClick={() => {
                  setSelectedCategory(idCat)
                  setCurrentPage(0)
                  setIsMenuOpen(false); // Close menu on selection
                }}
              >
                {idCat === selectedCategory ? (
                  <Link   
                    onClick={() => {goHome(); setSelectedCategory(idCat)}}
                    className={`${idCat === selectedCategory ? 'text-primary' : ''} block transition-all duration-200`}
                    to="/"
                  >
                    {nomCat}
                  </Link>
                ) : (
                  <Link   
                    onClick={() => {goHome(); setSelectedCategory(idCat)}}
                    className="group-hover:block transition-all duration-200"
                    to="/"
                  >
                    {nomCat}
                  </Link>
                )}
              </li>
            ))}
            {/* Simple Dropdown and Links */}
            {/* <li className="group relative cursor-pointer">
              <a href="#" className="flex items-center gap-[2px] py-2">
                Trending Products
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </a>
              <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <a
                        href={data.link}
                        className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                      >
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
