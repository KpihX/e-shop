import React from 'react';
import { useContext } from 'react'
import { CartContext } from '../../../utils/context/CartContext'
import ProductPopup from './ProductPopup';

function Product({ codePro, nomPro, description, prix, image, size1, size2,idCategorie, currentPage,loadProducts,codeArrivage,qte,actif,prixAchat,pourcentage,promo,typeSize,dateInsertion }) {
  const {addToCart, cartItemCount, getCartItem } = useContext(CartContext);
  const cartItemCountValue = cartItemCount(codePro)
  const [orderPopup, setOrderPopup] = React.useState(false);
  const currentProduct = getCartItem(codePro)

  const [popupVisible, setPopupVisible]=React.useState(false)

  React.useEffect(() => {
    if (!currentProduct) {
      setOrderPopup(false)
    }
  }, [currentProduct])
  console.log(codeArrivage);
  return (
    <div key={codePro}
      className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[250px]"
    >
      {/* image section */}
      <h1 className=" bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-xl group-hover:bg-white group-hover:text-primary w-20">Id: {codePro}</h1>
      <div className="h-[200px] relative overflow-hidden pt-[20px]"> 
        <img
          src={image}
          alt=""
          className="max-w-[140px] max-h-full mx-auto group-hover:scale-105 duration-300 drop-shadow-md"
        />
      </div>
      {/* details section */}
      <div className="p-4 text-center">
        
        <h1 className="text-xl font-bold">{nomPro}</h1>
        <h1 className="text-xl font-bold">{prix} FCFA</h1>
        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
          {description}
        </p>
        <button
          className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
          onClick={() => {setOrderPopup(!orderPopup);}}
        >
         Modifier Informations Produit
        </button>
      </div>
      { orderPopup &&
          <ProductPopup 
            orderPopup={orderPopup}
            setOrderPopup={setOrderPopup} 
            codePro={codePro}
            nomPro={nomPro}
            prix={prix}
            quantite={currentProduct ? currentProduct.quantite : 0}
            size1={size1}
            size2={size2}
            image={image}
            description={description}
            codeArrivage={codeArrivage}
            idCategorie={idCategorie}
            qte={qte}
            actif={actif}
            prixAchat={prixAchat}
            pourcentage={pourcentage}
            promo={promo}
            typeSize={typeSize}
            dateInsertion={dateInsertion}
            currentPage={currentPage}
            loadProducts={loadProducts}
          />
        }
    </div>     
  )
}


export default Product