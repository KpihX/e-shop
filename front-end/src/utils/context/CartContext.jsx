import { createContext, useState } from "react"

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartItems, updateCart] = useState([]);

  function addToCart(codePro, nomPro, prix, size1, size2, image, color) {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    
    if (currentItemRemoved) {
        const cartFilteredCurrentItem = cartItems.filter(
            (item) => item.nomPro !== nomPro
        )
        updateCart([
            ...cartFilteredCurrentItem,
            { codePro, nomPro, prix, quantite: currentItemRemoved.quantite + 1, size1, size2, image, color}
        ])
        
    } else {
        updateCart([...cartItems, { codePro, nomPro, prix, quantite: 1, size1, size2, image, color }])
    }
    // console.log(cartItems)
  } 

  function removeFromCart(codePro) {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    if (currentItemRemoved) {
      const cartFilteredCurrentItem = cartItems.filter(
        (item) => item.codePro !== codePro
      )
      if (currentItemRemoved.quantite === 1) {
        updateCart(cartFilteredCurrentItem)
      } else {
        updateCart([
          ...cartFilteredCurrentItem,
          { codePro, nomPro: currentItemRemoved.nomPro, prix: currentItemRemoved.prix, quantite: currentItemRemoved.quantite - 1, size1: currentItemRemoved.size1, size2: currentItemRemoved.size2, image: currentItemRemoved.image, color: currentItemRemoved.color }
        ])
      }
    }
  } 

  const getTotalCartAmount = () => {
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantite * cartItem.prix,
      0
    )
  }

  const updateCartItemCount = (newQuantite, codePro) => {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    if (currentItemRemoved) {
      const cartFilteredCurrentItem = cartItems.filter(
        (item) => item.codePro !== codePro
      )
      updateCart([
        ...cartFilteredCurrentItem,
        { codePro, nomPro: currentItemRemoved.nomPro, prix: currentItemRemoved.prix, quantite: newQuantite, size1: currentItemRemoved.size1, size2: currentItemRemoved.size2, image: currentItemRemoved.image, color: currentItemRemoved.color }
      ])
    } else {
        updateCart([...cart, { codePro, nomPro, prix, quantite: newQuantite, size1, size2, image, color}])
    }
  }

  const cartItemCount = (codePro) => {
    const currentItem = cartItems.find((item) => item.codePro === codePro)
    if (currentItem) {
      return currentItem.quantite
    }
    return 0
  }

  const checkout = () => {
    updateCart([]);
  }

  const contextValue = {
    cartItems,
    updateCart,
    addToCart,
    getTotalCartAmount,
    updateCartItemCount,
    removeFromCart,
    cartItemCount,
    checkout,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  )
}