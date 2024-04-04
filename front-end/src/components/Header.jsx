import styled from 'styled-components'
import { StyledLink } from '../utils/style/Atoms'
// import LightLogo from '../assets/light-logo.png'
// import DarkLogo from '../assets/dark-logo.png'
import { ShoppingCart } from "phosphor-react";
import { useEffect } from "react";
import axiosClient from "../axiosClient";
import { Link } from 'react-router-dom'

import { useTheme } from '../utils/hooks'
import { useUserContext } from "../utils/context/UserContext";


// const HomeLogo = styled.img`
//   height: 70px;
// `

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoutButton = styled.a`
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  color: #212121;
  transition: all 0.3s;
  border-radius: 6px;
`


function Header() {
  const { theme } = useTheme()
  const {user, token, setUser, setToken} = useUserContext();

  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }, [token, setUser])
  
  const onLogout =  (ev) =>{
    ev.preventDefault();
    axiosClient.get('/logout')
    .then(({}) => {
      setUser(null)
      setToken(null)
    })
  }

  return (
    <NavContainer>
      <Link to="/">
        {/* <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} alt='e-shop'/> */}
				e-shop
      </Link>
      <StyledLink $theme={theme} to="/">
        Accueil
      </StyledLink>
      <StyledLink to="/cart" $isFullLink>
        <ShoppingCart size={32} />
      </StyledLink>
			{token ? (
        <div>
          {user.name}
          <LogoutButton href="#" onClick={onLogout}>Logout</LogoutButton>
        </div>
      ) : (
        <div>
          <StyledLink $theme={theme} to="/login">
            Se Connecter
          </StyledLink>
          <StyledLink $theme={theme} to="/register">
            S'Inscrire
          </StyledLink>
        </div>
      )}
    </NavContainer>
  )
}

export default Header