import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

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
        <UserContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)