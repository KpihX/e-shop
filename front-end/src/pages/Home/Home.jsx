import React from "react";
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

const Home = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState(-1)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [currentSearchValue, setCurrentSearchValue] = React.useState('')
  
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
        setSearchValue={setSearchValue}
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
      />
      {selectedCategory === -1 && currentSearchValue === "" && <Hero />}
      <Products 
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
      />
      {/* <Banner />
      <Subscribe />
      sss
      <Testimonials /> */}
      <Footer />
    </div>
  );
};

export default Home;
