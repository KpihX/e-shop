import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../../axiosClient";
import {
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/solid';

const PopupImage = ({setPopupImage, codePro}) => {
  const [imagesProduct, setImagesProduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setPopupImage(false);
  };
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
      setSelectedFiles(Array.from(e.target.files));
    };
  const handleCanceled = (fileToRemove) => {
    const updatedSelectedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedPhotos);
  };

  const adjustFile = (newFiles) => {
    const updatedFiles = newFiles.map((file) => ({
      file: file,
      url: URL.createObjectURL(file) // Obtenir l'URL temporaire du fichier
    }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    axiosClient.post("admin/upload", formData)
      .then((response) => {
        console.log("Upload successful");
        // Gérer la réponse du serveur si nécessaire
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  useEffect(() => {
    axiosClient.get(`admin/getPhotos?codePro=${codePro}`)
      .then(({ data }) => {
        setImagesProduct(data.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des ProductsData: ", error);
      });
  }, [codePro]);

  const handleDelete = (idPhoto) => {
    axiosClient
      .post(`/admin/destroyPhoto/${idPhoto}`)
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
    codePro ? (
      <div className="popup">
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white text-black dark:bg-gray-900 dark:text-white rounded-md duration-200 w-[900px]">
            <div className="flex items-center justify-between p-3">
              <h1 className="text-2xl">Images Produit</h1>
              <div>
                <IoCloseOutline
                  className="text-2xl cursor-pointer"
                  onClick={handleClose}
                />
              </div>
            </div>
            <div className="scroll p-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 dark:text-white">
                {imagesProduct.map((data) => (
                  <span key={data.idPhoto} 
                        className="space-y-3"
                  >
                    <img
                      src={data.lienPhoto}
                      alt=""
                      className="h-auto w-auto object-cover rounded-md"
                    />
                      <span className="flex items-center justify-center"
                       >
                        <Tooltip content="Supprimer" className="bg-red-500">
                          <IconButton
                            variant="text"
                            className="bg-red-100"
                            onClick={() =>handleDelete(data.idPhoto)}
                          >
                            <TrashIcon className="h-4 w-4" color="red" />
                          </IconButton>
                        </Tooltip>
                      </span>
                  </span>
                ))}
                {/* {selectedFiles.map((data) => (
                  <div key={data.index} className="space-y-3">
                    <img
                      src={data}
                      alt=""
                      className="h-auto w-auto object-cover rounded-md"
                    />
                    <div>
                      <div className="flex items-center justify-center">
                        <Tooltip content="Supprimer" className="bg-red-500">
                          <IconButton
                            variant="text"
                            className="bg-red-100"
                            onClick={() => handleCanceled(data)}
                          >
                            <TrashIcon className="h-4 w-4" color="red" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
              <label className="flex items-center justify-between flex-row">
                <p>Ajouter des images :</p>
                <input
                 type="file"
                 multiple
                 onChange={handleFileChange}
                 className="rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="popup">
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white text-black dark:bg-gray-900 dark:text-white rounded-md duration-200 w-[900px]">
            <div className="flex items-center justify-between p-3">
              <h1 className="text-2xl">Images Produit</h1>
              <div>
                <IoCloseOutline
                  className="text-2xl cursor-pointer"
                  onClick={handleClose}
                />
              </div>
            </div>
            <div className="scroll p-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 dark:text-white">
                {selectedFiles.map((data) => (
                  <div key={data.idPhoto} className="space-y-3">
                    <img
                      src={data.lienPhoto}
                      alt=""
                      className="h-auto w-auto object-cover rounded-md"
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
                <p>Ajouter des images :</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                />
                <button onClick={handleUpload}>Upload</button>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PopupImage;

