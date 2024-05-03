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
    <div style={BannerImg} className="text-white">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="" className="max-w-[50px]" />
              e-shop
            </h1>
            <p>
              Nous sommes une entreprise de vente de vêtements pour enfants & adultes.
            </p>
          </div>

          {/* Footer Links */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10"> */}
            
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Liens
                </h1>
                <ul className="flex flex-col gap-3">
                  <Link
                    to="/"
                    className="inline-block hover:text-primary duration-200"
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/cart"
                    className="inline-block hover:text-primary duration-200"
                  >
                    Panier
                  </Link>
                </ul>
              </div>

            {/* social links */}

            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaEnvelope />
                  <a href="xyz@example.com" className="inline-block hover:text-primary duration-200">
                    xyz@example.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Nkolmesseng, Yaoundé, Cameroun</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>6XX XXX XXX</p>
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
