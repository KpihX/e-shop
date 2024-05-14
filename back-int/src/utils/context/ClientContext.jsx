import React from "react"

export const ClientContext = React.createContext();

export const ClientContextProvider = (props) => {
  const [clientInfos, setClientInfos] = React.useState(() => {
    try {
      const saved = localStorage.getItem("clientInfos");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Parsing error: ", e);
      return {};
    }
  });
  // const [nomClient, setNomClient] = React.useState("")
  // const [mobile, setMobile] = React.useState("")
  // const [adresse, setAdresse] = React.useState("")
  // const [selectedVille, setSelectedVille] = React.useState()
  
  React.useEffect(() => {
    // console.log("*-*", clientInfos)
    if (clientInfos) {
      localStorage.setItem("clientInfos", JSON.stringify(clientInfos));
    }
  }, [clientInfos]);

  const contextValue = {
    clientInfos,
    setClientInfos,
  }

  return (
    <ClientContext.Provider value={contextValue}>
      {props.children}
    </ClientContext.Provider>
  )
}