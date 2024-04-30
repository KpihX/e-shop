import styled from 'styled-components'
import { ShoppingCart } from "phosphor-react"

import logo from '../assets/logo2.png'
import colors from '../utils/style/colors'
import { useTheme } from '../utils/hooks'
import { StyledLink } from '../utils/style/Atoms'

const Logo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  background-color: ${colors.backgroundLight};
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
  const { theme } = useTheme()

  return (
    <NavContainer>
      <TitleContainer>
				<StyledLink $theme={theme} to="/">
          <Logo src={logo} alt="e-shop" />
        </StyledLink>
        <StyledLink $theme={theme} to="/" $isFullLink>
          E-Shop
        </StyledLink>
      </TitleContainer>
      <div>
        <StyledLink $theme={theme} to="/" $isFullLink>{/* <StyledLink $theme={theme} to="/"> */}
          Accueil
        </StyledLink>
        <StyledLink $theme={theme} to="/cart" $isFullLink>
          <ShoppingCart size={25} />
        </StyledLink>
      </div>
    </NavContainer>
  )
}

export default Header