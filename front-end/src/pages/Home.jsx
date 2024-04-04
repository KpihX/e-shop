import styled from 'styled-components'
// import { StyledLink } from '../utils/style/Atoms'
import { useState } from 'react'

import { useTheme } from '../utils/hooks'
import products from "../datas/products"
import categories from '../datas/categories'
import colors from '../utils/style/colors'
import Product from "../components/Product"
import Header from "../components/Header"
import Categories from '../components/Categories'
import Footer from '../components/Footer'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`

const StyledTitle = styled.h2`
  width: 100;
  text-align: center;
  /* padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px; */
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const ProductsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
`

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #5e437b; // Bordure violette
  border-radius: 5px; // Bordures arrondies
`;

function Home() {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')

  const [selectedCategory, setSelectedCategory] = useState(-1)

  return (
    <div>
      <Header />
      <StyledTitle theme={theme}>
        <h1>Bienvenue chez e-shop, la solution pour vos vêtements!</h1>
      </StyledTitle>
      <HomeWrapper theme={theme}>
        <Categories 
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          // selectedCategory={selectedCategory}
          theme={theme} 
        />
        <ProductsWrapper>
          <SearchBar 
            type="text" 
            placeholder="Rechercher des produits..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {products
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
          ))}
        </ProductsWrapper>
      </HomeWrapper>
      <Footer />
    </div>
  )
}

export default Home