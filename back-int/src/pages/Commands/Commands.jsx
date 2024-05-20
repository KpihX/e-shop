import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
// import TopProducts from "./components/TopProducts/TopProducts";
// import Banner from "./components/Banner/Banner";
// import Subscribe from "./components/Subscribe/Subscribe";
// import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import Popup from "../../components/Popup/Popup";
import CartItem from "../../components/CartItem/CartItem";
import { CartContext } from "../../utils/context/CartContext"
import options from "../../datas/options";
import { CategoryContext } from "../../utils/context/CategoryContext";
import { PageContext } from "../../utils/context/PageContext";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('')
  const [currentSearchValue, setCurrentSearchValue] = React.useState('')
  const [searchType, setSearchType] = React.useState(options[0])
  const { setCurrentPage } = React.useContext(PageContext)
  const { cartItems, getTotalCartAmount, checkout } = React.useContext(CartContext)
  const totalAmount = getTotalCartAmount();
  const { selectedCategory, setSelectedCategory} = React.useContext(CategoryContext)
  const [endCommand, setEndCommand] = React.useState(false)
  const navigate = useNavigate();

  const goHome = () => {
    setCurrentPage(0)
    setCurrentSearchValue("")
    setSelectedCategory(-1)
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
      setSearchValue("")
    }
  }, [currentSearchValue]);

  React.useEffect(() => {
    if (endCommand == true) {
      checkout()
      goHome()
      navigate('/');
    }
  }, [endCommand]);

  return (
    <div className="bg-white dark:bg-gray-700 dark:text-white transition duration-200">
      
    </div>
  )
}

export default Cart;
