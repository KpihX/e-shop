import { createContext, useState } from "react"

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartItems, updateCartItems] = useState([]);

  function getCartItem(codePro) {
    return cartItems.find((item) => item.codePro === codePro);
  }

  function addToCart(codePro, nomPro, prix, size1, size2, size, image, color) {
    let itemExists = false;
  
    // Créez une copie du tableau cartItems en modifiant la quantité de l'élément concerné
    const updatedCartItems = cartItems.map((item) => {
      if (item.codePro === codePro) {
        itemExists = true;
        // Incrémentez simplement la quantité
        return { ...item, quantite: item.quantite + 1 };
      }
      return item;
    });
  
    // Si l'élément n'existe pas déjà dans le panier, ajoutez-le
    if (!itemExists) {
      updatedCartItems.push({ codePro, nomPro, prix, quantite: 1, size1, size2, size, image, color });
    }
  
    // Mettez à jour le state avec le nouveau tableau de cartItems
    updateCartItems(updatedCartItems);
  }

  function removeFromCart(codePro) {
    let itemExists = false;
  
    // Créez une copie du tableau cartItems en modifiant ou en supprimant l'élément concerné
    const updatedCartItems = cartItems.reduce((acc, item) => {
      if (item.codePro === codePro) {
        itemExists = true;
        if (item.quantite > 1) {
          // Décrémentez simplement la quantité
          acc.push({ ...item, quantite: item.quantite - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  
    // Si l'élément n'existe pas dans le panier, affichez un message d'erreur
    if (!itemExists) {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!");
    } else {
      // Mettez à jour le state avec le nouveau tableau de cartItems
      updateCartItems(updatedCartItems);
    }
  }

  const getTotalCartAmount = () => {
    console.log("**", cartItems, !cartItems)
    if (!cartItems ||cartItems.length === 0) return 0
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantite * cartItem.prix,
      0
    )
  }

  const updateCartItemCount = (newQuantite, codePro) => {
    // Marqueur pour vérifier si l'article existe dans le panier
    let itemExists = false;
  
    // Mise à jour de la quantité de l'article ou suppression si la quantité est nulle
    let updatedCartItems = cartItems.map((item) => {
      if (item.codePro === codePro) {
        itemExists = true;
        if (newQuantite > 0) {
          return { ...item, quantite: newQuantite };
        } else {
          // Si la nouvelle quantité est nulle, ne pas inclure l'article dans le tableau mis à jour
          return null;
        }
      }
      return item;
    }).filter(item => item !== null); // Filtrer les éléments nuls (ceux qui ont été supprimés)
  
    // Si l'élément n'existe pas dans le panier et que la nouvelle quantité est supérieure à zéro
    if (!itemExists && newQuantite > 0) {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!");
    } else {
      // Mettre à jour le state avec le nouveau tableau de cartItems
      updateCartItems(updatedCartItems);
    }
  
    console.log(updatedCartItems);
  };

  const updateCartItemColor = (newColor, codePro) => {
    let itemExists = false;
  
    // Mettez à jour la couleur de l'élément correspondant
    const updatedCartItems = cartItems.map((item) => {
      if (item.codePro === codePro) {
        itemExists = true;
        // Retournez un nouvel objet avec la nouvelle couleur
        return { ...item, color: newColor };
      }
      return item;
    });
  
    // Si l'élément n'existe pas dans le panier, loggez un message d'erreur
    if (!itemExists) {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!");
    } else {
      // Mettez à jour le panier avec les nouveaux éléments
      updateCartItems(updatedCartItems);
    }
  };

  const updateCartItemSize = (newSize, codePro) => {
    let itemExists = false;
  
    // Mettez à jour la taille de l'élément correspondant
    const updatedCartItems = cartItems.map((item) => {
      if (item.codePro === codePro) {
        itemExists = true;
        // Retournez une nouvelle version de l'élément avec la taille mise à jour
        return { ...item, size: newSize };
      }
      return item;
    });
  
    // Si l'élément n'existe pas dans le panier, loggez un message d'erreur
    if (!itemExists) {
      console.log("!Le produit de code '" + codePro + "' n'existe pas dans le panier!");
    } else {
      // Mettez à jour le panier avec les nouveaux éléments
      updateCartItems(updatedCartItems);
    }
  };

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
    updateCartItemCount,
    removeFromCart,
    cartItemCount,
    checkout,
    updateCartItemColor,
    updateCartItemSize,
    getCartItem
  }

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  )
}