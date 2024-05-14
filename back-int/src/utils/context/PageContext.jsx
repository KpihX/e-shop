import React from "react";

export const PageContext = React.createContext();

export const PageContextProvider = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1)

  const contextValue = {
    currentPage,
    setCurrentPage,
  }

  return (
    <PageContext.Provider value={contextValue}>
      {props.children}
    </PageContext.Provider>
  )
}