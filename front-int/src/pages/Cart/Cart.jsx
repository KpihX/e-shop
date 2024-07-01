import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../components/Footer/Footer";
import Popup from "../../components/Popup/Popup";
import CartItem from "../../components/CartItem/CartItem";
import { CartContext } from "../../utils/context/CartContext";
import options from "../../datas/options";
import { CategoryContext } from "../../utils/context/CategoryContext";
import { PageContext } from "../../utils/context/PageContext";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [currentSearchValue, setCurrentSearchValue] = React.useState('');
  const [searchType, setSearchType] = React.useState(options[0]);
  const { setCurrentPage } = React.useContext(PageContext);
  const { cartItems, getTotalCartAmount, checkout } = React.useContext(CartContext);
  const totalAmount = getTotalCartAmount();
  const { selectedCategory, setSelectedCategory } = React.useContext(CategoryContext);
  const [endCommand, setEndCommand] = React.useState(false);
  const navigate = useNavigate();

  const goHome = () => {
    setCurrentPage(0);
    setCurrentSearchValue("");
    setSelectedCategory(-1);
  }

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  React.useEffect(() => {
    if (currentSearchValue === "") {
      setSearchValue("");
    }
  }, [currentSearchValue]);

  React.useEffect(() => {
    if (endCommand === true) {
      checkout();
      goHome();
      navigate('/');
    }
  }, [endCommand]);

  return (
    <div className="bg-white dark:bg-gray-700 dark:text-white transition duration-200">
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
        setSearchValue={setSearchValue}
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        options={options}
        setSearchType={setSearchType}
      />
      <h1 data-aos="fade-up" className="py-10 text-3xl font-bold mx-auto text-center">
        Finalisez vos achats ici...
      </h1>
      {cartItems.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
          {cartItems
            .filter(({ nomPro, codePro }) => {
              if (searchType.value === "name") {
                return nomPro.toLowerCase().includes(searchValue.toLowerCase());
              } else if (searchType.value === "id") {
                return searchValue === "" || codePro === parseInt(searchValue);
              }
              return false;
            })
            .map(({ codePro, nomPro, prix, quantite, image, size1, size2 }) => (
              <CartItem
                key={codePro}
                codePro={codePro}
                nomPro={nomPro}
                prix={prix}
                quantite={quantite}
                size1={size1}
                size2={size2}
                image={image}
              />
            ))}
        </div>
      ) : null}
      {totalAmount > 0 ? (
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-2xl font-bold mb-5">Total : {totalAmount} FCFA</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
            <Link
              className="text-center border border-primary dark:border-white dark:text-white dark:bg-gray-800 bg-white hover:scale-105 duration-300 text-primary py-2 px-4 rounded-full"
              to="/"
              onClick={() => {
                checkout();
                goHome();
              }}
            >
              Vider votre panier
            </Link>
            <Link
              className="text-center border border-primary dark:border-white dark:text-white dark:bg-gray-800 bg-white hover:scale-105 duration-300 text-primary py-2 px-4 rounded-full"
              to="/"
              onClick={() => {
                goHome();
              }}
            >
              Continuez votre shopping...
            </Link>
            <button
              className="text-center border border-primary dark:border-white dark:text-white dark:bg-gray-800 bg-white hover:scale-105 duration-300 text-primary py-2 px-4 rounded-full"
              onClick={handleOrderPopup}
            >
              Valider & Commander
            </button>
          </div>
        </div>
      ) : (
        <h1 className="py-10 text-xl text-center font-bold">
          Votre panier est vide!
        </h1>
      )}
      <Footer
        goHome={goHome}
      />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} setEndCommand={setEndCommand} />
    </div>
  );
}

export default Cart;
