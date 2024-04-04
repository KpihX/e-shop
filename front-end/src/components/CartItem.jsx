import { useContext } from "react"
import { CartContext } from "../utils/context/CartContext"
import styled from 'styled-components'

const CartItemWrapper = styled.div`
	width: 900px;
  height: 400px;
  display: flex;
  
  align-items: center;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  margin: 30px;
`

const CartItemLabel = styled.div`
	width: 100%;
  font-size: 30px;
`

const CountHandler = styled.div`
	width: 40px;
  text-align: center;
  font-weight: bolder;
`

const ProductImage = styled.img`
  height: 150px;
  width: 400px;
  align-self: center;
  border-radius: 50%;
`

function CartItem ({ codePro, nomPro, prix, quantite, image, size1, size2 }) {
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(CartContext);

  return (
    <CartItemWrapper>
      <ProductImage src={image} alt={nomPro}/>
      <CartItemLabel>
        <p>
          <b>nom: {nomPro}</b>
        </p>
        <p> prix: {prix} </p>
        <CountHandler>
          <button onClick={() => removeFromCart(codePro)}> - </button>
          <input
            defaultValue={quantite}
            onChange={(e) => updateCartItemCount(Number(e.target.value), codePro)}
          />
          <button onClick={() => addToCart(codePro, nomPro, prix, size1, size2, image, "blue")}> + </button>
        </CountHandler>
      </CartItemLabel>  
    </CartItemWrapper>
  )
}

export default CartItem