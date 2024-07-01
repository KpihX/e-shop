import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../utils/context/CartContext';
import ProductPopup from './ProductPopup';
import PopupImage from './PopupImage';
import {
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { PhotoIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import axiosClient from '../../../axiosClient';


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



function Product({
  codePro,
  nomPro,
  description,
  prix,
  image,
  size1,
  size2,
  idCategorie,
  currentPage,
  loadProducts,
  codeArrivage,
  qte,
  actif,
  prixAchat,
  pourcentage,
  promo,
  typeSize,
  dateInsertion,
}) {
  const { addToCart, cartItemCount, getCartItem } = useContext(CartContext);
  const [orderPopup, setOrderPopup] = useState(false);
  const currentProduct = getCartItem(codePro);

  const [popupImg, setPopupImg] = useState(false);

  const handleDelete = (code) => {
    axiosClient
      .post(`/admin/destroyProduct/${code}`)
      .then(() => {})
      .catch((err) => {
        const response = err.response;
        console.log(response.data);
        if (!response) {
          alert('Une erreur interne est survenue!');
          return;
        }
        if (response.status === 422) {
          alert(response.data.message);
        }
      });
  };

  useEffect(() => {
    if (!currentProduct) {
      setOrderPopup(false);
    }
  }, [currentProduct]);

  return (
    <div key={codePro} className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[250px]">
      <h1 className=" bg-orange-400 hover:scale-105 duration-300 text-white py-1 px-1 justify-center flex rounded-xl group-hover:bg-white group-hover:text-primary w-20"> {formatString(codePro)}</h1>
      <div className="h-[200px] relative overflow-hidden pt-[20px]">
        <img
          src={image}
          alt=""
          className="max-w-[140px] max-h-full mx-auto group-hover:scale-105 duration-300 drop-shadow-md"
        />
      </div>
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold">{nomPro}</h1>
        <h1 className="text-xl font-bold">{prix} FCFA</h1>
        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
          {description}
        </p>
        <div className="flex justify-around">
          <Tooltip content="Images" className="bg-green-500">
            <IconButton variant="text" className="bg-green-100"
            onClick={() => setPopupImg(!popupImg)}>
              <PhotoIcon className="h-4 w-4" color="green" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Editer" className="bg-blue-500">
            <IconButton
              variant="text"
              className="bg-blue-100"
              onClick={() => setOrderPopup(!orderPopup)}
            >
              <PencilIcon className="h-4 w-4" color="blue" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Supprimer" className="bg-red-500">
            <IconButton
              variant="text"
              className="bg-red-100"
              onClick={() => handleDelete(parseInt(codePro))}
            >
              <TrashIcon className="h-4 w-4" color="red" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {orderPopup && (
        <ProductPopup
          orderPopup={orderPopup}
          setOrderPopup={setOrderPopup}
          codePro={codePro}
          nomPro={nomPro}
          prix={prix}
          quantite={qte || 0}
          size1={size1}
          size2={size2}
          image={image}
          description={description}
          codeArrivage={codeArrivage}
          idCategorie={idCategorie}
          actif={actif}
          prixAchat={prixAchat}
          pourcentage={pourcentage}
          promo={promo}
          typeSize={typeSize}
          dateInsertion={dateInsertion}
          currentPage={currentPage}
          loadProducts={loadProducts}
        />
      )}
      {popupImg && <PopupImage codePro={codePro} setPopupImage={setPopupImg} />}
    </div>
  );
}

export default Product;
