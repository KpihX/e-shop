// import PropTypes from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import { useTheme } from '../utils/hooks'
import { CartContext } from '../utils/context/CartContext'
import Cart from '../pages/Cart'


const ProductLabel = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
`

const ProductImage = styled.img`
  height: 150px;
  wcodeProth: 150px;
  align-self: center;
  border-radius: 50%;
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  wcodeProth: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`

const AddToCartButton = styled.button`
  
`

function Product({ codePro, nomPro, prix, image, size1, size2 }) {
  const { theme } = useTheme()
  const { cartItems, addToCart, cartItemCount } = useContext(CartContext);
  const cartItemCountValue = cartItemCount(codePro)

  return (
    <ProductWrapper theme={theme} onClick={() => null}>
      <ProductLabel theme={theme}>
        <span>Nom: {nomPro}</span>
        <span>Prix: {prix}</span>
      </ProductLabel>
      <ProductImage src={image} alt={nomPro} />
      <AddToCartButton onClick={() => addToCart(codePro, nomPro, prix, size1, size2, image, "blue")}>
        Ajouter au panier {cartItemCountValue != 0 && <> ({cartItemCountValue})</>}
      </AddToCartButton>
    </ProductWrapper>
  )
}

// Product.propTypes = {
//   label: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
// }

// Product.defaultProps = {
//   label: '',
//   title: '',
//   picture: DefaultPicture,
// }

export default Product