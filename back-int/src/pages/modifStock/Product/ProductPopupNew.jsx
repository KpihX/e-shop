import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient from "../../../axiosClient";
import options from "../../../datas/options";


import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


  const ProductPopupNew = ({
    orderPopup,
    setOrderPopup,
    selectedCategory,
    setSelectedCategory,

  }) => {
    
    const [searchValue, setSearchValue] = React.useState('')
    const [ currentPage, setCurrentPage ] = React.useState(1)
    const [currentSearchValue, setCurrentSearchValue] = React.useState('')
    const [searchType, setSearchType] = React.useState(options[0])
  
    const [products, setProducts] = React.useState([])
    const [allProducts, setAllProducts] = React.useState(false)
    const [isLoading, setLoading] = React.useState(false)
    const [perPage, setPerPage] = React.useState(9)
    const [hasSearchValueTypeChanged, setHasSearchValueTypeChanged] = React.useState(true)


    const [formData, setFormData] = React.useState({
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
    const [image, setImage] = React.useState("");

    const handleValidation = () => {
      setOrderPopup(false);
    };
  
    const handleSubmit= () =>{
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
        convertedFormData:convertedFormData,
        image: image})
        .then(() => {
          setOrderPopup(false);
          loadProducts(currentPage)
        })
        .catch(err => {
  
          alert(err.response.data.message)
          const response = err.response;
          console.log(err.response.data.message)
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


    console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [popupImage, setPopupImage] = React.useState(false);


  React.useEffect(() => {
    // if (hasSearchValueTypeChanged) {
      loadProducts(currentPage)
    // }
  }, [currentPage, searchValue, selectedCategory, searchType]);


  const loadProducts = (page) => {
    
    if (currentPage === 0) {
      setCurrentPage(1)
      return
    }
    setLoading(true)
    axiosClient.get(`/shop/products?page=${page}&category=${selectedCategory}&searchType=${searchType.value}&searchItem=${searchValue}`)
      .then(response => {
        let data = response.data.data
        console.log("data: ", data)
        if (page === 1) {
          ajustProducts(data)
          setAllProducts(false)
        } else {
          ajustProducts([...products, ...data]);
        }
        
        if (data.length == 0 || data.length < perPage) {
          console.log(page)
          setAllProducts(true)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits: ", error);
        setLoading(false)
      });
  };

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
                    <p>Id Categorie</p>
                    <input
                      type="text"
                      placeholder={selectedCategory}
                      name="idCategorie"
                      disabled
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Nom Produit</p>
                    <input
                      type="text"
                      placeholder="Entrez le nom"
                      name="nomPro"
                    
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Prix</p>
                    <input
                      type="text"
                      placeholder="Entrez le prix"
                      name="prix"
                      
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Quantité</p>
                    <input
                      type="text"
                      placeholder="Entrez la quantité"
                      name="qte"
                     
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Description</p>
                    <input
                      type="text"
                      placeholder="Entrez la description"
                      name="description"
                     
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Code Arrivage</p>
                    <input
                      type="text"
                      placeholder="Entrez le code d'arrivage"
                      name="codeArrivage"
                     
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
                      disabled
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
                      
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Pourcentage</p>
                    <input
                      type="text"
                      placeholder="Entrez le pourcentage"
                      name="pourcentage"
                      
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Promo</p>
                    <input
                      type="text"
                      placeholder="Entrez le promo"
                      name="promo"
                      
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Size 1</p>
                    <input
                      type="text"
                      placeholder="Entrez une première taille"
                      name="size1"
                    
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>Size 2</p>
                    <input
                      type="text"
                      placeholder="Entrez une seconde taille"
                      name="size2"
                      
                      onChange={handleChange}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <p>TypeSize</p>
                    <input
                      type="text"
                      placeholder="Entrez le type de taille"
                      name="typeSize"
                      
                        
                        onChange={handleChange}
                        className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                    </div>
                    
                  <div className="flex items-center justify-between flex-row">
                    <p>Image</p>
                    <input
                      type="url"
                      placeholder="Entrez le chemin de votre image"
                      name="CheminImage"
                      value={formData.image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-4/5 rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                    />
                    </div>

                    <div className="flex justify-between">
                      {/* <button
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                        onClick={() => setPopupImage(true)}
                      >
                        Images Produits
                      </button> */}
                      <button
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                        onClick={handleSubmit}>
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
  
  export default ProductPopupNew;
  