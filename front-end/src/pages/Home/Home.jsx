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

const options=[
  {value: 'name', label: 'Nom'},
  {value: 'id', label: 'Id'}
]

const Home = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState(-1)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [currentSearchValue, setCurrentSearchValue] = React.useState('')
  const [searchType, setSearchType] = React.useState(options[0])

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
        options={options}
        setSearchType={setSearchType}

      />
      {selectedCategory === -1 && (currentSearchValue === "" || searchValue != currentSearchValue) && <Hero />}
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
      <Footer />
    </div>
  );
};

export default Home;
