// import PropTypes from 'prop-types'
import React from 'react'
import { CartContext } from '../../utils/context/CartContext'
import { FaCaretDown } from "react-icons/fa";

const colorOptions = [
  { value: 'default', label: 'Défaut', color: '' },
  { value: 'white', label: 'Blanc', color: 'Blanc' },
  { value: 'red', label: 'Rouge', color: 'Rouge' },
  { value: 'orange', label: 'Orange', color: 'Orange' },
  { value: 'yellow', label: 'Jaune', color: 'Jaune' },
  { value: 'green', label: 'Vert', color: 'Vert' },
  { value: 'blue', label: 'Bleu', color: 'Bleu' },
  { value: 'indigo', label: 'Indigo', color: 'indigo' },
  { value: 'violet', label: 'Violet', color: 'violet' },
  { value: 'black', label: 'Noir', color: 'Noir' },
];

function CartItem({ codePro, nomPro, description, prix, quantite, image, size1, size2 }) {
  const { getCartItem, cartItems, addToCart, removeFromCart, updateCartItemCount, updateCartItemColor, updateCartItemSize } = React.useContext(CartContext)
  const currentProduct = getCartItem(codePro)
  const [inputValue, setInputValue] = React.useState(quantite ? quantite.toString() : '')
  const [sizeClothe, setSizeClothe] = React.useState(currentProduct.size)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(colorOptions.filter((option) => (option.label == currentProduct.color))[0]);
	const menuRef = React.useRef();

  // console.log("*****", currentProduct.color, colorOptions.filter((option) => (option.label == currentProduct.color))[0])

  function isInt(str) {
    const num = parseInt(str, 10);
    return !isNaN(num) && Number.isInteger(num) && str == num.toString();
  }

  // Appelé lorsque l'utilisateur modifie la valeur de l'input
  const handleInputChange = (e) => {
    const value = e.target.value
    if (isInt(value) && parseInt(value) >= 0) {
      setInputValue(value)
    } else if (value == "") {
      setInputValue("0")
    } else {
      alert('Veuillez saisir un entier positif pour la quantité!');
    }
  }

  // Appelé lorsque l'utilisateur quitte l'input ou appuie sur Entrée
  const handleBlurOrEnter = (e) => {
    
    let value = e.target.value
    // alert("Value: " + value)
    if (value == "") {
      value = "0"
    } else if (!isInt(value) || parseFloat(value) < 0) {
      alert('Veuillez saisir un entier positif pour la quantité!')
      return
    }
    
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      const newQuantity = Number(value) || 0;
      
      updateCartItemCount(newQuantity, codePro);
      setInputValue(newQuantity.toString()); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
      // console.log(inputValue)
    }
    
  };

  const handleBlurOrEnterSize = (e) => {
    const size = e.target.value
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      updateCartItemSize(size, codePro);
      console.log(codePro, size)
      console.log(cartItems)
      setSizeClothe(size); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
      // alert(sizeClothe)
    }
  };

  React.useEffect(() => {
    // Assurez-vous que l'inputValue est mis à jour si la quantité externe change
    setInputValue(quantite ? quantite.toString() : '');
  }, [quantite]);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    updateCartItemColor(option.color, codePro)
    setIsMenuOpen(false);
  };

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

  return (
    <div key={codePro}
      data-aos="zoom-in"
      className="mt-10 z-10 mb-5 flex flex-row mx-5 rounded-2xl bg-orange-50 dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-slate-900 hover:text-white relative shadow-xl duration-300"
    >
      {/* image section */}
      <h1 className="absolute bg-orange-400 hover:scale-105 duration-300 text-white py-1 px-4 rounded-xl group-hover:bg-white group-hover:text-primary min-w-20 h-10">Id: {codePro}</h1>
      <div className='sm:grid sm:grid-cols-2 items-center justify-center'>
        <div className=" h-max relative overflow-hidden"> 
          <img
            src={image}
            alt=""
            className="max-w-[140px] max-h-full mx-auto group-hover:scale-105 duration-300 drop-shadow-md py-20"
          />
        </div>
        {/* details section */}
        <div className="p-4 text-center sm:text-left">
          {/* star rating */}
          {/* <div className="w-full flex items-center justify-center gap-1">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          </div> */}
          <h1 className="text-xl font-bold">{nomPro}</h1>
          <h1 className="text-xl font-bold mb-3">{prix} FCFA</h1>
          <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
            {description}
          </p>
          <div className='flex flex-col sm:flex-row'>
            <h1 className="text-xl ">Sélectionner votre couleur:&nbsp;</h1>
            
            <div className="group self-center sm:self-auto relative cursor-pointer">
              {/* Menu button for smaller screens */}
              <button className="text-xl flex items-center gap-[2px] " onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {selectedOption.label}
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </button>
              {isMenuOpen &&
              <ul ref={menuRef} style={{ maxHeight: '100px' }} className="overflow-auto flex-col text-left w-max items-center absolute group-hover:block rounded-md bg-white text-black shadow-md dark:bg-gray-900 dark:text-white">
                {colorOptions.map((option) => (
                  <li 
                    className={`px-4  hover:bg-primary/20 block transition-all duration-200 ${selectedOption.value === option.value ? 'text-primary' : ''}`}
                    key={option.value} 
                    onClick={() => handleOptionClick(option)}
                  >
                    <span className={`inline-block w-3 h-3 mr-2 rounded-full`} style={{ backgroundColor: option.value }}></span>
                    {option.label}
                  </li>
                ))}
              </ul>
              }
            </div>
          </div>
          <h1 className="text-xl">Entrez votre taille (compris entre {size1} et {size2}): </h1>
          <input
            type="text"
            value={sizeClothe}
            onChange={e => setSizeClothe(e.target.value)}
            onBlur={handleBlurOrEnterSize}
            onKeyDown={handleBlurOrEnterSize}
            className="text-black dark:text-white mt-2 w-[190px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
          />
          <br/>
          <button
            className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
            onClick={() => removeFromCart(codePro)}
          >
            -
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlurOrEnter}
            onKeyDown={handleBlurOrEnter}
            className="text-black dark:text-white mx-2 w-[100px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
          />
          <button
            className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
            onClick={() => addToCart(codePro, nomPro, prix, size1, size2, sizeClothe, image, selectedOption.color)}
          >
            +
          </button>
        </div>
      </div>
    </div>     
  )
}

// Product.propTypes = {
//   label: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
// }

// Product.defaultProps = {
//   label: '',
//   title: '',
//   picture: DefaultPicture,
// }

export default CartItem