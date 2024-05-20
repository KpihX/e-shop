import React from "react";
import axiosClient from '../../axiosClient'
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import ScrollTopButton from "../ScrollTopButton/ScrollTopButton";
import options from "../../datas/options";
import { IoMdSearch } from "react-icons/io";
import Dropdown from "../Dropdown/Dropdown";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Categories from "../../components/Categories/Categories";

const Products = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [ currentPage, setCurrentPage ] = React.useState(1)
  const [currentSearchValue, setCurrentSearchValue] = React.useState('')
  const [searchType, setSearchType] = React.useState(options[0])
  const [ selectedCategory, setSelectedCategory] = React.useState(-1)
  const [products, setProducts] = React.useState([])
  const [allProducts, setAllProducts] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [perPage, setPerPage] = React.useState(9)
  const [hasSearchValueTypeChanged, setHasSearchValueTypeChanged] = React.useState(true)
 
  React.useEffect(() => {
    if (currentSearchValue === "") {
      setSearchValue("")
    }
  }, [currentSearchValue]);

  // React.useEffect(() => {
  //   if (currentSearchValue !== "") {
  //     setHasSearchValueTypeChanged(true)
  //   } else {
  //     setHasSearchValueTypeChanged(false)
  //   }
  // }, [searchType]);
  
  React.useEffect(() => {
    axiosClient.get('/shop/pagination')
      .then(response => {
        setPerPage(response.data.perPage)
      })
      .catch(error => {
        console.log("Erreur lors de la recuperation de la pagination: ", error);
      })
  }, [])

  React.useEffect(() => {
    // if (hasSearchValueTypeChanged) {
      loadProducts(currentPage)
    // }
  }, [currentPage, searchValue, selectedCategory, searchType]);

  const ajustProducts = (data) => {
    setProducts(data
      .filter(({ nomPro, codePro }) => {
        if (searchType.value == "name") {
          return nomPro.toLowerCase().includes(searchValue.toLowerCase())
        } else if (searchType.value == "id") {
          return searchValue == "" || codePro == parseInt(searchValue)
        }
      }))
    }

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

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  
  return (
    <div className="bg-slate-50 dark:bg-gray-700 w-full">
      <ScrollTopButton />
      <div className="group relative cursor-pointer py-2">
          {/* Menu button for smaller screens */}
          <Categories 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
          
      </div>
      <div className="relative group flex justify-center pl-2 pt-3 gap-2">
              <div className="relative group block">
                <input
                  type="text"
                  placeholder="Recherchez vos produits"
                  value={currentSearchValue}
                  onChange={(e) => setCurrentSearchValue(e.target.value)}
                  className="w-[250px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
                />
                <IoMdSearch 
                  className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" 
                  onClick={() => setSearchValue(currentSearchValue)}
                />
                
              </div>
              <Dropdown 
                options={options}
                onSelect={setSearchType}
                className="px-2"
              />
      </div>
      <div className="container ">
        {/* Header section */}
        <div className="text-left mb-24">
          {/* Commented code has been preserved */}
          <h1 data-aos="fade-up" className="py-10 text-3xl font-bold mx-auto text-center">
            Nos meilleurs produits...
          </h1>
        </div>
        {/* Body section */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex-row">
            {products.length !== 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-20 place-items-center">
                {products.map(({ codePro, idCategorie, nomPro, prix, description, image, size1, size2 }) => (
                  (selectedCategory === -1 || selectedCategory === idCategorie) ? (
                    <Product
                      key={codePro}
                      codePro={codePro}
                      nomPro={nomPro}
                      description={description}
                      prix={prix}
                      image={image}
                      size1={size1}
                      size2={size2}
                    />
                  ) : null
                ))}
              </div>
            ) : (
              <h1 className="py-10 text-xl text-center font-bold">Aucun produit ne correspond à votre recherche!</h1>
            )}
            {allProducts ? (
              <>
                {products.length != 0 ? 
                  <h1 className="py-10 text-xl text-center font-bold">Il n'y a pas d'autres produits disponibles en stock!</h1>
                  : null
                }
              </>
            ) : (
                <button
                  className="w-full border border-primary dark:border-white dark:text-white dark:bg-gray-800 bg-white hover:scale-105 duration-300 text-primary py-2 px-4 rounded-full my-10 "
                  onClick={handleLoadMore}
                >
                  Charger plus de produits
                </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
