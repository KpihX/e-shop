import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../../axiosClient";
import options from "../../../datas/options";
import PopupImage from "./PopupImage";
import { IconButton, Tooltip } from '@material-tailwind/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const ProductPopupNew = ({
  orderPopup,
  setOrderPopup,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [popupImg, setPopupImg] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState(options[0]);

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(9);

  const [formData, setFormData] = useState({
    nomPro: "",
    idCategorie: selectedCategory,
    prix: 0,
    qte: 0,
    description: "empty",
    codeArrivage: "0000",
    actif: 1,
    dateInsertion: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
    prixAchat: 0,
    pourcentage: 0,
    promo: 1,
    size1: " ",
    size2: " ",
    typeSize: 0,
  });

  const handleValidation = () => {
    setOrderPopup(false);
  };

  const handleSubmit = () => {
    const convertedFormData = {
      nomPro: formData.nomPro,
      idCategorie: formData.idCategorie,
      prix: parseFloat(formData.prix),
      qte: parseInt(formData.qte),
      description: formData.description !== null ? formData.description : "empty",
      codeArrivage: formData.codeArrivage !== null ? formData.codeArrivage : "0000",
      actif: parseInt(formData.actif),
      dateInsertion: formData.dateInsertion,
      prixAchat: parseFloat(formData.prixAchat),
      pourcentage: parseFloat(formData.pourcentage),
      promo: parseInt(formData.promo),
      size1: formData.size1,
      size2: formData.size2,
      typeSize: parseInt(formData.typeSize),
    };
    console.log(convertedFormData);
    axiosClient.post(`/admin/storeProduct/`, {
      convertedFormData: convertedFormData
    })
    .then(() => {
      setOrderPopup(false);
      loadProducts(currentPage);
    })
    .catch(err => {
      alert(err.response.data.message);
      const response = err.response;
      console.log(err.response.data.message);
      if (!response) {
        alert("Une erreur interne est survenue!");
        return;
      }
      if (response.status === 422) {
        console.error(response);
        alert("Vous n'avez pas entré toutes vos informations!");
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [popupImage, setPopupImage] = useState(false);

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage, searchValue, selectedCategory, searchType]);

  const loadProducts = (page) => {
    if (currentPage === 0) {
      setCurrentPage(1);
      return;
    }
    setLoading(true);
    axiosClient.get(`/shop/products?page=${page}&category=${selectedCategory}&searchType=${searchType.value}&searchItem=${searchValue}`)
      .then(response => {
        let data = response.data.data;
        console.log("data: ", data);
        if (page === 1) {
          setProducts(data);
          setAllProducts(false);
        } else {
          setProducts([...products, ...data]);
        }

        if (data.length === 0 || data.length < perPage) {
          console.log(page);
          setAllProducts(true);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits: ", error);
        setLoading(false);
      });
  };

  return (
          <div className="popup">
            <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 dark:text-white rounded-md duration-200 w-1/2">
                <div className="flex items-center justify-between">
                  <h1>Infos Produit</h1>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer"
                    onClick={() => setOrderPopup(false)}
                  />
                </div>
                <div className="mt-4">
                  {[
                    { label: 'Id Categorie', name: 'idCategorie', value: selectedCategory, disabled: true },
                    { label: 'Nom Produit', name: 'nomPro', placeholder: 'Entrez le nom' },
                    { label: 'Prix', name: 'prix', placeholder: 'Entrez le prix' },
                    { label: 'Quantité', name: 'qte', placeholder: 'Entrez la quantité' },
                    { label: 'Description', name: 'description', placeholder: 'Entrez la description' },
                    { label: 'Code Arrivage', name: 'codeArrivage', placeholder: "Entrez le code d'arrivage" },
                    { label: "Date d'insertion", name: 'dateInsertion', value: formData.dateInsertion, disabled: true },
                    { label: "Prix d'achat", name: 'prixAchat', placeholder: "Entrez le prix d'achat" },
                    { label: 'Pourcentage', name: 'pourcentage', placeholder: 'Entrez le pourcentage' },
                    { label: 'Promo', name: 'promo', placeholder: 'Entrez le promo' },
                    { label: 'Size 1', name: 'size1', placeholder: 'Entrez une première taille' },
                    { label: 'Size 2', name: 'size2', placeholder: 'Entrez une seconde taille' },
                    { label: 'TypeSize', name: 'typeSize', placeholder: 'Entrez le type de taille' },
                  ].map((input, index) => (
                    <div key={index} className="flex items-center justify-between flex-row mb-4">
                      <p>{input.label}</p>
                      <input
                        type="text"
                        placeholder={input.placeholder}
                        name={input.name}
                        value={input.value || formData[input.name]}
                        disabled={input.disabled}
                        onChange={handleChange}
                        className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1"
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-between flex-row mb-4">
                    <p>Image</p>
                    <Tooltip content="Images" className="bg-green-500">
                      <IconButton variant="text" className="bg-green-100" onClick={() => setPopupImg(!popupImg)}>
                        <PhotoIcon className="h-4 w-4" color="green" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="bg-green-600 hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                      onClick={handleSubmit}
                    >
                      Enregistrer
                    </button>
                  </div>
                  {popupImg && <PopupImage setPopupImage={setPopupImg} />}
                </div>
              </div>
            </div>
          </div>
  );
};

export default ProductPopupNew;
