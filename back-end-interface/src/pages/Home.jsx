import styled from 'styled-components'
// import { StyledLink } from '../utils/style/Atoms'
import { useState, useEffect } from 'react'
import axiosClient from '../axiosClient'
import { useTheme } from '../utils/hooks'
// import products from "../datas/products"
// import categories from '../datas/categories'
import colors from '../utils/style/colors'
import Product from "../components/Product"
import Header from "../components/Header"
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import { Loader } from '../utils/style/Atoms'


const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  /* background-color: ${colors.backgroundLight}; */
  /* background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark}; */
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`

const StyledTitle = styled.h2`
  width: 100%;
  text-align: center;
  /* padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px; */
  color: #381b5e;
  /* color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')}; */
`

const ProductsWrapper = styled.div`
  left: 100px;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
`

const SearchBar = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  
  border: 2px solid #5e437b; // Bordure violette
  border-radius: 5px; // Bordures arrondies
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Home() {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState(false);
  const [isLoading, setLoading] = useState(false)
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axiosClient.get('/shop/categories')
      .then(({data}) => {
        setCategories(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories:", error);
        setLoading(false)
      });
  }, []);

  // useEffect(() => {
  //   axiosClient.get('/shop/products')
  //     .then(({data}) => {
  //       console.log(data.data)
  //       setProducts(data.data)
  //     })
  //     .catch(error => {
  //       console.error("Erreur lors de la récupération des produits:", error);
  //     });
  // }, []);

  useEffect(() => {
    // console.log(currentPage)
    // console.log(selectedCategory)
    loadProducts(currentPage)
    console.log(searchValue)
  }, [currentPage, searchValue]);

  // useEffect(() => {
  //   // console.log(currentPage)
  //   // console.log(selectedCategory)
  //   handleSearch(searchValue)
  // }, [searchValue]);


  const loadProducts = (page) => {
    if (currentPage === 0) {
      setCurrentPage(1)
      return
    }
    setLoading(true)
    axiosClient.get(`/shop/products?page=${page}&category=${selectedCategory}&searchItem=${searchValue}`)
      .then(response => {
        const data = response.data.data
        // console.log(data)
        if (page === 1) {
          setProducts(data)
          setAllProducts(false)
          // console.log(data)
        } else {
          setProducts(prevProducts => [...prevProducts, ...data]);
        }
        if (data.length == 0 || data.length < 10) {
          setAllProducts(true)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits:", error);
        setLoading(false)
      });
  };

  // const handleSearch = (searchValue) => {
  //   axiosClient.get(`/shop/search?&searchItem=${searchValue}&category=${selectedCategory}`)
  //     .then(response => {
  //       setProducts(prevProducts => [...prevProducts, ...response.data.data]);
  //     })
  //     .catch(error => {
  //       console.error("Erreur lors de la récupération des produits de recherche.", error);
  //     });
  // };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Header />
      <StyledTitle theme={theme}>
        <h2>"Bienvenue chez E-Shop. Vous satisfaire,notre dévise!"</h2>
      </StyledTitle>
      <SearchBar 
        type="text" 
        placeholder="Rechercher des produits..." 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <HomeWrapper theme={theme}>
        {isLoading ? (
          <LoaderWrapper>
            <Loader theme={theme} data-testid="loader"/>
          </LoaderWrapper>
        ) : (
          <Categories 
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            // selectedCategory={selectedCategory}
            // currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            theme={theme} 
          />
        )}
        
        <ProductsWrapper>
          { false ? (
            <LoaderWrapper>
              <Loader theme={theme} data-testid="loader"/>
            </LoaderWrapper>
          ) : (
            products
              .filter(({ nomPro }) => (nomPro.toLowerCase().includes(searchValue.toLowerCase())))
              .map(({codePro, idCategorie, nomPro, prix, image, size1, size2}) => (
              (selectedCategory == -1 || selectedCategory == idCategorie) ? (
                <Product 
                  key={codePro} 
                  codePro={codePro} 
                  nomPro={nomPro}
                  prix={prix}
                  image={image}
                  size1={size1}
                  size2={size2}
                />
              ) : null
          )))}
          {allProducts ? <p>Plus de produits disponibles.</p> : <button onClick={handleLoadMore}>Charger plus</button>}
          <button onClick={() => window.scrollTo(0, 0)}>Revenir en haut</button>
        </ProductsWrapper>
      </HomeWrapper>
      <Footer />
    </div>
  )
}

export default Home