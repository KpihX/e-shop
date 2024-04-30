import { createContext, useState } from "react"

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartItems, updateCartItems] = useState([]);

  function addToCart(codePro, nomPro, prix, size1, size2, size, image, color) {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    
    if (currentItemRemoved) {
        const cartFilteredCurrentItem = cartItems.filter(
            (item) => item.nomPro !== nomPro
        )
        updateCartItems([
            ...cartFilteredCurrentItem,
            { codePro, nomPro, prix, quantite: currentItemRemoved.quantite + 1, size1, size2, size, image, color}
        ])
        
    } else {
        updateCartItems([...cartItems, { codePro, nomPro, prix, quantite: 1, size1, size2, size, image, color }])
    }
  } 

  function removeFromCart(codePro) {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    if (currentItemRemoved) {
      const cartFilteredCurrentItem = cartItems.filter(
        (item) => item.codePro !== codePro
      )
      if (currentItemRemoved.quantite === 1) {
        updateCartItems(cartFilteredCurrentItem)
      } else {
        updateCartItems([
          ...cartFilteredCurrentItem,
          { codePro, nomPro: currentItemRemoved.nomPro, prix: currentItemRemoved.prix, quantite: currentItemRemoved.quantite - 1, size1: currentItemRemoved.size1, size2: currentItemRemoved.size2, size: currentItemRemoved.size, image: currentItemRemoved.image, color: currentItemRemoved.color }
        ])
      }
    } else {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!")
    }
  } 

  const getTotalCartAmount = () => {
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantite * cartItem.prix,
      0
    )
  }

  const updateCartItemsItemCount = (newQuantite, codePro) => {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    if (currentItemRemoved) {
      const cartFilteredCurrentItem = cartItems.filter(
        (item) => item.codePro !== codePro
      )
      updateCartItems([
        ...cartFilteredCurrentItem,
        { codePro, nomPro: currentItemRemoved.nomPro, prix: currentItemRemoved.prix, quantite: newQuantite, size1: currentItemRemoved.size1, size2: currentItemRemoved.size2, size: currentItemRemoved.size, image: currentItemRemoved.image, color: currentItemRemoved.color }
      ])
    } else {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!")
    }
  }

  const updateCartItemsItemColor = (newColor, codePro) => {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    if (currentItemRemoved) {
      const cartFilteredCurrentItem = cartItems.filter(
        (item) => item.codePro !== codePro
      )
      updateCartItems([
        ...cartFilteredCurrentItem,
        { codePro, nomPro: currentItemRemoved.nomPro, prix: currentItemRemoved.prix, quantite: currentItemRemoved.quantite, size1: currentItemRemoved.size1, size2: currentItemRemoved.size2, size: currentItemRemoved.size, image: currentItemRemoved.image, color: newColor }
      ])
    } else {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!")
    }
  }

  const updateCartItemsItemSize = (newSize, codePro) => {
    const currentItemRemoved = cartItems.find((item) => item.codePro === codePro)
    if (currentItemRemoved) {
      const cartFilteredCurrentItem = cartItems.filter(
        (item) => item.codePro !== codePro
      )
      updateCartItems([
        ...cartFilteredCurrentItem,
        { codePro, nomPro: currentItemRemoved.nomPro, prix: currentItemRemoved.prix, quantite: currentItemRemoved.quantite, size1: currentItemRemoved.size1, size2: currentItemRemoved.size2, size: newSize, image: currentItemRemoved.image, color: currentItemRemoved.color }
      ])
    } else {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!")
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
    updateCartItems([]);
  }

  const contextValue = {
    cartItems,
    updateCartItems,
    addToCart,
    getTotalCartAmount,
    updateCartItemsItemCount,
    removeFromCart,
    cartItemCount,
    checkout,
    updateCartItemsItemColor,
    updateCartItemsItemSize
  }

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  )
}