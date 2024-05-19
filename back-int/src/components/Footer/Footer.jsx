// import React from "react";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";
import { Link } from 'react-router-dom'
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};


const Footer = () => {

  return (
    <div className="bg-secondary dark:bg-primary text-white  items-center justify-center flex fixed bottom-0 left-0 w-full" >
      <h3>ESHOP-MARKET</h3>
    </div>
  );
};

export default Footer;
