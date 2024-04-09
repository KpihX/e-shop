import styled from 'styled-components'
import { StyledLink } from '../utils/style/Atoms'
import { ShoppingCart } from "phosphor-react";
import { useEffect } from "react";
import axiosClient from "../axiosClient";
import { Link } from 'react-router-dom'
import { useTheme } from '../utils/hooks'

import logo from '../assets/logo2.png'
import colors from '../utils/style/colors';
import { useUserContext } from "../utils/context/UserContext";
// import LightLogo from '../assets/light-logo.png'
// import DarkLogo from '../assets/dark-logo.png'


const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 10px;
  width: 100%;
  display: flex;
  background-color: #eeeef3;
  justify-content: space-between;
  align-items: center;
`

const TitleContainer = styled.div`
  padding: 20px;
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

const Logo = styled.img`
  height: 70px;
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
      <TitleContainer>
        {/* <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} alt='e-shop'/> */}
				<StyledLink to="/">
          <Logo src={logo} alt="e-shop" />
        </StyledLink>
        {/* <StyledLink to="/" $isFullLink>
          E-Shop
        </StyledLink> */}
      </TitleContainer>
      <div>
        <StyledLink to="/" $isFullLink>{/* <StyledLink $theme={theme} to="/"> */}
          Accueil
        </StyledLink>
        <StyledLink to="/cart" $isFullLink>
          <ShoppingCart size={25} />
        </StyledLink>
      </div>
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