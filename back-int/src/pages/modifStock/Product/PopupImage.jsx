import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../../axiosClient";
import {
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/solid';
const PopupImage = ({setPopupImage,codePro}) => {

    const [ImagesProduct, setImagesProduct] = useState([]);
    const handleClose =() =>{
        setPopupImage(false);
      };
    React.useEffect(()=>{
        axiosClient.get(`admin/getPhotos?codePro=${codePro}`)
        .then(({data}) => {
            setImagesProduct(data.data)
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des ProductsData: ", error);
          })
      }, [])

      const handleDelete = (code) => {
        axiosClient
          .post(`/admin/destroyPhoto/${code}`)
          .then(() => {})
          .catch((err) => {
            const response = err.response;
            console.log(response?.data);
            if (!response) {
              alert('Une erreur interne est survenue!');
              return;
            }
            if (response.status === 422) {
              alert(response.data.message);
            }
          });
      };
    
  return (
    <div className="popup">
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white text-black dark:bg-gray-900 dark:text-white rounded-md duration-200 w-[900px]">
              {/* header */}
              <div className="flex items-center justify-between p-3">
                  <h1 className="text-2xl">Images Produit</h1>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={handleClose}
                  />
                </div>
              </div>
              <div className='scroll p-3'>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 dark:text-white">
              {ImagesProduct.map((data) => (
              <div
                key={data.idPhoto}
                className="space-y-3"
              >
                <img
                  src={data.lienPhoto}
                  alt=""
                  className="h-[150px] w-[80px] object-cover rounded-md"
                />
                <div>
                  <div className="flex items-center justify-center">
                  <Tooltip content="Supprimer" className="bg-red-500">
            <IconButton
              variant="text"
              className="bg-red-100"
              onClick={() => handleDelete(parseInt(data.idPhoto))}
            >
              <TrashIcon className="h-4 w-4" color="red" />
            </IconButton>
          </Tooltip>
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
