import styled from 'styled-components'
// import { StyledLink } from '../utils/style/Atoms'

import { useTheme } from '../utils/hooks'
import { products } from "../datas/products"
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

function Home() {
  const { theme } = useTheme()

  return (
    <div>
      <Header />
      <StyledTitle theme={theme}>
        <h1>Welcome to eShop </h1>
      </StyledTitle>
      <HomeWrapper theme={theme}>
        <Categories theme={theme} />
        <ProductsWrapper>
          {products.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </ProductsWrapper>
      </HomeWrapper>
      <Footer />
    </div>
  )
}

export default Home