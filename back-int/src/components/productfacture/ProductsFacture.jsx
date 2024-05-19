import React, {useState} from "react";
import Img1 from "../../assets/photos/women.png";
import Img2 from "../../assets/photos/women2.jpg";
import Img3 from "../../assets/photos/women3.jpg";
import Img4 from "../../assets/photos/women4.jpg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Facture from '../Facture/Facture';
import { IoMdSearch } from "react-icons/io";

const ProductsData = [
  {
    codePro: 1,
    nomPro: "Women Ethnic",
    description: "white",
    prix: "1000",
    image: Img1,
    size1:"xxl",
    size2:"m",
    
  },
  {
  codePro: 2,
    nomPro: "Women western",
    description: "Red",
    prix: "2000",
    image: Img2,
    size1:"xxl",
    size2:"m",
  },
  
    {
      codePro: 3,
      nomPro: "Robette",
      description: "brown",
      prix: "200",
      image: Img3,
      size1:"xxl",
      size2:"m",
    },
  
    {
      codePro: 4,
      nomPro: "Women",
      description: "green",
      prix: "2500",
      image: Img4,
      size1:"xxl",
      size2:"m",
    },
  
    {
      codePro: 5,
      nomPro: "Robette",
      description: "brown",
      prix: "200",
      image: Img3,
      size1:"xxl",
      size2:"m",
    },

 
    {
      codePro: 6,
    
      nomPro: "Women Ethnic",
      
      description: "white",
      prix: "1000",
      image: Img1,
      size1:"xxl",
      size2:"m",
      
    },

    {
      codePro: 7,
      nomPro: "Women western",
      description: "Red",
      prix: "2000",
      image: Img2,
      size1:"xxl",
      size2:"m",
  
    },
    {
      codePro: 8,
      nomPro: "Robette",
      description: "brown",
      prix: "200",
      image: Img3,
      size1:"xxl",
      size2:"m",
    },
    {
      codePro: 9,
      nomPro: "Women",
      description: "green",
      prix: "2500",
      image: Img4,
      size1:"xxl",
      size2:"m",
    },
    {
      codePro: 10,
      nomPro: "Women",
      description: "green",
      prix: "2500",
      image: Img4,
      size1:"xxl",
      size2:"m",
    },
];

const ProductsFacture = () => {
  const [selectProduct, setSelectProduct]=useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectProduct(true);
    setSelectedProduct(product);
  

  };

  const [searchTerm, setSearchTerm] = useState('');

   const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
};

  
  return (

    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      
    <Navbar />

  <div>
      <div>
        <Facture selectedProduct={selectedProduct} test={selectProduct} test1={setSelectProduct}/>
      </div>
      <div className="mt-14 mb-12  justify-between">
      <div className=" justify-between items-center gap-4">
    <div className="relative group hidden sm:block ml-auto">
        <input
            type="text"
            placeholder="Rechercher un produit"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
        />
        <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 left-3"/>
        
    </div>
      </div>
        <div className="container">
          {/* Header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold">
              Produits
            </h1>
            <p data-aos="fade-up" className="text-3xs text-gray-4000">
              Liste des produits commandés
            </p>
          </div>
          {/* Body section */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {/* card section */}
              {ProductsData.map((data) => ( 
                <div
                  data-aos="fade-up"
                  key={data.codePro}
                  className="space-y-3"
                >
                  <img
                    src={data.image}
                    alt=""
                    className="h-[80px] w-[60px] object-cover rounded-md"
                  />
                  <button
            className="bg-primary hover:scale-105 duration-300 text-white py-1 px-1 rounded-full mt- group-hover:bg-white group-hover:text-primary"
            onClick={() => handleProductClick(data)}
          >
            Ajouter à la facture
          </button>
                  <div>
                    <h3 className="font-semibold">{data.nomPro}</h3>
                    <div>
                    <p className="text-sm text-gray-600">{data.codePro}</p>
                    <p className="text-sm text-gray-400">Prix unitaire(en FCFA): {data.prix}</p>
                  </div>
                    <div className="flex items-center gap-1">
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Buttons section */}
            <div className="flex justify-between mt-10">
              <button className="cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
                Prev
              </button>
              <button className="cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
                Add
              </button>
              <button className="cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    <Footer />
  </div>



  );
};

export default ProductsFacture;
