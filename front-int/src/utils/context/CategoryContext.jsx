import React from "react";

export const CategoryContext = React.createContext();

export const CategoryContextProvider = (props) => {
  const [selectedCategory, setSelectedCategory] = React.useState(-1)
  const [categories, setCategories] = React.useState([])

  const contextValue = {
    selectedCategory,
    setSelectedCategory,
    categories,
    setCategories
  }

  return (
    <CategoryContext.Provider value={contextValue}>
      {props.children}
    </CategoryContext.Provider>
  )
}