// import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from '../../utils/context/CartContext'

function formatString(input) {
  // Ensure input is a string
  let str = String(input);
  
  // Complete the string to 6 characters if necessary
  if (str.length < 6) {
      str = str.padStart(6, '0');
  }

  const firstPart = str.slice(0, 3);
  const lastPart = str.slice(-3);
  return `${firstPart}-${lastPart}`;
}


function Product({ codePro, nomPro, description, prix, image, size1, size2 }) {
  const {addToCart, cartItemCount } = useContext(CartContext);
  const cartItemCountValue = cartItemCount(codePro)

  return (
    <div key={codePro}
      data-aos="zoom-in"
      className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[250px]"
    >
      {/* image section */}
      <h1 className=" bg-orange-400 hover:scale-105 duration-300 text-white py-1 px-1 justify-center flex rounded-xl group-hover:bg-white group-hover:text-primary w-20"> {formatString(codePro)}</h1>
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
        
        <h1 className="text-xl font-bold">{nomPro}</h1>
        <h1 className="text-xl font-bold">{prix} FCFA</h1>
        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
          {description}
        </p>
        <button
          className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
          onClick={() => addToCart(codePro, nomPro, prix, size1, size2, size1, image, size2)}
        >
          Ajouter au panier {cartItemCountValue != 0 && <> ({cartItemCountValue})</>}
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

export default Product