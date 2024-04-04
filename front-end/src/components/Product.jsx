// import PropTypes from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import { useTheme } from '../utils/hooks'
import { CartContext } from '../utils/context/CartContext'


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
  width: 150px;
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
  width: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`

const AddToCartButton = styled.button`
  
`

function Product(props) {
  const { id, name, price, image } = props.data;
  const { theme } = useTheme()
  const { cartItems, addToCart } = useContext(CartContext);
  const cartItemCount = cartItems[id];

  return (
    <ProductWrapper theme={theme} onClick={() => null}>
      <ProductLabel theme={theme}>
        <span>Nom : {name}</span>
        <span>Price : {price}</span>
      </ProductLabel>
      <ProductImage src={image} alt={name} />
      <AddToCartButton className="addToCartBttn" onClick={() => addToCart(id)}>
        Ajouter au panier {cartItemCount > 0 && <> ({cartItemCount})</>}
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