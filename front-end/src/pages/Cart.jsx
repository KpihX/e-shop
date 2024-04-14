import { useContext, useState } from "react"
import { CartContext } from "../utils/context/CartContext"
import CartItem from "../components/CartItem"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'

import Header from "../components/Header"
import CartInfos from "../components/CartInfos"


const CartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Checkout = styled.div`
	width: 150px;
  height: 50px;
  background-color: rgb(19, 19, 19);
  color: white;
  border: none;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
`

function Cart() {
  const { cartItems, getTotalCartAmount, checkout } = useContext(CartContext)
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  

  return (
    <div>
      <Header />
      <CartInfos />
      <CartWrapper>
        <h1>Finalisez vos achats ici</h1>
        {cartItems.map(({codePro, nomPro, prix, quantite, image, size1, size2}) => (
          <CartItem
            key={codePro} 
            codePro={codePro} 
            nomPro={nomPro}
            prix={prix}
            quantite={quantite}
            size1={size1}
            size2={size2}
            image={image}
          />
        ))}
        {totalAmount > 0 ? (
          <Checkout>
            <p> sous total: {totalAmount} </p>
            <button onClick={() => navigate("/")}> Continue Shopping </button>
            <button onClick={() => {
                                    checkout();
                                    navigate("/");
                                  }}>
            {" "} Annuler {" "}
            </button>
          </Checkout>
        ) : (
          <h1> 
            Your Shopping Cart is Empty you have to chose what you want now because it can't be available in store beacause some one else buy it.
          </h1>
        )}
      </CartWrapper>
    </div>
  )
}

export default Cart