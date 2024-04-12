// import styled from 'styled-components'
// import { useTheme } from '../utils/hooks'
// import colors from '../utils/style/colors'

// const FooterContainer = styled.footer`
//   background-color: ${colors.dark};
//   color: ${colors.backgroundLight};
// `

// const FooterInfos = styled.footer`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   padding: 20px;
//   background-color: ${colors.dark};
//   color: ${colors.backgroundLight};
// `

// const Section = styled.div`
//   flex: 1;
// `

// const AboutSection = styled(Section)`
//   margin-right: 20px;
// `

// const ContactSection = styled(Section)`
//   margin-left: 20px;
// `

// const Copyright = styled.div`
//   margin-top: 20px;
// `

// const ThemeSwitch = styled.button`
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
// `

// function Footer() {
//   const { theme, toggleTheme } = useTheme()

//   return (
//     <FooterContainer>
//       <FooterInfos>
//         <AboutSection>
//           <h3>À propos</h3>
//           <p>Nous sommes une entrerpise de vente de vêtements pour enfants & adultes</p>
//         </AboutSection>
//         <ContactSection>
//           <h3>Contacts</h3>
//           <p>Email: example@gmail.com</p>
//           <p>Téléphone: 6XXXXXXXX</p>
//         </ContactSection>
//         <Copyright>
//           &copy; e-shop
//         </Copyright>
//       </FooterInfos>
//       <ThemeSwitch onClick={toggleTheme}>
//         Changer de thème
//       </ThemeSwitch>
//     </FooterContainer>
//   )
// }

// export default Footer

import styled from 'styled-components'
import { useTheme } from '../utils/hooks'
import colors from '../utils/style/colors'
import facebookIcon from '../assets/facebook.png'
import instagramIcon from '../assets/instagram.jpg'

const FooterContainer = styled.footer`
  background-color: indigo;
  color: ${colors.backgroundLight};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 15px;
`

const FooterInfos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
`

const Section = styled.div`
  flex: 1;
  margin-bottom: 20px;
`

const AboutSection = styled(Section)`
  margin-right: 20px;
`

const ContactSection = styled(Section)`
  margin-left: 20px;
`

const FollowSection = styled(Section)`
  display: flex;
  align-items: center;
  
`

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
`

const Copyright = styled.div`
  margin-top: 20px;
`

const ThemeSwitch = styled.button`
  background-color: ${colors.purple};
  color: blue;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 15px;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
  font-size: 15px;
`

function Footer() {
  const { theme, toggleTheme } = useTheme()

  return (
    <FooterContainer>
      <FooterInfos>
        <AboutSection>
          <h3 style={{ color: colors.purple }}>À propos de nous</h3>
          <br />
          <p>Nous sommes une entreprise de vente </p>
          <p>de vêtements pour enfants & adultes.</p>
          <br />
          <h3>Horaires d'ouvertures</h3>
          <p>8h00-18h00</p>
        </AboutSection>
        <ContactSection>
          <h3 style={{ color: colors.purple }}>Contactez nous</h3>
          <br />
          <p>Email: example@gmail.com</p>
          <p>Téléphone: 6XXXXXXX7</p>
        </ContactSection>
        <FollowSection>
          <h3>Suivez nous sur: </h3>
          <a href="https://www.facebook.com" target="_blank">
            <SocialIcon src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <SocialIcon src={instagramIcon} alt="Instagram" />
          </a>
        </FollowSection>
      </FooterInfos>
      <Copyright>
        &copy; e-shop
      </Copyright>
      <ThemeSwitch onClick={toggleTheme}>
        CHANGER LE THEME
      </ThemeSwitch>
    </FooterContainer>
  )
}

export default Footer
