import React from "react";
// import Login from "../../components/Login/Login";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
// import TopProducts from "./components/TopProducts/TopProducts";
// import Banner from "./components/Banner/Banner";
// import Subscribe from "./components/Subscribe/Subscribe";
// import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import options from "../../datas/options";
import { CategoryContext } from "../../utils/context/CategoryContext"
import { PageContext } from "../../utils/context/PageContext";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const { currentPage, setCurrentPage } = React.useContext(PageContext)
  const [currentSearchValue, setCurrentSearchValue] = React.useState('')
  const [searchType, setSearchType] = React.useState(options[0])
  const { selectedCategory, setSelectedCategory} = React.useContext(CategoryContext)
  
  const goHome = () => {
    setCurrentPage(0)
    setCurrentSearchValue("")
    setSelectedCategory(-1)
  }

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  React.useEffect(() => {
    if (currentSearchValue === "") {
      setSearchValue("")
    }
  }, [currentSearchValue]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      
      <Navbar 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
        setSearchValue={setSearchValue}
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        options={options}
        setSearchType={setSearchType}
      />
      {selectedCategory === -1 && searchValue === "" && <Hero />}
      <Products 
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        searchType={searchType}
      />
      {/* <Banner />
      <Subscribe />
      sss
      <Testimonials /> */}
      <Footer 
        goHome={goHome}
      />
    </div>
  );
};

export default Home;
