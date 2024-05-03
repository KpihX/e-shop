import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";
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
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const { cartItems, getTotalCartAmount, checkout } = React.useContext(CartContext)
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

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

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white transition duration-200">
      <Navbar />
      <h1 data-aos="fade-up" className="text-3xl font-bold text-center mx-auto">
        Finalisez vos achats ici...
      </h1>
      {cartItems.map(({ codePro, nomPro, prix, quantite, image, size1, size2 }) => (
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
      {totalAmount > 0 ? (
        <>
          <h1 className="text-xl font-bold">total: {totalAmount}€</h1>
          <button
            className="bg-primary hover:scale-105 transition duration-300 text-white py-1 px-4 rounded-full mt-4"
            onClick={() => navigate("/")}
          >
            Continuez votre shopping...
          </button>
          <button
            className="bg-primary hover:scale-105 transition duration-300 text-white py-1 px-4 rounded-full mt-4"
            onClick={() => {
              navigate("/");
              checkout();
            }}
          >
            Vider
          </button>
          <button
            className="bg-primary hover:scale-105 transition duration-300 text-white py-1 px-4 rounded-full mt-4"
            onClick={handleOrderPopup}
          >
            Valider
          </button>
        </>
      ) : (
        <h1 className="text-xl font-bold"> 
          Votre panier est vide!
        </h1>
      )}
      <Footer />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
}

export default Cart;
