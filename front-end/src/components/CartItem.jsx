import { useContext } from "react"
import { CartContext } from "../utils/context/CartContext"
import styled from 'styled-components'

const CartItemWrapper = styled.div`
	width: 700px;
  height: 300px;
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

function CartItem (props) {
  const { id, name, price, image } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(CartContext);

  return (
    <CartItemWrapper>
      <ProductImage src={image} alt={name}/>
      <CartItemLabel>
        <p>
          <b>nom: {name}</b>
        </p>
        <p> prix: {price} </p>
        <CountHandler>
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </CountHandler>
      </CartItemLabel>  
    </CartItemWrapper>
  );
};

export default CartItem