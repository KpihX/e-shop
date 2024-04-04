import { useContext } from "react"
import { CartContext } from "../utils/context/CartContext"
import { products } from "../datas/products"
import CartItem from "../components/CartItem"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Header from "../components/Header"


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
  const { cartItems, getTotalCartAmount, checkout } = useContext(CartContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <CartWrapper>
        <h1>Your Cart Items : Here is presente all what you chouse to buy</h1>
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
        {totalAmount > 0 ? (
          <Checkout>
            <p> sous total: {totalAmount} </p>
            <button onClick={() => navigate("/")}> Continue Shopping </button>
            <button onClick={() => {
                                    checkout();
                                    navigate("/checkout");
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