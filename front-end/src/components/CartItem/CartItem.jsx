// import PropTypes from 'prop-types'
import React from 'react'
import { CartContext } from '../../utils/context/CartContext'

function CartItem({ codePro, nomPro, description, prix, quantite, image, size1, size2 }) {
  const { addToCart, removeFromCart, updateCartItemCount, updateCartItemColor, updateCartItemSize } = React.useContext(CartContext)
  const [inputValue, setInputValue] = React.useState(quantite ? quantite.toString() : '')
  const [colorClothe, setColorClothe] = React.useState("")
  const [sizeClothe, setSizeClothe] = React.useState(size1)

  const handleInputChange = (e) => {
    const value = e.target.value
    if (!isNaN(value) && parseFloat(value) > 0) {
      setInputValue(value)
    } else {
      alert('Veuillez saisir un nombre positif pour la quantité!');
    }
  }

  const handleBlurOrEnter = (e) => {
    const value = e.target.value
    if (isNaN(value) || parseFloat(value) <= 0) {
      alert('Veuillez saisir un nombre positif pour la quantité!')
      return
    }
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      const newQuantity = Number(value) || 0;
      updateCartItemCount(newQuantity, codePro);
      setInputValue(newQuantity.toString()); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
    }
  };

  const handleBlurOrEnterColor = (e) => {
    const color = e.target.value
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      updateCartItemColor(color, codePro);
      setColorClothe(color); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
    }
  }

  const handleBlurOrEnterSize = (e) => {
    const size = e.target.value
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      updateCartItemSize(size, codePro);
      setSizeClothe(size); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
    }
  };

  React.useEffect(() => {
    // Assurez-vous que l'inputValue est mis à jour si la quantité externe change
    setInputValue(quantite ? quantite.toString() : '');
  }, [quantite]);

  return (
    <div key={codePro}
      data-aos="zoom-in"
      className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group"
    >
      {/* image section */}
      <div className="h-[200px] relative overflow-hidden pt-[20px]"> 
        <img
          src={image}
          alt=""
          className="max-w-[140px] max-h-full mx-auto group-hover:scale-105 duration-300 drop-shadow-md"
        />
      </div>
      {/* details section */}
      <div className="p-4 text-center">
        {/* star rating */}
        {/* <div className="w-full flex items-center justify-center gap-1">
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        </div> */}
        <h1 className="text-xl font-bold">ID: {codePro}</h1>
        <h1 className="text-xl font-bold">{nomPro}</h1>
        <h1 className="text-xl font-bold">{prix} FCFA</h1>
        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
          {description}
        </p>
        <h1 className="text-xl font-bold">Entrez votre couleur: </h1>
        {/* TO DO: ComboBox de couleurs à la place! */}
        <input
          type="text"
          placeholder="couleur"
          onChange={e => setColorClothe(e.target.value)}
          onBlur={handleBlurOrEnterColor}
          onKeyDown={handleBlurOrEnterColor}
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
        />
        <h1 className="text-xl font-bold">Entrez votre taille (compris entre {size1} et {size2}): </h1>
        {/* TO DO: ComboBox de couleurs à la place! */}
        <input
          type="text"
          placeholder="taille"
          onChange={e => setSizeClothe(e.target.value)}
          onBlur={handleBlurOrEnterSize}
          onKeyDown={handleBlurOrEnterSize}
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
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
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
        />
        <button
          className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
          onClick={() => addToCart(codePro, nomPro, prix, size1, size2, sizeClothe, image, colorClothe)}
        >
          +
        </button>
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