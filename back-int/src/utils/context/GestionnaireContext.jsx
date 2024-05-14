import React from "react";

const GestionnaireContext = React.createContext({
    gestionnaire: null,
    token: null,
    setGestionnaire: () => {},
    setToken: () => {}
});

export const GestionnaireProvider = ({children}) => {
    const [gestionnaire, setGestionnaire] = React.useState({});
    const [token, _setToken] = React.useState();

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <GestionnaireContext.Provider value={{
            gestionnaire,
            token,
            setGestionnaire,
            setToken
        }}>
            {children}
        </GestionnaireContext.Provider>
    )
}

export const useGestionnaireContext = () => React.useContext(GestionnaireContext)



const GestPopupContext = React.createContext();

export const useGestPopup = () => React.useContext(GestPopupContext);

export const GestPopupProvider = ({ children, popup, setPopup, configEnd, setConfigEnd }) => (
  <GestPopupContext.Provider value={{ popup, setPopup, configEnd, setConfigEnd }}>
    {children}
  </GestPopupContext.Provider>
);

