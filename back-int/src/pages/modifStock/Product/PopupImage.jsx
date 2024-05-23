import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../../axiosClient";

const PopupImage = ({setPopupImage,codePro}) => {

    const [ImagesProduct, setImagesProduct] = useState([]);
    const handleClose =() =>{
        setPopupImage(false);
      };
    React.useEffect(()=>{
        axiosClient.get(`admin/photos?codePro=${codePro}`)
        .then(({data}) => {
            setImagesProduct(data.data)
            setLoading(false)
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des ProductsData: ", error);
            setLoading(false)
          })
      }, [])
    
  return (
    <div className="popup">
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[900px]">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1>Images Produit</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={handleClose}
                  />
                </div>
              </div>
              <div className='scroll'>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 dark:text-white">
              {ImagesProduct.map((data) => (
              <div
                key={data.idPhoto}
                className="space-y-3"
              >
                <img
                  src={data.lienPhoto}
                  alt=""
                  className="h-[100px] w-[80px] object-cover rounded-md"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <button className="text-center mt-2 cursor-pointer bg-primary text-white px-5 rounded-md"
                    onClick={() => handleOrderPopup(data)}>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <label className="flex items-center justify-between flex-row">
                  <p>Add Images :</p>
                  <input
                    type="file"
                    multiple
                    className=" rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                </label>
            </div>
            </div>
      </div>
    </div>
  )
}

export default PopupImage
