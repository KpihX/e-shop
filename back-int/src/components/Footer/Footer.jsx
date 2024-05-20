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
import pages from "../../pages";

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
          <div className="py-5 px-4 justify-center text-center sm:text-left">
            <h1 className="sm:text-3xl text-xl font-bold mb-5 flex items-center justify-center gap-3">
              <img src={footerLogo} alt="" className="max-w-[50px]" />
              e-shop
            </h1>
            <p>
              Nous sommes une entreprise de vente de vêtements pour enfants & adultes.
            </p>
          </div>

          {/* Footer Links */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10"> */}
            
              <div className="py-6 px-4 text-center">
                <h1 className="sm:text-xl text-xl font-bold sm:text-center mb-3">
                  Liens
                </h1>
                <ul className="flex flex-col gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.link}
                      className="inline-block hover:text-primary duration-200"
                    >
                      {page.name}
                    </Link>
                  ))}
                </ul>
              </div>

            {/* social links */}

            <div>
              <div className="flex items-center justify-center gap-3 mt-6 ">
                <a href="https://www.instagram.com/" className="hover:text-primary duration-200">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="https://www.facebook.com/" className="hover:text-primary duration-200">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="https://www.linkedin.com/" className="hover:text-primary duration-200">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6 flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <FaEnvelope />
                  <a href="mailto:xyz@example.com" className="inline-block hover:text-primary duration-200">
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
