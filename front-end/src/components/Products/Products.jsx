import React from "react";
// import { Loader } from '../../utils/style/Atoms'
// import { LoaderWrapper } from '../../utils/style/Atoms'
import axiosClient from '../../axiosClient'
import Product from "../Product/Product";
// import { FaStar } from "react-icons/fa";

const Products = ({ selectedCategory, currentPage, setCurrentPage, searchValue }) => {
  const [products, setProducts] = React.useState([])
  const [allProducts, setAllProducts] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    loadProducts(currentPage)
  }, [currentPage, searchValue]);

  const loadProducts = (page) => {
    if (currentPage === 0) {
      setCurrentPage(1)
      return
    }
    setLoading(true)
    axiosClient.get(`/shop/products?page=${page}&category=${selectedCategory}`)//&searchItem=${searchValue}`)
      .then(response => {
        const data = response.data.data
        // console.log(data)
        if (page === 1) {
          setProducts(data)
          setAllProducts(false)
        } else {
          setProducts(prevProducts => [...prevProducts, ...data]);
        }
        if (data.length == 0 || data.length < 12) {
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
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          {/* <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p> */}
          {/* <div className="flex justify-center items-center h-screen"> */}
            <h1 data-aos="fade-up" className="text-3xl font-bold mx-auto text-center">
              Nos meilleurs produits...
            </h1>
          {/* </div> */}
          {/* <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p> */}
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
        { isLoading ? (
            null
            // <LoaderWrapper>
            //   <Loader data-testid="loader"/>
            // </LoaderWrapper>
          ) : (
            products
              .filter(({ nomPro }) => (nomPro.toLowerCase().includes(searchValue.toLowerCase())))
              .map(({codePro, idCategorie, nomPro, prix, description, image, size1, size2}) => (
                (selectedCategory == -1 || selectedCategory == idCategorie) ? (
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
          )))}
          {allProducts ? (
            <h1 className="text-xl font-bold">Il n'y a plus de produits disponibles en stock.</h1>
            ) : (
            <button
              className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
              onClick={handleLoadMore}
            >
              Charger plus de produits
            </button>
          )}
          <button
            className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
            onClick={() => window.scrollTo(0, 0)}
          >
            Revenir plus haut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
