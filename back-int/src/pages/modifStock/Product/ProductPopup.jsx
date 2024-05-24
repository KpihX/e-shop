import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../../axiosClient";
import PopupImage from "./PopupImage";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


  const ProductPopup = ({
    orderPopup,
    setOrderPopup,
    codePro,
    nomPro,
    prix,
    quantite,
    size1,
    size2,
    idCategorie,
    currentPage,
    loadProducts,
    codeArrivage,
    description,
    actif,
    dateInsertion,
    prixAchat,
    pourcentage,
    promo,
    typeSize
  }) => {
    const handleValidation = () => {
      setOrderPopup(false);
    };
  const [formData, setFormData] = React.useState({
    nomPro: nomPro,
    idCategorie: idCategorie,
    prix: prix,
    qte: quantite,
    description: description,
    codeArrivage: codeArrivage,
    actif: actif,
    dateInsertion: dateInsertion,
    prixAchat: prixAchat,
    pourcentage: pourcentage,
    promo: promo,
    size1: size1,
    size2: size2,
    typeSize: typeSize,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  const handleSubmit= () =>{
    const convertedFormData = {
      nomPro: formData.nomPro,
      idCategorie: parseInt(formData.idCategorie),
      prix: parseFloat(formData.prix),
      qte: parseInt(formData.qte),
      description: formData.description,
      codeArrivage: formData.codeArrivage,
      actif: parseInt(formData.actif),
      dateInsertion: new Date(formData.dateInsertion).toISOString().split('T')[0] + ' ' + new Date(formData.dateInsertion).toTimeString().split(' ')[0],
      prixAchat: parseFloat(formData.prixAchat),
      pourcentage: parseFloat(formData.pourcentage),
      promo: parseInt(formData.promo),
      size1: formData.size1,
      size2: formData.size2,
      typeSize: parseInt(formData.typeSize),
    };
    console.log(convertedFormData);
    axiosClient.post(`/admin/updateProduct/${parseInt(codePro)}`, {convertedFormData:convertedFormData})
      .then(() => {
        setOrderPopup(false);
        loadProducts(currentPage)
      })
      .catch(err => {

        setOrderPopup(false);
        loadProducts(currentPage);
        const response = err.response;
        console.log(err.response.data)
        if (!response) {
          alert("Une erreur interne est survenue!")
          return
        }
        if(response.status === 422){
          console.error(response);
          alert("Vous n'avez pas entré toutes vos informations!")
        } 
      })
    
  }


  return (
    <>
      <Dialog open={orderPopup} handler={handleValidation}>
        <DialogHeader className="flex items-center justify-between">
          Personnalisation
          <div>
          <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={() => setOrderPopup(false)}
          />
          </div>
        </DialogHeader>

        <DialogBody>
          <div className="popup">
            <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 dark:text-white rounded-md duration-200 w-1/2">
                {/* header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1>Infos Produit</h1>
                  </div>
                  <div>
                  <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={() => setOrderPopup(false)}
          />
                  </div>
                </div>
                {/* form section */}
                <div className="mt-4">
                  <div className="flex items-center justify-between flex-row">
                    <p>CodeProduit</p>
                    <input
                      type="text"
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      placeholder="codePro"
                      name="codePro"
                      value={codePro}
                      disabled
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Id Categorie</p>
                    <input
                      type="text"
                      placeholder="idCategorie"
                      name="idCategorie"
                      value={formData.idCategorie}
                      disabled
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Nom Produit</p>
                    <input
                      type="text"
                      placeholder="nom"
                      name="nomPro"
                      value={formData.nomPro}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Prix</p>
                    <input
                      type="text"
                      placeholder="prix"
                      name="prix"
                      value={formData.prix}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Quantité</p>
                    <input
                      type="text"
                      placeholder="quantite"
                      name="qte"
                      value={formData.qte}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Description</p>
                    <input
                      type="text"
                      placeholder="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Code Arrivage</p>
                    <input
                      type="text"
                      placeholder="code arrivage"
                      name="codeArrivage"
                      value={formData.codeArrivage}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Date d'insertion</p>
                    <input
                      type="text"
                      placeholder="date"
                      name="dateInsertion"
                      value={formData.dateInsertion}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Prix d'achat</p>
                    <input
                      type="text"
                      placeholder="prix d'achat"
                      name="prixAchat"
                      value={formData.prixAchat}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Pourcentage</p>
                    <input
                      type="text"
                      placeholder="pourcentage"
                      name="pourcentage"
                      value={formData.pourcentage}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Promo</p>
                    <input
                      type="text"
                      placeholder="promo"
                      name="promo"
                      value={formData.promo}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Size 1</p>
                    <input
                      type="text"
                      placeholder="size 1"
                      name="size1"
                      value={formData.size1}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Size 2</p>
                    <input
                      type="text"
                      placeholder="size 2"
                      name="size2"
                      value={formData.size2}
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>TypeSize</p>
                    <input
                      type="text"
                      placeholder="type size"
                      name="typeSize"
                      
                        value={formData.typeSize}
                        onChange={handleChange}
                        className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                    </div>
{/* 
                    <div className="flex items-center justify-between flex-row">
                    <p>Chemin Image</p>
                    <input
                      type="text"
                      placeholder="Chemin d'accès à l'image"
                      name="chemin"
                      
                        value={formData.typeSize}
                        onChange={handleChange}
                        className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                    </div> */}

                    <div className="flex justify-between">
                      {/* <button
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                        onClick={() => setPopupImage(true)}
                      >
                        Images Produits
                      </button> */}
                      <button
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                        onClick={handleSubmit}
                      >
                        Enregistrer
                      </button>
                      
                    </div>
                    {/* {popupImage && <PopupImage setPopupImage={setPopupImage} codePro={formData.codePro} />} */}
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
  
          <DialogFooter className="justify-center">
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-4 px-4 rounded-full"
              onClick={handleValidation}
            >
              <span>Confirmer</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  };
  
  export default ProductPopup;
  