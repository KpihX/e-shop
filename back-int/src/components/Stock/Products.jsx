import React from "react";
import Popup from "./Popup";
import { useState } from "react";
import Button from '@mui/material/Button';
import axiosClient from "../../axiosClient";
import { IoMdSearch } from "react-icons/io";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const Products = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const [ProductsData, setProductsData]=useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue]=React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(1);
  const [searchType, setSearchType]=React.useState([{label: "nom", value: ""}, {label: "code", value: 1}]);
  const [categories, setCategories] = React.useState([]);
  const [currentSearchValue, setCurrentSearchValue] = React.useState("");

  React.useEffect(() => {
    setLoading(true)
    axiosClient.get(`/admin/products?page=${page}&category=${selectedCategory}&searchItem=${searchValue}`)
      .then(({data}) => {
        setProductsData(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des ProductsData: ", error);
        setLoading(false)
      })
  }, [])


  React.useEffect(() => {
    setLoading(true)
    axiosClient.get('/admin/categories')
      .then(({data}) => {
        setCategories(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories: ", error);
        setLoading(false)
      })
  }, [])
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    axiosClient.post('/admin/products', {
      
    })
  })
  console.log(ProductsData);
  return (
    <div>
      <Navbar/>
    <div className="flex h-max w-full justify-between items-start p-10">
      <div className="contenair flex rounded-md p-3 bg-primary/40 m-2 w-1/5 flex-col justify-between h-max">
        <div className="flex justify-between items-center flex-row w-full pb-5 h-max">
          <h2 className="text-1xl font-bold justify-start pr-2">
            Catégories
          </h2>
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Rechercher une categorie"
              value=''
              onChange={(e) => setCurrentSearchValue(e.target.value)}
              className="w-full  duration-300 rounded-full border border-gray-300 px-2 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800 right-3"
            />
              <IoMdSearch 
                className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" 
                onClick={() => {setCategories()}} // a revoir avec axios pour recuperer les categories ayant ce nom
            />
              
          </div>
        </div>
        <ul className="sm:flex hidden items-start gap-4 flex-col p-2">
          {categories.map((data) => (
            <li key={data.id}>
              <button
                onClick={() => setSelectedCategory(data.id)}
                className="inline-block px-2 hover:text-primary duration-200"
              >
                {data.nomCat}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-start items-bottom gap-4 flex-col">
          <div className="flex flex-row gap-2 items-center">
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-2 w-full"
              placeholder="Créer une nouvelle catégorie"
            />
            <Button
              className="bg-primary text-white rounded-lg px-2"
              size="small"
              // onClick={()}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-2 w-full"
              placeholder="nom categorie"
            />
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-2 w-full"
              placeholder="new name"
            />
            <Button
              className="bg-primary text-white rounded-lg px-2 text-white bg-primary/70"
              size="small"
            >
              Ok
            </Button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-2 w-full"
              placeholder="Supprimer une categorie"
            />
            <Button
              className="bg-primary text-white rounded-lg px-2"
              size="small"
            >
              Drop
            </Button>
          </div>
        </div>
      </div>


      <div className="container w-4/5 h-max">
        {/* Header section */}
            <div className="flex justify-between items-center gap-4 p-10 ">
              <h1 className="text-3xl font-bold justify-start">
                Produits
              </h1>
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Recherchez vos produits"
                  value=''
                  onChange={(e) => setCurrentSearchValue(e.target.value)}
                  className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
                  />
                <IoMdSearch 
                  className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" 
                  onClick={() => setSearchValue(currentSearchValue)}
                  />
              </div>
            </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                key={data.codePro}
                className="space-y-3"
              >
                <img
                  src={data.image}
                  alt=""
                  className="h-[100px] w-[80px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.nomPro}</h3>
                  <div className="flex items-center gap-1">
                    <button className="text-center mt-2 cursor-pointer bg-primary text-white px-5 rounded-md"
                    onClick={handleOrderPopup}>
                      modifier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-end items-center p-2">
            <button className="text-center mr-5 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              prev
            </button>
            <button className="text-center mr-5 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              next
            </button>
            <button className="text-center mr-5 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
            onClick={handleOrderPopup}>
              ajouter
            </button>
            {orderPopup && <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />}
          </div>
        </div>
      </div>
    </div>
      <Footer/>
      </div>
  );
};

export default Products;
