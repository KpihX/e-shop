import styled from 'styled-components'
import { useTheme } from '../utils/hooks'
import colors from '../utils/style/colors'

const FooterContainer = styled.footer`
  background-color: ${colors.dark};
  color: ${colors.backgroundLight};
`

const FooterInfos = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  background-color: ${colors.dark};
  color: ${colors.backgroundLight};
`

const Section = styled.div`
  flex: 1;
`

const AboutSection = styled(Section)`
  margin-right: 20px;
`

const ContactSection = styled(Section)`
  margin-left: 20px;
`

const Copyright = styled.div`
  margin-top: 20px;
`

const ThemeSwitch = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

function Footer() {
  const { theme, toggleTheme } = useTheme()

  return (
    <FooterContainer>
      <FooterInfos>
        <AboutSection>
          <h3>À propos</h3>
          <p>Nous sommes une entrerpise de vente de vêtements pour enfants & adultes</p>
        </AboutSection>
        <ContactSection>
          <h3>Contacts</h3>
          <p>Email: example@gmail.com</p>
          <p>Téléphone: 6XXXXXXXX</p>
        </ContactSection>
        <Copyright>
          &copy; e-shop
        </Copyright>
      </FooterInfos>
      <ThemeSwitch onClick={toggleTheme}>
        Changer de thème
      </ThemeSwitch>
    </FooterContainer>
  )
}

export default Footer