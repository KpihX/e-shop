import { useContext, useState, useEffect } from "react"
import { CartContext } from "../utils/context/CartContext"
import styled from 'styled-components'

const CartItemWrapper = styled.div`
	width: 900px;
  height: 400px;
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
  height: 100px;
  width: 200px;
  align-self: center;
  border-radius: 50%;
`

function CartItem ({ codePro, nomPro, prix, quantite, image, size1, size2 }) {
  const { addToCart, removeFromCart, updateCartItemCount } = useContext(CartContext)
  const [inputValue, setInputValue] = useState(quantite ? quantite.toString() : '')
  const [colorClothe, setColorClothe] = useState("")
  const [sizeClothe, setSizeClothe] = useState("")

  // Appelé lorsque l'utilisateur modifie la valeur de l'input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  // Appelé lorsque l'utilisateur quitte l'input ou appuie sur Entrée
  const handleBlurOrEnter = (e) => {
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      const newQuantity = Number(inputValue) || 0;
      updateCartItemCount(newQuantity, codePro);
      setInputValue(newQuantity.toString()); // Assurez-vous que la valeur est une chaîne pour l'attribut value de l'input
    }
  };

  useEffect(() => {
    // Assurez-vous que l'inputValue est mis à jour si la quantité externe change
    setInputValue(quantite ? quantite.toString() : '');
  }, [quantite]);

  return (
    <CartItemWrapper>
      <ProductImage src={image} alt={nomPro}/>
      <CartItemLabel>
        <p>
          <b>{nomPro}</b>
        </p>
        <p>{prix} FCFA</p>
        <span>Entrez votre couleur: </span>
        <input
          type="text"
          onChange={e => setColorClothe(e.target.value)}
        />
        <span>Entrez votre taille (compris entre {size1} et {size2}): </span>
        <input
          type="text"
          onChange={e => setSizeClothe(e.target.value)}
        />
        <CountHandler>
          <button onClick={() => removeFromCart(codePro)}> - </button>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlurOrEnter}
            onKeyDown={handleBlurOrEnter}
          />
          <button onClick={() => addToCart(codePro, nomPro, prix, size1, size2, image, "blue")}> + </button>
          <button onClick={() => addToCart(codePro, nomPro, prix, size1, size2, image, "blue")}> + </button>
        </CountHandler>
      </CartItemLabel>  
    </CartItemWrapper>
  )
}
  )
}

export default CartItem