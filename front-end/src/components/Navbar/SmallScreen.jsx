import React from "react";
import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import Logo from "../../assets/logo.png";
import Dropdown from "../Dropdown/Dropdown";

const SmallScrren = ({ currentSearchValue, setCurrentSearchValue, setSearchValue, setSearchType, options }) => {
  return (
    <div className="bg-primary/40 py-2">
          <div className="container flex justify-between items-center">
            <div>
              <Link to='/' className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                e-shop
              </Link>
            </div>

            
            <div className="flex justify-between items-center gap-4">
              

              {/* order button */}
              <Link
                to="/cart"
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <span className="group-hover:block hidden transition-all duration-200">
                  Commander
                </span>
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </Link>

              {/* Darkmode Switch */}
              <div>
                <DarkMode />
              </div>
            </div>
          </div>
          {/* search bar */}
          <div className="relative group flex justify-center pl-2 pt-3 gap-2">
              <div className="relative group block">
                <input
                  type="text"
                  placeholder="Recherchez vos produits"
                  value={currentSearchValue}
                  onChange={(e) => setCurrentSearchValue(e.target.value)}
                  className="w-[250px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
                />
                <IoMdSearch 
                  className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" 
                  onClick={() => setSearchValue(currentSearchValue)}
                />
                
              </div>
              <Dropdown 
                options={options}
                onSelect={setSearchType}
                className="px-2"
              />
            </div>
          
        </div>
  )
};

export default SmallScrren;
